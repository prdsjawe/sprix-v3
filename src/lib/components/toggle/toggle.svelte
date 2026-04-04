<script lang="ts">
	import './toggle.css';
	import { getContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { TSC } from './toggle.record';

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
	}: Partial<Toggle.Props> = $props();

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
	let wrapperClass = $derived(classnames('tgl-field', className));
	let isFieldControlled = $derived(Boolean(fieldContext && !label && !helper && !error));
	let toggleClass = $derived.by(() =>
		classnames(
			'tgl',
			TSC[size],
			isFieldControlled && 'tgl-inline',
			checked && 'tgl-checked',
			disabled && 'tgl-disabled',
			invalid && 'tgl-error'
		)
	);
</script>

<div class={wrapperClass}>
	<div class={toggleClass}>
		{#if label}
			<div class="tgl-copy">
				<label class="tgl-label-row" for={inputId || undefined}>
					<span>{label}</span>
					{#if resolvedRequired}
						<span class="tgl-required" aria-hidden="true">*</span>
					{/if}
				</label>
			</div>
		{/if}

		<label class="tgl-switch" for={inputId || undefined}>
			<input
				id={inputId || undefined}
				name={resolvedName || undefined}
				type="checkbox"
				class="tgl-control"
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
			<span class="tgl-track" aria-hidden="true">
				<span class="tgl-thumb"></span>
			</span>
		</label>
	</div>

	{#if error}
		<p id={errorId} class="tgl-message tgl-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="tgl-message">{helper}</p>
	{/if}
</div>
