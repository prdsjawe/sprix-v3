<script lang="ts">
	import './form.css';
	import { setContext } from 'svelte';
	import classnames from '$utils/classnames';
	import { FORM_CONTEXT_KEY, type FormContextValue } from './form.context';

	let {
		id = '',
		class: className = '',
		novalidate = false,
		errors = {},
		children,
		onsubmit,
		onreset
	}: Partial<Form.Props> = $props();

	const formContext: FormContextValue = {
		getErrors: () => errors
	};

	setContext(FORM_CONTEXT_KEY, formContext);

	let formClass = $derived(classnames('frm', className));
</script>

<form id={id || undefined} class={formClass} {novalidate} {onsubmit} {onreset}>
	{@render children?.()}
</form>
