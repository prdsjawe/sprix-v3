<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Field, Input, Toggle } from '$lib/components';

	let projectName = $state('');
	let autoPublish = $state(true);

	const basicSnippet = `<script lang="ts">
		import { Field, Input } from '$lib/components';

		let value = $state('');
	<\/script>

	<Field label="Project name" name="project-name" helper="Visible across your workspace.">
		<Input bind:value={value} placeholder="Spring launch" />
	</Field>`;
</script>

<ComponentDocsPage
	slug="field"
	title="Field"
	subtitle="A wrapper that pairs labels, descriptions, and validation around controls."
	description="Sprix field component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-xl gap-4">
			<Field
				label="Project name"
				name="project-name"
				description="Use a clear internal title so reviewers can find the right brief."
				helper="Visible across the workspace."
			>
				<Input bind:value={projectName} placeholder="Spring launch" />
			</Field>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Horizontal Layout"
			subtitle="Switch to a horizontal field for compact preference rows."
		>
			<div class="mx-auto w-full max-w-xl">
				<Field
					label="Auto publish"
					name="auto-publish"
					orientation="horizontal"
					helper="Turn this on to push the release live after approval."
				>
					<Toggle bind:checked={autoPublish} />
				</Field>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
