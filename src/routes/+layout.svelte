<script lang="ts">
	import { onMount } from 'svelte';
	import { Header } from '../app/components';
	import { applyTheme, readTheme } from '$lib/theme';
	import './layout.css';

	let { children } = $props();

	onMount(() => {
		applyTheme(readTheme());
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/logo-icon.png" />
</svelte:head>

<Header />
<main class="bg-app-bg text-app-text transition-colors">
	{@render children()}
</main>
