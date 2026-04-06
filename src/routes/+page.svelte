<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {
		ComponentsSection,
		CtaSection,
		FooterSection,
		ProductExamplesSection
	} from '../app/components';
	import { Badge, Button, Card, CodeSnippet, Link } from '$lib/components';
	import PrinciplesSection from '../app/components/PrinciplesSection.svelte';

	const techStackSnippet = `import { Badge, Button, Card, Link } from '$lib/components';

<Card
  title="A sharper default stack"
  description="Svelte 5 shapes the components. Tailwind CSS 4 keeps the system fast to build and easy to tune."
>
  {#snippet action()}
    <Badge role="primary" variant="modern">Tech Stack</Badge>
  {/snippet}

    <div class="flex flex-wrap items-center gap-3">
      <Button>Browse components</Button>
      <Button role="secondary" variant="outline">View showcase</Button>
    </div>
  </div>

  {#snippet footer()}
    <Link href="/components" rightIcon="arrow-right">Start with the library</Link>
  {/snippet}
</Card>`;
</script>

<svelte:head>
	<title>Sprix</title>
	<meta
		name="description"
		content="Sprix is Jawe's personal UI system for calm, sharp, expressive product interfaces."
	/>
</svelte:head>

<section
	class="relative overflow-hidden border-b border-app-border bg-app-surface py-16 text-app-text transition-colors sm:py-20 lg:py-24"
>
	<div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
			<div class="flex justify-center lg:justify-start">
				<div
					class="flex h-72 w-full max-w-md items-center justify-center sm:h-80 lg:h-112 lg:max-w-none"
				>
					<img
						src="/logo-hd.png"
						alt="Sprix logo"
						class="h-auto w-full max-w-[18rem] object-contain sm:max-w-88"
					/>
				</div>
			</div>

			<div
				class="flex max-w-5xl flex-col items-center gap-6 text-center lg:items-start lg:text-left"
			>
				<Badge role="primary" variant="modern" rightIcon="arrow-right">Introducing Sprix</Badge>
				<h1
					class="max-w-5xl text-5xl font-semibold tracking-tight text-balance text-app-text sm:text-6xl lg:text-7xl"
				>
					UI with a point of view.
				</h1>

				<p class="max-w-3xl text-base leading-7 text-pretty text-app-text-muted sm:text-lg">
					Built by Jawe for the kind of interfaces he actually wants to ship: calm, sharp, and
					quietly expressive.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
					<Button size="lg" rightIcon="arrow-right" onclick={() => goto(resolve('/components'))}>
						Browse components
					</Button>
					<Button
						size="lg"
						role="secondary"
						variant="outline"
						rightIcon="arrow-top-right-on-square"
						onclick={() => goto(resolve('/showcase'))}
					>
						View showcase
					</Button>
				</div>

				<div
					class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-app-text-subtle lg:justify-start"
				>
					<Link href="/components" rightIcon="arrow-right">Start with the library</Link>
					<Link href="/showcase" rightIcon="arrow-top-right-on-square"
						>See product-facing examples</Link
					>
				</div>
			</div>
		</div>
	</div>
</section>

<section
	class="border-b border-app-border bg-app-bg py-16 text-app-text transition-colors sm:py-20 lg:py-24"
>
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-10">
			<div class="mx-auto space-y-6 text-center">
				<div class="flex justify-center">
					<Badge role="primary" variant="modern">Tech Stack</Badge>
				</div>

				<div class="space-y-4">
					<h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
						Svelte 5 for structure. Tailwind CSS 4 for style.
					</h2>
					<p class="mx-auto text-base leading-7 text-app-text-muted sm:text-lg">
						Sprix UI is composed in Svelte 5 and styled primarily with Tailwind CSS 4. The
						combination keeps components direct, makes iteration fast, and lets the design system
						stay consistent without feeling heavy.
					</p>
				</div>

				<p class="mx-auto text-sm leading-6 text-app-text-subtle sm:text-base">
					The code stays close to the components, while the result remains calm, flat, and
					recognizably Sprix in both light and dark mode.
				</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:items-start lg:gap-12">
				<div class="space-y-3">
					<div class="flex items-center justify-between gap-3">
						<p class="text-sm font-medium text-app-text">Code</p>
						<p class="text-sm text-app-text-subtle">Svelte + Sprix</p>
					</div>
					<CodeSnippet filename="+page.svelte" language="svelte" code={techStackSnippet} />
				</div>

				<div class="space-y-3 lg:pt-1">
					<Card
						title="A sharper default stack"
						description="Svelte 5 shapes the components. Tailwind CSS 4 keeps the system fast to build and easy to tune."
						class="rounded-[1.75rem] border-app-border bg-app-surface"
					>
						{#snippet action()}
							<Badge role="primary" variant="modern">Tech Stack</Badge>
						{/snippet}

						<div class="grid gap-4">
							<div class="flex flex-wrap items-center gap-3">
								<Button onclick={() => goto(resolve('/components'))}>Browse components</Button>
								<Button
									role="secondary"
									variant="outline"
									onclick={() => goto(resolve('/showcase'))}
								>
									View showcase
								</Button>
							</div>
						</div>

						{#snippet footer()}
							<div class="mt-4">
								<Link href="/components" rightIcon="arrow-right">Start with the library</Link>
							</div>
						{/snippet}
					</Card>
				</div>
			</div>
		</div>
	</div>
</section>

<ProductExamplesSection />

<PrinciplesSection />

<ComponentsSection />

<CtaSection />

<FooterSection />
