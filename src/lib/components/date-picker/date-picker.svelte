<script lang="ts">
	import './date-picker.css';
	import { getContext, tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import Icon from '../icon/icon.svelte';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { DDC, DSC } from './date-picker.record';

	const DAY_MS = 24 * 60 * 60 * 1000;
	const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
	const monthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const triggerFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const dayFormatter = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		timeZone: 'UTC'
	});
	const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});

	const pad = (value: number) => `${value}`.padStart(2, '0');

	const createUtcDate = (year: number, month: number, day: number) =>
		new Date(Date.UTC(year, month, day));

	const toDateKey = (date: Date) =>
		`${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

	const parseDateKey = (value: string) => {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

		const [year, month, day] = value.split('-').map(Number);
		const date = createUtcDate(year, month - 1, day);

		if (
			date.getUTCFullYear() !== year ||
			date.getUTCMonth() !== month - 1 ||
			date.getUTCDate() !== day
		) {
			return null;
		}

		return date;
	};

	const startOfMonth = (date: Date) => createUtcDate(date.getUTCFullYear(), date.getUTCMonth(), 1);

	const endOfMonth = (date: Date) =>
		createUtcDate(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);

	const addDays = (date: Date, amount: number) => new Date(date.getTime() + amount * DAY_MS);

	const addMonths = (date: Date, amount: number) =>
		createUtcDate(date.getUTCFullYear(), date.getUTCMonth() + amount, 1);

	const startOfWeek = (date: Date, weekStartsOn: DatePicker.WeekStartsOn) => {
		const diff = (date.getUTCDay() - weekStartsOn + 7) % 7;
		return addDays(date, -diff);
	};

	const rotateWeekdays = (weekStartsOn: DatePicker.WeekStartsOn) =>
		WEEKDAY_LABELS.slice(weekStartsOn).concat(WEEKDAY_LABELS.slice(0, weekStartsOn));

	const clampToBounds = (key: string, min: string, max: string) => {
		if (min && key < min) return min;
		if (max && key > max) return max;
		return key;
	};

	const isWithinBounds = (key: string, min: string, max: string) =>
		(!min || key >= min) && (!max || key <= max);

	const normalizeValue = (nextValue: string[], range: boolean, min: string, max: string) => {
		const unique = [...new Set(nextValue.filter((entry) => parseDateKey(entry)))].filter((entry) =>
			isWithinBounds(entry, min, max)
		);

		if (!range) {
			return unique.slice(0, 1).sort();
		}

		return unique.slice(0, 2).sort();
	};

	const createTodayKey = () => {
		const now = new Date();
		return toDateKey(createUtcDate(now.getFullYear(), now.getMonth(), now.getDate()));
	};

	const TODAY_KEY = createTodayKey();

	let {
		id = '',
		name = '',
		size = 'md',
		value = $bindable<string[]>([]),
		open = $bindable(false),
		placeholder = '',
		range = false,
		disabled = false,
		required = false,
		helper = '',
		error = '',
		class: className = '',
		ariaLabel = '',
		min = '',
		max = '',
		weekStartsOn = 0,
		onfocus,
		onblur,
		onkeydown,
		onselect
	}: Partial<DatePicker.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let shellElement = $state<HTMLDivElement | null>(null);
	let triggerElement = $state<HTMLButtonElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let panelWidth = $state(0);
	let visibleMonth = $state(startOfMonth(parseDateKey(TODAY_KEY) ?? createUtcDate(2026, 0, 1)));
	let activeDateKey = $state(TODAY_KEY);
	let hoveredDateKey = $state('');
	let lastSyncedValue = $state('');

	let normalizedMin = $derived(parseDateKey(min) ? toDateKey(parseDateKey(min)!) : '');
	let normalizedMax = $derived(parseDateKey(max) ? toDateKey(parseDateKey(max)!) : '');
	let normalizedValue = $derived.by(() =>
		normalizeValue(value, range, normalizedMin, normalizedMax)
	);
	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let controlId = $derived(id || fieldContext?.getControlId() || resolvedName);
	let helperId = $derived(helper && controlId ? `${controlId}-helper` : '');
	let errorId = $derived(error && controlId ? `${controlId}-error` : '');
	let dialogId = $derived(controlId ? `${controlId}-dialog` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let pickerClass = $derived.by(() =>
		classnames(
			'dpk',
			DSC[size],
			open && 'dpk-open',
			disabled && 'dpk-disabled',
			invalid && 'dpk-error'
		)
	);
	let wrapperClass = $derived(classnames('dpk-field', className));
	let panelClass = $derived(classnames('dpk-panel', range && 'dpk-panel-range'));
	let selectedStart = $derived(normalizedValue[0] || '');
	let selectedEnd = $derived(range && normalizedValue.length > 1 ? normalizedValue[1] : '');
	let previewStart = $derived.by(() => {
		if (!range || normalizedValue.length !== 1 || !hoveredDateKey) return '';
		return hoveredDateKey < selectedStart ? hoveredDateKey : selectedStart;
	});
	let previewEnd = $derived.by(() => {
		if (!range || normalizedValue.length !== 1 || !hoveredDateKey) return '';
		return hoveredDateKey > selectedStart ? hoveredDateKey : selectedStart;
	});
	let triggerLabel = $derived.by(() => {
		if (!normalizedValue.length) {
			return placeholder || (range ? 'Select a date range' : 'Select a date');
		}

		if (!range) {
			return triggerFormatter.format(parseDateKey(normalizedValue[0])!);
		}

		if (normalizedValue.length === 1) {
			return `${triggerFormatter.format(parseDateKey(normalizedValue[0])!)} - Select end date`;
		}

		return normalizedValue
			.map((entry) => triggerFormatter.format(parseDateKey(entry)!))
			.join(' - ');
	});
	let startTriggerLabel = $derived(
		selectedStart ? triggerFormatter.format(parseDateKey(selectedStart)!) : 'Start date'
	);
	let endTriggerLabel = $derived(
		selectedEnd ? triggerFormatter.format(parseDateKey(selectedEnd)!) : 'End date'
	);
	let headerValue = $derived.by(() => {
		if (!normalizedValue.length) {
			return range ? 'Pick a start and end date' : 'Pick a date';
		}

		if (!range || normalizedValue.length === 1) {
			return triggerLabel;
		}

		return `${triggerFormatter.format(parseDateKey(normalizedValue[0])!)} to ${triggerFormatter.format(parseDateKey(normalizedValue[1])!)}`;
	});
	let weekdayLabels = $derived.by(() => rotateWeekdays(weekStartsOn));
	let calendarMonths = $derived.by(() => {
		const monthCount = range ? 2 : 1;

		return Array.from({ length: monthCount }, (_, monthIndex): DatePicker.CalendarMonth => {
			const monthDate = addMonths(visibleMonth, monthIndex);
			const monthStart = startOfMonth(monthDate);
			const monthEnd = endOfMonth(monthDate);
			const calendarStart = startOfWeek(monthStart, weekStartsOn);
			const leadingDays = (monthStart.getUTCDay() - weekStartsOn + 7) % 7;
			const daysInMonth = monthEnd.getUTCDate();
			const weekCount = Math.max(5, Math.ceil((leadingDays + daysInMonth) / 7));
			const days = Array.from({ length: weekCount * 7 }, (_, index): DatePicker.CalendarDay => {
				const date = addDays(calendarStart, index);
				const key = toDateKey(date);
				const isInFinalRange = Boolean(
					selectedStart && selectedEnd && key >= selectedStart && key <= selectedEnd
				);
				const isInPreviewRange = Boolean(
					previewStart && previewEnd && key >= previewStart && key <= previewEnd
				);
				const disabledDay = !isWithinBounds(key, normalizedMin, normalizedMax);
				const singleSelected =
					(!range && normalizedValue.includes(key)) ||
					(range && normalizedValue.length === 1 && selectedStart === key);

				return {
					key,
					label: dayFormatter.format(date),
					disabled: disabledDay,
					isCurrentMonth: date.getUTCMonth() === monthDate.getUTCMonth(),
					isToday: key === TODAY_KEY,
					isSingleSelected: singleSelected,
					isRangeStart: Boolean(selectedEnd && key === selectedStart),
					isRangeEnd: Boolean(selectedEnd && key === selectedEnd),
					isInRange: isInFinalRange,
					isPreviewed: !selectedEnd && isInPreviewRange
				};
			});

			return {
				key: `${monthStart.getUTCFullYear()}-${monthStart.getUTCMonth()}`,
				label: monthFormatter.format(monthDate),
				weeks: Array.from({ length: weekCount }, (_, index) => days.slice(index * 7, index * 7 + 7))
			};
		});
	});

	const syncPanelWidth = () => {
		panelWidth = shellElement?.offsetWidth ?? 0;
	};

	const setVisibleMonthFromKey = (key: string) => {
		const date = parseDateKey(clampToBounds(key, normalizedMin, normalizedMax));

		if (date) {
			visibleMonth = startOfMonth(date);
		}
	};

	const focusDay = async (key: string) => {
		activeDateKey = key;
		setVisibleMonthFromKey(key);
		await tick();
		const nextButton =
			contentElement?.querySelector<HTMLButtonElement>(
				`[data-day-key="${key}"][data-day-current-month="true"]`
			) ?? contentElement?.querySelector<HTMLButtonElement>(`[data-day-key="${key}"]`);

		nextButton?.focus();
	};

	const getReferenceKey = () =>
		normalizedValue.at(-1) || activeDateKey || clampToBounds(TODAY_KEY, normalizedMin, normalizedMax);

	const openPicker = async () => {
		if (disabled) return;

		open = true;
		syncPanelWidth();
		await focusDay(getReferenceKey());
	};

	const closePicker = (focusTrigger = false) => {
		open = false;
		hoveredDateKey = '';

		if (focusTrigger) {
			void tick().then(() => {
				triggerElement?.focus();
			});
		}
	};

	const emitSelection = (nextValue: string[]) => {
		value = nextValue;
		onselect?.(nextValue);
	};

	const selectDate = async (key: string) => {
		if (disabled || !isWithinBounds(key, normalizedMin, normalizedMax)) return;

		activeDateKey = key;

		if (!range) {
			emitSelection([key]);
			closePicker(true);
			return;
		}

		if (normalizedValue.length !== 1) {
			emitSelection([key]);
			hoveredDateKey = '';
			await focusDay(key);
			return;
		}

		const nextValue = [selectedStart, key].sort();
		emitSelection(nextValue);
		closePicker(true);
	};

	const togglePicker = async () => {
		if (open) {
			closePicker();
			return;
		}

		await openPicker();
	};

	const moveActiveBy = async (amount: number) => {
		const source = parseDateKey(activeDateKey || getReferenceKey());

		if (!source) return;

		const nextKey = toDateKey(addDays(source, amount));

		if (!isWithinBounds(nextKey, normalizedMin, normalizedMax)) return;

		await focusDay(nextKey);
	};

	const handleTriggerFocus = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		onfocus?.(event);
	};

	const handleTriggerBlur = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		const nextTarget = event.relatedTarget;

		if (
			nextTarget instanceof Node &&
			(shellElement?.contains(nextTarget) || contentElement?.contains(nextTarget))
		) {
			return;
		}

		onblur?.(event);
	};

	const handleTriggerKeydown = async (event: Utils.KeyboardEvent<HTMLButtonElement>) => {
		if (disabled) {
			onkeydown?.(event);
			return;
		}

		if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			await openPicker();
		} else if (event.key === 'Escape' && open) {
			event.preventDefault();
			closePicker();
		}

		onkeydown?.(event);
	};

	const handleDayKeydown = async (event: Utils.KeyboardEvent<HTMLButtonElement>, key: string) => {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			await moveActiveBy(1);
			return;
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			await moveActiveBy(-1);
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			await moveActiveBy(7);
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			await moveActiveBy(-7);
			return;
		}

		if (event.key === 'Home') {
			event.preventDefault();
			await focusDay(toDateKey(startOfWeek(parseDateKey(key)!, weekStartsOn)));
			return;
		}

		if (event.key === 'End') {
			event.preventDefault();
			await focusDay(toDateKey(addDays(startOfWeek(parseDateKey(key)!, weekStartsOn), 6)));
			return;
		}

		if (event.key === 'PageUp') {
			event.preventDefault();
			await focusDay(clampToBounds(toDateKey(addMonths(parseDateKey(key)!, -1)), normalizedMin, normalizedMax));
			return;
		}

		if (event.key === 'PageDown') {
			event.preventDefault();
			await focusDay(clampToBounds(toDateKey(addMonths(parseDateKey(key)!, 1)), normalizedMin, normalizedMax));
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			await selectDate(key);
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			closePicker(true);
			return;
		}

		if (event.key === 'Tab') {
			closePicker();
		}
	};

	$effect(() => {
		const nextValue = normalizedValue.join('|');

		if (nextValue === lastSyncedValue) return;

		lastSyncedValue = nextValue;
		setVisibleMonthFromKey(normalizedValue[0] || TODAY_KEY);
		activeDateKey = normalizedValue.at(-1) || clampToBounds(TODAY_KEY, normalizedMin, normalizedMax);
	});

	$effect(() => {
		if (!shellElement) return;

		syncPanelWidth();

		const resizeObserver = new ResizeObserver(() => {
			syncPanelWidth();
			tippyInstance?.popperInstance?.update();
		});

		resizeObserver.observe(shellElement);

		return () => {
			resizeObserver.disconnect();
		};
	});

	$effect(() => {
		if (!shellElement || !contentElement || disabled) return;

		const instance = createTippy(shellElement, contentElement, {
			trigger: 'manual',
			placement: 'bottom-start',
			offset: [0, 8],
			maxWidth: 'none',
			theme: 'sprix-date-picker',
			hideOnClick: false,
			onClickOutside: () => {
				closePicker();
			},
			onHide: () => {
				closePicker();
			}
		});

		tippyInstance = instance;

		return () => {
			tippyInstance = null;
			instance.destroy();
		};
	});

	$effect(() => {
		if (disabled && open) {
			closePicker();
		}
	});

	$effect(() => {
		if (!tippyInstance) return;

		if (open && !disabled) {
			syncPanelWidth();
			tippyInstance.show();
			return;
		}

		tippyInstance.hide();
	});
</script>

<div class={wrapperClass}>
	<div bind:this={shellElement} class={pickerClass}>
		<button
			bind:this={triggerElement}
			id={controlId || undefined}
			type="button"
			class="dpk-trigger"
			aria-haspopup="dialog"
			aria-expanded={open}
			aria-controls={dialogId || undefined}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{disabled}
			onclick={togglePicker}
			onfocus={handleTriggerFocus}
			onblur={handleTriggerBlur}
			onkeydown={handleTriggerKeydown}
		>
			{#if range}
				<span class="dpk-range">
					<span class="dpk-range-item">
						<span class="dpk-icon" aria-hidden="true">
							<Icon name="calendar-days" class="" />
						</span>

						<span
							class={classnames('dpk-value', !selectedStart && 'dpk-placeholder')}
						>
							{startTriggerLabel}
						</span>
					</span>

					<span class="dpk-range-item dpk-range-item-end">
						<span class="dpk-icon" aria-hidden="true">
							<Icon name="calendar-days" class="" />
						</span>

						<span
							class={classnames('dpk-value', !selectedEnd && 'dpk-placeholder')}
						>
							{endTriggerLabel}
						</span>
					</span>
				</span>
			{:else}
				<span class="dpk-icon" aria-hidden="true">
					<Icon name="calendar-days" class="" />
				</span>

				<span class="dpk-copy">
					<span class={classnames('dpk-value', !normalizedValue.length && 'dpk-placeholder')}>
						{triggerLabel}
					</span>
				</span>
			{/if}
		</button>

		{#if resolvedName}
			{#each normalizedValue as entry, index (`${resolvedName}-${entry}-${index}`)}
				<input type="hidden" name={resolvedName} value={entry} />
			{/each}
		{/if}
	</div>

	{#if error}
		<p id={errorId} class="dpk-message dpk-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="dpk-message">{helper}</p>
	{/if}

	<div class="dpk-panel-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			id={dialogId || undefined}
			class={panelClass}
			role="dialog"
			aria-modal="false"
			aria-label={range ? 'Choose a date range' : 'Choose a date'}
			style:width={panelWidth ? `${panelWidth}px` : undefined}
		>
			<div class="dpk-panel-head">
				<div class="dpk-panel-copy">
					<span class="dpk-panel-kicker">{range ? 'Range selection' : 'Single selection'}</span>
					<span
						class={classnames(
							'dpk-panel-value',
							!normalizedValue.length && 'dpk-panel-placeholder'
						)}
					>
						{headerValue}
					</span>
				</div>

			</div>

			<div class={classnames('dpk-calendars', range && 'dpk-calendars-range')}>
				{#each calendarMonths as calendarMonth, monthIndex (calendarMonth.key)}
					<section class="dpk-calendar">
						<div class="dpk-month-row">
							{#if monthIndex === 0}
								<button
									type="button"
									class="dpk-nav"
									aria-label="Previous month"
									onclick={() => {
										visibleMonth = addMonths(visibleMonth, -1);
									}}
								>
									<Icon name="chevron-left" class="" />
								</button>
							{:else}
								<span class="dpk-nav-spacer" aria-hidden="true"></span>
							{/if}

							<h3 class="dpk-month-label">{calendarMonth.label}</h3>

							{#if monthIndex === calendarMonths.length - 1}
								<button
									type="button"
									class="dpk-nav"
									aria-label="Next month"
									onclick={() => {
										visibleMonth = addMonths(visibleMonth, 1);
									}}
								>
									<Icon name="chevron-right" class="" />
								</button>
							{:else}
								<span class="dpk-nav-spacer" aria-hidden="true"></span>
							{/if}
						</div>

						<div class="dpk-weekdays" aria-hidden="true">
							{#each weekdayLabels as label}
								<span class="dpk-weekday">{label}</span>
							{/each}
						</div>

						<div class="dpk-weeks" role="grid" aria-labelledby={dialogId || undefined}>
							{#each calendarMonth.weeks as week, weekIndex}
								<div class="dpk-week" role="row">
									{#each week as day, dayIndex (`${day.key}-${weekIndex}-${dayIndex}`)}
										<div
											class={classnames(
												'dpk-day-cell',
												(day.isInRange || day.isPreviewed) && 'dpk-day-cell-fill',
												(day.isInRange || day.isPreviewed) &&
													(!week[dayIndex - 1] ||
														(!week[dayIndex - 1].isInRange && !week[dayIndex - 1].isPreviewed)) &&
													'dpk-day-cell-fill-start',
												(day.isInRange || day.isPreviewed) &&
													(!week[dayIndex + 1] ||
														(!week[dayIndex + 1].isInRange && !week[dayIndex + 1].isPreviewed)) &&
													'dpk-day-cell-fill-end'
											)}
											role="presentation"
										>
											<button
												type="button"
												class={classnames(
													'dpk-day',
													DDC[size],
													!day.isCurrentMonth && 'dpk-day-outside',
													day.isToday && 'dpk-day-today',
													day.isSingleSelected && 'dpk-day-single',
													day.isRangeStart && 'dpk-day-start',
													day.isRangeEnd && 'dpk-day-end',
													day.disabled && 'dpk-day-disabled'
												)}
												data-day-key={day.key}
												data-day-current-month={day.isCurrentMonth ? 'true' : 'false'}
												tabindex={activeDateKey === day.key ? 0 : -1}
												aria-label={fullDateFormatter.format(parseDateKey(day.key)!)}
												aria-current={day.isToday ? 'date' : undefined}
												aria-pressed={day.isSingleSelected || day.isRangeStart || day.isRangeEnd}
												disabled={day.disabled}
												onmouseenter={() => {
													if (range && normalizedValue.length === 1) {
														hoveredDateKey = day.key;
													}
												}}
												onmouseleave={() => {
													if (range && normalizedValue.length === 1) {
														hoveredDateKey = '';
													}
												}}
												onfocus={() => {
													activeDateKey = day.key;
												}}
												onclick={() => selectDate(day.key)}
												onkeydown={(event) => handleDayKeydown(event, day.key)}
											>
												{day.label}
											</button>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>
	</div>
</div>
