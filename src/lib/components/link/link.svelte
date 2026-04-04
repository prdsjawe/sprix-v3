<script lang="ts">
	import './link.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';

	let {
		id,
		href,
		target,
		rel = '',
		download,
		hreflang,
		referrerpolicy,
		ping,
		class: className = '',
		ariaLabel,
		ariaCurrent,
		children,
		leftIcon = '',
		rightIcon = '',
		leftSlot,
		rightSlot,
		onclick,
		onfocus,
		onblur,
		onkeydown
	}: Partial<Link.Props> = $props();

	let resolvedRel = $derived.by(() => {
		if (target !== '_blank') return rel || undefined;
		return classnames('noopener', 'noreferrer', rel);
	});
	let linkClass = $derived(classnames('lnk', className));
</script>

<a
	{id}
	{href}
	{target}
	rel={resolvedRel}
	{download}
	{hreflang}
	{referrerpolicy}
	{ping}
	class={linkClass}
	aria-label={ariaLabel}
	aria-current={ariaCurrent}
	{onclick}
	{onfocus}
	{onblur}
	{onkeydown}
>
	{#if leftSlot || leftIcon}
		<span class="left-icon" aria-hidden="true">
			{#if leftSlot}
				{@render leftSlot()}
			{:else if leftIcon}
				<Icon name={leftIcon} class="" />
			{/if}
		</span>
	{/if}

	{#if children}
		<span class="label">
			{@render children()}
		</span>
	{/if}

	{#if rightSlot || rightIcon}
		<span class="right-icon" aria-hidden="true">
			{#if rightSlot}
				{@render rightSlot()}
			{:else if rightIcon}
				<Icon name={rightIcon} class="" />
			{/if}
		</span>
	{/if}
</a>
