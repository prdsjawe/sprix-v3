<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge, Button, Card } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Card } from '$lib/components';
	<\/script>

	<Card title="Project status" description="Weekly launch summary">
		<p class="text-sm text-app-text-muted">All milestones are on track for Friday.</p>
	</Card>`;
</script>

<ComponentDocsPage
	slug="card"
	title="Card"
	subtitle="A structured surface for grouped content and actions."
	description="Sprix card component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-xl">
			<Card
				title="Project status"
				description="Weekly launch summary for the launch workspace."
				class="rounded-3xl border-app-border bg-app-surface"
			>
				<div class="space-y-4">
					<div
						class="flex items-center justify-between gap-3 rounded-2xl border border-app-border bg-app-bg px-4 py-4"
					>
						<div>
							<p class="font-medium text-app-text">Launch brief</p>
							<p class="text-sm text-app-text-muted">
								Copy, legal review, and QA are all signed off.
							</p>
						</div>
						<Badge role="success" variant="pill-color">Ready</Badge>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex justify-end gap-2">
						<Button role="secondary" variant="outline">Review</Button>
						<Button>Publish</Button>
					</div>
				{/snippet}
			</Card>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Action Header"
			subtitle="Pair summary copy with a lightweight action in the header."
		>
			<div class="mx-auto w-full max-w-xl">
				<Card title="Team inbox" description="Open conversations across support and growth.">
					{#snippet action()}
						<Button size="sm" role="secondary" variant="quiet" rightIcon="arrow-right"
							>View all</Button
						>
					{/snippet}

					<div class="grid gap-3">
						<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
							<p class="font-medium text-app-text">Priority launch notes</p>
							<p class="text-sm text-app-text-muted">
								Three unanswered threads need a response today.
							</p>
						</div>
					</div>
				</Card>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
