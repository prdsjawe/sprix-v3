<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { ToggleGroup } from '$lib/components';

	let singleValue = $state('week');
	let multiValue = $state(['email', 'push']);

	const cadenceItems = [
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' }
	];

	const channelItems = [
		{ value: 'email', label: 'Email' },
		{ value: 'push', label: 'Push' },
		{ value: 'slack', label: 'Slack' }
	];

	const basicSnippet = `<script lang="ts">
		import { ToggleGroup } from '$lib/components';

		let value = $state('week');

		const items = [
			{ value: 'day', label: 'Day' },
			{ value: 'week', label: 'Week' },
			{ value: 'month', label: 'Month' }
		];
	<\/script>

	<ToggleGroup bind:value={value} items={items} type="radio" ariaLabel="Reporting cadence" />`;
</script>

<ComponentDocsPage
	slug="toggle-group"
	title="Toggle Group"
	subtitle="A grouped set of toggleable options for single or multiple selection."
	description="Sprix toggle group component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<ToggleGroup
				bind:value={singleValue}
				items={cadenceItems}
				type="radio"
				indicator
				ariaLabel="Reporting cadence"
			/>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Multiple Selection"
			subtitle="Switch to check mode when users can combine channels or filters."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<ToggleGroup
					bind:values={multiValue}
					items={channelItems}
					type="check"
					variant="ghost"
					ariaLabel="Delivery channels"
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
