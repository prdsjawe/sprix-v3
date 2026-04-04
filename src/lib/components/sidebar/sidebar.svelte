<script lang="ts">
	import './sidebar.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import createTippy from '$utils/tippy';
	import Icon from '../icon/icon.svelte';

	let {
		id = '',
		items = [],
		value = $bindable(''),
		openItem = $bindable(''),
		entryValue = $bindable(''),
		collapsed = $bindable(false),
		showCollapseToggle = true,
		class: className = '',
		ariaLabel = '',
		header,
		footer,
		onselect,
		onentryselect
	}: Partial<Sidebar.Props> = $props();

	let rootElement = $state<HTMLDivElement | null>(null);
	let dropdownElement = $state<HTMLDivElement | null>(null);
	let dropdownInstance = $state<ReturnType<typeof createTippy> | null>(null);
	let panelItem = $state<Sidebar.Item | null>(null);

	let enabledItems = $derived(items.filter((item) => !item.disabled));
	let activeItem = $derived(items.find((item) => item.id === value));
	let surfaceItem = $derived(
		items.find(
			(item) =>
				item.id === openItem &&
				!item.disabled &&
				Boolean(item.surface && item.entries?.length)
		)
	);
	let dropdownItem = $derived(surfaceItem?.surface === 'dropdown' ? surfaceItem : null);
	let multipanelItem = $derived(surfaceItem?.surface === 'multipanel' ? surfaceItem : null);
	let panelOpen = $derived(Boolean(multipanelItem));
	let sidebarClass = $derived(
		classnames('sdb', collapsed && 'sdb-collapsed', panelOpen && 'sdb-panel-open', className)
	);

	const getTriggerButtons = () =>
		Array.from(
			rootElement?.querySelectorAll<HTMLElement>('[data-sidebar-trigger="true"]') ?? []
		);

	const getEnabledItemIndex = (startIndex: number, direction: 1 | -1) => {
		if (!items.length) return -1;

		let nextIndex = startIndex;

		for (let step = 0; step < items.length; step += 1) {
			nextIndex = (nextIndex + direction + items.length) % items.length;

			if (!items[nextIndex]?.disabled) {
				return nextIndex;
			}
		}

		return -1;
	};

	const focusItemIndex = (index: number) => {
		getTriggerButtons()[index]?.focus();
	};

	const getTriggerElement = (itemId: string) =>
		rootElement?.querySelector<HTMLElement>(`[data-sidebar-id="${itemId}"]`) ?? null;

	const getItemHref = (item: Sidebar.Item) => item.href || item.link || '';

	const getItemRel = (item: Sidebar.Item) => {
		if (item.target !== '_blank') {
			return item.rel || undefined;
		}

		return classnames('noopener', 'noreferrer', item.rel);
	};

	const selectItem = (item: Sidebar.Item) => {
		if (item.disabled) return;

		value = item.id;
		onselect?.(item);
	};

	const toggleSurface = (item: Sidebar.Item) => {
		if (item.disabled || !item.surface || !item.entries?.length) {
			openItem = '';
			return;
		}

		openItem = openItem === item.id ? '' : item.id;
	};

	const handleItemClick = (item: Sidebar.Item) => {
		selectItem(item);

		if (item.surface && item.entries?.length) {
			toggleSurface(item);
			return;
		}

		openItem = '';
	};

	const handleEntryClick = (entry: Sidebar.Entry, item: Sidebar.Item) => {
		if (entry.disabled) return;

		value = item.id;
		entryValue = entry.id;
		onentryselect?.(entry, item);

		if (item.surface === 'dropdown') {
			openItem = '';
		}
	};

	const toggleCollapsed = () => {
		collapsed = !collapsed;
	};

	const handlePanelTransitionEnd = (
		event: Utils.DOMEvent<HTMLDivElement, globalThis.TransitionEvent>
	) => {
		if (event.propertyName !== 'width') return;

		if (!panelOpen) {
			panelItem = null;
		}
	};

	const handleItemKeydown = (
		event: Utils.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
		item: Sidebar.Item,
		index: number
	) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			const nextIndex = getEnabledItemIndex(index, 1);

			if (nextIndex >= 0) {
				focusItemIndex(nextIndex);
			}

			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			const nextIndex = getEnabledItemIndex(index, -1);

			if (nextIndex >= 0) {
				focusItemIndex(nextIndex);
			}

			return;
		}

		if (event.key === 'ArrowRight' && item.surface && item.entries?.length) {
			event.preventDefault();
			selectItem(item);
			openItem = item.id;
			return;
		}

		if (event.key === 'ArrowLeft' && openItem === item.id) {
			event.preventDefault();
			openItem = '';
			return;
		}

		if (event.key === 'Escape' && openItem) {
			event.preventDefault();
			openItem = '';
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			if (event.key === ' ') {
				event.preventDefault();
			}

			handleItemClick(item);
		}
	};

	$effect(() => {
		const nextValue = items.find((item) => item.id === value && !item.disabled)?.id;
		const fallbackValue = enabledItems[0]?.id ?? '';
		const normalizedValue = nextValue ?? fallbackValue;

		if (value !== normalizedValue) {
			value = normalizedValue;
		}
	});

	$effect(() => {
		if (!openItem) return;

		const nextOpenItem = items.find(
			(item) => item.id === openItem && !item.disabled && item.surface && item.entries?.length
		)?.id;

		if (!nextOpenItem) {
			openItem = '';
		}
	});

	$effect(() => {
		if (multipanelItem) {
			panelItem = multipanelItem;
		}
	});

	$effect(() => {
		if (!dropdownItem?.entries?.length) return;

		const nextEntryValue = dropdownItem.entries.find((entry) => entry.id === entryValue)?.id;

		if (!nextEntryValue && entryValue && activeItem?.id !== dropdownItem.id) {
			entryValue = '';
		}
	});

	$effect(() => {
		const contentElement = dropdownElement;

		if (!dropdownItem || !contentElement || !rootElement) return;

		let cancelled = false;
		let instance: ReturnType<typeof createTippy> | null = null;

		void tick().then(() => {
			if (cancelled) return;

			const triggerElement = getTriggerElement(dropdownItem.id);

			if (!triggerElement) return;

			instance = createTippy(triggerElement, contentElement, {
				trigger: 'manual',
				placement: 'right-start',
				offset: [10, 10],
				maxWidth: 'none',
				theme: 'sprix-sidebar',
				hideOnClick: true,
				onClickOutside: () => {
					openItem = '';
				},
				onHide: () => {
					openItem = '';
				}
			});

			dropdownInstance = instance;
			instance.show();
		});

		return () => {
			cancelled = true;
			dropdownInstance = null;
			instance?.destroy();
		};
	});
