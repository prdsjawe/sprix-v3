<script module lang="ts">
	let navMenuItemSequence = 0;
</script>

<script lang="ts">
	import './nav-menu.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import { setNavMenuItemContext } from './nav-menu.context';
	import {
		NAV_MENU_TIPPY_DELAY,
		NAV_MENU_TIPPY_OFFSET,
		NAV_MENU_TIPPY_THEME
	} from './nav-menu.record';

	const fallbackId = `nav-menu-item-${++navMenuItemSequence}`;

	let {
		id = '',
		open = $bindable(false),
		disabled = false,
		placement = 'bottom-start',
		class: className = '',
		children
	}: Partial<NavMenuItem.Props> = $props();

	let triggerElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let contentDeclared = $state(false);

	let resolvedId = $derived(id || fallbackId);
	let itemClass = $derived(classnames('nvm-item', className));

	const show = () => {
		if (disabled || !contentDeclared) return;

		tippyInstance?.show();
	};

	const hide = () => {
		tippyInstance?.hide();
	};

	const toggle = () => {
		if (open) {
			hide();
			return;
		}

		show();
	};

	setNavMenuItemContext({
		isOpen: () => open,
		hasContent: () => contentDeclared,
		isDisabled: () => disabled,
		getContentId: () => `${resolvedId}-content`,
		setTriggerElement: (element) => {
			triggerElement = element;
		},
		setContentElement: (element) => {
			contentElement = element;
		},
		setContentDeclared: (declared) => {
			contentDeclared = declared;
		},
		show,
		hide,
		toggle
	});

	$effect(() => {
		if (disabled && open) {
			open = false;
		}
	});

	$effect(() => {
		if (!contentDeclared && open) {
			open = false;
		}
	});

	$effect(() => {
		const instance = tippyInstance;

		if (!instance) return;

		if (open && !instance.state.isVisible) {
			instance.show();
			return;
		}

		if (!open && instance.state.isVisible) {
			instance.hide();
		}
	});

	$effect(() => {
		const anchorElement = triggerElement;
		const popupElement = contentElement;

		if (!anchorElement || !popupElement || disabled || !contentDeclared) return;

		let cancelled = false;
		let instance: ReturnType<typeof createTippy> | null = null;

		void tick().then(() => {
			if (cancelled) return;

			instance = createTippy(anchorElement, popupElement, {
				trigger: 'mouseenter focusin',
				placement,
				offset: NAV_MENU_TIPPY_OFFSET,
				delay: NAV_MENU_TIPPY_DELAY,
				maxWidth: 'none',
				theme: NAV_MENU_TIPPY_THEME,
				hideOnClick: false,
				interactiveBorder: 16,
				onClickOutside: (currentInstance) => {
					currentInstance.hide();
				},
				onShow: () => {
					open = true;
				},
				onHide: () => {
					open = false;
				}
			});

			tippyInstance = instance;
		});

		return () => {
			cancelled = true;
			tippyInstance = null;
			instance?.destroy();
		};
	});
</script>

<li
	class={itemClass}
	data-state={open ? 'open' : 'closed'}
	data-disabled={disabled ? 'true' : undefined}
>
	{@render children?.()}
</li>
