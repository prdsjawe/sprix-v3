<script lang="ts">
	import './slider.css';
	import classnames from '$utils/classnames';

	const clamp = (input: number, lower: number, upper: number) =>
		Math.min(Math.max(input, lower), upper);
	const arraysEqual = (first: number[], second: number[]) =>
		first.length === second.length && first.every((value, index) => value === second[index]);
	const getPrecision = (input: number) => {
		const serialized = String(input);

		if (serialized.includes('e-')) {
			return Number(serialized.split('e-')[1] || 0);
		}

		return serialized.split('.')[1]?.length ?? 0;
	};
	const toPrecision = (input: number, precision: number) => Number(input.toFixed(precision));
	const snapValue = (
		input: number,
		lower: number,
		upper: number,
		step: number,
		precision: number
	) => {
		const snapped = Math.round((input - lower) / step) * step + lower;
		return toPrecision(clamp(snapped, lower, upper), precision);
	};
	const createFallbackValues = (
		count: number,
		lower: number,
		upper: number,
		step: number,
		precision: number
	) =>
		Array.from({ length: count }, (_, index) => {
			if (count === 1) {
				return snapValue(lower, lower, upper, step, precision);
			}

			const value = lower + ((upper - lower) / (count - 1)) * index;
			return snapValue(value, lower, upper, step, precision);
		});
	const normalizeValues = (
		source: number[],
		count: number,
		lower: number,
		upper: number,
		step: number,
		precision: number,
		minimumGap: number
	) => {
		const fallback = createFallbackValues(count, lower, upper, step, precision);
		const filled = Array.from(
			{ length: count },
			(_, index) => source[index] ?? fallback[index] ?? lower
		)
			.map((item) => snapValue(item, lower, upper, step, precision))
			.sort((first, second) => first - second);
		const resolved: number[] = [];

		for (let index = 0; index < count; index += 1) {
			const lowerBound = lower + minimumGap * index;
			const upperBound = upper - minimumGap * (count - index - 1);
			const nextValue = clamp(filled[index] ?? lowerBound, lowerBound, upperBound);

			resolved.push(toPrecision(nextValue, precision));
		}

		return resolved;
	};

	let {
		id = '',
		name = '',
		value = $bindable<number[]>([]),
		defaultValue = [0],
		min = 0,
		max = 100,
		step = 1,
		minStepsBetweenThumbs = 0,
		disabled = false,
		class: className = '',
		ariaLabel = '',
		ariaLabelledby = '',
		ariaDescribedby = '',
		onvaluechange,
		onvaluecommit,
		onfocus,
		onblur
	}: Partial<Slider.Props> = $props();

	let trackElement = $state<HTMLSpanElement | null>(null);
	let thumbElements = $state<(HTMLButtonElement | null)[]>([]);
	let activeThumbIndex = $state<number | null>(null);
	let activePointerId = $state<number | null>(null);
	let didDragChange = $state(false);

	let resolvedMin = $derived(Math.min(min, max));
	let resolvedMax = $derived(Math.max(min, max));
	let resolvedStep = $derived(step > 0 ? step : 1);
	let thumbCount = $derived(Math.max(value.length, defaultValue.length, 1));
	let precision = $derived(
		Math.max(getPrecision(resolvedMin), getPrecision(resolvedMax), getPrecision(resolvedStep))
	);
	let minimumGap = $derived.by(() => {
		if (thumbCount < 2) return 0;

		const requestedGap = Math.max(0, minStepsBetweenThumbs) * resolvedStep;
		const availableGap = (resolvedMax - resolvedMin) / (thumbCount - 1);

		return Math.min(requestedGap, availableGap);
	});
	let normalizedValue = $derived.by(() =>
		normalizeValues(
			value.length ? value : defaultValue,
			thumbCount,
			resolvedMin,
			resolvedMax,
			resolvedStep,
			precision,
			minimumGap
		)
	);
	let sliderClass = $derived(classnames('sld', disabled && 'sld-disabled', className));
	let thumbPercents = $derived.by(() => {
		const span = resolvedMax - resolvedMin;

		if (!span) {
			return normalizedValue.map(() => 0);
		}

		return normalizedValue.map((item) => ((item - resolvedMin) / span) * 100);
	});
	let rangeStart = $derived(thumbCount > 1 ? thumbPercents[0] || 0 : 0);
	let rangeEnd = $derived(thumbPercents[thumbPercents.length - 1] || 0);

	const getThumbLabel = (index: number) => {
		if (ariaLabel) {
			return thumbCount === 1 ? ariaLabel : `${ariaLabel} ${index + 1}`;
		}

		return thumbCount === 1 ? 'Slider' : `Slider ${index + 1}`;
	};
	const getValueFromClientX = (clientX: number) => {
		if (!trackElement) {
			return normalizedValue[activeThumbIndex ?? 0] ?? resolvedMin;
		}

		const bounds = trackElement.getBoundingClientRect();
		const percent = clamp((clientX - bounds.left) / bounds.width, 0, 1);

		return resolvedMin + percent * (resolvedMax - resolvedMin);
	};
	const getClosestThumbIndex = (nextValue: number) => {
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		normalizedValue.forEach((entry, index) => {
			const distance = Math.abs(entry - nextValue);

			if (distance < closestDistance || (distance === closestDistance && nextValue > entry)) {
				closestIndex = index;
				closestDistance = distance;
			}
		});

		return closestIndex;
	};
	const getNextValues = (source: number[], index: number, nextValue: number) => {
		const lowerBound = index === 0 ? resolvedMin : source[index - 1] + minimumGap;
		const upperBound = index === source.length - 1 ? resolvedMax : source[index + 1] - minimumGap;
		const snapped = snapValue(nextValue, resolvedMin, resolvedMax, resolvedStep, precision);
		const resolvedValue = toPrecision(clamp(snapped, lowerBound, upperBound), precision);
		const nextValues = [...source];

		nextValues[index] = resolvedValue;

		return nextValues;
	};
	const commitValues = (nextValues: number[], commit = false) => {
		const resolvedNext = normalizeValues(
			nextValues,
			thumbCount,
			resolvedMin,
			resolvedMax,
			resolvedStep,
			precision,
			minimumGap
		);

		if (arraysEqual(normalizedValue, resolvedNext)) {
			if (commit && didDragChange) {
				onvaluecommit?.([...resolvedNext]);
			}

			if (commit) {
				didDragChange = false;
			}

			return;
		}

		value = [...resolvedNext];
		didDragChange = true;
		onvaluechange?.([...resolvedNext]);

		if (commit) {
			onvaluecommit?.([...resolvedNext]);
			didDragChange = false;
		}
	};
	const focusThumb = (index: number) => {
		thumbElements[index]?.focus();
	};
	const startDragging = (pointerId: number, index: number) => {
		activePointerId = pointerId;
		activeThumbIndex = index;
		didDragChange = false;
	};
	const stopDragging = () => {
		activePointerId = null;
		activeThumbIndex = null;
		didDragChange = false;
	};
	const handleTrackPointerdown = (event: Utils.PointerEvent<HTMLDivElement>) => {
		if (disabled || event.button !== 0) return;
		if (event.target instanceof HTMLElement && event.target.closest('.sld-thumb')) return;

		event.preventDefault();

		const nextValue = getValueFromClientX(event.clientX);
		const closestIndex = getClosestThumbIndex(nextValue);

		startDragging(event.pointerId, closestIndex);
		commitValues(getNextValues(normalizedValue, closestIndex, nextValue));
		focusThumb(closestIndex);
	};
	const handleThumbPointerdown = (event: Utils.PointerEvent<HTMLButtonElement>, index: number) => {
		if (disabled || event.button !== 0) return;

		event.preventDefault();
		startDragging(event.pointerId, index);
		focusThumb(index);
	};
	const handlePointermove = (event: Utils.PointerEvent<Window>) => {
		if (disabled || activeThumbIndex === null || activePointerId !== event.pointerId) return;

		event.preventDefault();
		commitValues(
			getNextValues(normalizedValue, activeThumbIndex, getValueFromClientX(event.clientX))
		);
	};
	const handlePointerup = (event: Utils.PointerEvent<Window>) => {
		if (activeThumbIndex === null || activePointerId !== event.pointerId) return;

		event.preventDefault();
		commitValues(normalizedValue, true);
		stopDragging();
	};
	const handleThumbKeydown = (event: Utils.KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (disabled) return;

		const fineStep = resolvedStep;
		const pageStep = resolvedStep * 10;
		const currentValue = normalizedValue[index] ?? resolvedMin;
		let nextValue = currentValue;

		if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
			nextValue = currentValue - fineStep;
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
			nextValue = currentValue + fineStep;
		} else if (event.key === 'PageDown') {
			nextValue = currentValue - pageStep;
		} else if (event.key === 'PageUp') {
			nextValue = currentValue + pageStep;
		} else if (event.key === 'Home') {
			nextValue = resolvedMin;
		} else if (event.key === 'End') {
			nextValue = resolvedMax;
		} else {
			return;
		}

		event.preventDefault();
		commitValues(getNextValues(normalizedValue, index, nextValue), true);
	};
	const handleFocus = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		onfocus?.(event);
	};
	const handleBlur = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		onblur?.(event);
	};

	$effect(() => {
		if (!value.length) return;
		if (arraysEqual(value, normalizedValue)) return;

		value = [...normalizedValue];
	});

	$effect(() => {
		if (thumbElements.length <= thumbCount) return;

		thumbElements.length = thumbCount;
	});
