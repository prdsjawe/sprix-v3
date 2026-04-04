<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';
	import { setTableSectionContext } from './table.context';

	let { class: className = '', children }: Partial<THeader.Props> = $props();

	let headerClass = $derived(classnames('tbl-header', className));

	setTableSectionContext('header');
</script>

<thead class={headerClass}>
	{@render children?.()}
</thead>
