<script lang="ts">
	import './combo-box.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import { CBC } from './combo-box.record';

	let {
		id = '',
		name = '',
		label = '',
		size = 'md',
		value = $bindable(''),
		open = $bindable(false),
		placeholder = '',
		autocomplete = 'off',
		inputmode,
		disabled = false,
		required = false,
		readonly = false,
		helper = '',
		error = '',
		class: className = '',
		ariaLabel = '',
		children,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown
	}: Partial<ComboBox.Props> = $props();

	let shellElement = $state<HTMLDivElement | null>(null);
	let inputElement = $state<HTMLInputElement | null>(null);
	let contentElement = $state<HTMLDivElement | null>(null);
	let tippyInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let panelWidth = $state(0);

	let inputId = $derived(
		id ||
			name ||
			label
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
	);
	let helperId = $derived(helper && inputId ? `${inputId}-helper` : '');
	let errorId = $derived(error && inputId ? `${inputId}-error` : '');
	let listboxId = $derived(inputId ? `${inputId}-listbox` : '');
	let listboxControlId = $derived(listboxId || undefined);
	let describedBy = $derived(errorId || helperId || undefined);
	let hasPopup = $derived(Boolean(children));
	let wrapperClass = $derived(classnames('cbx-field', className));
	let comboboxClass = $derived.by(() =>
		classnames(
			'cbx',
			CBC[size],
			open && 'cbx-open',
			disabled && 'cbx-disabled',
			error && 'cbx-error'
		)
	);

	const syncPanelWidth = () => {
		panelWidth = shellElement?.offsetWidth ?? 0;
	};

	const showMenu = () => {
		if (disabled || !hasPopup) return;
		open = true;
	};

	const hideMenu = () => {
		open = false;
	};

	const toggleMenu = () => {
		if (disabled || !hasPopup) return;
		open = !open;

		if (open) {
			inputElement?.focus();
		}
	};

	const handleInput = (event: Utils.DOMEvent<HTMLInputElement>) => {
		showMenu();
		oninput?.(event);
	};

	const handleFocus = (event: Utils.FocusEvent<HTMLInputElement>) => {
		showMenu();
		onfocus?.(event);
	};

	const handleBlur = (event: Utils.FocusEvent<HTMLInputElement>) => {
		onblur?.(event);
	};

	const handleKeydown = (event: Utils.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown' || event.key === 'Enter') {
			showMenu();
		}

		if (event.key === 'Escape') {
			hideMenu();
		}

		onkeydown?.(event);
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
		if (!shellElement || !contentElement || !hasPopup || disabled) return;

		const instance = createTippy(shellElement, contentElement, {
			trigger: 'manual',
			placement: 'bottom-start',
			offset: [0, 8],
			maxWidth: 'none',
			theme: 'sprix-combobox',
			hideOnClick: true,
			onClickOutside: () => {
				hideMenu();
			},
			onHide: () => {
				hideMenu();
			}
		});

		tippyInstance = instance;

		return () => {
			tippyInstance = null;
			instance.destroy();
		};
	});

	$effect(() => {
		if (disabled && open) {
			hideMenu();
		}
	});

	$effect(() => {
		if (!tippyInstance) return;

		if (open && !disabled && hasPopup) {
			syncPanelWidth();
			tippyInstance.show();
			return;
		}

		tippyInstance.hide();
	});
</script>

<div class={wrapperClass}>
	{#if label}
		<label class="cbx-label-row" for={inputId || undefined}>
			<span>{label}</span>
			{#if required}
				<span class="cbx-required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div bind:this={shellElement} class={comboboxClass}>
		<input
			bind:this={inputElement}
			id={inputId || undefined}
			{name}
			bind:value
			type="text"
			class="cbx-control"
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={open}
			aria-controls={hasPopup ? listboxControlId : undefined}
			aria-invalid={Boolean(error)}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{placeholder}
			{autocomplete}
			{inputmode}
			{disabled}
			{required}
			{readonly}
			{onchange}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>

		<button
			type="button"
			class={classnames('cbx-toggle', disabled && 'cbx-toggle-disabled')}
			aria-label={open ? 'Close options' : 'Open options'}
			aria-expanded={open}
			aria-controls={hasPopup ? listboxControlId : undefined}
			{disabled}
			onclick={toggleMenu}
		>
			<Icon name={open ? 'chevron-up' : 'chevron-down'} class="" />
		</button>
	</div>

	{#if error}
		<p id={errorId} class="cbx-message cbx-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="cbx-message">{helper}</p>
	{/if}

	<div class="cbx-panel-host" aria-hidden="true">
		<div
			bind:this={contentElement}
			id={listboxControlId}
			class="cbx-panel"
			role="listbox"
			style:width={panelWidth ? `${panelWidth}px` : undefined}
		>
			{@render children?.()}
		</div>
	</div>
</div>
