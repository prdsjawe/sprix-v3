<script lang="ts">
	import './combo-box-item.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { CBIC } from './combo-box-item.record';

	let {
		id = '',
		type = 'button',
		value = '',
		label = '',
		description = '',
		size = 'md',
		selected = false,
		active = false,
		disabled = false,
		class: className = '',
		children,
		onclick,
		onfocus,
		onmouseenter
	}: Partial<ComboBoxItem.Props> = $props();

	let itemClass = $derived.by(() =>
		classnames(
			'cbi',
			CBIC[size],
			selected && 'cbi-selected',
			active && 'cbi-active',
			disabled && 'cbi-disabled',
			className
		)
	);
</script>

<button
	{id}
	{type}
	{value}
	class={itemClass}
	role="option"
	aria-selected={selected}
	{disabled}
	{onclick}
	{onfocus}
	{onmouseenter}
>
	<span class="cbi-copy">
		{#if children}
			<span class="cbi-label">
				{@render children()}
			</span>
		{:else if label}
			<span class="cbi-label">{label}</span>
		{/if}

		{#if description}
			<span class="cbi-description">{description}</span>
		{/if}
	</span>

	{#if selected}
		<span class="cbi-check" aria-hidden="true">
			<Icon name="check" class="" />
		</span>
	{/if}
</button>
