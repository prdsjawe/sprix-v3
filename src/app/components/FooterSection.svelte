<script lang="ts">
	import { Link, Separator } from '$lib/components';

	const browseLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/components', label: 'All components' },
		{ href: '/components/nav-menu', label: 'Nav Menu' }
	] as const;

	const popularLinks = [
		{ href: '/components/button', label: 'Button' },
		{ href: '/components/card', label: 'Card' },
		{ href: '/components/tabs', label: 'Tabs' }
	] as const;
</script>

<footer class="bg-app-surface text-app-text transition-colors">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="py-10 sm:py-12 lg:py-14">
			<div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
				<div class="space-y-4">
					<a href="/" aria-label="Sprix home" class="inline-flex items-center">
						<img src="/logo.png" alt="Sprix logo" class="h-10 w-auto sm:h-11" />
					</a>

					<div class="space-y-3">
						<h2 class="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
							Calm surfaces for real product work.
						</h2>
						<p class="max-w-2xl text-sm leading-6 text-app-text-muted sm:text-base">
							Components, showcase flows, and sharp defaults for the next screen you need to ship.
						</p>
					</div>
				</div>

				<div class="grid gap-8 sm:grid-cols-2">
					<div class="space-y-4">
						<p class="text-xs font-medium tracking-wide text-app-text-subtle uppercase">Browse</p>
						<div class="flex flex-col items-start gap-3">
							{#each browseLinks as link}
								<Link href={link.href}>{link.label}</Link>
							{/each}
						</div>
					</div>

					<div class="space-y-4">
						<p class="text-xs font-medium tracking-wide text-app-text-subtle uppercase">Popular</p>
						<div class="flex flex-col items-start gap-3">
							{#each popularLinks as link}
								<Link href={link.href}>{link.label}</Link>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<Separator class="my-8" />

			<p class="text-sm leading-6 text-app-text-subtle">
				All Rights Reserved 2026. Website By Jerwin Ordillano
			</p>
		</div>
	</div>
</footer>
