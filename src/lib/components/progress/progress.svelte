<script lang="ts">
	import './progress.css';
	import classnames from '$utils/classnames';

	const clamp = (input: number, lower: number, upper: number) =>
		Math.min(Math.max(input, lower), upper);

	let {
		id = '',
		value = 0,
		max = 100,
		class: className = '',
		indicatorClass = '',
		ariaLabel = '',
		ariaLabelledby = '',
		ariaDescribedby = '',
		getValueLabel
	}: Partial<Progress.Props> = $props();

	let resolvedMax = $derived(max > 0 ? max : 100);
	let resolvedValue = $derived(clamp(value, 0, resolvedMax));
	let percent = $derived((resolvedValue / resolvedMax) * 100);
	let progressClass = $derived(classnames('prg', className));
	let indicatorClassName = $derived(classnames('prg-indicator', indicatorClass));
	let valueLabel = $derived(
		getValueLabel?.(resolvedValue, resolvedMax, percent) ?? `${Math.round(percent)}%`
	);
</script>

<div
	id={id || undefined}
	class={progressClass}
	role="progressbar"
	aria-label={ariaLabel || undefined}
	aria-labelledby={ariaLabelledby || undefined}
	aria-describedby={ariaDescribedby || undefined}
	aria-valuemin={0}
	aria-valuemax={resolvedMax}
	aria-valuenow={resolvedValue}
	aria-valuetext={valueLabel}
>
	<div class={indicatorClassName} style={`width: ${percent}%`}></div>
</div>
