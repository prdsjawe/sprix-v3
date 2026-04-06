<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';

	let { id = '', class: className = '', ariaLabel = '', children }: Partial<Table.Props> = $props();

	let tableClass = $derived(classnames('tbl', className));
</script>

<table id={id || undefined} class={tableClass} aria-label={ariaLabel || undefined}>
	{@render children?.()}
</table>
