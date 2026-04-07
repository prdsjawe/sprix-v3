<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Badge, Button } from '$lib/components';

	const contactUs = () => {
		if (typeof window === 'undefined') return;
		window.location.href = 'mailto:help@sprix.dev?subject=Sprix%20UI';
	};
</script>

<section class="border-b border-app-border bg-app-bg text-app-text transition-colors">
	<div
		class="relative overflow-hidden border-y border-blue-300/30 bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 text-white dark:border-blue-900/60 dark:from-sky-950 dark:via-blue-950 dark:to-indigo-950"
	>
		<div
			class="absolute inset-0 bg-linear-to-br from-white/12 via-transparent to-slate-950/12 dark:from-white/6 dark:via-transparent dark:to-slate-950/35"
		></div>
		<div
			class="absolute -top-16 left-0 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl dark:bg-sky-900/30"
		></div>
		<div
			class="absolute top-1/3 right-0 h-72 w-72 rounded-full bg-blue-950/25 blur-3xl dark:bg-indigo-950/55"
		></div>
		<div class="absolute inset-x-0 bottom-0 h-px bg-white/20"></div>

		<div class="relative mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
			<div class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
				<div class="space-y-6">
					<Badge
						role="secondary"
						variant="pill"
						class="border-white/15 bg-white/10 text-white dark:border-white/15 dark:bg-white/10 dark:text-white"
					>
						Start Building
					</Badge>

					<div class="space-y-4">
						<h2
							class="max-w-5xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl"
						>
							Ship the next sharp screen with Sprix.
						</h2>
						<p class="max-w-3xl text-base leading-7 text-blue-50/88 sm:text-lg">
							The components are ready. The tokens are set. The system already has enough point of
							view to make the next product surface feel fast, clean, and unmistakably yours.
						</p>
					</div>

					<div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
						<Button
							size="xl"
							role="secondary"
							class="border-white bg-white text-blue-700 hover:border-white hover:bg-blue-50 hover:text-blue-800 dark:border-white dark:bg-white dark:text-blue-700 dark:hover:border-white dark:hover:bg-blue-50 dark:hover:text-blue-800"
							rightIcon="arrow-right"
							onclick={() => goto(resolve('/components'))}
						>
							Browse Components
						</Button>
						<Button
							size="xl"
							role="secondary"
							variant="outline"
							class="border-white/25 bg-transparent text-white hover:border-white/30 hover:bg-white/10 hover:text-white dark:border-white/25 dark:bg-transparent dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
							rightIcon="arrow-top-right-on-square"
							onclick={contactUs}
						>
							Contact Us
						</Button>
					</div>
				</div>

				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
					<div class="rounded-3xl border border-white/14 bg-white/10 px-5 py-5 backdrop-blur-sm">
						<p
							class="text-xs font-medium tracking-widest text-blue-100/80 uppercase dark:text-blue-100/70"
						>
							Library
						</p>
						<p class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">40+</p>
						<p class="mt-2 text-sm leading-6 text-blue-50/78">
							Ready-to-compose primitives for real product screens.
						</p>
					</div>

					<div
						class="rounded-3xl border border-white/14 bg-slate-950/18 px-5 py-5 backdrop-blur-sm"
					>
						<p
							class="text-xs font-medium tracking-widest text-blue-100/80 uppercase dark:text-blue-100/70"
						>
							Contact
						</p>
						<p class="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
							help@sprix.dev
						</p>
						<p class="mt-2 text-sm leading-6 text-blue-50/78">
							Questions, collaborations, or product work. The button is ready when you are.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
