<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import {
		Button,
		Input,
		NavMenu,
		NavMenuContents,
		NavMenuItem,
		NavMenuRight,
		NavMenuTrigger
	} from '$lib/components';

	const navLinks = [
		{ label: 'Overview', href: '#' },
		{ label: 'Campaigns', href: '#' },
		{ label: 'Audience', href: '#' },
		{ label: 'Reports', href: '#' },
		{ label: 'Team', href: '#' }
	];

	const basicSnippet = `<script lang="ts">
		import { NavMenu, NavMenuItem, NavMenuTrigger } from '$lib/components';
	<\/script>

	<NavMenu ariaLabel="Workspace navigation">
		<NavMenuItem>
			<NavMenuTrigger href="#">Overview</NavMenuTrigger>
		</NavMenuItem>
		<NavMenuItem>
			<NavMenuTrigger href="#">Team</NavMenuTrigger>
		</NavMenuItem>
	</NavMenu>`;
</script>

<ComponentDocsPage
	slug="nav-menu"
	title="NavMenu"
	subtitle="A responsive top navigation pattern for product surfaces and app headers."
	description="Sprix navmenu component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full overflow-hidden rounded-3xl border border-app-border">
			<NavMenu
				ariaLabel="Workspace navigation"
				class="rounded-none border-0 bg-app-surface px-6 py-4"
			>
				{#snippet logo()}
					<div class="flex items-center gap-3">
						<img src="/logo.png" alt="Sprix logo" class="h-7 w-auto" />
					</div>
				{/snippet}

				{#each navLinks as item, index (item.label)}
					<NavMenuItem>
						<NavMenuTrigger href={item.href} current={index === 0}>{item.label}</NavMenuTrigger>
					</NavMenuItem>
				{/each}

				{#snippet right()}
					<NavMenuRight class="gap-3">
						<div class="hidden xl:block xl:w-72">
							<Input
								size="sm"
								ariaLabel="Search workspace"
								placeholder="Search workspace"
								leftIcon="magnifying-glass"
							/>
						</div>
						<Button
							size="sm"
							role="secondary"
							variant="quiet"
							icon="bell"
							ariaLabel="Notifications"
						/>
						<Button size="sm" role="secondary" variant="outline">Share</Button>
					</NavMenuRight>
				{/snippet}
			</NavMenu>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Dropdown Content"
			subtitle="Add contextual flyout content for navigation areas with sub-sections."
		>
			<div class="mx-auto w-full overflow-hidden rounded-3xl border border-app-border">
				<NavMenu ariaLabel="Docs navigation" class="rounded-none border-0 bg-app-surface px-6 py-4">
					<NavMenuItem>
						<NavMenuTrigger href="#" current>Overview</NavMenuTrigger>
					</NavMenuItem>

					<NavMenuItem>
						<NavMenuTrigger>Components</NavMenuTrigger>
						<NavMenuContents>
							<div class="grid gap-3 md:grid-cols-2">
								<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
									<p class="font-medium text-app-text">Inputs</p>
									<p class="text-sm text-app-text-muted">Forms, toggles, and selection patterns.</p>
								</div>
								<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
									<p class="font-medium text-app-text">Overlays</p>
									<p class="text-sm text-app-text-muted">
										Dialogs, popovers, and menus for task flows.
									</p>
								</div>
							</div>
						</NavMenuContents>
					</NavMenuItem>

					<NavMenuItem>
						<NavMenuTrigger href="#">Resources</NavMenuTrigger>
					</NavMenuItem>

					{#snippet right()}
						<NavMenuRight class="gap-3">
							<div class="hidden xl:block xl:w-64">
								<Input
									size="sm"
									ariaLabel="Search docs"
									placeholder="Search docs"
									leftIcon="magnifying-glass"
								/>
							</div>
							<Button size="sm" role="secondary" variant="outline">Browse all</Button>
						</NavMenuRight>
					{/snippet}
				</NavMenu>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
