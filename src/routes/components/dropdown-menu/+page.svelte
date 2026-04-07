<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, DropdownMenu } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Button, DropdownMenu } from '$lib/components';
	<\/script>

	<DropdownMenu role="secondary" variant="outline">
		{#snippet trigger()}Workspace actions{/snippet}

		<div class="flex min-w-56 flex-col gap-1 p-1">
			<Button role="secondary" variant="quiet" class="justify-start">Rename workspace</Button>
			<Button role="secondary" variant="quiet" class="justify-start">Manage members</Button>
		</div>
	</DropdownMenu>`;
</script>

<ComponentDocsPage
	slug="dropdown-menu"
	title="Dropdown Menu"
	subtitle="A compact action menu anchored to a button."
	description="Sprix dropdown menu component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<DropdownMenu role="secondary" variant="outline">
				{#snippet trigger()}Workspace actions{/snippet}

				<div class="flex min-w-56 flex-col gap-1 p-1">
					<Button role="secondary" variant="quiet" class="justify-start">Rename workspace</Button>
					<Button role="secondary" variant="quiet" class="justify-start">Manage members</Button>
					<Button role="secondary" variant="quiet" class="justify-start">Share update</Button>
					<Button role="danger" variant="quiet" class="justify-start">Archive workspace</Button>
				</div>
			</DropdownMenu>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Aligned End"
			subtitle="Shift the menu alignment when it sits near the right edge of the layout."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-end">
				<DropdownMenu
					placement="bottom-end"
					role="secondary"
					variant="quiet"
					rightIcon="ellipsis-vertical"
				>
					{#snippet trigger()}Actions{/snippet}

					<div class="flex min-w-48 flex-col gap-1 p-1">
						<Button role="secondary" variant="quiet" class="justify-start">Duplicate</Button>
						<Button role="secondary" variant="quiet" class="justify-start">Move</Button>
						<Button role="danger" variant="quiet" class="justify-start">Delete</Button>
					</div>
				</DropdownMenu>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
