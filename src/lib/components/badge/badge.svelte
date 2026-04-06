<script lang="ts">
	import './badge.css';
	import Icon from '../icon/icon.svelte';
	import Spinner from '../spinner/spinner.svelte';
	import classnames from '$utils/classnames';
	import { BRC, BSC, BVC } from './badge.record';

	let {
		id = '',
		size = 'sm',
		role = 'primary',
		variant = 'badge',
		loading = false,
		class: className = '',
		link = '',
		target,
		rel = '',
		ariaLabel = '',
		leftIcon = '',
		rightIcon = '',
		children
	}: Partial<Badge.Props> = $props();

	let isLink = $derived(Boolean(link));
	let isModern = $derived(variant === 'modern');
	let showModernDot = $derived(isModern && !leftIcon && !loading);
	let resolvedRel = $derived.by(() => {
		if (target !== '_blank') return rel || undefined;
		return classnames('noopener', 'noreferrer', rel);
	});
	let badgeClass = $derived(
		classnames('badge', BSC[size], BRC[role], BVC[variant], isLink && 'badge-link', className)
	);
</script>

{#snippet content()}
	{#if loading}
		<span class={classnames('left-icon', isModern && 'badge-accent')} aria-hidden="true">
			<Spinner {size} />
		</span>
	{:else if leftIcon}
		<span class={classnames('left-icon', isModern && 'badge-accent')} aria-hidden="true">
			<Icon name={leftIcon} class="" />
		</span>
	{/if}

	{#if showModernDot}
		<span class="dot" aria-hidden="true"></span>
	{/if}

	{#if children}
		<span class="label">
			{@render children()}
		</span>
	{/if}

	{#if rightIcon}
		<span class={classnames('right-icon', isModern && 'badge-accent')} aria-hidden="true">
			<Icon name={rightIcon} class="" />
		</span>
	{/if}
{/snippet}

{#if isLink}
	<a
		{id}
		href={link}
		class={badgeClass}
		{target}
		rel={resolvedRel}
		aria-busy={loading || undefined}
		aria-label={ariaLabel || undefined}
	>
		{@render content()}
	</a>
{:else}
	<span
		id={id || undefined}
		class={badgeClass}
		aria-busy={loading || undefined}
		aria-label={ariaLabel || undefined}
	>
		{@render content()}
	</span>
{/if}
