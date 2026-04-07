<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Popover } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Button, Popover } from '$lib/components';
	<\/script>

	<Popover class="inline-flex">
		<Button role="secondary" variant="outline">Open popover</Button>

		{#snippet content()}
			<div class="space-y-2">
				<p class="font-medium text-app-text">Quick settings</p>
				<p class="text-sm text-app-text-muted">Adjust a few preferences without leaving the page.</p>
			</div>
		{/snippet}
	</Popover>`;
</script>

<ComponentDocsPage
	slug="popover"
	title="Popover"
	subtitle="A click-triggered overlay for compact settings and contextual detail."
	description="Sprix popover component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<Popover class="inline-flex">
				<Button role="secondary" variant="outline">Open quick settings</Button>

				{#snippet content()}
					<div class="w-72 space-y-3">
						<p class="font-medium text-app-text">Quick settings</p>
						<p class="text-sm text-app-text-muted">
							Adjust publish controls, launch reminders, and team visibility without leaving the
							editor.
						</p>
						<div class="flex justify-end">
							<Button size="sm" role="secondary" variant="outline">Done</Button>
						</div>
					</div>
				{/snippet}
			</Popover>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample title="Text Content" subtitle="Use the text prop for short contextual hints.">
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Popover
					text="This release note will be visible to every signed-in customer."
					class="inline-flex"
				>
					<Button
						size="sm"
						role="secondary"
						variant="quiet"
						icon="information-circle"
						ariaLabel="Release note visibility"
					/>
				</Popover>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
