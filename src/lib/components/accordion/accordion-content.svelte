<script lang="ts">
	import './accordion.css';
	import classnames from '$utils/classnames';
	import { getAccordionItemContext } from './accordion.context';

	const item = getAccordionItemContext();

	let { class: className = '', children }: Partial<AccordionContent.Props> = $props();

	let contentClass = $derived(
		classnames('acc-content', item.isOpen() && 'acc-content-open', className)
	);
</script>

<div
	id={item.getContentId()}
	class={contentClass}
	role="region"
	aria-labelledby={item.getTriggerId()}
	aria-hidden={!item.isOpen()}
	inert={!item.isOpen()}
>
	<div class="acc-content-body">
		<div class="acc-content-inner">
			{@render children?.()}
		</div>
	</div>
</div>
