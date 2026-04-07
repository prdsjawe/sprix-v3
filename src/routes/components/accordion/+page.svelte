<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
		Button,
		Card,
		CodeSnippet
	} from '$lib/components';
	import { sidebarLabels, toComponentHref, toKebabCase } from '../sidebar';

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

	const currentIndex = componentLinks.findIndex(({ slug }) => slug === 'accordion');
	const previousHref = currentIndex > 0 ? componentLinks[currentIndex - 1].href : null;
	const nextHref =
		currentIndex >= 0 && currentIndex < componentLinks.length - 1
			? componentLinks[currentIndex + 1].href
			: null;

	const navigateTo = (href: DocsHref | null) => {
		if (!href) return;
		goto(href);
	};

	let componentAccordionValue = $state('starter');
	let basicAccordionValue = $state('starter');
	let lockedAccordionValue = $state('shipping');
	let multipleAccordionValue = $state(['api', 'billing']);
	let disabledAccordionValue = $state('profile');

	const basicAccordionSnippet = `<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
	} from '$lib/components';

	let value = $state('starter');
<\/script>

<Accordion bind:value={value}>
	<AccordionItem value="starter">
		<AccordionTrigger>What is included?</AccordionTrigger>
		<AccordionContent>
			Core components, app shell patterns, and theme tokens ready for production work.
		</AccordionContent>
	</AccordionItem>

	<AccordionItem value="theming">
		<AccordionTrigger>How does theming work?</AccordionTrigger>
		<AccordionContent>
			Light and dark mode both inherit the same shared app tokens exposed through Tailwind.
		</AccordionContent>
	</AccordionItem>

	<AccordionItem value="customization">
		<AccordionTrigger>Can I customize the layout?</AccordionTrigger>
		<AccordionContent>
			Yes. Compose the primitives directly and layer route-specific structure around them as needed.
		</AccordionContent>
	</AccordionItem>
</Accordion>
`;
</script>

<svelte:head>
	<title>Accordion | Sprix</title>
	<meta name="description" content="Sprix accordion component examples." />
</svelte:head>

<div class="flex min-w-full flex-col gap-12">
	<div class="flex w-full items-start justify-between gap-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold">Accordion</h1>
			<p>A component that allows users to toggle the visibility of content sections.</p>
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
		<h2 class="text-2xl font-semibold">The Accordion Component</h2>

		<Card
			class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
		>
			<div class="mx-auto w-full max-w-120">
				<Accordion bind:value={componentAccordionValue} size="sm">
					<AccordionItem value="starter">
						<AccordionTrigger>What is included?</AccordionTrigger>
						<AccordionContent>
							Core components, app shell patterns, and theme tokens ready for production work.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="theming">
						<AccordionTrigger>How does theming work?</AccordionTrigger>
						<AccordionContent>
							Light and dark mode both inherit the same shared app tokens exposed through Tailwind.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="customization">
						<AccordionTrigger>Can I customize the layout?</AccordionTrigger>
						<AccordionContent>
							Yes. Compose the primitives directly and layer route-specific structure around them as
							needed.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</Card>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>
		<h3 class="text-xl font-semibold">Code Snippet</h3>
		<CodeSnippet
			size="sm"
			code={basicAccordionSnippet}
			class="h-full border-app-border bg-app-surface"
		/>
	</div>

	<div class="flex flex-col gap-6">
		<h2 class="text-2xl font-semibold">Examples</h2>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Single</h4>
					<p class="text-sm text-app-text-muted">Opens one item at a time for focused reading.</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto w-full max-w-120">
						<Card>
							<Accordion bind:value={basicAccordionValue} size="sm">
								<AccordionItem value="starter">
									<AccordionTrigger>What is included?</AccordionTrigger>
									<AccordionContent>
										Core components, app shell patterns, and theme tokens ready for production work.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="theming">
									<AccordionTrigger>How does theming work?</AccordionTrigger>
									<AccordionContent>
										Light and dark mode both inherit the same shared app tokens exposed through
										Tailwind.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="customization">
									<AccordionTrigger>Can I customize the layout?</AccordionTrigger>
									<AccordionContent>
										Yes. Compose the primitives directly and layer route-specific structure around
										them as needed.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</Card>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Single Non-Collapsible</h4>
					<p class="text-sm text-app-text-muted">Keeps one section open at all times.</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto w-full max-w-120">
						<Card>
							<Accordion bind:value={lockedAccordionValue} collapsible={false} size="sm">
								<AccordionItem value="shipping">
									<AccordionTrigger>Shipping timeline</AccordionTrigger>
									<AccordionContent>
										Orders sync within five minutes and delivery estimates update automatically.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="returns">
									<AccordionTrigger>Returns policy</AccordionTrigger>
									<AccordionContent>
										Use a pinned section when one answer should always stay visible for the team.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="invoices">
									<AccordionTrigger>Invoice exports</AccordionTrigger>
									<AccordionContent>
										Monthly summaries can stay one click away without allowing the panel to fully
										collapse.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</Card>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Multiple</h4>
					<p class="text-sm text-app-text-muted">Lets users expand several sections together.</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto w-full max-w-120">
						<Accordion bind:value={multipleAccordionValue} type="multiple" variant="card" size="sm">
							<AccordionItem value="api">
								<AccordionTrigger>API access</AccordionTrigger>
								<AccordionContent>
									Keep credentials, scopes, and rate-limit guidance open at the same time.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="billing">
								<AccordionTrigger>Billing alerts</AccordionTrigger>
								<AccordionContent>
									Multiple mode works well when operators compare related details across sections.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="audit">
								<AccordionTrigger>Audit logs</AccordionTrigger>
								<AccordionContent>
									Use the card variant when each item should read like a separate surface.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-1">
					<h4 class="text-lg font-semibold">Disabled Item</h4>
					<p class="text-sm text-app-text-muted">
						Prevents interaction for items that are unavailable.
					</p>
				</div>
				<Card
					class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
				>
					<div class="mx-auto w-full max-w-120">
						<Card>
							<Accordion bind:value={disabledAccordionValue} size="sm">
								<AccordionItem value="profile">
									<AccordionTrigger>Profile settings</AccordionTrigger>
									<AccordionContent>
										Update account details, display name, and workspace preferences.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="security" disabled>
									<AccordionTrigger>Security controls</AccordionTrigger>
									<AccordionContent>
										This panel is intentionally disabled until advanced permissions are enabled.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="notifications">
									<AccordionTrigger>Notifications</AccordionTrigger>
									<AccordionContent>
										Manage alerts for product updates, invoices, and account activity.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</Card>
					</div>
				</Card>
			</div>
		</div>
	</div>
</div>
