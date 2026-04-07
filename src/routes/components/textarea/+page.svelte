<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Textarea } from '$lib/components';

	let summary = $state('');
	let notes = $state('');

	const basicSnippet = `<script lang="ts">
		import { Textarea } from '$lib/components';

		let value = $state('');
	<\/script>

	<Textarea bind:value={value} rows={5} placeholder="Write a short summary" />`;
</script>

<ComponentDocsPage
	slug="textarea"
	title="Textarea"
	subtitle="A multi-line input for notes, summaries, and message drafts."
	description="Sprix textarea component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-xl gap-4">
			<Textarea
				bind:value={summary}
				rows={5}
				placeholder="Write the launch summary"
				resize="vertical"
			/>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Use helper and error copy when the text needs stronger guidance."
		>
			<div class="mx-auto grid w-full max-w-xl gap-4">
				<Textarea bind:value={notes} rows={4} helper="Keep this concise for the launch channel." />
				<Textarea rows={4} error="Add at least one key customer-facing change before publishing." />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
