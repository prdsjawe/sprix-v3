<script lang="ts">
	import './input.css';
	import { getContext } from 'svelte';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from '../field/field.context';
	import { ISC } from './input.record';

	let {
		id = '',
		name = '',
		type = 'text',
		size = 'md',
		value = $bindable(''),
		placeholder = '',
		autocomplete,
		inputmode,
		disabled = false,
		required = false,
		readonly = false,
		helper = '',
		error = '',
		class: className = '',
		ariaLabel = '',
		leftIcon = '',
		rightIcon = '',
		leftSlot,
		rightSlot,
		oninput,
		onchange,
		onfocus,
		onblur
	}: Partial<Input.Props> = $props();

	const fieldContext = getContext<FieldContextValue | undefined>(FIELD_CONTEXT_KEY);

	let isPasswordVisible = $state(false);

	let resolvedName = $derived(name || fieldContext?.getName() || '');
	let inputId = $derived(id || fieldContext?.getControlId() || resolvedName);
	let helperId = $derived(helper && inputId ? `${inputId}-helper` : '');
	let errorId = $derived(error && inputId ? `${inputId}-error` : '');
	let describedBy = $derived(
		[fieldContext?.getDescribedBy(), errorId || helperId].filter(Boolean).join(' ') || undefined
	);
	let hasLeftAdornment = $derived(Boolean(leftSlot || leftIcon));
	let hasRightAdornment = $derived(Boolean(rightSlot || rightIcon));
	let isPasswordField = $derived(type === 'password');
	let actualType = $derived(isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type);
	let invalid = $derived(Boolean(error || fieldContext?.getInvalid()));
	let resolvedRequired = $derived(Boolean(required || fieldContext?.getRequired()));
	let wrapperClass = $derived(classnames('ipt-field', className));
	let inputClass = $derived.by(() =>
		classnames('ipt', ISC[size], disabled && 'ipt-disabled', invalid && 'ipt-error')
	);

	const togglePasswordVisibility = () => {
		if (disabled) return;
		isPasswordVisible = !isPasswordVisible;
	};
</script>

<div class={wrapperClass}>
	<div class={inputClass}>
		{#if hasLeftAdornment}
			<span class="ipt-icon" aria-hidden="true">
				{#if leftSlot}
					{@render leftSlot()}
				{:else if leftIcon}
					<Icon name={leftIcon} class="" />
				{/if}
			</span>
		{/if}

		<input
			id={inputId || undefined}
			name={resolvedName || undefined}
			bind:value
			type={actualType}
			class="ipt-control"
			{placeholder}
			{autocomplete}
			{inputmode}
			{disabled}
			required={resolvedRequired}
			{readonly}
			aria-invalid={invalid}
			aria-label={ariaLabel || undefined}
			aria-describedby={describedBy}
			{oninput}
			{onchange}
			{onfocus}
			{onblur}
		/>

		{#if isPasswordField}
			<button
				type="button"
				class={classnames('ipt-toggle', disabled && 'ipt-toggle-disabled')}
				aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
				{disabled}
				onclick={togglePasswordVisibility}
			>
				<Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} class="" />
			</button>
		{:else if hasRightAdornment}
			<span class="ipt-icon" aria-hidden="true">
				{#if rightSlot}
					{@render rightSlot()}
				{:else if rightIcon}
					<Icon name={rightIcon} class="" />
				{/if}
			</span>
		{/if}
	</div>

	{#if error}
		<p id={errorId} class="ipt-message ipt-message-error">{error}</p>
	{:else if helper}
		<p id={helperId} class="ipt-message">{helper}</p>
	{/if}
</div>
