import { getContext, setContext } from 'svelte';

const ACCORDION_ROOT_CONTEXT = Symbol('accordion-root-context');
const ACCORDION_ITEM_CONTEXT = Symbol('accordion-item-context');

let accordionItemCount = 0;

export interface AccordionRootContext {
	isItemOpen: (value: string) => boolean;
	toggleItem: (value: string) => void;
	getRootId: () => string;
	getSize: () => Accordion.Size;
	getVariant: () => Accordion.Variant;
}

export interface AccordionItemContext {
	getItemId: () => string;
	getTriggerId: () => string;
	getContentId: () => string;
	isOpen: () => boolean;
	isDisabled: () => boolean;
	toggle: () => void;
	getSize: () => Accordion.Size;
	getVariant: () => Accordion.Variant;
}

export const createAccordionItemId = (rootId = 'accordion') =>
	`${rootId}-item-${++accordionItemCount}`;

export const setAccordionRootContext = (context: AccordionRootContext) =>
	setContext(ACCORDION_ROOT_CONTEXT, context);

export const getAccordionRootContext = () =>
	getContext<AccordionRootContext>(ACCORDION_ROOT_CONTEXT);

export const setAccordionItemContext = (context: AccordionItemContext) =>
	setContext(ACCORDION_ITEM_CONTEXT, context);

export const getAccordionItemContext = () =>
	getContext<AccordionItemContext>(ACCORDION_ITEM_CONTEXT);
