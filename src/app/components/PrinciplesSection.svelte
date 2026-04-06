<script lang="ts">
	import { Badge, Card, Icon, Link } from '$lib/components';

	interface PrincipleSignal {
		label: string;
		value: string;
	}

	interface Principle {
		icon: Icon.Name;
		label: string;
		title: string;
		description: string;
		points: string[];
	}

	const tagBadgeClass =
		'border-app-border bg-app-bg text-app-text-muted hover:bg-app-bg dark:border-app-border dark:bg-app-bg dark:text-app-text-muted dark:hover:bg-app-bg';

	const postureTags = ['Flat surfaces', 'Clear borders', 'Measured spacing'];

	const principleSignals: PrincipleSignal[] = [
		{
			label: 'Surface',
			value:
				'Flat layers and clean borders keep the interface quiet before content starts competing.'
		},
		{
			label: 'Rhythm',
			value: 'Spacing and typography create the scan path so dense screens still feel easy to read.'
		},
		{
			label: 'Theme',
			value: 'Shared tokens keep light and dark mode aligned from the first pass.'
		}
	];

	const principles: Principle[] = [
		{
			icon: 'squares-plus',
			label: 'Composition',
			title: 'Start from the system.',
			description:
				'Rebuild the screen from the existing components first, then add route-level wrappers only when the flow truly needs them.',
			points: ['Reuse primitives', 'Keep APIs direct', 'Scale across flows']
		},
		{
			icon: 'swatch',
			label: 'Contrast',
			title: 'Let borders do the lifting.',
			description:
				'Hierarchy comes from surfaces, spacing, and type before shadows or extra chrome enter the screen.',
			points: ['Low shadow', 'Strong edges', 'Clear states']
		},
		{
			icon: 'computer-desktop',
			label: 'Product',
			title: 'Prove it in real screens.',
			description:
				'Billing, authentication, dashboards, and CMS flows are the standard for whether a component belongs.',
			points: ['Checkout', 'Workspace', 'Editor']
		}
	];
</script>

<section
	class="border-b border-app-border bg-app-bg py-16 text-app-text transition-colors sm:py-20 lg:py-24"
>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="space-y-4">
				<Badge role="primary" variant="modern">Principles</Badge>

				<div class="space-y-3">
					<h2
						class="max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
					>
						Calm by default. Built for real product work.
					</h2>
					<p class="max-w-3xl text-base leading-7 text-app-text-muted sm:text-lg">
						Sprix keeps structure obvious, decoration restrained, and every screen steady in light
						and dark mode.
					</p>
				</div>
			</div>

			<div class="lg:shrink-0">
				<Link href="/components" rightIcon="arrow-right">Browse components</Link>
			</div>
		</div>

		<div class="grid gap-4 lg:grid-cols-3">
			<div class="lg:col-span-3">
				<Card class="h-full rounded-3xl border-app-border bg-app-surface text-app-text">
					{#snippet header()}
						<div class="flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
							<div class="max-w-2xl space-y-3">
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full border border-app-border bg-app-bg text-app-text"
									>
										<Icon
											name="square-3-stack-3d"
											class="size-5 fill-transparent stroke-app-text-subtle stroke-2"
										/>
									</div>
									<p class="text-xs font-medium tracking-wide text-app-text-subtle uppercase">
										Design posture
									</p>
								</div>

								<div class="space-y-2">
									<h3 class="text-2xl font-semibold tracking-tight text-app-text sm:text-3xl">
										Quiet surfaces. Strong hierarchy.
									</h3>
									<p class="text-sm leading-6 text-app-text-muted sm:text-base">
										Sprix relies on spacing, typography, and contrast before it reaches for
										decoration. The interface stays readable even when the screen gets busy.
									</p>
								</div>
							</div>

							<div class="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
								{#each postureTags as tag}
									<Badge size="sm" role="secondary" variant="pill" class={tagBadgeClass}>
										{tag}
									</Badge>
								{/each}
							</div>
						</div>
					{/snippet}

					<div class="grid gap-3 sm:grid-cols-3">
						{#each principleSignals as signal}
							<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
								<p class="text-xs font-medium tracking-wide text-app-text-subtle uppercase">
									{signal.label}
								</p>
								<p class="mt-2 text-sm leading-6 text-app-text-muted">{signal.value}</p>
							</div>
						{/each}
					</div>
				</Card>
			</div>

			{#each principles as principle}
				<Card class="h-full rounded-3xl border-app-border bg-app-surface text-app-text">
					{#snippet header()}
						<div class="space-y-4">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full border border-app-border bg-app-bg text-app-text"
							>
								<Icon
									name={principle.icon}
									class="size-5 fill-transparent stroke-app-text-subtle stroke-2"
								/>
							</div>

							<div class="space-y-2">
								<p class="text-xs font-medium tracking-wide text-app-text-subtle uppercase">
									{principle.label}
								</p>
								<h3 class="text-xl font-semibold tracking-tight text-app-text">
									{principle.title}
								</h3>
								<p class="text-sm leading-6 text-app-text-muted">{principle.description}</p>
							</div>
						</div>
					{/snippet}

					<div class="flex flex-wrap gap-2">
						{#each principle.points as point}
							<Badge size="sm" role="secondary" variant="pill" class={tagBadgeClass}>
								{point}
							</Badge>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
