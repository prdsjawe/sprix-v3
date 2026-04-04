<script lang="ts">
	import './textarea.css';
	import { getContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { TRC, TSC } from './textarea.record';

	let {
		id = '',
		name = '',
		label = '',
		size = 'md',
		value = $bindable(''),
		placeholder = '',
		rows = 4,
		minlength,
		maxlength,
		disabled = false,
		required = false,
		readonly = false,
		spellcheck,
		helper = '',
		error = '',
		resize = 'vertical',
		class: className = '',
		ariaLabel = '',
		oninput,
		onchange,
		onfocus,
		onblur
	}: Partial<Textarea.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let textareaId = $derived(
		id ||
			fieldContext?.getControlId() ||
			resolvedName ||
			label
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
	);
	let helperId = $derived(helper && textareaId ? `${textareaId}-helper` : '');
	let errorId = $derived(error && textareaId ? `${textareaId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let wrapperClass = $derived(classnames('txa-field', className));
	let textareaClass = $derived.by(() =>
		classnames('txa', TSC[size], TRC[resize], disabled && 'txa-disabled', invalid && 'txa-error')
	);
</script>

<div class={wrapperClass}>
	{#if label}
		<label class="txa-label-row" for={textareaId || undefined}>
			<span>{label}</span>
			{#if required}
				<span class="txa-required" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class={textareaClass}>
		<textarea
			id={textareaId || undefined}
			name={resolvedName || undefined}
			bind:value
			class="txa-control"
			{placeholder}
			{rows}
			{minlength}
			{maxlength}
			{disabled}
			required={resolvedRequired}
			{readonly}
			{spellcheck}
			aria-invalid={invalid}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{oninput}
			{onchange}
			{onfocus}
			{onblur}
		></textarea>
	</div>

	{#if error}
		<p id={errorId} class="txa-message txa-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="txa-message">{helper}</p>
	{/if}
</div>
