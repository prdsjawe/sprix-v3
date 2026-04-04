<script lang="ts">
	import './spinner.css';
	import classnames from '$utils/classnames';
	import { SRC, SSC } from './spinner.record';

	let {
		id = '',
		size = 'md',
		role = 'current',
		class: className = '',
		ariaLabel = '',
		children
	}: Partial<Spinner.Props> = $props();

	let hasLabel = $derived(Boolean(children));
	let isDecorative = $derived(!hasLabel && !ariaLabel);
	let spinnerClass = $derived(
		classnames('spinner', SSC[size], SRC[role], hasLabel && 'spinner-with-label', className)
	);
</script>

<span
	id={id || undefined}
	class={spinnerClass}
	role={isDecorative ? undefined : 'status'}
	aria-live={isDecorative ? undefined : 'polite'}
	aria-label={ariaLabel || undefined}
	aria-hidden={isDecorative ? 'true' : undefined}
>
	<svg class="spinner-indicator" viewBox="0 0 24 24" aria-hidden="true">
		<circle class="spinner-track" cx="12" cy="12" r="9"></circle>
		<path class="spinner-head" d="M12 3a9 9 0 0 1 9 9"></path>
	</svg>

	{#if children}
		<span class="label">
			{@render children()}
		</span>
	{/if}
</span>
