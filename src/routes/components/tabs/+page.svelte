<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge, Tabs } from '$lib/components';

	let activeTab = $state('overview');

	const tabItems = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'activity', label: 'Activity' },
		{ value: 'team', label: 'Team' }
	];

	const basicSnippet = `<script lang="ts">
		import { Tabs } from '$lib/components';

		let value = $state('overview');

		const items = [
			{ value: 'overview', label: 'Overview' },
			{ value: 'activity', label: 'Activity' }
		];
	<\/script>

	<Tabs bind:value={value} items={items} ariaLabel="Workspace sections" />`;
</script>

<ComponentDocsPage
	slug="tabs"
	title="Tabs"
	subtitle="A segmented control for switching between peer views."
	description="Sprix tabs component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-3xl space-y-6">
			<Tabs bind:value={activeTab} items={tabItems} ariaLabel="Workspace sections" />

			<div class="rounded-3xl border border-app-border bg-app-surface px-5 py-5">
				{#if activeTab === 'overview'}
					<div class="space-y-2">
						<Badge role="primary" variant="modern">Overview</Badge>
						<p class="text-sm text-app-text-muted">
							Track launch readiness, approvals, and remaining blockers.
						</p>
					</div>
				{:else if activeTab === 'activity'}
					<div class="space-y-2">
						<Badge role="secondary" variant="modern">Activity</Badge>
						<p class="text-sm text-app-text-muted">
							Review recent edits, comments, and publish events.
						</p>
					</div>
				{:else}
					<div class="space-y-2">
						<Badge role="success" variant="modern">Team</Badge>
						<p class="text-sm text-app-text-muted">
							Coordinate owners, reviewers, and supporting operators.
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Underline"
			subtitle="Switch to the underline variant for header-level navigation patterns."
		>
			<div class="mx-auto w-full max-w-3xl">
				<Tabs
					bind:value={activeTab}
					items={tabItems}
					variant="underline"
					ariaLabel="Workspace sections underline"
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
