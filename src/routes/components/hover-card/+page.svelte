<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Avatar, Badge, HoverCard } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { HoverCard } from '$lib/components';
	<\/script>

	<HoverCard text="Preview the latest launch summary.">
		<span class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium">
			Hover for details
		</span>
	</HoverCard>`;
</script>

<ComponentDocsPage
	slug="hover-card"
	title="Hover Card"
	subtitle="A lightweight preview that appears on hover or focus."
	description="Sprix hover card component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<HoverCard placement="bottom">
				<span
					class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium text-app-text"
				>
					Hover customer preview
				</span>

				{#snippet content()}
					<div class="flex w-72 items-start gap-3">
						<Avatar name="Emma Li" />
						<div class="space-y-2">
							<p class="font-medium text-app-text">Emma Li</p>
							<p class="text-sm text-app-text-muted">
								Operations lead for launch readiness and approvals.
							</p>
							<Badge role="success" variant="pill-color">Available</Badge>
						</div>
					</div>
				{/snippet}
			</HoverCard>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Text Only"
			subtitle="Use the text prop for compact hints without custom markup."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<HoverCard text="Preview the latest release summary before opening the full brief.">
					<span
						class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium text-app-text"
					>
						Hover release note
					</span>
				</HoverCard>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
