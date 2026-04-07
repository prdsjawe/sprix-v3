<script lang="ts">
	import { goto } from '$app/navigation';
	import { Header } from '../../app/components';
	import { Badge, Button, Icon } from '$lib/components';
</script>

<svelte:head>
	<title>Showcase | Sprix</title>
	<meta name="description" content="Sprix showcase is coming soon." />
</svelte:head>

<Header fixedOnScroll />

<section
	class="flex min-h-[calc(100dvh-4rem)] w-full justify-center px-4 pt-24 pb-10 sm:px-6 sm:pt-28"
>
	<div class="flex w-full max-w-2xl flex-col items-center justify-start gap-5 text-center">
		<div
			class="flex size-18 items-center justify-center rounded-full border border-app-border bg-app-surface"
		>
			<Icon name="sparkles" class="size-8 fill-transparent stroke-app-text" />
		</div>

		<Badge role="warning" variant="modern">Coming Soon</Badge>

		<h1 class="text-4xl font-bold tracking-tight text-app-text sm:text-7xl">Coming Soon</h1>

		<p class="max-w-xl text-base text-app-text-muted sm:text-lg">
			Check out the components page now.
		</p>

		<Button onclick={() => goto('/components')}>Go to Components</Button>
	</div>
</section>
