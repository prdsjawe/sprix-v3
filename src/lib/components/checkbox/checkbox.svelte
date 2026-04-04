<script lang="ts">
	import './checkbox.css';
	import { getContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { CSC } from './checkbox.record';

	let {
		id = '',
		name = '',
		value = 'on',
		label = '',
		size = 'md',
		checked = $bindable(false),
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
	}: Partial<Checkbox.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let inputId = $derived(
		id ||
			fieldContext?.getControlId() ||
			resolvedName ||
			name ||
			label
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-|-$/g, '')
	);
	let helperId = $derived(helper && inputId ? `${inputId}-helper` : '');
	let errorId = $derived(error && inputId ? `${inputId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let wrapperClass = $derived(classnames('chk-field', className));
	let checkboxClass = $derived.by(() =>
		classnames('chk', CSC[size], checked && 'chk-checked', disabled && 'chk-disabled', invalid && 'chk-error')
	);
</script>

<div class={wrapperClass}>
	<label class={checkboxClass} for={inputId || undefined}>
		<span class="chk-shell">
			<input
				id={inputId || undefined}
				name={resolvedName || undefined}
				type="checkbox"
				class="chk-control"
				bind:checked
				{value}
				{disabled}
				required={resolvedRequired}
				aria-invalid={invalid}
				aria-label={ariaLabel || undefined}
				aria-describedby={describedBy}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
			/>
			<span class="chk-box" aria-hidden="true">
				<span class="chk-mark"></span>
			</span>
		</span>

		{#if label}
			<span class="chk-copy">
				<span class="chk-label-row">
					<span>{label}</span>
					{#if resolvedRequired}
						<span class="chk-required" aria-hidden="true">*</span>
					{/if}
				</span>
			</span>
		{/if}
	</label>

	{#if error}
		<p id={errorId} class="chk-message chk-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="chk-message">{helper}</p>
	{/if}
</div>
