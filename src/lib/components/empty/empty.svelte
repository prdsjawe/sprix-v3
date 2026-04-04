<script lang="ts">
	import './empty.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { EAC, ESC, EVC } from './empty.record';

	let {
		id = '',
		size = 'md',
		align = 'left',
		variant = 'panel',
		class: className = '',
		eyebrow = '',
		title = '',
		description = '',
		icon = '',
		media,
		action,
		children
	}: Partial<Empty.Props> = $props();

	let hasVisual = $derived(Boolean(media || icon));
	let hasCopy = $derived(Boolean(eyebrow || title || description));
	let hasBody = $derived(Boolean(children));
	let hasAction = $derived(Boolean(action));
	let emptyClass = $derived(classnames('empty', ESC[size], EAC[align], EVC[variant], className));
</script>

<div id={id || undefined} class={emptyClass}>
	{#if hasVisual}
		<div class="empty-media">
			{#if media}
				{@render media()}
			{:else if icon}
				<div class="empty-icon-shell" aria-hidden="true">
					<Icon name={icon} class="" />
				</div>
			{/if}
		</div>
	{/if}

	{#if hasCopy}
		<div class="empty-copy">
			{#if eyebrow}
				<p class="empty-eyebrow">{eyebrow}</p>
			{/if}

			{#if title}
				<h2 class="empty-title">{title}</h2>
			{/if}

			{#if description}
				<p class="empty-description">{description}</p>
			{/if}
		</div>
	{/if}

	{#if hasBody}
		<div class="empty-body">
			{@render children?.()}
		</div>
	{/if}

	{#if hasAction}
		<div class="empty-actions">
			{@render action?.()}
		</div>
	{/if}
</div>
