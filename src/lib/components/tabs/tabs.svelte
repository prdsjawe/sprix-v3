<script lang="ts">
	import './tabs.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import { TVC } from './tabs.record';

	let {
		id = '',
		items = [],
		value = $bindable(''),
		variant = 'button',
		class: className = '',
		ariaLabel = ''
	}: Partial<Tabs.Props> = $props();

	let rootElement = $state<HTMLDivElement | null>(null);
	let indicatorX = $state(0);
	let indicatorWidth = $state(0);
	let indicatorVisible = $state(false);

	let tabsClass = $derived(classnames('tabs', TVC[variant], className));
	let enabledItems = $derived(items.filter((item) => !item.disabled));
	let selectedIndex = $derived(items.findIndex((item) => item.value === value && !item.disabled));
	let indicatorStyle = $derived.by(
		() =>
			`--tabs-indicator-x: ${indicatorX}px; --tabs-indicator-width: ${indicatorWidth}px; --tabs-indicator-opacity: ${indicatorVisible ? 1 : 0};`
	);

	const getTabId = (item: Tabs.Item, index: number) => item.id || `${id || 'tabs'}-tab-${index}`;

	const getTabButtons = () =>
		Array.from(rootElement?.querySelectorAll<HTMLButtonElement>('[data-tabs-trigger]') ?? []);

	const syncIndicator = () => {
		const activeButton = getTabButtons()[selectedIndex];

		if (!activeButton) {
			indicatorVisible = false;
			indicatorWidth = 0;
			indicatorX = 0;
			return;
		}

		indicatorVisible = true;
		indicatorWidth = activeButton.offsetWidth;
		indicatorX = activeButton.offsetLeft;
	};

	const selectIndex = (index: number) => {
		const item = items[index];

		if (!item || item.disabled || value === item.value) return;
		value = item.value;
	};

	const focusIndex = (index: number) => {
		getTabButtons()[index]?.focus();
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

	const handleSelect = (index: number) => {
		selectIndex(index);
	};

	const handleKeydown = (event: Utils.KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (!items.length) return;

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
			const lastIndex = [...items].reverse().findIndex((item) => !item.disabled);
			if (lastIndex >= 0) {
				const resolvedIndex = items.length - 1 - lastIndex;
				selectIndex(resolvedIndex);
				focusIndex(resolvedIndex);
			}
		}
	};

	$effect(() => {
		const nextValue = items.find((item) => item.value === value && !item.disabled)?.value;
		const fallbackValue = enabledItems[0]?.value ?? '';
		const normalizedValue = nextValue ?? fallbackValue;

		if (value !== normalizedValue) {
			value = normalizedValue;
		}
	});

	$effect(() => {
		rootElement;
		items;
		value;
		variant;
		void tick().then(syncIndicator);
	});

	$effect(() => {
		if (!rootElement) return;

		items;

		const observer = new ResizeObserver(() => {
			syncIndicator();
		});

		observer.observe(rootElement);

		for (const button of getTabButtons()) {
			observer.observe(button);
		}

		return () => observer.disconnect();
	});
</script>

<div
	id={id || undefined}
	class={tabsClass}
	role="tablist"
	aria-label={ariaLabel || undefined}
	aria-orientation="horizontal"
	bind:this={rootElement}
>
	<span class="tabs-indicator" style={indicatorStyle} aria-hidden="true"></span>

	{#each items as item, index (item.value)}
		<button
			id={getTabId(item, index)}
			type="button"
			class="tabs-trigger"
			role="tab"
			tabindex={value === item.value ? 0 : -1}
			data-state={value === item.value ? 'active' : 'inactive'}
			data-tabs-trigger={index}
			aria-selected={value === item.value}
			aria-controls={item.panelId || undefined}
			disabled={item.disabled}
			onclick={() => handleSelect(index)}
			onkeydown={(event) => handleKeydown(event, index)}
		>
			<span class="tabs-label">{item.label}</span>
		</button>
	{/each}
</div>
