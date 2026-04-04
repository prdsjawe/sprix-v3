<script lang="ts">
	import './carousel.css';
	import Button from '../button/button.svelte';
	import classnames from '$utils/classnames';

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
	const toPositiveInt = (value: number, fallback: number) => {
		const nextValue = Math.trunc(value);

		if (!Number.isFinite(nextValue) || nextValue < 1) {
			return fallback;
		}

		return nextValue;
	};

	let {
		id = '',
		items = [],
		page = $bindable(0),
		maxColumns = 3,
		minItemWidth = 240,
		gap = 16,
		class: className = '',
		ariaLabel = 'Carousel',
		showControls = true,
		showDots = true,
		slide,
		empty,
		onpagechange
	}: Partial<Carousel.Props> = $props();

	let viewportElement = $state<HTMLDivElement | null>(null);
	let viewportWidth = $state(0);
	let dragPointerId = $state<number | null>(null);
	let dragStartX = $state(0);
	let dragOffset = $state(0);
	let isDragging = $state(false);

	let resolvedGap = $derived(Math.max(0, gap));
	let resolvedMaxColumns = $derived(toPositiveInt(maxColumns, 3));
	let resolvedMinItemWidth = $derived(Math.max(140, toPositiveInt(minItemWidth, 240)));
	let visibleColumns = $derived.by(() => {
		const maxVisible = Math.min(resolvedMaxColumns, Math.max(items.length, 1));

		if (!viewportWidth) {
			return maxVisible;
		}

		const estimated = Math.floor(
			(viewportWidth + resolvedGap) / (resolvedMinItemWidth + resolvedGap)
		);

		return clamp(estimated || 1, 1, maxVisible);
	});
	let pages = $derived.by(() => {
		if (!items.length) return [];

		const grouped: Carousel.Item[][] = [];

		for (let index = 0; index < items.length; index += visibleColumns) {
			grouped.push(items.slice(index, index + visibleColumns));
		}

		return grouped;
	});
	let maxPage = $derived(Math.max(pages.length - 1, 0));
	let currentPage = $derived(clamp(Math.trunc(page), 0, maxPage));
	let hasMultiplePages = $derived(pages.length > 1);
	let carouselClass = $derived(classnames('crs', isDragging && 'crs-dragging', className));
	let carouselStyle = $derived(
		`--crs-gap: ${resolvedGap}px; --crs-columns: ${visibleColumns}; --crs-translate: ${currentPage * -100}%; --crs-drag-offset: ${dragOffset}px;`
	);
	let pageStatus = $derived(
		hasMultiplePages ? `Page ${currentPage + 1} of ${pages.length}` : `${items.length} item${items.length === 1 ? '' : 's'}`
	);

	const getPageId = (index: number) => `${id || 'carousel'}-page-${index + 1}`;
	const getItemKey = (item: Carousel.Item, index: number) =>
		String(item.id ?? item.title ?? item.meta ?? `item-${index}`);
	const isInteractiveTarget = (target: EventTarget | null) =>
		target instanceof HTMLElement &&
		Boolean(
			target.closest(
				'a, button, input, select, textarea, label, summary, [role="button"], [role="link"]'
			)
		);
	const setPage = (nextPage: number) => {
		const normalizedPage = clamp(Math.trunc(nextPage), 0, maxPage);

		if (normalizedPage === currentPage) return;

		page = normalizedPage;
		onpagechange?.(normalizedPage);
	};
	const handlePointerDown = (event: Utils.PointerEvent<HTMLDivElement>) => {
		if (!hasMultiplePages) return;
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		if (isInteractiveTarget(event.target)) return;

		dragPointerId = event.pointerId;
		dragStartX = event.clientX;
		dragOffset = 0;
		isDragging = true;
		viewportElement?.setPointerCapture(event.pointerId);
	};
	const handlePointerMove = (event: Utils.PointerEvent<HTMLDivElement>) => {
		if (!isDragging || event.pointerId !== dragPointerId) return;

		dragOffset = event.clientX - dragStartX;
	};
	const finishDrag = () => {
		if (!isDragging) return;

		const threshold = Math.max(42, viewportWidth * 0.18);

		if (Math.abs(dragOffset) > threshold) {
			setPage(currentPage + (dragOffset < 0 ? 1 : -1));
		}

		dragPointerId = null;
		dragOffset = 0;
		isDragging = false;
	};

	$effect(() => {
		if (page !== currentPage) {
			page = currentPage;
			onpagechange?.(currentPage);
		}
	});

	$effect(() => {
		if (!viewportElement) return;

		const syncViewportWidth = () => {
			viewportWidth = Math.round(viewportElement?.clientWidth ?? 0);
		};

		syncViewportWidth();

		const observer = new ResizeObserver(() => {
			syncViewportWidth();
		});

		observer.observe(viewportElement);

		return () => observer.disconnect();
	});
