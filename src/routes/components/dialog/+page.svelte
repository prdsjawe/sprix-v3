<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Dialog } from '$lib/components';

	let inviteOpen = $state(false);
	let summaryOpen = $state(false);

	const basicSnippet = `<script lang="ts">
		import { Button, Dialog } from '$lib/components';

		let open = $state(false);
	<\/script>

	<Button onclick={() => (open = true)}>Invite teammates</Button>

	<Dialog bind:open={open} title="Invite teammates" description="Share access with your launch team.">
		<p class="text-sm text-app-text-muted">Send invites by email or paste a workspace link.</p>
	</Dialog>`;
</script>

<ComponentDocsPage
	slug="dialog"
	title="Dialog"
	subtitle="A modal surface for focused tasks and short-form workflows."
	description="Sprix dialog component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<Button onclick={() => (inviteOpen = true)}>Invite teammates</Button>
		</div>

		<Dialog
			bind:open={inviteOpen}
			title="Invite teammates"
			description="Share access with editors, reviewers, and launch operators."
		>
			<div class="space-y-3">
				<p class="text-sm text-app-text-muted">
					Send invites by email or share a workspace link with limited permissions.
				</p>
			</div>

			{#snippet footer()}
				<div class="flex justify-end gap-2">
					<Button role="secondary" variant="outline" onclick={() => (inviteOpen = false)}
						>Cancel</Button
					>
					<Button onclick={() => (inviteOpen = false)}>Send invite</Button>
				</div>
			{/snippet}
		</Dialog>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Large Dialog"
			subtitle="Use larger widths when the task needs more comparison or detail."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Button role="secondary" variant="outline" onclick={() => (summaryOpen = true)}>
					Review launch summary
				</Button>
			</div>

			<Dialog
				bind:open={summaryOpen}
				size="lg"
				title="Launch summary"
				description="Final review before the release goes live."
			>
				<div class="grid gap-3 md:grid-cols-2">
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Content</p>
						<p class="text-sm text-app-text-muted">
							All hero, email, and help center copy is approved.
						</p>
					</div>
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Operations</p>
						<p class="text-sm text-app-text-muted">
							Support macros and internal runbooks are ready.
						</p>
					</div>
				</div>
			</Dialog>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
