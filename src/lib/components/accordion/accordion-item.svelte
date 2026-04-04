<script lang="ts">
	import './accordion.css';
	import classnames from '$utils/classnames';
	import {
		createAccordionItemId,
		getAccordionRootContext,
		setAccordionItemContext
	} from './accordion.context';

	const accordion = getAccordionRootContext();

	let {
		id = '',
		value = '',
		disabled = false,
		class: className = '',
		children
	}: Partial<AccordionItem.Props> = $props();

	const toSlug = (entry: string) =>
		entry
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

	const fallbackItemId = createAccordionItemId(accordion.getRootId());

	let itemId = $derived(id || (value ? `${accordion.getRootId()}-${toSlug(value)}` : fallbackItemId));
	let itemValue = $derived(value || itemId);
	let open = $derived(accordion.isItemOpen(itemValue));
	let itemClass = $derived.by(() =>
		classnames('acc-item', open && 'acc-open', disabled && 'acc-disabled', className)
	);

	const toggle = () => {
		if (disabled) return;
		accordion.toggleItem(itemValue);
	};

	setAccordionItemContext({
		getItemId: () => itemId,
		getTriggerId: () => `${itemId}-trigger`,
		getContentId: () => `${itemId}-content`,
		isOpen: () => open,
		isDisabled: () => disabled,
		toggle,
		getSize: accordion.getSize,
		getVariant: accordion.getVariant
	});
</script>

<div
	class={itemClass}
	data-size={accordion.getSize()}
	data-state={open ? 'open' : 'closed'}
	data-variant={accordion.getVariant()}
	data-disabled={disabled ? 'true' : undefined}
>
	{@render children?.()}
</div>
