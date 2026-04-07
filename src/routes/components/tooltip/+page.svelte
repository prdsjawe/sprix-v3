<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Tooltip } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Button, Tooltip } from '$lib/components';
	<\/script>

	<Tooltip text="Copy launch link" class="inline-flex">
		<Button role="secondary" variant="outline" icon="link" ariaLabel="Copy launch link" />
	</Tooltip>`;
</script>

<ComponentDocsPage
	slug="tooltip"
	title="Tooltip"
	subtitle="A concise label or hint shown on hover or focus."
	description="Sprix tooltip component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<Tooltip text="Copy launch link" class="inline-flex">
				<Button role="secondary" variant="outline" icon="link" ariaLabel="Copy launch link" />
			</Tooltip>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Custom Content"
			subtitle="Use a small content block when the hint needs more than a single line."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Tooltip class="inline-flex">
					<Button role="secondary" variant="outline">Rollout detail</Button>

					{#snippet content()}
						<div class="space-y-1">
							<p class="font-medium text-app-text">Staged rollout</p>
							<p class="text-sm text-app-text-muted">
								Publish to 10% of customers before the full release.
							</p>
						</div>
					{/snippet}
				</Tooltip>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
