<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';
	import { getTableSectionContext } from './table.context';

	let {
		id = '',
		as,
		scope,
		colspan,
		rowspan,
		class: className = '',
		children
	}: Partial<TColumn.Props> = $props();

	const section = getTableSectionContext();

	let tagName = $derived.by((): TColumn.As => as || (section === 'header' ? 'th' : 'td'));
	let resolvedScope = $derived.by(() =>
		tagName === 'th' ? scope || (section === 'header' ? 'col' : undefined) : undefined
	);
	let columnClass = $derived(
		classnames('tbl-column', tagName === 'th' && 'tbl-column-head', className)
	);
</script>

<svelte:element
	this={tagName}
	id={id || undefined}
	class={columnClass}
	scope={resolvedScope}
	{colspan}
	{rowspan}
>
	{@render children?.()}
</svelte:element>
