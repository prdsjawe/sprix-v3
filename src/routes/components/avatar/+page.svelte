<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Avatar } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Avatar } from '$lib/components';
	<\/script>

	<Avatar name="Emma Li" size="lg" />`;
</script>

<ComponentDocsPage
	slug="avatar"
	title="Avatar"
	subtitle="A profile image or fallback mark for people, teams, and workspaces."
	description="Sprix avatar component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-4">
			<Avatar name="Emma Li" size="md" />
			<Avatar name="Design Team" size="lg" />
			<Avatar src="/logo.png" alt="Sprix logo" name="Sprix" size="xl" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample title="Sizes" subtitle="Scale the avatar from dense rows to profile callouts.">
			<div class="mx-auto flex w-full max-w-4xl flex-wrap items-end justify-center gap-4">
				<Avatar name="Jawe Ordillano" size="xs" />
				<Avatar name="Jawe Ordillano" size="sm" />
				<Avatar name="Jawe Ordillano" size="md" />
				<Avatar name="Jawe Ordillano" size="lg" />
				<Avatar name="Jawe Ordillano" size="xl" />
				<Avatar name="Jawe Ordillano" size="2xl" />
				<Avatar name="Jawe Ordillano" size="3xl" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
