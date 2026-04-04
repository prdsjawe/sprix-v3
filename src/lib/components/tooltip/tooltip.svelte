<script lang="ts">
	import './tooltip.css';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import {
		TOOLTIP_MAX_WIDTH,
		TOOLTIP_TIPPY_DELAY,
		TOOLTIP_TIPPY_OFFSET,
		TOOLTIP_TIPPY_THEME
	} from './tooltip.record';

	let {
		id = '',
		as = 'span',
		class: className = '',
		contentClass = '',
		text = '',
		placement = 'top',
		disabled = false,
		interactive = false,
		delay = TOOLTIP_TIPPY_DELAY,
		offset = TOOLTIP_TIPPY_OFFSET,
		maxWidth = TOOLTIP_MAX_WIDTH,
		children,
		content
	}: Partial<Tooltip.Props> = $props();

	let triggerElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);

	let hasContent = $derived(Boolean(text.trim() || content));
	let tooltipClass = $derived(classnames('ttp', className));
	let tooltipContentClass = $derived(classnames('ttp-content', contentClass));
	let resolvedTrigger = $derived(interactive ? 'mouseenter focus click' : 'mouseenter focus');

	$effect(() => {
		if (!triggerElement || !contentElement || disabled || !hasContent) return;

		const instance = createTippy(triggerElement, contentElement, {
			trigger: resolvedTrigger,
			placement,
			interactive,
			animateFill: false,
			delay,
			offset: [0, offset],
			maxWidth,
			theme: TOOLTIP_TIPPY_THEME,
			hideOnClick: interactive
		});

		return () => {
			instance.destroy();
		};
	});
</script>

<svelte:element this={as} id={id || undefined} bind:this={triggerElement} class={tooltipClass}>
	{@render children?.()}
</svelte:element>

{#if hasContent}
	<div class="ttp-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			class={tooltipContentClass}
			data-interactive={interactive ? 'true' : undefined}
		>
			{#if content}
				{@render content()}
			{:else if text}
				<span>{text}</span>
			{/if}
		</div>
	</div>
{/if}
