<script lang="ts">
	import './accordion.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { getAccordionItemContext } from './accordion.context';

	const item = getAccordionItemContext();

	let {
		class: className = '',
		children,
		onclick,
		onfocus,
		onblur,
		onkeydown
	}: Partial<AccordionTrigger.Props> = $props();

	let triggerClass = $derived(classnames('acc-trigger', className));

	const handleClick = (event: Utils.MouseEvent<HTMLButtonElement>) => {
		item.toggle();
		onclick?.(event);
	};
</script>

<h3 class="acc-heading">
	<button
		id={item.getTriggerId()}
		type="button"
		class={triggerClass}
		aria-controls={item.getContentId()}
		aria-expanded={item.isOpen()}
		disabled={item.isDisabled()}
		onclick={handleClick}
		{onfocus}
		{onblur}
		{onkeydown}
	>
		<span class="acc-label">
			{@render children?.()}
		</span>

		<span class="acc-indicator" aria-hidden="true">
			<Icon name="chevron-down" class="" />
		</span>
	</button>
</h3>
