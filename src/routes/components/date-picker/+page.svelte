<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { DatePicker } from '$lib/components';

	let publishDate = $state(['2026-04-12']);
	let sprintRange = $state(['2026-04-09', '2026-04-17']);

	const basicSnippet = `<script lang="ts">
		import { DatePicker } from '$lib/components';

		let value = $state(['2026-04-12']);
	<\/script>

	<DatePicker bind:value={value} placeholder="Choose a publish date" />`;
</script>

<ComponentDocsPage
	slug="date-picker"
	title="Date Picker"
	subtitle="A calendar input for single dates and date ranges."
	description="Sprix date picker component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-md">
			<DatePicker bind:value={publishDate} placeholder="Choose a publish date" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Range Selection"
			subtitle="Enable range mode when users need a start and end date together."
		>
			<div class="mx-auto w-full max-w-md">
				<DatePicker
					bind:value={sprintRange}
					range
					placeholder="Choose sprint dates"
					min="2026-04-01"
					max="2026-04-30"
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
