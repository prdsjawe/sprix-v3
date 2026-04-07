<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Sidebar } from '$lib/components';

	const sidebarItems = [
		{ id: 'overview', label: 'Overview', icon: 'home' },
		{
			id: 'campaigns',
			label: 'Campaigns',
			icon: 'megaphone',
			surface: 'multipanel',
			entries: [
				{ id: 'homepage', label: 'Homepage', description: 'Primary launch placement' },
				{ id: 'lifecycle', label: 'Lifecycle', description: 'Email and retention' }
			]
		},
		{ id: 'analytics', label: 'Analytics', icon: 'chart-bar' },
		{ id: 'settings', label: 'Settings', icon: 'cog-6-tooth' }
	] satisfies Sidebar.Item[];

	let sidebarValue = $state('overview');
	let openItem = $state('campaigns');

	const basicSnippet = `<script lang="ts">
		import { Sidebar } from '$lib/components';

		const items = [
			{ id: 'overview', label: 'Overview', icon: 'home' },
			{ id: 'settings', label: 'Settings', icon: 'cog-6-tooth' }
		];
	<\/script>

	<Sidebar items={items} value="overview" ariaLabel="Workspace navigation" />`;
</script>

<ComponentDocsPage
	slug="sidebar"
	title="Sidebar"
	subtitle="A navigational rail for app sections, nested entries, and persistent context."
	description="Sprix sidebar component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div
			class="mx-auto h-96 w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border bg-app-surface"
		>
			<Sidebar
				items={sidebarItems}
				bind:value={sidebarValue}
				bind:openItem
				scrollable
				ariaLabel="Workspace navigation"
				class="h-full rounded-none border-0 bg-transparent"
			>
				{#snippet header()}
					<div class="grid gap-1">
						<p class="text-sm font-medium text-app-text">Workspace</p>
						<p class="text-xs text-app-text-muted">Spring launch</p>
					</div>
				{/snippet}
			</Sidebar>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Rail Only"
			subtitle="Collapse the surface into an icon rail when horizontal space is tight."
		>
			<div
				class="mx-auto h-80 w-full max-w-sm overflow-hidden rounded-3xl border border-app-border bg-app-surface"
			>
				<Sidebar
					items={sidebarItems}
					value="overview"
					railOnly
					collapsed
					showCollapseToggle={false}
					ariaLabel="Compact workspace navigation"
					class="h-full rounded-none border-0 bg-transparent"
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
