<script lang="ts">
	import './native-select.css';
	import { getContext } from 'svelte';
	import classnames from '$utils/classnames';
	import Icon from '../icon/icon.svelte';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { NSC } from './native-select.record';

	let {
		id = '',
		name = '',
		size = 'md',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		required = false,
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
	}: Partial<NativeSelect.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let selectId = $derived(id || fieldContext?.getControlId() || resolvedName);
	let helperId = $derived(helper && selectId ? `${selectId}-helper` : '');
	let errorId = $derived(error && selectId ? `${selectId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let wrapperClass = $derived(classnames('nslt-field', className));
	let selectClass = $derived.by(() =>
		classnames(
			'nslt',
			NSC[size],
			placeholder && value === '' && 'nslt-placeholder',
			disabled && 'nslt-disabled',
			invalid && 'nslt-error'
		)
	);
</script>

<div class={wrapperClass}>
	<div class={selectClass}>
		<select
			id={selectId || undefined}
			name={resolvedName || undefined}
			bind:value
			class="nslt-control"
			{disabled}
			required={resolvedRequired}
			aria-invalid={invalid}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{oninput}
			{onchange}
			{onfocus}
			{onblur}
			{onkeydown}
		>
			{#if placeholder}
				<option value="" disabled={resolvedRequired}>{placeholder}</option>
			{/if}

			{@render children?.()}
		</select>

		<span class="nslt-icon" aria-hidden="true">
			<Icon name="chevron-down" class="" />
		</span>
	</div>

	{#if error}
		<p id={errorId} class="nslt-message nslt-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="nslt-message">{helper}</p>
	{/if}
</div>
