<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Breadcrumb } from '$lib/components';

	const breadcrumbPathItems = [
		{ label: 'Workspace', href: '/components' },
		{ label: 'Content' },
		{ label: 'Articles' },
		{ label: 'Launch brief', current: true }
	] satisfies Breadcrumb.Item[];

	const iconBreadcrumbItems = [
		{ label: 'Home', href: '/', icon: 'home' },
		{ label: 'Components', href: '/components' },
		{ label: 'Breadcrumb', current: true }
	] satisfies Breadcrumb.Item[];

	const basicSnippet = `<script lang="ts">
		import { Breadcrumb } from '$lib/components';

		const items = [
			{ label: 'Workspace', href: '/components' },
			{ label: 'Settings' },
			{ label: 'Billing', current: true }
		];
	<\/script>

	<Breadcrumb items={items} />`;
</script>

<ComponentDocsPage
	slug="breadcrumb"
	title="Breadcrumb"
	subtitle="A compact path that helps users stay oriented in deeper flows."
	description="Sprix breadcrumb component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-4xl">
			<Breadcrumb items={breadcrumbPathItems} />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample title="Icons" subtitle="Use icons sparingly for the first step in a path.">
			<div class="mx-auto w-full max-w-4xl">
				<Breadcrumb items={iconBreadcrumbItems} />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
