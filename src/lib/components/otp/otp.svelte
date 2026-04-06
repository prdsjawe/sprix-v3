<script lang="ts">
	import './otp.css';
	import { getContext, tick } from 'svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';

	let {
		id = '',
		name = '',
		value = $bindable(''),
		length = 6,
		placeholder = '',
		autocomplete = 'one-time-code',
		inputmode = 'numeric',
		disabled = false,
		readonly = false,
		required = false,
		invalid = false,
		class: className = '',
		ariaLabel = 'One-time code',
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown,
		onpaste
	}: Partial<Otp.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let rootElement = $state<HTMLDivElement | null>(null);

	let resolvedLength = $derived.by(() => {
		const nextLength = Number.isFinite(length) ? Math.floor(length) : 6;
		return Math.max(1, nextLength || 6);
	});
	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let controlId = $derived(id || fieldContext?.getControlId() || resolvedName);
	let describedBy = $derived(fieldContext?.getDescribedBy());
	let isInvalid = $derived(Boolean(invalid || fieldContext?.getInvalid()));
	let isRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let normalizedValue = $derived.by(() =>
		String(value ?? '')
			.replace(/\s+/g, '')
			.slice(0, resolvedLength)
	);
	let cellValues = $derived.by(() =>
		Array.from({ length: resolvedLength }, (_, index) => normalizedValue[index] ?? '')
	);
	let wrapperClass = $derived(classnames('otp-field', className));
	let otpClass = $derived(
		classnames(
			'otp',
			isInvalid && 'otp-invalid',
			disabled && 'otp-disabled',
			readonly && 'otp-readonly'
		)
	);

	$effect(() => {
		if ((value ?? '') !== normalizedValue) {
			value = normalizedValue;
		}
	});

	const getCell = (index: number) =>
		rootElement?.querySelector<HTMLInputElement>(`input[data-otp-index="${index}"]`) ?? null;

	const focusCell = async (index: number, select = true) => {
		const nextIndex = Math.min(Math.max(index, 0), resolvedLength - 1);
		await tick();
		const cell = getCell(nextIndex);
		cell?.focus();
		if (select) {
			cell?.select();
		}
	};

	const sanitizeChars = (nextValue: string) =>
		nextValue.replace(/\s+/g, '').slice(0, resolvedLength).split('');

	const overwriteValue = (startIndex: number, nextValue: string) => {
		const chars = sanitizeChars(nextValue).slice(0, resolvedLength - startIndex);

		if (!chars.length) {
			return startIndex;
		}

		const current = normalizedValue.split('');
		const insertIndex = Math.min(startIndex, current.length);

		for (let offset = 0; offset < chars.length; offset += 1) {
			current[insertIndex + offset] = chars[offset];
		}

		value = current.join('').slice(0, resolvedLength);
		return Math.min(insertIndex + chars.length - 1, resolvedLength - 1);
	};

	const removeValueAt = (index: number) => {
		const current = normalizedValue.split('');

		if (index < 0 || index >= current.length) {
			return;
		}

		current.splice(index, 1);
		value = current.join('');
	};

	const handleInput = async (index: number, event: Utils.DOMEvent<HTMLInputElement>) => {
		oninput?.(event as Utils.InputEvent<HTMLInputElement>);

		if (disabled || readonly) {
			return;
		}

		const nextIndex = overwriteValue(index, event.currentTarget.value);
		await focusCell(
			nextIndex < resolvedLength - 1 ? nextIndex + 1 : nextIndex,
			nextIndex < resolvedLength - 1
		);
	};

	const handleFocus = async (index: number, event: Utils.FocusEvent<HTMLInputElement>) => {
		onfocus?.(event);

		if (disabled || readonly) {
			return;
		}

		const firstEmptyIndex = Math.min(normalizedValue.length, resolvedLength - 1);

		if (index > normalizedValue.length && normalizedValue.length < resolvedLength) {
			await focusCell(firstEmptyIndex);
			return;
		}

		event.currentTarget.select();
	};

	const handleKeydown = async (index: number, event: Utils.KeyboardEvent<HTMLInputElement>) => {
		onkeydown?.(event);

		if (event.defaultPrevented || disabled || readonly) {
			return;
		}

		switch (event.key) {
			case 'Backspace': {
				event.preventDefault();

				if (!normalizedValue.length) {
					return;
				}

				if (index >= normalizedValue.length) {
					removeValueAt(normalizedValue.length - 1);
					await focusCell(normalizedValue.length - 1);
					return;
				}

				removeValueAt(index);
				await focusCell(Math.max(index - 1, 0));
				return;
			}

			case 'Delete': {
				if (index >= normalizedValue.length) {
					return;
				}

				event.preventDefault();
				removeValueAt(index);
				await focusCell(Math.min(index, resolvedLength - 1));
				return;
			}

			case 'ArrowLeft': {
				event.preventDefault();
				await focusCell(index - 1);
				return;
			}

			case 'ArrowRight': {
				event.preventDefault();
				await focusCell(index + 1);
				return;
			}

			case 'Home': {
				event.preventDefault();
				await focusCell(0);
				return;
			}

			case 'End': {
				event.preventDefault();
				await focusCell(Math.max(normalizedValue.length - 1, 0));
				return;
			}
		}
	};

	const handlePaste = async (index: number, event: Utils.ClipboardEvent<HTMLInputElement>) => {
		onpaste?.(event);

		if (event.defaultPrevented || disabled || readonly) {
			return;
		}

		const pastedValue = event.clipboardData?.getData('text') ?? '';

		if (!pastedValue.trim()) {
			return;
		}

		event.preventDefault();
		const nextIndex = overwriteValue(index, pastedValue);
		await focusCell(
			nextIndex < resolvedLength - 1 ? nextIndex + 1 : nextIndex,
			nextIndex < resolvedLength - 1
		);
	};
</script>

<div class={wrapperClass}>
	{#if resolvedName}
		<input type="hidden" name={resolvedName} value={normalizedValue} {disabled} />
	{/if}

	<div class={otpClass} bind:this={rootElement}>
		{#each cellValues as cellValue, index}
			<input
				id={index === 0
					? controlId || undefined
					: controlId
						? `${controlId}-${index + 1}`
						: undefined}
				type="text"
				value={cellValue}
				class="otp-cell"
				data-otp-index={index}
				{inputmode}
				autocomplete={index === 0 ? autocomplete : 'off'}
				maxlength="1"
				pattern="[0-9A-Za-z]*"
				placeholder={placeholder ? placeholder[0] : undefined}
				aria-label={`${ariaLabel} digit ${index + 1} of ${resolvedLength}`}
				aria-invalid={isInvalid || undefined}
				aria-describedby={describedBy}
				aria-required={isRequired || undefined}
				{disabled}
				{readonly}
				oninput={(event) => handleInput(index, event)}
				{onchange}
				onfocus={(event) => handleFocus(index, event)}
				{onblur}
				onkeydown={(event) => handleKeydown(index, event)}
				onpaste={(event) => handlePaste(index, event)}
			/>
		{/each}
	</div>
</div>
