<script lang="ts">
	import { page } from '$app/state';
	import { Header } from '../../app/components';
	import { Sidebar as SprixSidebar } from '$lib/components';
	import { sidebarLabels, toComponentHref, toKebabCase } from './sidebar';

	const sidebarItems: Sidebar.Item[] = sidebarLabels.map((label) => {
		const id = toKebabCase(label);

		return {
			id,
			label,
			href: toComponentHref(id)
		};
	});

	const activeValue = $derived.by(() => {
		const slug = page.url.pathname.split('/')[2] ?? 'getting-started';
		return sidebarItems.some((item) => item.id === slug) ? slug : 'getting-started';
	});

	let { children } = $props();
</script>

<Header fixedOnScroll />

<div
	class="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-app-bg text-app-text transition-colors lg:flex-row"
>
	<SprixSidebar
		railOnly
		scrollable
		showCollapseToggle={false}
		ariaLabel="Components navigation"
		items={sidebarItems}
		value={activeValue}
		class="max-h-72 shrink-0 rounded-none border-0 border-b border-app-border bg-app-surface shadow-none lg:h-full lg:max-h-none lg:w-80 lg:border-r lg:border-b-0"
	>
		{#snippet header()}
			<div class="grid gap-1">
				<p class="text-sm font-medium text-zinc-950 dark:text-zinc-50">Components</p>
			</div>
		{/snippet}
	</SprixSidebar>

	<div class="min-h-0 flex-1 overflow-y-auto">
		<main class="min-h-full px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
			{@render children()}
		</main>
	</div>
</div>
