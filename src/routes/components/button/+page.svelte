<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button, Card, CodeSnippet } from '$lib/components';
	import { sidebarLabels, toComponentHref, toKebabCase } from '../sidebar';

	type DocsHref = '/components' | '/components/accordion' | '/components/button';

	const buttonPages = import.meta.glob('/src/routes/components/**/+page.svelte');

	const routeFileToSlug = (file: string) => {
		const match = file.match(/\/src\/routes\/components(?:\/([^/]+))?\/\+page\.svelte$/);
		return match?.[1] ?? 'getting-started';
	};

	const availableSlugs = new Set(Object.keys(buttonPages).map(routeFileToSlug));
	const componentLinks = sidebarLabels
		.map((label) => {
			const slug = toKebabCase(label);

			return {
				slug,
				href: toComponentHref(slug) as DocsHref
			};
		})
		.filter(({ slug }) => availableSlugs.has(slug));

	const currentIndex = componentLinks.findIndex(({ slug }) => slug === 'button');
	const previousHref = currentIndex > 0 ? componentLinks[currentIndex - 1].href : null;
	const nextHref =
		currentIndex >= 0 && currentIndex < componentLinks.length - 1
			? componentLinks[currentIndex + 1].href
			: null;

	const navigateTo = (href: DocsHref | null) => {
		if (!href) return;
		goto(resolve(href));
	};

	const basicButtonSnippet = `<script lang="ts">
	import { Button } from '$lib/components';
<\/script>

<Button rightIcon="arrow-right">Continue</Button>
`;
</script>

<svelte:head>
	<title>Button | Sprix</title>
	<meta name="description" content="Sprix button component examples." />
</svelte:head>

<div class="flex min-w-full flex-col gap-12">
	<div class="flex w-full items-start justify-between gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold">Button</h1>
			<p>A component that triggers actions across forms, flows, and app surfaces.</p>
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
		<h2 class="text-2xl font-semibold">The Button Component</h2>

		<Card
			class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
		>
			<div class="mx-auto flex w-full max-w-120 flex-wrap items-center justify-center gap-3">
				<Button role="secondary" variant="outline">Save draft</Button>
				<Button rightIcon="arrow-right">Publish changes</Button>
			</div>
		</Card>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>
		<h3 class="text-xl font-semibold">Code Snippet</h3>
		<CodeSnippet
			size="sm"
			code={basicButtonSnippet}
			class="h-full border-app-border bg-app-surface"
		/>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Examples</h2>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Roles</h4>
					<p class="text-sm text-app-text-muted">Match button tone to the intent of the action.</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
						<Button>Continue</Button>
						<Button role="secondary">Review</Button>
						<Button role="tertiary">Maybe later</Button>
						<Button role="success">Approve</Button>
						<Button role="warning">Pause</Button>
						<Button role="danger">Delete</Button>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Variants</h4>
					<p class="text-sm text-app-text-muted">
						Shift emphasis without changing the action itself.
					</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
						<Button role="secondary">Default</Button>
						<Button role="secondary" variant="flat">Flat</Button>
						<Button role="secondary" variant="outline">Outline</Button>
						<Button role="secondary" variant="soft">Soft</Button>
						<Button role="secondary" variant="quiet">Quiet</Button>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Sizes</h4>
					<p class="text-sm text-app-text-muted">
						Scale the control for dense rows or primary callouts.
					</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
						<Button size="xs">Extra small</Button>
						<Button size="sm">Small</Button>
						<Button size="md">Medium</Button>
						<Button size="lg">Large</Button>
						<Button size="xl">Extra large</Button>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Icons</h4>
					<p class="text-sm text-app-text-muted">
						Add direction, status, or compact actions when needed.
					</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
						<Button leftIcon="cloud-arrow-up">Upload media</Button>
						<Button rightIcon="arrow-right">Continue</Button>
						<Button icon="bell" role="secondary" variant="outline" ariaLabel="Notifications" />
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">States</h4>
					<p class="text-sm text-app-text-muted">
						Use loading and disabled states to guard the action.
					</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
						<Button loading>Processing</Button>
						<Button role="secondary" variant="outline" disabled>Unavailable</Button>
						<Button role="success" variant="soft" leftIcon="cloud-arrow-up">Ready to sync</Button>
					</div>
				</Card>
			</div>
		</div>
	</div>
</div>
