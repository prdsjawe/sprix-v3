<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Card, CodeSnippet } from '$lib/components';
	import { sidebarLabels, toComponentHref, toKebabCase } from '../sidebar';

	type DocsHref = `/components${'' | `/${string}`}`;

	const componentPages = import.meta.glob('/src/routes/components/**/+page.svelte');

	const routeFileToSlug = (file: string) => {
		const match = file.match(/\/src\/routes\/components(?:\/([^/]+))?\/\+page\.svelte$/);
		return match?.[1] ?? 'getting-started';
	};

	let {
		slug,
		title,
		subtitle,
		description,
		basicSnippet,
		live,
		examples
	}: {
		slug: string;
		title: string;
		subtitle: string;
		description: string;
		basicSnippet: string;
		live: Utils.Snippet;
		examples: Utils.Snippet;
	} = $props();

	const availableSlugs = new Set(Object.keys(componentPages).map(routeFileToSlug));
	const componentLinks = sidebarLabels
		.map((label) => {
			const nextSlug = toKebabCase(label);

			return {
				slug: nextSlug,
				href: toComponentHref(nextSlug) as DocsHref
			};
		})
		.filter(({ slug: nextSlug }) => availableSlugs.has(nextSlug));

	let currentIndex = $derived(componentLinks.findIndex((item) => item.slug === slug));
	let previousHref = $derived(currentIndex > 0 ? componentLinks[currentIndex - 1].href : null);
	let nextHref = $derived(
		currentIndex >= 0 && currentIndex < componentLinks.length - 1
			? componentLinks[currentIndex + 1].href
			: null
	);

	const navigateTo = (href: DocsHref | null) => {
		if (!href) return;
		goto(href);
	};
</script>

<svelte:head>
	<title>{title} | Sprix</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="flex min-w-full flex-col gap-12">
	<div class="flex w-full items-start justify-between gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold">{title}</h1>
			<p>{subtitle}</p>
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
		<h2 class="text-2xl font-semibold">The {title} Component</h2>

		<Card
			class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
		>
			{@render live()}
		</Card>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>
		<h3 class="text-xl font-semibold">Code Snippet</h3>
		<CodeSnippet size="sm" code={basicSnippet} class="h-full border-app-border bg-app-surface" />
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Examples</h2>
		{@render examples()}
	</div>
</div>
