<script lang="ts">
	import './field.css';
	import { getContext, setContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FORM_CONTEXT_KEY, normalizeFormError, type FormContextValue } from '../form/form.context';
	import { FIELD_CONTEXT_KEY, type FieldContextValue } from './field.context';
	import { FOC } from './field.record';

	let {
		id = '',
		name = '',
		controlId = '',
		label = '',
		labelClass = '',
		description = '',
		helper = '',
		error,
		required = false,
		orientation = 'vertical',
		class: className = '',
		children
	}: Partial<Field.Props> = $props();

	const formContext = getContext<FormContextValue | undefined>(FORM_CONTEXT_KEY);

	let resolvedBaseId = $derived.by(() => {
		const source = id || name || label || 'field';
		return source
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	});
	let resolvedControlId = $derived(controlId || (resolvedBaseId ? `${resolvedBaseId}-control` : ''));
	let normalizedError = $derived.by(() => {
		if (error !== undefined) {
			return normalizeFormError(error);
		}

		if (!name || !formContext) {
			return '';
		}

		return normalizeFormError(formContext.getErrors()[name]);
	});
	let labelId = $derived(label ? `${resolvedBaseId}-label` : '');
	let descriptionId = $derived(description ? `${resolvedBaseId}-description` : '');
	let helperId = $derived(helper && !normalizedError ? `${resolvedBaseId}-helper` : '');
	let errorId = $derived(normalizedError ? `${resolvedBaseId}-error` : '');
	let hasInlineLabel = $derived(Boolean(label && orientation === 'horizontal'));
	let describedBy = $derived(
		[descriptionId, normalizedError ? errorId : helperId].filter(Boolean).join(' ') || undefined
	);
	let fieldClass = $derived(classnames('fld', FOC[orientation], className));
	let labelRowClass = $derived(classnames('fld-label', labelClass));
	let controlClass = $derived(
		classnames('fld-control', orientation === 'horizontal' && 'fld-control-horizontal')
	);

	const fieldContext: FieldContextValue = {
		getControlId: () => resolvedControlId,
		getName: () => name,
		getRequired: () => required,
		getInvalid: () => Boolean(normalizedError),
		getDescribedBy: () => describedBy
	};

	setContext(FIELD_CONTEXT_KEY, fieldContext);
</script>

<div class={fieldClass}>
	{#if description || (label && !hasInlineLabel)}
		<div class="fld-head">
			{#if label && !hasInlineLabel}
				<label id={labelId || undefined} class={labelRowClass} for={resolvedControlId || undefined}>
					<span>{label}</span>
					{#if required}
						<span class="fld-required" aria-hidden="true">*</span>
					{/if}
				</label>
			{/if}

			{#if description}
				<p id={descriptionId || undefined} class="fld-description">{description}</p>
			{/if}
		</div>
	{/if}

	<div class={controlClass}>
		{@render children?.()}

		{#if hasInlineLabel}
			<label id={labelId || undefined} class={labelRowClass} for={resolvedControlId || undefined}>
				<span>{label}</span>
				{#if required}
					<span class="fld-required" aria-hidden="true">*</span>
				{/if}
			</label>
		{/if}
	</div>

	{#if normalizedError}
		<p id={errorId || undefined} class="fld-message fld-message-error">{normalizedError}</p>
	{:else if helper}
		<p id={helperId || undefined} class="fld-message">{helper}</p>
	{/if}
</div>
