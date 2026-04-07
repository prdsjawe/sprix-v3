<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Separator } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Separator } from '$lib/components';
	<\/script>

	<div class="space-y-4">
		<p class="text-sm text-app-text-muted">Overview</p>
		<Separator />
		<p class="text-sm text-app-text-muted">Details</p>
	</div>`;
</script>

<ComponentDocsPage
	slug="separator"
	title="Separator"
	subtitle="A thin dividing line for grouping related content."
	description="Sprix separator component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-xl space-y-4">
			<div class="space-y-2">
				<p class="text-sm font-medium text-app-text">Launch summary</p>
				<p class="text-sm text-app-text-muted">Approved by growth, legal, and support.</p>
			</div>
			<Separator />
			<div class="space-y-2">
				<p class="text-sm font-medium text-app-text">Next step</p>
				<p class="text-sm text-app-text-muted">Schedule the release and notify operators.</p>
			</div>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample title="Vertical" subtitle="Use a vertical separator between small inline regions.">
			<div class="mx-auto flex w-full max-w-xl items-center justify-center gap-4">
				<span class="text-sm text-app-text-muted">Published</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-sm text-app-text-muted">Scheduled</span>
				<Separator orientation="vertical" class="h-5" />
				<span class="text-sm text-app-text-muted">Archived</span>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