</script>

<div
	id={id || undefined}
	class={carouselClass}
	style={carouselStyle}
	role="region"
	aria-roledescription="carousel"
	aria-label={ariaLabel}
>
	<div class="crs-toolbar">
		<p class="crs-status" aria-live="polite">{pageStatus}</p>

		{#if showControls && hasMultiplePages}
			<div class="crs-actions" aria-label="Carousel controls">
				<Button
					size="xs"
					role="secondary"
					variant="outline"
					leftIcon="chevron-left"
					ariaLabel="Previous page"
					disabled={currentPage === 0}
					onclick={() => setPage(currentPage - 1)}
				/>
				<Button
					size="xs"
					role="secondary"
					variant="outline"
					rightIcon="chevron-right"
					ariaLabel="Next page"
					disabled={currentPage === maxPage}
					onclick={() => setPage(currentPage + 1)}
				/>
			</div>
		{/if}
	</div>

	{#if items.length}
		<div
			class="crs-viewport"
			role="group"
			aria-label={`${ariaLabel} viewport`}
			bind:this={viewportElement}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={finishDrag}
			onpointercancel={finishDrag}
			onlostpointercapture={finishDrag}
		>
			<div class="crs-track">
				{#each pages as group, pageIndex (`page-${pageIndex}`)}
					<section
						id={getPageId(pageIndex)}
						class="crs-page"
						aria-hidden={pageIndex !== currentPage}
						inert={pageIndex !== currentPage}
					>
						<div class="crs-grid">
							{#each group as item, itemIndex (`${getItemKey(item, pageIndex * visibleColumns + itemIndex)}-${pageIndex}-${itemIndex}`)}
								<div class="crs-slide">
									{#if slide}
										{@render slide(item, pageIndex * visibleColumns + itemIndex)}
									{:else}
										<article class="crs-fallback">
											{#if item.eyebrow}
												<span class="crs-fallback-eyebrow">{item.eyebrow}</span>
											{/if}

											{#if item.title}
												<h3 class="crs-fallback-title">{item.title}</h3>
											{/if}

											{#if item.description}
												<p class="crs-fallback-description">{item.description}</p>
											{/if}

											{#if item.meta}
												<span class="crs-fallback-meta">{item.meta}</span>
											{/if}
										</article>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>

		{#if showDots && hasMultiplePages}
			<div class="crs-dots" aria-label={`${ariaLabel} pages`}>
				{#each pages as _, pageIndex (`dot-${pageIndex}`)}
					<button
						type="button"
						class={classnames('crs-dot', currentPage === pageIndex && 'crs-dot-active')}
						aria-label={`Go to page ${pageIndex + 1}`}
						aria-current={currentPage === pageIndex ? 'true' : undefined}
						onclick={() => setPage(pageIndex)}
					></button>
				{/each}
			</div>
		{/if}
	{:else if empty}
		<div class="crs-empty">
			{@render empty()}
		</div>
	{:else}
		<div class="crs-empty">No items to show.</div>
	{/if}
</div>
