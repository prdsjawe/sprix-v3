<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Command, Kbd } from '$lib/components';

	let commandOpen = $state(false);

	const commandItems = [
		{
			value: 'open-launch-brief',
			label: 'Open launch brief',
			description: 'Jump back into the release draft.',
			group: 'Content',
			icon: 'document-text',
			shortcut: ['G', 'B']
		},
		{
			value: 'review-analytics',
			label: 'Review analytics',
			description: 'Inspect the latest campaign performance.',
			group: 'Growth',
			icon: 'chart-bar'
		},
		{
			value: 'notify-team',
			label: 'Notify team',
			description: 'Share the latest rollout note with operators.',
			group: 'Operations',
			icon: 'megaphone'
		}
	] satisfies Command.Item[];

	const basicSnippet = `<script lang="ts">
		import { Button, Command } from '$lib/components';

		let open = $state(false);

		const items = [
			{ value: 'launch', label: 'Open launch brief', description: 'Return to the current release brief.' }
		];
	<\/script>

	<Button onclick={() => (open = true)}>Open command menu</Button>
	<Command bind:open={open} items={items} title="Quick actions" />`;
</script>

<ComponentDocsPage
	slug="command"
	title="Command"
	subtitle="A searchable action surface for fast keyboard-driven workflows."
	description="Sprix command component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<Button onclick={() => (commandOpen = true)}>Open command menu</Button>
		</div>

		<Command
			bind:open={commandOpen}
			items={commandItems}
			title="Quick actions"
			description="Search across common launch and workspace actions."
		/>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Footer Shortcut"
			subtitle="Keep a small keyboard hint visible in the footer."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Button role="secondary" variant="outline" onclick={() => (commandOpen = true)}>
					Reopen palette
				</Button>
			</div>

			<Command
				bind:open={commandOpen}
				items={commandItems}
				title="Quick actions"
				description="Search across release, growth, and support tasks."
			>
				{#snippet footer()}
					<div class="flex items-center justify-between gap-3 text-sm text-app-text-muted">
						<span>Use arrows to move through results.</span>
						<div class="flex items-center gap-2">
							<Kbd>↑</Kbd>
							<Kbd>↓</Kbd>
							<Kbd>↵</Kbd>
						</div>
					</div>
				{/snippet}
			</Command>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