</script>

<svelte:window
	onpointermove={handlePointermove}
	onpointerup={handlePointerup}
	onpointercancel={handlePointerup}
/>

<div
	id={id || undefined}
	class={sliderClass}
	role="group"
	aria-label={ariaLabelledby ? undefined : ariaLabel || undefined}
	aria-labelledby={ariaLabelledby || undefined}
	aria-describedby={ariaDescribedby || undefined}
	aria-disabled={disabled}
	onpointerdown={handleTrackPointerdown}
>
	<span class="sld-track" bind:this={trackElement} aria-hidden="true">
		<span
			class="sld-range"
			style={`left: ${rangeStart}%; width: ${Math.max(rangeEnd - rangeStart, 0)}%;`}
		></span>
	</span>

	{#each normalizedValue as entry, index (`thumb-${index}`)}
		<button
			bind:this={thumbElements[index]}
			type="button"
			class={classnames('sld-thumb', activeThumbIndex === index && 'sld-thumb-active')}
			style={`left: calc(${thumbPercents[index] || 0}% - 0.5rem);`}
			role="slider"
			aria-label={getThumbLabel(index)}
			aria-labelledby={ariaLabelledby || undefined}
			aria-valuemin={resolvedMin}
			aria-valuemax={resolvedMax}
			aria-valuenow={entry}
			aria-orientation="horizontal"
			{disabled}
			tabindex={disabled ? -1 : 0}
			onpointerdown={(event) => handleThumbPointerdown(event, index)}
			onkeydown={(event) => handleThumbKeydown(event, index)}
			onfocus={handleFocus}
			onblur={handleBlur}
		></button>
	{/each}

	{#if name}
		{#each normalizedValue as entry, index (`hidden-${index}`)}
			<input type="hidden" {name} value={String(entry)} {disabled} />
		{/each}
	{/if}
</div>
