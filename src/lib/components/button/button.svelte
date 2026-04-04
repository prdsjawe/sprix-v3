<script lang="ts">
	import './button.css';
	import Icon from '../icon/icon.svelte';
	import Spinner from '../spinner/spinner.svelte';
	import classnames from '$utils/classnames';
	import { BRC, BSC, BVC } from './button.record';

	let {
		id = '',
		type = 'button',
		size = 'md',
		role = 'primary',
		variant = 'default',
		disabled = false,
		loading = false,
		class: className = '',
		name,
		value,
		ariaLabel,
		ariaCurrent,
		ariaControls,
		ariaExpanded,
		ariaHaspopup,
		children,
		leftIcon = '',
		rightIcon = '',
		leftSlot,
		rightSlot,
		onclick,
		onfocus,
		onblur,
		onkeydown
	}: Partial<Button.Props> = $props();

	let hasLabel = $derived(Boolean(children));
	let hasLeftAdornment = $derived(Boolean(leftSlot || leftIcon));
	let hasRightAdornment = $derived(Boolean(rightSlot || rightIcon));
	let isIconOnly = $derived(!hasLabel && (hasLeftAdornment || hasRightAdornment));
	let isDisabled = $derived(disabled || loading || variant === 'disabled');
	let buttonClass = $derived.by(() =>
		classnames(
			'btn',
			BSC[size],
			BRC[role],
			BVC[variant],
			isIconOnly && 'btn-icon',
			loading && 'btn-loading',
			className
		)
	);
	let contentClass = $derived(classnames(loading && 'btn-content-hidden'));
</script>

<button
	{id}
	{name}
	{value}
	{type}
	class={buttonClass}
	aria-busy={loading}
	aria-label={ariaLabel}
	aria-current={ariaCurrent}
	aria-controls={ariaControls}
	aria-expanded={ariaExpanded}
	aria-haspopup={ariaHaspopup}
	disabled={isDisabled}
	{onclick}
	{onfocus}
	{onblur}
	{onkeydown}
>
	{#if loading}
		<span class="btn-loader" aria-hidden="true">
			<Spinner size={size} class="btn-spinner" />
		</span>
	{/if}

	{#if leftSlot || leftIcon}
		<span class={classnames('left-icon', contentClass)} aria-hidden="true">
			{#if leftSlot}
				{@render leftSlot()}
			{:else if leftIcon}
				<Icon name={leftIcon} class="" />
			{/if}
		</span>
	{/if}

	{#if children}
		<span class={classnames('label', contentClass)}>
			{@render children()}
		</span>
	{/if}

	{#if rightSlot || rightIcon}
		<span class={classnames('right-icon', contentClass)} aria-hidden="true">
			{#if rightSlot}
				{@render rightSlot()}
			{:else if rightIcon}
				<Icon name={rightIcon} class="" />
			{/if}
		</span>
	{/if}
</button>
