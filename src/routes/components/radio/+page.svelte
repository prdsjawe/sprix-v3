<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Radio } from '$lib/components';

	let visibility = $state('team');
	let cadence = $state('weekly');

	const basicSnippet = `<script lang="ts">
		import { Radio } from '$lib/components';

		let group = $state('team');
	<\/script>

	<div class="grid gap-3">
		<Radio bind:group={group} name="visibility" value="team" label="Team only" />
		<Radio bind:group={group} name="visibility" value="public" label="Public" />
	</div>`;
</script>

<ComponentDocsPage
	slug="radio"
	title="Radio"
	subtitle="A single-choice control for mutually exclusive options."
	description="Sprix radio component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-xl gap-3">
			<Radio bind:group={visibility} name="visibility" value="team" label="Team only" />
			<Radio bind:group={visibility} name="visibility" value="public" label="Public launch" />
			<Radio bind:group={visibility} name="visibility" value="private" label="Private preview" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Use helper and disabled states when the choice depends on access level or setup."
		>
			<div class="mx-auto grid w-full max-w-xl gap-3">
				<Radio
					bind:group={cadence}
					name="cadence"
					value="daily"
					label="Daily summary"
					helper="Best for active launch weeks."
				/>
				<Radio bind:group={cadence} name="cadence" value="weekly" label="Weekly summary" />
				<Radio
					bind:group={cadence}
					name="cadence"
					value="monthly"
					label="Monthly summary"
					disabled
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
