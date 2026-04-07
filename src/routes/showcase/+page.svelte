<script lang="ts">
	import { Badge, Button, Card, Link } from '$lib/components';
</script>

<svelte:head>
	<title>Showcase | Sprix</title>
	<meta name="description" content="Sprix showcase landing page." />
</svelte:head>

<div
	class="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-6xl items-center px-4 py-12 sm:px-6"
>
	<Card class="w-full rounded-3xl border-app-border bg-app-surface">
		<div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
			<div class="space-y-5">
				<Badge role="primary" variant="modern">Showcase</Badge>
				<div class="space-y-3">
					<h1 class="text-4xl font-bold tracking-tight text-app-text sm:text-5xl">
						Product examples are on the way.
					</h1>
					<p class="max-w-2xl text-base text-app-text-muted sm:text-lg">
						The component docs are ready now. This showcase route is a placeholder so product-facing
						examples can land without breaking navigation.
					</p>
				</div>

				<div class="flex flex-wrap items-center gap-3">
					<Link href="/components" rightIcon="arrow-right">Browse component docs</Link>
					<Button role="secondary" variant="outline">Showcase coming soon</Button>
				</div>
			</div>

			<div class="grid gap-4">
				<div class="rounded-3xl border border-app-border bg-app-bg px-5 py-5">
					<p class="text-sm font-medium text-app-text">What is live now</p>
					<p class="mt-2 text-sm text-app-text-muted">
						Every component in the sidebar has a docs page with a live example and a starting
						snippet.
					</p>
				</div>

				<div class="rounded-3xl border border-app-border bg-app-bg px-5 py-5">
					<p class="text-sm font-medium text-app-text">What lands next</p>
					<p class="mt-2 text-sm text-app-text-muted">
						Higher-level product screens, end-to-end flows, and richer examples built from the same
						component set.
					</p>
				</div>
			</div>
		</div>
	</Card>
</div>
