<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Sheet } from '$lib/components';

	let rightOpen = $state(false);
	let bottomOpen = $state(false);

	const basicSnippet = `<script lang="ts">
		import { Button, Sheet } from '$lib/components';

		let open = $state(false);
	<\/script>

	<Button onclick={() => (open = true)}>Open settings</Button>

	<Sheet bind:open={open} side="right" title="Quick settings" description="Adjust rollout preferences.">
		<p class="text-sm text-app-text-muted">Move secondary setup work out of the main canvas.</p>
	</Sheet>`;
</script>

<ComponentDocsPage
	slug="sheet"
	title="Sheet"
	subtitle="A side or edge panel for secondary workflows and supporting detail."
	description="Sprix sheet component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
			<Button onclick={() => (rightOpen = true)}>Open side sheet</Button>
			<Button role="secondary" variant="outline" onclick={() => (bottomOpen = true)}
				>Open bottom sheet</Button
			>
		</div>

		<Sheet
			bind:open={rightOpen}
			side="right"
			title="Quick settings"
			description="Adjust rollout preferences without leaving the current page."
		>
			<div class="space-y-3">
				<p class="text-sm text-app-text-muted">
					Use a side sheet for supporting decisions and short edits.
				</p>
			</div>
		</Sheet>

		<Sheet
			bind:open={bottomOpen}
			side="bottom"
			title="Launch note"
			description="Review the final note before go-live."
		>
			<div class="space-y-3">
				<p class="text-sm text-app-text-muted">
					Use a bottom sheet when the content reads like a stacked mobile drawer.
				</p>
			</div>
		</Sheet>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Large Left Sheet"
			subtitle="Open a wider sheet from the left for navigation or historical context."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Button role="secondary" variant="outline" onclick={() => (rightOpen = true)}
					>Reuse current example</Button
				>
			</div>

			<Sheet
				bind:open={rightOpen}
				side="left"
				size="lg"
				title="Release timeline"
				description="Review milestones, approvals, and notes from earlier drafts."
			>
				<div class="grid gap-3">
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Monday</p>
						<p class="text-sm text-app-text-muted">Kickoff and editorial alignment.</p>
					</div>
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Thursday</p>
						<p class="text-sm text-app-text-muted">Approval and launch readiness review.</p>
					</div>
				</div>
			</Sheet>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
