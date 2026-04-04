<script lang="ts">
	import './table.css';
	import classnames from '$utils/classnames';
	import { setTableSectionContext } from './table.context';

	let { class: className = '', children }: Partial<TFooter.Props> = $props();

	let footerClass = $derived(classnames('tbl-footer', className));

	setTableSectionContext('footer');
</script>

<tfoot class={footerClass}>
	{@render children?.()}
</tfoot>
