<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Input } from '$lib/components';

	let search = $state('');
	let workspace = $state('');

	const basicSnippet = `<script lang="ts">
		import { Input } from '$lib/components';

		let value = $state('');
	<\/script>

	<Input bind:value={value} placeholder="Search releases" leftIcon="magnifying-glass" />`;
</script>

<ComponentDocsPage
	slug="input"
	title="Input"
	subtitle="A text field for short-form values, search, and inline actions."
	description="Sprix input component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-xl gap-4">
			<Input bind:value={search} placeholder="Search releases" leftIcon="magnifying-glass" />
			<Input bind:value={workspace} placeholder="Workspace name" rightIcon="check" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Use helper and error copy to keep the input self-explanatory."
		>
			<div class="mx-auto grid w-full max-w-xl gap-4">
				<Input placeholder="Project slug" helper="Used for URLs and release references." />
				<Input placeholder="Invite email" error="Use a work email before continuing." />
				<Input placeholder="Read only token" value="sprix-live-947" readonly />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
