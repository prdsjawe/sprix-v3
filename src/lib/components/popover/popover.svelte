<script module lang="ts">
	let popoverSequence = 0;
</script>

<script lang="ts">
	import './popover.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import {
		POPOVER_MAX_WIDTH,
		POPOVER_TIPPY_OFFSET,
		POPOVER_TIPPY_THEME
	} from './popover.record';

	const fallbackId = `popover-${++popoverSequence}`;

	let {
		id = '',
		as = 'span',
		class: className = '',
		contentClass = '',
		text = '',
		open = $bindable(false),
		placement = 'bottom',
		disabled = false,
		tabindex,
		ariaLabel = '',
		ariaHaspopup = 'dialog',
		closeOnOutside = true,
		closeOnEscape = true,
		offset = POPOVER_TIPPY_OFFSET,
		maxWidth = POPOVER_MAX_WIDTH,
		children,
		content,
		onclick,
		onkeydown
	}: Partial<Popover.Props> = $props();

	let shellElement = $state<HTMLElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);

	let resolvedId = $derived(id || fallbackId);
	let contentId = $derived(`${resolvedId}-content`);
	let hasContent = $derived(Boolean(text.trim() || content));
	let popoverClass = $derived(classnames('ppv', className));
	let popoverContentClass = $derived(classnames('ppv-content', contentClass));

	const focusFirstControl = async () => {
		await tick();

		contentElement
			?.querySelector<HTMLElement>(
				'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
			?.focus();
	};

	const focusTrigger = () => {
		const focusableTrigger =
			shellElement?.querySelector<HTMLElement>(
				'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
			) ?? shellElement;

		focusableTrigger?.focus();
	};

	const closePopover = (focusTriggerOnClose = false) => {
		open = false;

		if (focusTriggerOnClose) {
			void tick().then(() => {
				focusTrigger();
			});
		}
	};

	const openPopover = async (focusContent = false) => {
		if (disabled || !hasContent) return;

		open = true;

		if (focusContent) {
			await focusFirstControl();
		}
	};

	const togglePopover = async (event: Utils.MouseEvent<HTMLElement>) => {
		onclick?.(event);

		if (event.defaultPrevented || disabled || !hasContent) {
			return;
		}

		if (open) {
			closePopover();
			return;
		}

		await openPopover();
	};

	const handleTriggerKeydown = async (event: Utils.KeyboardEvent<HTMLElement>) => {
		if (event.target !== shellElement) {
			onkeydown?.(event);
			return;
		}

		if (disabled || !hasContent) {
			onkeydown?.(event);
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			if (open) {
				closePopover();
			} else {
				await openPopover(true);
			}
		} else if (event.key === 'Escape' && open && closeOnEscape) {
			event.preventDefault();
			closePopover();
		}

		onkeydown?.(event);
	};

	const handleContentKeydown = (event: Utils.KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== 'Escape' || !closeOnEscape) return;

		event.preventDefault();
		closePopover(true);
	};

	$effect(() => {
		if (!shellElement || !contentElement || disabled || !hasContent) return;

		const instance = createTippy(shellElement, contentElement, {
			trigger: 'manual',
			placement,
			interactive: true,
			animateFill: false,
			offset: [0, offset],
			maxWidth,
			theme: POPOVER_TIPPY_THEME,
			hideOnClick: false,
			arrow: false,
			onClickOutside: () => {
				if (closeOnOutside) {
					closePopover();
				}
			},
			onHide: () => {
				open = false;
			}
		});

		tippyInstance = instance;

		return () => {
			tippyInstance = null;
			instance.destroy();
		};
	});

	$effect(() => {
		if ((disabled || !hasContent) && open) {
			closePopover();
		}
	});

	$effect(() => {
		if (!tippyInstance) return;

		if (open && !disabled && hasContent) {
			tippyInstance.show();
			return;
		}

		tippyInstance.hide();
	});

	$effect(() => {
		if (!open || !closeOnOutside) return;

		const handleDocumentFocus = (event: FocusEvent) => {
			const target = event.target;

			if (!(target instanceof Node)) return;
			if (shellElement?.contains(target) || contentElement?.contains(target)) return;

			closePopover();
		};

		document.addEventListener('focusin', handleDocumentFocus);

		return () => {
			document.removeEventListener('focusin', handleDocumentFocus);
		};
	});
</script>

<svelte:element
	this={as}
	id={id || undefined}
	bind:this={shellElement}
	class={popoverClass}
	{tabindex}
	role={hasContent ? 'button' : undefined}
	aria-label={ariaLabel || undefined}
	aria-haspopup={hasContent ? ariaHaspopup : undefined}
	aria-expanded={hasContent ? open : undefined}
	aria-controls={hasContent ? contentId : undefined}
	onclick={togglePopover}
	onkeydown={handleTriggerKeydown}
>
	{@render children?.()}
</svelte:element>

{#if hasContent}
	<div class="ppv-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			id={contentId}
			class={popoverContentClass}
			role="dialog"
			aria-modal="false"
			tabindex="-1"
			onkeydown={handleContentKeydown}
		>
			{#if content}
				{@render content()}
			{:else if text}
				<span>{text}</span>
			{/if}
		</div>
	</div>
{/if}