</script>

{#snippet itemContent(item: Sidebar.Item)}
	<span class="sdb-item__icon" aria-hidden="true">
		<Icon name={item.icon || 'bars-3'} class="" />
	</span>

	{#if !collapsed}
		<span class="sdb-item__body">
			<span class="sdb-item__label-row">
				<span class="sdb-item__label">{item.label}</span>

				{#if item.badge}
					<span class="sdb-item__badge">{item.badge}</span>
				{/if}
			</span>

			{#if item.hint}
				<span class="sdb-item__hint">{item.hint}</span>
			{/if}
		</span>

		{#if item.surface && item.entries?.length}
			<span class="sdb-item__surface" aria-hidden="true">
				<Icon name={item.surface === 'dropdown' ? 'ellipsis-horizontal' : 'chevron-right'} class="" />
			</span>
		{/if}
	{/if}
{/snippet}

<div id={id || undefined} class={sidebarClass} bind:this={rootElement}>
	<div class="sdb-rail">
		<div class="sdb-rail-top">
			{#if header}
				<div class="sdb-header">
					{@render header()}
				</div>
			{/if}
		</div>

		<nav class="sdb-nav" aria-label={ariaLabel || 'Sidebar navigation'}>
			{#each items as item, index (item.id)}
				{#if !item.disabled && getItemHref(item) && !(item.surface && item.entries?.length)}
					<a
						href={getItemHref(item)}
						target={item.target}
						rel={getItemRel(item)}
						class={classnames('sdb-item', collapsed && 'sdb-item-collapsed')}
						data-sidebar-trigger="true"
						data-sidebar-id={item.id}
						data-state={openItem === item.id ? 'open' : value === item.id ? 'active' : 'inactive'}
						aria-label={collapsed ? item.label : undefined}
						aria-current={value === item.id ? 'page' : undefined}
						aria-controls={item.surface === 'multipanel' ? `${id || 'sidebar'}-panel-${item.id}` : undefined}
						onclick={() => handleItemClick(item)}
						onkeydown={(event) => handleItemKeydown(event, item, index)}
					>
						{@render itemContent(item)}
					</a>
				{:else}
					<button
						type="button"
						class={classnames('sdb-item', collapsed && 'sdb-item-collapsed')}
						data-sidebar-trigger="true"
						data-sidebar-id={item.id}
						data-state={openItem === item.id ? 'open' : value === item.id ? 'active' : 'inactive'}
						aria-label={collapsed ? item.label : undefined}
						aria-current={value === item.id ? 'page' : undefined}
						aria-expanded={item.surface && item.entries?.length ? openItem === item.id : undefined}
						aria-controls={item.surface === 'multipanel' ? `${id || 'sidebar'}-panel-${item.id}` : undefined}
						disabled={item.disabled}
						onclick={() => handleItemClick(item)}
						onkeydown={(event) => handleItemKeydown(event, item, index)}
					>
						{@render itemContent(item)}
					</button>
				{/if}
			{/each}
		</nav>

		{#if footer}
			<div class="sdb-footer">
				{@render footer()}
			</div>
		{/if}

		{#if showCollapseToggle}
			<button
				type="button"
				class="sdb-collapse sdb-collapse-edge"
				aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				aria-pressed={collapsed}
				onclick={toggleCollapsed}
			>
				<Icon name={collapsed ? 'chevron-right' : 'chevron-left'} class="" />
			</button>
		{/if}
	</div>

	<div class="sdb-body">
		<div class="sdb-panel-wrap" data-open={panelOpen} ontransitionend={handlePanelTransitionEnd}>
			{#if panelItem}
				{@const currentPanelItem = panelItem}
				<aside
					id={`${id || 'sidebar'}-panel-${currentPanelItem.id}`}
					class="sdb-panel"
					aria-label={`${currentPanelItem.label} panel`}
					aria-hidden={!panelOpen}
				>
					<div class="sdb-entry-list">
						{#each currentPanelItem.entries ?? [] as entry (entry.id)}
							<button
								type="button"
								class="sdb-entry"
								data-selected={entryValue === entry.id}
								disabled={entry.disabled}
								onclick={() => handleEntryClick(entry, currentPanelItem)}
							>
								<span class="sdb-entry__icon" aria-hidden="true">
									<Icon name={entry.icon || 'square-2-stack'} class="" />
								</span>

								<span class="sdb-entry__body">
									<span class="sdb-entry__title-row">
										<span class="sdb-entry__label">{entry.label}</span>

										{#if entry.badge}
											<span class="sdb-entry__badge">{entry.badge}</span>
										{:else if entry.meta}
											<span class="sdb-entry__meta">{entry.meta}</span>
										{/if}
									</span>

									{#if entry.description}
										<p class="sdb-entry__description">{entry.description}</p>
									{/if}
								</span>
							</button>
						{/each}
					</div>
				</aside>
			{/if}
		</div>
	</div>

	{#if dropdownItem}
		<div class="sdb-menu-host">
			<div bind:this={dropdownElement} class="sdb-menu">
				<div class="sdb-entry-list">
					{#each dropdownItem.entries ?? [] as entry (entry.id)}
						<button
							type="button"
							class="sdb-entry"
							data-selected={entryValue === entry.id}
							disabled={entry.disabled}
							onclick={() => handleEntryClick(entry, dropdownItem)}
						>
							<span class="sdb-entry__icon" aria-hidden="true">
								<Icon name={entry.icon || 'square-2-stack'} class="" />
							</span>

							<span class="sdb-entry__body">
								<span class="sdb-entry__title-row">
									<span class="sdb-entry__label">{entry.label}</span>

									{#if entry.badge}
										<span class="sdb-entry__badge">{entry.badge}</span>
									{:else if entry.meta}
										<span class="sdb-entry__meta">{entry.meta}</span>
									{/if}
								</span>

								{#if entry.description}
									<p class="sdb-entry__description">{entry.description}</p>
								{/if}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
