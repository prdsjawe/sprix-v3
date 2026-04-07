<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { AlertDialog, Button } from '$lib/components';

	let infoOpen = $state(false);
	let destructiveOpen = $state(false);
	let promptOpen = $state(false);

	const basicSnippet = `<script lang="ts">
		import { AlertDialog, Button } from '$lib/components';

		let open = $state(false);
	<\/script>

	<Button role="danger" variant="soft" onclick={() => (open = true)}>Delete project</Button>

	<AlertDialog
		bind:open={open}
		type="destructive"
		title="Delete project"
		description="This action removes the workspace and cannot be undone."
		confirmLabel="Delete"
		cancelLabel="Keep project"
	/>`;
</script>

<ComponentDocsPage
	slug="alert-dialog"
	title="Alert Dialog"
	subtitle="A focused confirmation surface for important decisions."
	description="Sprix alert dialog component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3">
			<Button role="secondary" variant="outline" onclick={() => (infoOpen = true)}
				>Review changes</Button
			>
			<Button role="danger" variant="soft" onclick={() => (destructiveOpen = true)}>
				Delete workspace
			</Button>
		</div>

		<AlertDialog
			bind:open={infoOpen}
			title="Save before leaving?"
			description="Unsaved edits in this release brief will be lost if you close the editor now."
			confirmLabel="Save draft"
			cancelLabel="Keep editing"
		/>

		<AlertDialog
			bind:open={destructiveOpen}
			type="destructive"
			title="Delete workspace"
			description="This permanently removes teammates, drafts, and billing history from the workspace."
			confirmLabel="Delete workspace"
			cancelLabel="Cancel"
		/>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Confirmation Prompt"
			subtitle="Require an explicit prompt when the action is irreversible."
		>
			<div class="mx-auto flex w-full max-w-3xl justify-center">
				<Button role="danger" variant="outline" onclick={() => (promptOpen = true)}
					>Archive account</Button
				>
			</div>

			<AlertDialog
				bind:open={promptOpen}
				type="destructive"
				title="Archive account"
				description="Type ARCHIVE to confirm before the account is moved out of production."
				confirmLabel="Archive account"
				cancelLabel="Not now"
				confirmPrompt="ARCHIVE"
			/>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
