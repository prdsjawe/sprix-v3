<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Toggle } from '$lib/components';

	let darkMode = $state(true);
	let autoPublish = $state(false);

	const basicSnippet = `<script lang="ts">
		import { Toggle } from '$lib/components';

		let checked = $state(false);
	<\/script>

	<Toggle bind:checked={checked} ariaLabel="Enable dark mode" />`;
</script>

<ComponentDocsPage
	slug="toggle"
	title="Toggle"
	subtitle="A binary switch for preferences and persistent on-off settings."
	description="Sprix toggle component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-md items-center justify-center gap-6">
			<Toggle bind:checked={darkMode} ariaLabel="Enable dark mode" />
			<Toggle bind:checked={autoPublish} size="lg" ariaLabel="Enable auto publish" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Use size and disabled states to adapt the switch to the surrounding surface."
		>
			<div class="mx-auto flex w-full max-w-md items-center justify-center gap-6">
				<Toggle size="sm" checked ariaLabel="Small toggle" />
				<Toggle size="md" ariaLabel="Medium toggle" />
				<Toggle size="lg" disabled ariaLabel="Disabled toggle" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
