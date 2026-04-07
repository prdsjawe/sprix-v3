<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { ComboBox, ComboBoxItem } from '$lib/components';

	let assignee = $state('');
	let assigneeOpen = $state(false);
	let channel = $state('');
	let channelOpen = $state(false);

	const selectAssignee = (value: string) => {
		assignee = value;
		assigneeOpen = false;
	};

	const selectChannel = (value: string) => {
		channel = value;
		channelOpen = false;
	};

	const basicSnippet = `<script lang="ts">
		import { ComboBox, ComboBoxItem } from '$lib/components';

		let value = $state('');
		let open = $state(false);
	<\/script>

	<ComboBox bind:value={value} bind:open={open} placeholder="Choose assignee">
		<ComboBoxItem label="Emma Li" onclick={() => ((value = 'Emma Li'), (open = false))} />
		<ComboBoxItem label="Mina Park" onclick={() => ((value = 'Mina Park'), (open = false))} />
	</ComboBox>`;
</script>

<ComponentDocsPage
	slug="combo-box"
	title="ComboBox"
	subtitle="A searchable text field with a custom suggestion list."
	description="Sprix combobox component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-md">
			<ComboBox bind:value={assignee} bind:open={assigneeOpen} placeholder="Choose assignee">
				<ComboBoxItem
					label="Emma Li"
					description="Operations lead"
					selected={assignee === 'Emma Li'}
					onclick={() => selectAssignee('Emma Li')}
				/>
				<ComboBoxItem
					label="Mina Park"
					description="Content strategist"
					selected={assignee === 'Mina Park'}
					onclick={() => selectAssignee('Mina Park')}
				/>
				<ComboBoxItem
					label="Lara Ong"
					description="Lifecycle marketing"
					selected={assignee === 'Lara Ong'}
					onclick={() => selectAssignee('Lara Ong')}
				/>
			</ComboBox>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Helper Copy"
			subtitle="Use helper text when the choice affects workflow or delivery."
		>
			<div class="mx-auto w-full max-w-md">
				<ComboBox
					bind:value={channel}
					bind:open={channelOpen}
					placeholder="Pick channel"
					helper="Choose the launch surface that should receive this campaign."
				>
					<ComboBoxItem
						label="Homepage"
						selected={channel === 'Homepage'}
						onclick={() => selectChannel('Homepage')}
					/>
					<ComboBoxItem
						label="Lifecycle"
						selected={channel === 'Lifecycle'}
						onclick={() => selectChannel('Lifecycle')}
					/>
					<ComboBoxItem
						label="Partners"
						selected={channel === 'Partners'}
						onclick={() => selectChannel('Partners')}
					/>
				</ComboBox>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
