<script module lang="ts">
	let dropdownMenuSequence = 0;
</script>

<script lang="ts">
	import './dropdown-menu.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import Button from '../button/button.svelte';
	import {
		DROPDOWN_MENU_TIPPY_OFFSET,
		DROPDOWN_MENU_TIPPY_THEME
	} from './dropdown-menu.record';

	const fallbackId = `dropdown-menu-${++dropdownMenuSequence}`;

	let {
		id = '',
		type = 'button',
		size = 'md',
		role = 'secondary',
		variant = 'default',
		disabled = false,
		loading = false,
		class: className = '',
		name,
		value,
		ariaLabel,
		ariaHaspopup = 'menu',
		leftIcon = '',
		rightIcon = '',
		leftSlot,
		rightSlot,
		open = $bindable(false),
		placement = 'bottom-start',
		contentClass = '',
		trigger,
		children,
		onclick,
		onfocus,
		onblur,
		onkeydown
	}: Partial<DropdownMenu.Props> = $props();

	let shellElement = $state<HTMLDivElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let panelWidth = $state(0);

	let resolvedId = $derived(id || fallbackId);
	let contentId = $derived(`${resolvedId}-content`);
	let dropdownMenuClass = $derived(classnames('ddm', className));
	let contentSurfaceClass = $derived(classnames('ddm-content', contentClass));
	let resolvedRightIcon = $derived(rightSlot || rightIcon ? rightIcon : 'chevron-down');

	const syncPanelWidth = () => {
		panelWidth = shellElement?.offsetWidth ?? 0;
	};

	const focusFirstItem = async () => {
		await tick();

		contentElement
			?.querySelector<HTMLElement>(
				'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
			)
			?.focus();
	};

	const openMenu = async (focusContent = false) => {
		if (disabled || loading || !children) return;

		open = true;
		syncPanelWidth();

		if (focusContent) {
			await focusFirstItem();
		}
	};

	const closeMenu = (focusTrigger = false) => {
		open = false;

		if (focusTrigger) {
			void tick().then(() => {
				shellElement?.querySelector<HTMLButtonElement>('button')?.focus();
			});
		}
	};

	const toggleMenu = async (event: Utils.MouseEvent<HTMLButtonElement>) => {
		onclick?.(event);

		if (event.defaultPrevented || disabled || loading || !children) {
			return;
		}

		if (open) {
			closeMenu();
			return;
		}

		await openMenu();
	};

	const handleFocus = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		onfocus?.(event);
	};

	const handleBlur = (event: Utils.FocusEvent<HTMLButtonElement>) => {
		const nextTarget = event.relatedTarget;

		if (
			nextTarget instanceof Node &&
			(shellElement?.contains(nextTarget) || contentElement?.contains(nextTarget))
		) {
			return;
		}

		onblur?.(event);
	};

	const handleTriggerKeydown = async (event: Utils.KeyboardEvent<HTMLButtonElement>) => {
		if (disabled || loading) {
			onkeydown?.(event);
			return;
		}

		if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			if (open) {
				closeMenu();
			} else {
				await openMenu(true);
			}
		} else if (event.key === 'Escape' && open) {
			event.preventDefault();
			closeMenu();
		}

		onkeydown?.(event);
	};

	const handleContentKeydown = (event: Utils.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu(true);
			return;
		}

		if (event.key === 'Tab') {
			closeMenu();
		}
	};

	$effect(() => {
		if (!shellElement) return;

		syncPanelWidth();

		const resizeObserver = new ResizeObserver(() => {
			syncPanelWidth();
			tippyInstance?.popperInstance?.update();
		});

		resizeObserver.observe(shellElement);

		return () => {
			resizeObserver.disconnect();
		};
	});

	$effect(() => {
		if (!shellElement || !contentElement || disabled || !children) return;

		const instance = createTippy(shellElement, contentElement, {
			trigger: 'manual',
			placement,
			offset: [0, DROPDOWN_MENU_TIPPY_OFFSET],
			maxWidth: 'none',
			theme: DROPDOWN_MENU_TIPPY_THEME,
			hideOnClick: true,
			onClickOutside: () => {
				closeMenu();
			},
			onHide: () => {
				closeMenu();
			}
		});

		tippyInstance = instance;

		return () => {
			tippyInstance = null;
			instance.destroy();
		};
	});

	$effect(() => {
		if ((disabled || loading || !children) && open) {
			closeMenu();
		}
	});

	$effect(() => {
		if (!tippyInstance) return;

		if (open && !disabled && !loading && children) {
			syncPanelWidth();
			tippyInstance.show();
			return;
		}

		tippyInstance.hide();
	});
</script>

<div bind:this={shellElement} class={dropdownMenuClass}>
	<Button
		{id}
		{name}
		{value}
		{type}
		{size}
		{role}
		{variant}
		{disabled}
		{loading}
		ariaLabel={ariaLabel}
		ariaControls={children ? contentId : undefined}
		ariaExpanded={children ? open : undefined}
		ariaHaspopup={children ? ariaHaspopup : undefined}
		{leftIcon}
		rightIcon={resolvedRightIcon}
		{leftSlot}
		{rightSlot}
		onclick={toggleMenu}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleTriggerKeydown}
	>
		{@render trigger?.()}
	</Button>

	<div class="ddm-panel-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			id={contentId}
			class={contentSurfaceClass}
			role="menu"
			tabindex="-1"
			style:min-width={panelWidth ? `${panelWidth}px` : undefined}
			onkeydown={handleContentKeydown}
		>
			{@render children?.()}
		</div>
	</div>
</div>
