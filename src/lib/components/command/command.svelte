<script lang="ts">
	import './command.css';
	import { tick } from 'svelte';
	import classnames from '$utils/classnames';
	import Icon from '../icon/icon.svelte';
	import { CSC } from './command.record';

	type GroupedItems = {
		name: string;
		items: Command.Item[];
	};

	const normalizeText = (value: string) => value.toLowerCase().trim();
	const sanitizeToken = (value: string) =>
		value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	const resolveShortcut = (shortcut?: Command.ItemShortcut) =>
		Array.isArray(shortcut) ? shortcut : shortcut ? [shortcut] : [];
	const buildSearchableText = (item: Command.Item) =>
		[
			item.label,
			item.description,
			item.group,
			item.badge,
			...(item.keywords ?? []),
			...resolveShortcut(item.shortcut)
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase();
	const groupItems = (items: Command.Item[]) => {
		const groups = new Map<string, Command.Item[]>();

		for (const item of items) {
			const group = item.group ?? '';
			groups.set(group, [...(groups.get(group) ?? []), item]);
		}

		return Array.from(groups, ([name, groupedItems]) => ({
			name,
			items: groupedItems
		})) satisfies GroupedItems[];
	};

	let {
		id = '',
		open = $bindable(false),
		value = $bindable(''),
		search = $bindable(''),
		size = 'md',
		title = '',
		description = '',
		ariaLabel = '',
		placeholder = 'Search commands...',
		emptyTitle = 'No command found',
		emptyDescription = 'Try a different keyword or broaden the search.',
		dismissible = true,
		showClose = false,
		closeLabel = 'Close command menu',
		closeOnSelect = true,
		loading = false,
		class: className = '',
		items = [],
		footer,
		onclose,
		onselect,
		oninput,
		onfocus,
		onblur,
		onkeydown
	}: Partial<Command.Props> = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);
	let resultsElement = $state<HTMLDivElement | null>(null);
	let searchElement = $state<HTMLInputElement | null>(null);
	let activeValue = $state('');
	let isSelecting = $state(false);

	let resolvedId = $derived.by(() => {
		const source = id || title || description || 'command';
		return sanitizeToken(source) || 'command';
	});
	let titleId = $derived(title ? `${resolvedId}-title` : '');
	let descriptionId = $derived(description ? `${resolvedId}-description` : '');
	let resultsId = $derived(`${resolvedId}-results`);
	let hasHeader = $derived(Boolean(title || description));
	let hasFooter = $derived(Boolean(footer));
	let commandClass = $derived(classnames('cmd', CSC[size], className));
	let headerClass = $derived(classnames('cmd-header', !hasHeader && 'cmd-header-actions'));
	let searchRowClass = $derived(
		classnames('cmd-search-row', hasHeader ? 'cmd-search-row-divided' : 'cmd-search-row-standalone')
	);
	let isBusy = $derived(Boolean(loading || isSelecting));
	let filteredItems = $derived.by(() => {
		const query = normalizeText(search);

		if (!items.length) {
			return [];
		}

		if (!query) {
			return items;
		}

		return items.filter((item) => buildSearchableText(item).includes(query));
	});
	let enabledItems = $derived(filteredItems.filter((item) => !item.disabled));
	let groupedItems = $derived(groupItems(filteredItems));
	let activeItem = $derived(filteredItems.find((item) => item.value === activeValue) ?? null);
	let activeDescendant = $derived(
		activeItem ? `${resolvedId}-item-${sanitizeToken(activeItem.value)}` : undefined
	);

	const closeDialog = () => {
		open = false;
	};

	const handleNativeClose = () => {
		if (open) {
			open = false;
		}

		search = '';
		activeValue = '';
		isSelecting = false;
	};

	const handleDismissRequest = (event: Utils.DOMEvent<HTMLDialogElement>) => {
		event.preventDefault();

		if (!dismissible || isBusy) {
			return;
		}

		onclose?.();
		closeDialog();
	};

	const handleBackdropClick = (event: Utils.MouseEvent<HTMLDialogElement>) => {
		if (event.target !== event.currentTarget || !dismissible || isBusy) {
			return;
		}

		onclose?.();
		closeDialog();
	};

	const handleCloseClick = () => {
		if (!dismissible || isBusy) {
			return;
		}

		onclose?.();
		closeDialog();
	};

	const moveActive = (direction: 1 | -1) => {
		if (!enabledItems.length) {
			activeValue = '';
			return;
		}

		const currentIndex = enabledItems.findIndex((item) => item.value === activeValue);
		const nextIndex =
			currentIndex === -1
				? direction > 0
					? 0
					: enabledItems.length - 1
				: (currentIndex + direction + enabledItems.length) % enabledItems.length;

		activeValue = enabledItems[nextIndex].value;
	};

	const selectItem = async (item: Command.Item) => {
		if (item.disabled || isBusy) {
			return;
		}

		value = item.value;
		activeValue = item.value;
		isSelecting = true;

		try {
			const result = await onselect?.(item);

			if (result === false) {
				return;
			}

			if (closeOnSelect) {
				closeDialog();
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (open) {
				isSelecting = false;
			}
		}
	};

	const handleInput = (event: Utils.DOMEvent<HTMLInputElement>) => {
		oninput?.(event);
	};

	const handleFocus = (event: Utils.FocusEvent<HTMLInputElement>) => {
		onfocus?.(event);
	};

	const handleBlur = (event: Utils.FocusEvent<HTMLInputElement>) => {
		onblur?.(event);
	};

	const handleKeydown = (event: Utils.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			moveActive(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			moveActive(-1);
		} else if (event.key === 'Home') {
			event.preventDefault();
			activeValue = enabledItems[0]?.value ?? '';
		} else if (event.key === 'End') {
			event.preventDefault();
			activeValue = enabledItems.at(-1)?.value ?? '';
		} else if (event.key === 'Enter' && activeItem) {
			event.preventDefault();
			void selectItem(activeItem);
		}

		onkeydown?.(event);
	};

	$effect(() => {
		if (!dialogElement) {
			return;
		}

		if (open) {
			if (!dialogElement.open) {
				dialogElement.showModal();
			}

			void tick().then(() => {
				searchElement?.focus();
			});

			return;
		}

		if (dialogElement.open) {
			dialogElement.close();
		}
	});

	$effect(() => {
		if (!open) {
			return;
		}

		if (filteredItems.some((item) => item.value === activeValue && !item.disabled)) {
			return;
		}

		activeValue = enabledItems[0]?.value ?? '';
	});

	$effect(() => {
		if (!open || !activeItem) {
			return;
		}

		void tick().then(() => {
			document
				.getElementById(`${resolvedId}-item-${sanitizeToken(activeItem.value)}`)
				?.scrollIntoView({
					block: 'nearest'
				});
		});
	});
</script>

<dialog
	bind:this={dialogElement}
	class={commandClass}
	aria-labelledby={titleId || undefined}
	aria-describedby={descriptionId || undefined}
	aria-label={title ? undefined : ariaLabel || 'Command menu'}
	onclose={handleNativeClose}
	oncancel={handleDismissRequest}
	onclick={handleBackdropClick}
>
	<div class="cmd-shell">
		{#if hasHeader || (showClose && dismissible)}
			<div class={headerClass}>
				{#if hasHeader}
					<div class="cmd-copy">
						<div class="cmd-heading">
							<div class="cmd-copy">
								{#if title}
									<h2 id={titleId} class="cmd-title">{title}</h2>
								{/if}

								{#if description}
									<p id={descriptionId} class="cmd-description">{description}</p>
								{/if}
							</div>

							{#if showClose && dismissible}
								<button
									type="button"
									class="cmd-close"
									aria-label={closeLabel}
									onclick={handleCloseClick}
								>
									<Icon name="x-mark" class="" />
								</button>
							{/if}
						</div>
					</div>
				{:else if showClose && dismissible}
					<button
						type="button"
						class="cmd-close"
						aria-label={closeLabel}
						onclick={handleCloseClick}
					>
						<Icon name="x-mark" class="" />
					</button>
				{/if}
			</div>
		{/if}

		<div class={searchRowClass}>
			<span class="cmd-search-icon" aria-hidden="true">
				<Icon name="magnifying-glass" class="" />
			</span>

			<input
				bind:this={searchElement}
				bind:value={search}
				type="text"
				class="cmd-search"
				{placeholder}
				aria-controls={resultsId}
				aria-activedescendant={activeDescendant}
				aria-label="Search commands"
				disabled={isBusy}
				autocapitalize="off"
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleBlur}
				onkeydown={handleKeydown}
			/>

			{#if search}
				<button
					type="button"
					class="cmd-search-clear"
					aria-label="Clear search"
					onclick={() => {
						search = '';
						activeValue = enabledItems[0]?.value ?? '';
						searchElement?.focus();
					}}
				>
					Clear
				</button>
			{/if}
		</div>

		<div id={resultsId} bind:this={resultsElement} class="cmd-body">
			<div class="cmd-results">
				{#if groupedItems.length}
					{#each groupedItems as group}
						<section class="cmd-group" aria-label={group.name || 'Commands'}>
							{#if group.name}
								<p class="cmd-group-label">{group.name}</p>
							{/if}

							<div class="cmd-group-items">
								{#each group.items as item}
									<button
										id={`${resolvedId}-item-${sanitizeToken(item.value)}`}
										type="button"
										class={classnames(
											'cmd-item',
											activeValue === item.value && 'cmd-item-active',
											value === item.value && 'cmd-item-selected'
										)}
										aria-current={value === item.value ? 'true' : undefined}
										disabled={item.disabled || isBusy}
										onmousemove={() => {
											if (!item.disabled) {
												activeValue = item.value;
											}
										}}
										onfocus={() => {
											if (!item.disabled) {
												activeValue = item.value;
											}
										}}
										onclick={() => void selectItem(item)}
									>
										{#if item.icon}
											<span class="cmd-item-icon" aria-hidden="true">
												<Icon name={item.icon} class="" />
											</span>
										{:else}
											<span class="cmd-item-icon" aria-hidden="true">
												<Icon name="command-line" class="" />
											</span>
										{/if}

										<span class="cmd-item-copy">
											<span class="cmd-item-label-row">
												<span class="cmd-item-label">{item.label}</span>

												{#if item.badge}
													<span class="cmd-item-badge">{item.badge}</span>
												{/if}
											</span>

											{#if item.description}
												<span class="cmd-item-description">{item.description}</span>
											{/if}
										</span>

										{#if resolveShortcut(item.shortcut).length}
											<span class="cmd-shortcuts" aria-hidden="true">
												{#each resolveShortcut(item.shortcut) as key}
													<kbd class="cmd-shortcut">{key}</kbd>
												{/each}
											</span>
										{/if}
									</button>
								{/each}
							</div>
						</section>
					{/each}
				{:else}
					<div class="cmd-empty">
						<p class="cmd-empty-title">{emptyTitle}</p>
						<p class="cmd-empty-description">{emptyDescription}</p>
					</div>
				{/if}
			</div>
		</div>

		{#if hasFooter}
			<div class="cmd-footer">
				{@render footer?.()}
			</div>
		{/if}
	</div>
</dialog>
