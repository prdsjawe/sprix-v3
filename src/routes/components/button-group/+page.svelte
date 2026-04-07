<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, ButtonGroup } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Button, ButtonGroup } from '$lib/components';
	<\/script>

	<ButtonGroup>
		<Button role="secondary" variant="outline">Day</Button>
		<Button role="secondary" variant="outline">Week</Button>
		<Button role="secondary" variant="outline">Month</Button>
	</ButtonGroup>`;
</script>

<ComponentDocsPage
	slug="button-group"
	title="Button Group"
	subtitle="A compact wrapper for adjacent actions that belong together."
	description="Sprix button group component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<ButtonGroup>
				<Button role="secondary" variant="outline">Day</Button>
				<Button role="secondary" variant="outline">Week</Button>
				<Button role="secondary" variant="outline">Month</Button>
			</ButtonGroup>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Vertical Stack"
			subtitle="Switch the group orientation for tool trays and side panels."
		>
			<div class="mx-auto flex w-full max-w-3xl justify-center">
				<ButtonGroup orientation="vertical">
					<Button role="secondary" variant="outline" leftIcon="sparkles">Overview</Button>
					<Button role="secondary" variant="outline" leftIcon="chart-bar">Reports</Button>
					<Button role="secondary" variant="outline" leftIcon="users">Team</Button>
				</ButtonGroup>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
