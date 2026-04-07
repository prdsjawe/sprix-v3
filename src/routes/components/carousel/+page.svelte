<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge, Card, Carousel } from '$lib/components';

	let releasePage = $state(0);

	const releaseSlides = [
		{
			id: 'release-1',
			eyebrow: 'Planning',
			title: 'Launch checklist',
			description: 'Track legal, QA, and campaign approvals in one place.',
			meta: 'Updated 5 minutes ago'
		},
		{
			id: 'release-2',
			eyebrow: 'Content',
			title: 'Editorial pipeline',
			description: 'Review summaries, hero copy, and partner quotes before publish.',
			meta: '6 tasks left'
		},
		{
			id: 'release-3',
			eyebrow: 'Growth',
			title: 'Acquisition plan',
			description: 'Coordinate paid, lifecycle, and homepage placement from one view.',
			meta: 'Ready for launch'
		},
		{
			id: 'release-4',
			eyebrow: 'Support',
			title: 'Help center updates',
			description: 'Prep launch FAQs and rollout notices for customer success.',
			meta: '2 drafts pending'
		}
	];

	const basicSnippet = `<script lang="ts">
		import { Carousel } from '$lib/components';

		const items = [
			{ id: 'one', title: 'Launch checklist', description: 'Coordinate every approval in one view.' },
			{ id: 'two', title: 'Editorial pipeline', description: 'Track final content updates before publish.' },
			{ id: 'three', title: 'Help center updates', description: 'Ship release notes alongside the product.' }
		];
	<\/script>

	<Carousel items={items} ariaLabel="Release highlights" />`;
</script>

<ComponentDocsPage
	slug="carousel"
	title="Carousel"
	subtitle="A paged surface for showcasing sets of related content."
	description="Sprix carousel component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-5xl">
			<Carousel items={releaseSlides} bind:page={releasePage} ariaLabel="Release highlights">
				{#snippet slide(item)}
					<Card
						title={item.title}
						description={item.description}
						class="h-full rounded-3xl border-app-border bg-app-surface"
					>
						<div class="space-y-3">
							<Badge role="primary" variant="modern">{item.eyebrow}</Badge>
							<p class="text-sm text-app-text-muted">{item.meta}</p>
						</div>
					</Card>
				{/snippet}
			</Carousel>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Two Columns"
			subtitle="Constrain the visible columns for denser editorial and commerce rails."
		>
			<div class="mx-auto w-full max-w-4xl">
				<Carousel
					items={releaseSlides}
					maxColumns={2}
					showDots={false}
					ariaLabel="Editorial highlights"
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
