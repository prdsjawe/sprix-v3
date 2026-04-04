<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';
	import { setTableSectionContext } from './table.context';

	let { class: className = '', children }: Partial<TBody.Props> = $props();

	let bodyClass = $derived(classnames('tbl-body', className));

	setTableSectionContext('body');
</script>

<tbody class={bodyClass}>
	{@render children?.()}
</tbody>
