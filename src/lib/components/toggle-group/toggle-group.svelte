<script lang="ts">
	import './toggle-group.css';
	import classnames from '$utils/classnames';
	import { TGTC, TGVC } from './toggle-group.record';

	let {
		id = '',
		items = [],
		type = 'check',
		variant = 'bordered',
		indicator = true,
		value = $bindable('' as ToggleGroup.Value),
		values = $bindable([] as ToggleGroup.Value[]),
		disabled = false,
		class: className = '',
		ariaLabel = ''
	}: Partial<ToggleGroup.Props> = $props();

	let rootElement = $state<HTMLDivElement | null>(null);

	let toggleGroupClass = $derived(classnames('tglg', className));
	let enabledItems = $derived(items.filter((item) => !item.disabled));
	let selectedValues = $derived.by(() => new Set(values));

	const getButtons = () =>
		Array.from(rootElement?.querySelectorAll<HTMLButtonElement>('[data-toggle-group-item]') ?? []);

	const isItemSelected = (item: ToggleGroup.Item) =>
		type === 'radio' ? value === item.value : selectedValues.has(item.value);

	const getButtonId = (_item: ToggleGroup.Item, index: number) => `${id || 'toggle-group'}-item-${index}`;

	const getButtonClass = (item: ToggleGroup.Item) =>
		classnames(
			'tglg-btn',
			TGTC[type],
			TGVC[variant],
			isItemSelected(item) && 'tglg-btn-selected',
			(disabled || item.disabled) && 'tglg-btn-disabled'
		);

	const getRadioTabIndex = (item: ToggleGroup.Item) => {
		if (type !== 'radio') return 0;
		if (disabled || item.disabled) return -1;
		if (value === item.value) return 0;

		return !enabledItems.some((enabledItem) => enabledItem.value === value) &&
			enabledItems[0]?.value === item.value
			? 0
			: -1;
	};

	const focusIndex = (index: number) => {
		getButtons()[index]?.focus();
	};

	const getEnabledIndexInDirection = (startIndex: number, direction: 1 | -1) => {
		if (!items.length) return -1;

		let nextIndex = startIndex;

		for (let offset = 0; offset < items.length; offset += 1) {
			nextIndex = (nextIndex + direction + items.length) % items.length;

			if (!items[nextIndex]?.disabled) {
				return nextIndex;
			}
		}

		return -1;
	};

	const selectIndex = (index: number) => {
		const item = items[index];

		if (!item || disabled || item.disabled || value === item.value) return;
		value = item.value;
	};

	const toggleItem = (item: ToggleGroup.Item) => {
		if (disabled || item.disabled) return;

		if (type === 'radio') {
			if (value !== item.value) {
				value = item.value;
			}
			return;
		}

		const nextValues = new Set(values);

		if (nextValues.has(item.value)) {
			nextValues.delete(item.value);
		} else {
			nextValues.add(item.value);
		}

		values = items.filter((candidate) => nextValues.has(candidate.value)).map((candidate) => candidate.value);
	};

	const handleKeydown = (event: Utils.KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (type !== 'radio') return;

		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			const nextIndex = getEnabledIndexInDirection(index, 1);
			if (nextIndex >= 0) {
				selectIndex(nextIndex);
				focusIndex(nextIndex);
			}
			return;
		}

		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			const nextIndex = getEnabledIndexInDirection(index, -1);
			if (nextIndex >= 0) {
				selectIndex(nextIndex);
				focusIndex(nextIndex);
			}
			return;
		}

		if (event.key === 'Home') {
			event.preventDefault();
			const firstIndex = items.findIndex((item) => !item.disabled);
			if (firstIndex >= 0) {
				selectIndex(firstIndex);
				focusIndex(firstIndex);
			}
			return;
		}

		if (event.key === 'End') {
			event.preventDefault();
			const lastEnabledOffset = [...items].reverse().findIndex((item) => !item.disabled);

			if (lastEnabledOffset >= 0) {
				const lastIndex = items.length - 1 - lastEnabledOffset;
				selectIndex(lastIndex);
				focusIndex(lastIndex);
			}
		}
	};
</script>

<div
	id={id || undefined}
	class={toggleGroupClass}
	role={type === 'radio' ? 'radiogroup' : 'group'}
	aria-label={ariaLabel || undefined}
	aria-orientation={type === 'radio' ? 'horizontal' : undefined}
	bind:this={rootElement}
>
	{#each items as item, index (item.value)}
		<button
			id={getButtonId(item, index)}
			type="button"
			class={getButtonClass(item)}
			role={type === 'radio' ? 'radio' : undefined}
			aria-checked={type === 'radio' ? isItemSelected(item) : undefined}
			aria-pressed={type === 'check' ? isItemSelected(item) : undefined}
			aria-label={item.ariaLabel || undefined}
			tabindex={getRadioTabIndex(item)}
			disabled={disabled || item.disabled}
			data-toggle-group-item={index}
			data-state={isItemSelected(item) ? 'selected' : 'unselected'}
			onclick={() => toggleItem(item)}
			onkeydown={(event) => handleKeydown(event, index)}
		>
			{#if indicator}
				<span class="tglg-indicator" aria-hidden="true">
					<span class="tglg-mark"></span>
				</span>
			{/if}
			<span class="tglg-label">{item.label}</span>
		</button>
	{/each}
</div>
