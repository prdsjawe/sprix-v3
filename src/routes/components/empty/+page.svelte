<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Empty } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Button, Empty } from '$lib/components';
	<\/script>

	<Empty
		title="No drafts yet"
		description="Start a new draft to prepare your next release."
		icon="document-text"
	>
		{#snippet action()}
			<Button>Create draft</Button>
		{/snippet}
	</Empty>`;
</script>

<ComponentDocsPage
	slug="empty"
	title="Empty"
	subtitle="A calm placeholder for blank states and zero-result screens."
	description="Sprix empty component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-2xl">
			<Empty
				title="No launch notes yet"
				description="Create a release brief to track messaging, approvals, and go-live tasks."
				icon="document-text"
			>
				{#snippet action()}
					<Button>Create brief</Button>
				{/snippet}
			</Empty>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Plain Variant"
			subtitle="Use a lighter presentation inside cards, drawers, and compact surfaces."
		>
			<div class="mx-auto w-full max-w-2xl">
				<Empty
					variant="plain"
					align="left"
					title="No reviewers assigned"
					description="Invite a teammate to keep approvals moving before launch day."
					icon="users"
				>
					{#snippet action()}
						<Button role="secondary" variant="outline">Invite reviewer</Button>
					{/snippet}
				</Empty>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
