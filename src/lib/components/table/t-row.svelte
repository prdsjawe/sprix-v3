<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';

	let { class: className = '', children }: Partial<TRow.Props> = $props();

	let rowClass = $derived(classnames('tbl-row', className));
</script>

<tr class={rowClass}>
	{@render children?.()}
</tr>
