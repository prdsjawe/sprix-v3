<script lang="ts">
	import './hover-card.css';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import {
		HOVER_CARD_MAX_WIDTH,
		HOVER_CARD_TIPPY_DELAY,
		HOVER_CARD_TIPPY_OFFSET,
		HOVER_CARD_TIPPY_THEME
	} from './hover-card.record';

	let {
		id = '',
		as = 'span',
		class: className = '',
		contentClass = '',
		text = '',
		placement = 'bottom',
		disabled = false,
		interactive = true,
		delay = HOVER_CARD_TIPPY_DELAY,
		offset = HOVER_CARD_TIPPY_OFFSET,
		maxWidth = HOVER_CARD_MAX_WIDTH,
		children,
		content
	}: Partial<HoverCard.Props> = $props();

	let triggerElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);

	let hasContent = $derived(Boolean(text.trim() || content));
	let hoverCardClass = $derived(classnames('hcd', className));
	let hoverCardContentClass = $derived(classnames('hcd-content', contentClass));

	$effect(() => {
		if (!triggerElement || !contentElement || disabled || !hasContent) return;

		const instance = createTippy(triggerElement, contentElement, {
			trigger: 'mouseenter focus',
			placement,
			interactive,
			animateFill: false,
			delay,
			offset: [0, offset],
			maxWidth,
			theme: HOVER_CARD_TIPPY_THEME,
			hideOnClick: false,
			arrow: false
		});

		return () => {
			instance.destroy();
		};
	});
</script>

<svelte:element this={as} id={id || undefined} bind:this={triggerElement} class={hoverCardClass}>
	{@render children?.()}
</svelte:element>

{#if hasContent}
	<div class="hcd-host" aria-hidden="true">
		<div bind:this={contentElement} class={hoverCardContentClass}>
			{#if content}
				{@render content()}
			{:else if text}
				<span>{text}</span>
			{/if}
		</div>
	</div>
{/if}
