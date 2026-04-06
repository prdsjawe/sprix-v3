<script lang="ts">
	import './pagination.css';
	import Button from '../button/button.svelte';
	import classnames from '$utils/classnames';
	import { PSC } from './pagination.record';

	let {
		id = '',
		count = 1,
		page = 1,
		siblingCount = 1,
		boundaryCount = 1,
		size = 'xs',
		disabled = false,
		showPrevNext = true,
		class: className = '',
		ariaLabel = 'Pagination',
		previousLabel = 'Go to previous page',
		nextLabel = 'Go to next page',
		onpagechange
	}: Partial<Pagination.Props> = $props();

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
	const range = (start: number, end: number) =>
		start > end ? [] : Array.from({ length: end - start + 1 }, (_, index) => start + index);
	const createPageToken = (value: number, currentPage: number): Pagination.PageToken => ({
		type: 'page',
		key: `page-${value}`,
		value,
		current: value === currentPage
	});
	const buildTokens = (
		totalPages: number,
		currentPage: number,
		siblingRange: number,
		boundaryRange: number
	): Pagination.Token[] => {
		let values = new Set<number>();

		range(1, Math.min(boundaryRange, totalPages)).forEach((value) => values.add(value));
		range(Math.max(totalPages - boundaryRange + 1, 1), totalPages).forEach((value) =>
			values.add(value)
		);
		range(
			Math.max(currentPage - siblingRange, 1),
			Math.min(currentPage + siblingRange, totalPages)
		).forEach((value) => values.add(value));

		let sortedValues = [...values].sort((left, right) => left - right);
		let tokens: Pagination.Token[] = [];

		for (let index = 0; index < sortedValues.length; index += 1) {
			let value = sortedValues[index];
			let previous = sortedValues[index - 1];

			if (previous) {
				let gap = value - previous;

				if (gap === 2) {
					tokens.push(createPageToken(previous + 1, currentPage));
				} else if (gap > 2) {
					tokens.push({
						type: 'ellipsis',
						key: `ellipsis-${previous}-${value}`
					});
				}
			}

			tokens.push(createPageToken(value, currentPage));
		}

		return tokens;
	};
	const handlePageChange = (nextPage: number) => {
		let targetPage = clamp(nextPage, 1, totalPages);

		if (disabled || targetPage === currentPage) return;

		onpagechange?.(targetPage);
	};

	let totalPages = $derived(Math.max(1, Math.trunc(count)));
	let currentPage = $derived(clamp(Math.trunc(page), 1, totalPages));
	let paginationClass = $derived(classnames('pgn', PSC[size], className));
	let pageTokens = $derived.by(() =>
		buildTokens(
			totalPages,
			currentPage,
			Math.max(0, Math.trunc(siblingCount)),
			Math.max(0, Math.trunc(boundaryCount))
		)
	);
</script>

<nav {id} class={paginationClass} aria-label={ariaLabel}>
	<ul class="pgn-list">
		{#if showPrevNext && totalPages > 1}
			<li>
				<Button
					{size}
					role="secondary"
					variant="quiet"
					class="pgn-control"
					ariaLabel={previousLabel}
					leftIcon="chevron-left"
					disabled={disabled || currentPage === 1}
					onclick={() => handlePageChange(currentPage - 1)}
				/>
			</li>
		{/if}

		{#each pageTokens as item (item.key)}
			<li>
				{#if item.type === 'ellipsis'}
					<span class="pgn-ellipsis" aria-hidden="true">&hellip;</span>
				{:else}
					<Button
						{size}
						role="secondary"
						variant={item.current ? 'default' : 'quiet'}
						class={classnames('pgn-page', item.current && 'pgn-page-current')}
						ariaLabel={item.current
							? `Page ${item.value}, current page`
							: `Go to page ${item.value}`}
						ariaCurrent={item.current ? 'page' : undefined}
						{disabled}
						onclick={() => handlePageChange(item.value)}
					>
						{item.value}
					</Button>
				{/if}
			</li>
		{/each}

		{#if showPrevNext && totalPages > 1}
			<li>
				<Button
					{size}
					role="secondary"
					variant="quiet"
					class="pgn-control"
					ariaLabel={nextLabel}
					rightIcon="chevron-right"
					disabled={disabled || currentPage === totalPages}
					onclick={() => handlePageChange(currentPage + 1)}
				/>
			</li>
		{/if}
	</ul>
</nav>
