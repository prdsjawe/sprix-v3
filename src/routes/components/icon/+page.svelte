<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Icon } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Icon } from '$lib/components';
	<\/script>

	<Icon name="sparkles" class="size-5 text-app-text" />`;
</script>

<ComponentDocsPage
	slug="icon"
	title="Icon"
	subtitle="An SVG icon primitive for controls, labels, and supporting decoration."
	description="Sprix icon component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 text-app-text sm:grid-cols-8">
			<div class="flex flex-col items-center gap-2">
				<Icon name="sparkles" class="size-6" /><span class="text-xs">sparkles</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="chart-bar" class="size-6" /><span class="text-xs">chart-bar</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="users" class="size-6" /><span class="text-xs">users</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="bell" class="size-6" /><span class="text-xs">bell</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="home" class="size-6" /><span class="text-xs">home</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="arrow-right" class="size-6" /><span class="text-xs">arrow-right</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="document-text" class="size-6" /><span class="text-xs">document-text</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon name="rocket-launch" class="size-6" /><span class="text-xs">rocket-launch</span>
			</div>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Scale with Utilities"
			subtitle="Use standard utility classes to size and color the icon with surrounding text."
		>
			<div class="mx-auto flex w-full max-w-3xl items-end justify-center gap-6 text-app-text">
				<Icon name="sparkles" class="size-4 text-app-text-muted" />
				<Icon name="sparkles" class="size-6 text-app-text" />
				<Icon name="sparkles" class="size-8 text-app-text" />
				<Icon name="sparkles" class="size-10 text-app-text" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
