<script lang="ts">
	import { Button, NavMenu, NavMenuItem, NavMenuRight, NavMenuTrigger } from '$lib/components';
	import DarkMode from './DarkMode.svelte';

	const navItems = [
		{ href: '/components', label: 'Components' },
		{ href: '/showcase', label: 'Showcase' },
		{ href: '/developer', label: 'Developer' }
	] as const;
</script>

<NavMenu fixedOnScroll class="min-h-16">
	{#snippet logo()}
		<a href="/" aria-label="Sprix home" class="flex items-center gap-2">
			<img src="/logo.png" alt="Sprix logo" class="h-8 w-auto" />
		</a>
	{/snippet}

	{#each navItems as item}
		<NavMenuItem>
			<NavMenuTrigger href={item.href}>{item.label}</NavMenuTrigger>
		</NavMenuItem>
	{/each}

	{#snippet right()}
		<NavMenuRight class="gap-2.5">
			<DarkMode />
			<Button size="sm" rightIcon="arrow-top-right-on-square">Contact</Button>
		</NavMenuRight>
	{/snippet}
</NavMenu>
