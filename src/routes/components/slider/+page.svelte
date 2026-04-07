<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Slider } from '$lib/components';

	let emphasis = $state([60]);
	let range = $state([20, 80]);

	const basicSnippet = `<script lang="ts">
		import { Slider } from '$lib/components';

		let value = $state([60]);
	<\/script>

	<Slider bind:value={value} ariaLabel="Hero emphasis" />`;
</script>

<ComponentDocsPage
	slug="slider"
	title="Slider"
	subtitle="A draggable range control for bounded numeric values."
	description="Sprix slider component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-xl space-y-4">
			<p class="text-sm text-app-text-muted">Adjust hero emphasis for the launch homepage.</p>
			<Slider bind:value={emphasis} ariaLabel="Hero emphasis" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Range"
			subtitle="Use multiple thumbs when the workflow needs a lower and upper bound."
		>
			<div class="mx-auto w-full max-w-xl space-y-4">
				<p class="text-sm text-app-text-muted">
					Set a safe rollout window for the release notification.
				</p>
				<Slider bind:value={range} minStepsBetweenThumbs={10} ariaLabel="Safe rollout window" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
