<script lang="ts">
	import { Avatar, Badge, Button, Sidebar as UISidebar } from '$lib/components';
	import ExampleHeader from './ExampleHeader.svelte';

	let {
		appName,
		pageTitle,
		pageDescription,
		statusLabel,
		sidebarTitle = 'Workspace',
		sidebarItems,
		primaryActionLabel,
		secondaryActionLabel,
		children
	}: App.Components.ExampleAppShellProps = $props();

	let sidebarValue = $derived(
		sidebarItems.find((item) => item.active)?.id ?? sidebarItems[0]?.id ?? ''
	);

	let sidebarEntries = $derived(
		sidebarItems.map((item) => ({
			id: item.id,
			label: item.label,
			icon: item.icon
		}))
	);

	let sidebarLabel = $derived(`${appName} navigation`);
</script>

<div class="overflow-hidden rounded-3xl border border-app-border bg-app-surface">
	<ExampleHeader {appName} />

	<div class="lg:flex">
		<div class="bg-app-surface">
			<UISidebar
				items={sidebarEntries}
				value={sidebarValue}
				showCollapseToggle={false}
				ariaLabel={sidebarLabel}
				class="min-h-full w-full rounded-none border-0 bg-transparent shadow-none lg:w-auto"
			>
				{#snippet footer()}
					<div class="flex items-center gap-3 px-1">
						<Avatar name="Jawe Ordillano" />
						<div class="grid gap-0.5">
							<p class="text-sm font-medium text-zinc-950 dark:text-zinc-50">Jawe Ordillano</p>
							<p class="text-xs text-zinc-500 dark:text-zinc-400">jawe@sprix.dev</p>
						</div>
					</div>
				{/snippet}
			</UISidebar>
		</div>

		<main class="bg-app-bg px-4 py-5 sm:px-6 sm:py-6 lg:flex-1 lg:px-8 lg:py-8">
			<div class="grid gap-6">
				<div
					class="flex flex-col gap-4 border-b border-app-border pb-6 xl:flex-row xl:items-end xl:justify-between"
				>
					<div class="space-y-2">
						<div class="flex flex-wrap items-center gap-3">
							<h3 class="text-2xl font-semibold tracking-tight text-app-text sm:text-3xl">
								{pageTitle}
							</h3>
							{#if statusLabel}
								<Badge role="primary" variant="modern">{statusLabel}</Badge>
							{/if}
						</div>

						{#if pageDescription}
							<p class="max-w-3xl text-sm leading-6 text-app-text-muted sm:text-base">
								{pageDescription}
							</p>
						{:else}
							<p class="text-sm font-medium text-app-text-muted">{appName}</p>
						{/if}
					</div>
					{#if secondaryActionLabel || primaryActionLabel}
						<div class="flex flex-wrap gap-3">
							{#if secondaryActionLabel}
								<Button role="secondary" variant="outline" size="sm">
									{secondaryActionLabel}
								</Button>
							{/if}
							{#if primaryActionLabel}
								<Button size="sm">{primaryActionLabel}</Button>
							{/if}
						</div>
					{/if}
				</div>

				{@render children()}
			</div>
		</main>
	</div>
</div>
