<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Checkbox } from '$lib/components';

	let publishNow = $state(true);
	let reminders = $state(false);
	let consent = $state(false);

	const basicSnippet = `<script lang="ts">
		import { Checkbox } from '$lib/components';

		let checked = $state(false);
	<\/script>

	<Checkbox bind:checked={checked} label="Email me weekly updates" />`;
</script>

<ComponentDocsPage
	slug="checkbox"
	title="Checkbox"
	subtitle="A binary control for selections, filters, and opt-in settings."
	description="Sprix checkbox component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-xl gap-4">
			<Checkbox bind:checked={publishNow} label="Publish this article immediately" />
			<Checkbox bind:checked={reminders} label="Send rollout reminders to the launch team" />
			<Checkbox bind:checked={consent} label="Require sign-off from compliance before launch" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Pair helper and error copy with disabled and unavailable states."
		>
			<div class="mx-auto grid w-full max-w-xl gap-4">
				<Checkbox
					checked
					label="Available option"
					helper="This preference is applied to every new project."
				/>
				<Checkbox
					disabled
					label="Locked preference"
					helper="Only workspace owners can edit this setting."
				/>
				<Checkbox label="Missing requirement" error="You need to confirm this before continuing." />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
