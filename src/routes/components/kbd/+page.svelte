<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Kbd } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Kbd } from '$lib/components';
	<\/script>

	<div class="flex items-center gap-2">
		<Kbd>⌘</Kbd>
		<Kbd>K</Kbd>
	</div>`;
</script>

<ComponentDocsPage
	slug="kbd"
	title="Kbd"
	subtitle="A small keycap label for shortcuts and command hints."
	description="Sprix kbd component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
			<Kbd>⌘</Kbd>
			<Kbd>K</Kbd>
			<Kbd>Shift</Kbd>
			<Kbd>Enter</Kbd>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Combinations"
			subtitle="Group keys together when a shortcut depends on the sequence."
		>
			<div
				class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 text-sm text-app-text"
			>
				<div class="flex items-center gap-2"><Kbd>⌘</Kbd><Kbd>B</Kbd><span>Open brief</span></div>
				<div class="flex items-center gap-2">
					<Kbd>⌘</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd><span>Publish</span>
				</div>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
