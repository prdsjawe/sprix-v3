<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Select } from '$lib/components';

	let owner = $state('emma');
	let region = $state('asia');

	const ownerOptions = [
		{ value: 'emma', label: 'Emma Li', description: 'Operations lead' },
		{ value: 'mina', label: 'Mina Park', description: 'Content strategist' },
		{ value: 'lara', label: 'Lara Ong', description: 'Lifecycle marketing' }
	];

	const regionOptions = [
		{ value: 'americas', label: 'Americas', group: 'Regional' },
		{ value: 'asia', label: 'Asia Pacific', group: 'Regional' },
		{ value: 'emea', label: 'EMEA', group: 'Regional' }
	];

	const basicSnippet = `<script lang="ts">
		import { Select } from '$lib/components';

		let value = $state('emma');

		const options = [
			{ value: 'emma', label: 'Emma Li' },
			{ value: 'mina', label: 'Mina Park' }
		];
	<\/script>

	<Select bind:value={value} options={options} placeholder="Choose owner" />`;
</script>

<ComponentDocsPage
	slug="select"
	title="Select"
	subtitle="A styled selection menu for well-defined option lists."
	description="Sprix select component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-lg">
			<Select bind:value={owner} options={ownerOptions} placeholder="Choose owner" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Grouped Options"
			subtitle="Organize longer lists with light grouping when the categories are obvious."
		>
			<div class="mx-auto w-full max-w-lg">
				<Select bind:value={region} options={regionOptions} placeholder="Choose region" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
