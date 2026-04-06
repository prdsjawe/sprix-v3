<script lang="ts">
	import {
		Avatar,
		Button,
		Input,
		NavMenu,
		NavMenuItem,
		NavMenuRight,
		NavMenuTrigger
	} from '$lib/components';
	import DarkMode from './DarkMode.svelte';

	let { appName }: App.Components.ExampleHeaderProps = $props();

	const navItems = ['Overview', 'Activity', 'Team'] as const;
</script>

<NavMenu
	ariaLabel={`${appName} workspace navigation`}
	class="min-h-16 rounded-none border-0 border-b border-app-border bg-app-surface px-4 py-4 text-app-text backdrop-blur-none sm:px-6"
>
	{#snippet logo()}
		<div class="flex items-center gap-3">
			<img src="/logo.png" alt="Sprix logo" class="h-7 w-auto" />
		</div>
	{/snippet}

	{#each navItems as item, index (item)}
		<NavMenuItem>
			<NavMenuTrigger current={index === 0}>{item}</NavMenuTrigger>
		</NavMenuItem>
	{/each}

	{#snippet right()}
		<NavMenuRight class="gap-3">
			<Button size="sm" role="secondary" variant="quiet" icon="bell" ariaLabel="Notifications" />
			<div class="hidden xl:block xl:w-72">
				<Input
					size="sm"
					ariaLabel="Search workspace"
					placeholder="Search workspace"
					leftIcon="magnifying-glass"
				/>
			</div>

			<DarkMode class="shrink-0" />

			<div class="flex items-center gap-3">
				<Avatar name="Jawe Ordillano" />
				<div class="hidden sm:block">
					<p class="text-sm font-medium text-app-text">Jawe Ordillano</p>
					<p class="text-xs text-app-text-subtle">jawe@sprix.dev</p>
				</div>
			</div>
		</NavMenuRight>
	{/snippet}
</NavMenu>
