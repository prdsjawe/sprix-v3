<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { NativeSelect } from '$lib/components';

	let country = $state('ph');
	let month = $state('april');

	const basicSnippet = `<script lang="ts">
		import { NativeSelect } from '$lib/components';

		let value = $state('april');
	<\/script>

	<NativeSelect bind:value={value}>
		<option value="april">April</option>
		<option value="may">May</option>
	</NativeSelect>`;
</script>

<ComponentDocsPage
	slug="native-select"
	title="Native Select"
	subtitle="A platform-native select control for dependable lightweight choice lists."
	description="Sprix native select component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-md gap-4">
			<NativeSelect bind:value={month}>
				<option value="april">April</option>
				<option value="may">May</option>
				<option value="june">June</option>
			</NativeSelect>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Helper Copy"
			subtitle="Pair the select with helper copy when the choice has downstream effects."
		>
			<div class="mx-auto w-full max-w-md">
				<NativeSelect bind:value={country} helper="This sets tax formatting for new invoices.">
					<option value="ph">Philippines</option>
					<option value="sg">Singapore</option>
					<option value="us">United States</option>
				</NativeSelect>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
