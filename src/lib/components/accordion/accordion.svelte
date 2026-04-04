<script lang="ts">
	import './accordion.css';
	import classnames from '$utils/classnames';
	import { setAccordionRootContext } from './accordion.context';
	import { ASC, AVC } from './accordion.record';

	let {
		id = '',
		type = 'single',
		size = 'md',
		variant = 'default',
		value = $bindable(''),
		collapsible = true,
		class: className = '',
		children
	}: Partial<Accordion.Props> = $props();

	let accordionClass = $derived(classnames('acc', ASC[size], AVC[variant], className));

	const normalizeValues = (candidate: Accordion.Value | undefined) => {
		if (type === 'multiple') {
			if (Array.isArray(candidate)) return candidate.filter(Boolean);
			return typeof candidate === 'string' && candidate ? [candidate] : [];
		}

		if (Array.isArray(candidate)) {
			return candidate.find(Boolean) ?? '';
		}

		return candidate ?? '';
	};

	const getOpenValues = () => {
		const normalizedValue = normalizeValues(value);
		return Array.isArray(normalizedValue)
			? normalizedValue
			: normalizedValue
				? [normalizedValue]
				: [];
	};

	const isItemOpen = (itemValue: string) => getOpenValues().includes(itemValue);

	const toggleItem = (itemValue: string) => {
		if (!itemValue) return;

		if (type === 'multiple') {
			const openValues = getOpenValues();
			value = openValues.includes(itemValue)
				? openValues.filter((entry) => entry !== itemValue)
				: [...openValues, itemValue];
			return;
		}

		if (isItemOpen(itemValue)) {
			value = collapsible ? '' : itemValue;
			return;
		}

		value = itemValue;
	};

	setAccordionRootContext({
		isItemOpen,
		toggleItem,
		getRootId: () => id || 'accordion',
		getSize: () => size,
		getVariant: () => variant
	});

	$effect(() => {
		const normalizedValue = normalizeValues(value);

		if (type === 'multiple') {
			const nextValue = Array.isArray(normalizedValue) ? normalizedValue : [];
			const valueChanged =
				!Array.isArray(value) ||
				value.length !== nextValue.length ||
				value.some((entry, index) => entry !== nextValue[index]);

			if (valueChanged) {
				value = nextValue;
			}

			return;
		}

		const nextValue = Array.isArray(normalizedValue) ? (normalizedValue[0] ?? '') : normalizedValue;

		if (value !== nextValue) {
			value = nextValue;
		}
	});
</script>

<div id={id || undefined} class={accordionClass} data-type={type} data-variant={variant}>
	{@render children?.()}
</div>
