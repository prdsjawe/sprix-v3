<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge, Progress } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Progress } from '$lib/components';
	<\/script>

	<Progress value={72} ariaLabel="Launch progress" />`;
</script>

<ComponentDocsPage
	slug="progress"
	title="Progress"
	subtitle="A visual indicator for completion, rollout, and long-running steps."
	description="Sprix progress component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="grid w-full gap-4 px-6 lg:w-[56rem] lg:px-10 xl:w-[64rem]">
			<div class="grid items-center gap-4 md:grid-cols-[12rem_minmax(0,1fr)_5rem]">
				<p class="text-sm font-medium text-app-text">Launch readiness</p>
				<Progress class="w-full" value={84} ariaLabel="Launch readiness progress" />
				<div class="flex justify-end">
					<Badge role="primary" variant="modern">84%</Badge>
				</div>
			</div>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Milestones"
			subtitle="Use multiple progress bars to compare related phases of the same workflow."
		>
			<div class="grid w-full gap-4 px-6 lg:w-[56rem] lg:px-10 xl:w-[64rem]">
				<div class="grid items-center gap-4 md:grid-cols-[12rem_minmax(0,1fr)_5rem]">
					<p class="text-sm font-medium text-app-text">Content review</p>
					<Progress value={96} ariaLabel="Content review progress" />
					<p class="text-right text-sm text-app-text-muted">96%</p>
				</div>
				<div class="grid items-center gap-4 md:grid-cols-[12rem_minmax(0,1fr)_5rem]">
					<p class="text-sm font-medium text-app-text">Operations handoff</p>
					<Progress value={62} ariaLabel="Operations handoff progress" />
					<p class="text-right text-sm text-app-text-muted">62%</p>
				</div>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
