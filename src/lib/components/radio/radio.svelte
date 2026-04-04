<script lang="ts">
	import './radio.css';
	import { getContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { RSC } from './radio.record';

	let {
		id = '',
		name = '',
		value = '',
		group = $bindable(''),
		label = '',
		size = 'md',
		disabled = false,
		required = false,
		helper = '',
		error = '',
		class: className = '',
		ariaLabel = '',
		oninput,
		onchange,
		onfocus,
		onblur
	}: Partial<Radio.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	const slugify = (source: string) =>
		source
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let optionSlug = $derived.by(() => slugify(String(value || label || 'option')));
	let inputId = $derived(
		id ||
			(fieldContext?.getControlId()
				? `${fieldContext.getControlId()}-${optionSlug}`
				: resolvedName
					? `${resolvedName}-${optionSlug}`
					: name
						? `${name}-${optionSlug}`
						: optionSlug)
	);
	let helperId = $derived(helper && inputId ? `${inputId}-helper` : '');
	let errorId = $derived(error && inputId ? `${inputId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let isChecked = $derived(group === value);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let wrapperClass = $derived(classnames('rad-field', className));
	let radioClass = $derived.by(() =>
		classnames('rad', RSC[size], isChecked && 'rad-checked', disabled && 'rad-disabled', invalid && 'rad-error')
	);

	const syncGroup = (event: Utils.DOMEvent<HTMLInputElement>) => {
		if (event.currentTarget.checked) {
			group = value;
		}
	};

	const handleInput = (event: Utils.DOMEvent<HTMLInputElement>) => {
		syncGroup(event);
		oninput?.(event);
	};

	const handleChange = (event: Utils.DOMEvent<HTMLInputElement>) => {
		syncGroup(event);
		onchange?.(event);
	};
</script>

<div class={wrapperClass}>
	<label class={radioClass} for={inputId || undefined}>
		<span class="rad-shell">
			<input
				id={inputId || undefined}
				name={resolvedName || undefined}
				type="radio"
				class="rad-control"
				checked={isChecked}
				{value}
				{disabled}
				required={resolvedRequired}
				aria-label={ariaLabel || undefined}
				aria-describedby={describedBy}
				oninput={handleInput}
				onchange={handleChange}
				{onfocus}
				{onblur}
			/>
			<span class="rad-circle" aria-hidden="true">
				<span class="rad-dot"></span>
			</span>
		</span>

		{#if label}
			<span class="rad-copy">
				<span class="rad-label-row">
					<span>{label}</span>
					{#if resolvedRequired}
						<span class="rad-required" aria-hidden="true">*</span>
					{/if}
				</span>
			</span>
		{/if}
	</label>

	{#if error}
		<p id={errorId} class="rad-message rad-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="rad-message">{helper}</p>
	{/if}
</div>
