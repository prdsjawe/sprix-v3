import { getContext, setContext } from 'svelte';

const NAV_MENU_ITEM_CONTEXT_KEY = Symbol('nav-menu-item');

export interface NavMenuItemContextValue {
	isOpen: () => boolean;
	hasContent: () => boolean;
	isDisabled: () => boolean;
	getContentId: () => string;
	setTriggerElement: (element: HTMLElement | null) => void;
	setContentElement: (element: HTMLDivElement | null) => void;
	setContentDeclared: (declared: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
}

export const setNavMenuItemContext = (value: NavMenuItemContextValue) => {
	setContext(NAV_MENU_ITEM_CONTEXT_KEY, value);
	return value;
};

export const getNavMenuItemContext = () =>
	getContext<NavMenuItemContextValue>(NAV_MENU_ITEM_CONTEXT_KEY);
