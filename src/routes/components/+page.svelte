<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge, Button, Card, CodeSnippet, Link } from '$lib/components';
	import { sidebarLabels, toComponentHref, toKebabCase } from './sidebar';

	type DocsHref = `/components${'' | `/${string}`}`;

	const componentPages = import.meta.glob('/src/routes/components/**/+page.svelte');

	const routeFileToSlug = (file: string) => {
		const match = file.match(/\/src\/routes\/components(?:\/([^/]+))?\/\+page\.svelte$/);
		return match?.[1] ?? 'getting-started';
	};

	const availableSlugs = new Set(Object.keys(componentPages).map(routeFileToSlug));
	const componentLinks = sidebarLabels
		.map((label) => {
			const slug = toKebabCase(label);

			return {
				slug,
				href: toComponentHref(slug) as DocsHref
			};
		})
		.filter(({ slug }) => availableSlugs.has(slug));

	const currentIndex = componentLinks.findIndex(({ slug }) => slug === 'getting-started');
	const previousHref = currentIndex > 0 ? componentLinks[currentIndex - 1].href : null;
	const nextHref =
		currentIndex >= 0 && currentIndex < componentLinks.length - 1
			? componentLinks[currentIndex + 1].href
			: null;

	const navigateTo = (href: DocsHref | null) => {
		if (!href) return;
		goto(href);
	};

	const installSnippet = `pnpm add sprix-v3`;
</script>

<svelte:head>
	<title>Components | Sprix</title>
	<meta name="description" content="Sprix component documentation and quick start." />
</svelte:head>

<div class="flex min-w-full flex-col gap-12">
	<div class="flex w-full items-start justify-between gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold">Getting Started</h1>
			<p>Browse the Sprix library and start from the component that matches your workflow.</p>
		</div>

		<div class="flex items-center gap-2">
			<Button
				icon="chevron-left"
				size="sm"
				role="secondary"
				ariaLabel="Previous Component"
				disabled={!previousHref}
				onclick={() => navigateTo(previousHref)}
			/>
			<Button
				icon="chevron-right"
				size="sm"
				role="secondary"
				ariaLabel="Next Component"
				disabled={!nextHref}
				onclick={() => navigateTo(nextHref)}
			/>
		</div>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">What You Get</h2>

		<Card
			class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
		>
			<div class="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3">
				<div class="rounded-2xl border border-app-border bg-app-bg px-5 py-5">
					<Badge role="primary" variant="modern">Components</Badge>
					<h3 class="mt-4 text-lg font-semibold text-app-text">Production-ready primitives</h3>
					<p class="mt-2 text-sm text-app-text-muted">
						Buttons, inputs, overlays, navigation, and data display components built to work
						together.
					</p>
				</div>

				<div class="rounded-2xl border border-app-border bg-app-bg px-5 py-5">
					<Badge role="secondary" variant="modern">Patterns</Badge>
					<h3 class="mt-4 text-lg font-semibold text-app-text">Calm defaults</h3>
					<p class="mt-2 text-sm text-app-text-muted">
						Every docs page shows a live example, a short starting snippet, and one concrete
						variant.
					</p>
				</div>

				<div class="rounded-2xl border border-app-border bg-app-bg px-5 py-5">
					<Badge role="success" variant="modern">Workflow</Badge>
					<h3 class="mt-4 text-lg font-semibold text-app-text">Fast navigation</h3>
					<p class="mt-2 text-sm text-app-text-muted">
						Use the sidebar or the previous and next buttons to move through the full component set.
					</p>
				</div>
			</div>
		</Card>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Start Exploring</h2>

		<div class="grid gap-4 lg:grid-cols-2">
			<Card class="rounded-3xl border-app-border bg-app-surface">
				<div class="space-y-4">
					<div>
						<h3 class="text-lg font-semibold text-app-text">Start with foundations</h3>
						<p class="mt-2 text-sm text-app-text-muted">
							Open Button, Input, Card, and Form first if you are assembling a new screen from
							scratch.
						</p>
					</div>

					<Link href="/components/button" rightIcon="arrow-right">Go to Button docs</Link>
				</div>
			</Card>

			<Card class="rounded-3xl border-app-border bg-app-surface">
				<div class="space-y-4">
					<div>
						<h3 class="text-lg font-semibold text-app-text">Move through the full set</h3>
						<p class="mt-2 text-sm text-app-text-muted">
							The docs now cover every component in the sidebar, including inputs, overlays, and
							navigation patterns.
						</p>
					</div>

					<Button onclick={() => navigateTo(nextHref)}>Open the next page</Button>
				</div>
			</Card>
		</div>
	</div>
</div>
