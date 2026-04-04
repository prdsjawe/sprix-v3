<script lang="ts">
	import './nav-menu.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { getNavMenuItemContext } from './nav-menu.context';

	const item = getNavMenuItemContext();

	let {
		id = '',
		href = '',
		target,
		rel = '',
		current = false,
		ariaLabel = '',
		class: className = '',
		children,
		onclick,
		onfocus,
		onblur,
		onkeydown
	}: Partial<NavMenuTrigger.Props> = $props();

	let triggerElement = $state<NavMenuTrigger.Element | null>(null);
	let hasContent = $derived(item.hasContent());
	let renderLink = $derived(Boolean(href) && !hasContent);
	let triggerClass = $derived(
		classnames(
			'nvm-trigger',
			current && 'nvm-trigger-current',
			renderLink && 'nvm-trigger-link',
			className
		)
	);
	let resolvedRel = $derived.by(() => {
		if (!href || target !== '_blank') {
			return rel || undefined;
		}

		const relTokens = new Set(rel.split(/\s+/).filter(Boolean));
		relTokens.add('noopener');
		relTokens.add('noreferrer');
		return Array.from(relTokens).join(' ');
	});

	const supportsHover = () =>
		typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

	const handleClick = (event: Utils.MouseEvent<NavMenuTrigger.Element>) => {
		if (hasContent && !supportsHover()) {
			event.preventDefault();
			item.toggle();
		}

		onclick?.(event);
	};

	const handleKeydown = (event: Utils.KeyboardEvent<NavMenuTrigger.Element>) => {
		if (hasContent) {
			if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				item.show();
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				item.hide();
			}
		}

		onkeydown?.(event);
	};

	$effect(() => {
		item.setTriggerElement(triggerElement);
	});
</script>

{#if renderLink}
	<a
		id={id || undefined}
		bind:this={triggerElement}
		class={triggerClass}
		{href}
		{target}
		rel={resolvedRel}
		aria-label={ariaLabel || undefined}
		aria-current={current ? 'page' : undefined}
		onclick={handleClick}
		{onfocus}
		{onblur}
		onkeydown={handleKeydown}
	>
		<span class="nvm-trigger__label">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button
		id={id || undefined}
		type="button"
		bind:this={triggerElement}
		class={triggerClass}
		data-state={item.isOpen() ? 'open' : 'closed'}
		data-current={current ? 'true' : undefined}
		aria-label={ariaLabel || undefined}
		aria-haspopup={hasContent ? 'true' : undefined}
		aria-expanded={hasContent ? item.isOpen() : undefined}
		aria-controls={hasContent ? item.getContentId() : undefined}
		disabled={item.isDisabled()}
		onclick={handleClick}
		{onfocus}
		{onblur}
		onkeydown={handleKeydown}
	>
		<span class="nvm-trigger__label">
			{@render children?.()}
		</span>

		{#if hasContent}
			<span class="nvm-trigger__caret" aria-hidden="true">
				<Icon name="chevron-down" class="" />
			</span>
		{/if}
	</button>
{/if}
