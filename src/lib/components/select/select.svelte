<script lang="ts">
	import './select.css';
	import { getContext, tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import Icon from '../icon/icon.svelte';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { SOC, SSC } from './select.record';

	let {
		id = '',
		name = '',
		size = 'md',
		value = $bindable(''),
		open = $bindable(false),
		placeholder = '',
		options = [],
		disabled = false,
		required = false,
		helper = '',
		error = '',
		class: className = '',
		ariaLabel = '',
		onfocus,
		onblur,
		onkeydown
	}: Partial<Select.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let shellElement = $state<HTMLDivElement | null>(null);
	let triggerElement = $state<HTMLButtonElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let panelWidth = $state(0);
	let activeIndex = $state(-1);

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let controlId = $derived(id || fieldContext?.getControlId() || resolvedName);
	let helperId = $derived(helper && controlId ? `${controlId}-helper` : '');
	let errorId = $derived(error && controlId ? `${controlId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let listboxId = $derived(controlId ? `${controlId}-listbox` : '');
	let wrapperClass = $derived(classnames('slt-field', className));
	let selectClass = $derived.by(() =>
		classnames(
			'slt',
			SSC[size],
			open && 'slt-open',
			disabled && 'slt-disabled',
			invalid && 'slt-error'
		)
	);
	let optionClass = $derived(classnames('slt-option', SOC[size]));
	let optionGroups = $derived.by(() => {
		let nextIndex = 0;

		return options.reduce((groups: Select.RenderGroup[], option) => {
			const label = option.group?.trim() || '';
			const nextOption: Select.RenderOption = {
				...option,
				group: label || undefined,
				index: nextIndex
			};

			nextIndex += 1;

			const previousGroup = groups.at(-1);

			if (previousGroup?.label === label) {
				previousGroup.options.push(nextOption);
				return groups;
			}

			groups.push({
				label,
				options: [nextOption]
			});

			return groups;
		}, []);
	});
	let flatOptions = $derived.by(() => optionGroups.flatMap((group) => group.options));
	let hasOptions = $derived(flatOptions.length > 0);
	let selectedOption = $derived(flatOptions.find((option) => option.value === value));
	let triggerLabel = $derived(selectedOption?.label || placeholder || 'Select an option');

	const syncPanelWidth = () => {
		panelWidth = shellElement?.offsetWidth ?? 0;
	};

	const getFirstEnabledIndex = () => flatOptions.findIndex((option) => !option.disabled);

	const getLastEnabledIndex = () => {
		for (let index = flatOptions.length - 1; index >= 0; index -= 1) {
			if (!flatOptions[index].disabled) {
				return index;
			}
		}

		return -1;
	};

	const getNextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
		if (!flatOptions.length) return -1;

		let index = startIndex;

		for (let step = 0; step < flatOptions.length; step += 1) {
			index = (index + direction + flatOptions.length) % flatOptions.length;

			if (!flatOptions[index].disabled) {
				return index;
			}
		}

		return -1;
	};

	const getInitialActiveIndex = (direction: 1 | -1 = 1) => {
		const selectedIndex = flatOptions.findIndex(
			(option) => option.value === value && !option.disabled
		);

		if (selectedIndex >= 0) {
			return selectedIndex;
		}

		return direction === 1 ? getFirstEnabledIndex() : getLastEnabledIndex();
	};

	const focusOption = async (index: number) => {
		activeIndex = index;

		if (index < 0) return;

		await tick();
		contentElement?.querySelector<HTMLButtonElement>(`[data-option-index="${index}"]`)?.focus();
	};

	const openMenu = async (direction: 1 | -1 = 1) => {
		if (disabled || !hasOptions) return;

		open = true;
		syncPanelWidth();
		await focusOption(getInitialActiveIndex(direction));
	};

	const closeMenu = (focusTrigger = false) => {
		open = false;
		activeIndex = -1;

		if (focusTrigger) {
			void tick().then(() => {
				triggerElement?.focus();
			});
		}
	};

	const toggleMenu = async () => {
		if (open) {
			closeMenu();
			return;
		}

		await openMenu();
	};

	const selectOption = (option: Select.RenderOption) => {
		if (option.disabled) return;

		value = option.value;
		closeMenu(true);
	};

	const handleFocus = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		onfocus?.(event);
	};

	const handleBlur = (event: Utils.FocusEvent<HTMLButtonElement>) => {
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

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			await openMenu(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			await openMenu(-1);
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			if (open) {
				closeMenu();
			} else {
				await openMenu();
			}
		} else if (event.key === 'Escape' && open) {
			event.preventDefault();
			closeMenu();
		}

		onkeydown?.(event);
	};

	const handleOptionKeydown = async (
		event: Utils.KeyboardEvent<HTMLButtonElement>,
		option: Select.RenderOption
	) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			await focusOption(getNextEnabledIndex(option.index, 1));
			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			await focusOption(getNextEnabledIndex(option.index, -1));
			return;
		}

		if (event.key === 'Home') {
			event.preventDefault();
			await focusOption(getFirstEnabledIndex());
			return;
		}

		if (event.key === 'End') {
			event.preventDefault();
			await focusOption(getLastEnabledIndex());
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectOption(option);
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu(true);
			return;
		}

		if (event.key === 'Tab') {
			closeMenu();
		}
	};

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
			theme: 'sprix-select',
			hideOnClick: true,
			onClickOutside: () => {
				closeMenu();
			},
			onHide: () => {
				closeMenu();
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
			closeMenu();
		}
	});

	$effect(() => {
		if (!tippyInstance) return;

		if (open && !disabled && hasOptions) {
			syncPanelWidth();
			tippyInstance.show();
			return;
		}

		tippyInstance.hide();
	});
</script>

<div class={wrapperClass}>
	<div bind:this={shellElement} class={selectClass}>
		<button
			bind:this={triggerElement}
			id={controlId || undefined}
			type="button"
			class="slt-trigger"
			role="combobox"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-controls={hasOptions ? listboxId || undefined : undefined}
			aria-invalid={invalid}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{disabled}
			onclick={toggleMenu}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleTriggerKeydown}
		>
			<span class={classnames('slt-value', !selectedOption && 'slt-placeholder')}
				>{triggerLabel}</span
			>
			<span class="slt-icon" aria-hidden="true">
				<Icon name={open ? 'chevron-up' : 'chevron-down'} class="" />
			</span>
		</button>

		{#if resolvedName}
			<input type="hidden" name={resolvedName} {value} />
		{/if}
	</div>

	{#if error}
		<p id={errorId} class="slt-message slt-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="slt-message">{helper}</p>
	{/if}

	<div class="slt-panel-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			id={listboxId || undefined}
			class="slt-panel"
			role="listbox"
			style:width={panelWidth ? `${panelWidth}px` : undefined}
		>
			{#each optionGroups as group, groupIndex (`${group.label}-${groupIndex}`)}
				<div class="slt-group">
					{#if group.label}
						<p class="slt-group-label">{group.label}</p>
					{/if}

					<div class="slt-options">
						{#each group.options as option (option.value)}
							<button
								type="button"
								class={classnames(
									optionClass,
									activeIndex === option.index && 'slt-option-active',
									selectedOption?.value === option.value && 'slt-option-selected',
									option.disabled && 'slt-option-disabled'
								)}
								role="option"
								aria-selected={selectedOption?.value === option.value}
								data-option-index={option.index}
								disabled={option.disabled}
								onclick={() => selectOption(option)}
								onkeydown={(event) => handleOptionKeydown(event, option)}
							>
								<span class="slt-option-copy">
									<span class="slt-option-label">{option.label}</span>
									{#if option.description}
										<span class="slt-option-description">{option.description}</span>
									{/if}
								</span>

								{#if selectedOption?.value === option.value}
									<span class="slt-check" aria-hidden="true">
										<Icon name="check" class="" />
									</span>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
