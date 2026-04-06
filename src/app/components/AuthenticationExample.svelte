<script lang="ts">
	import { Button, Card, Checkbox, Field, Input, Link } from '$lib/components';

	let email = $state('');
	let password = $state('');
	let remember = $state(true);

	const highlights = [
		{ label: 'Teams', value: '1,240' },
		{ label: 'Uptime', value: '99.98%' },
		{ label: 'Regions', value: '12' }
	] as const;
</script>

<div class="overflow-hidden rounded-3xl border border-app-border bg-app-surface">
	<div class="grid min-h-96 lg:grid-cols-2">
		<div
			class="flex flex-col justify-between gap-10 bg-white px-6 py-8 text-zinc-950 sm:px-8 sm:py-10 dark:bg-zinc-950 dark:text-zinc-50"
		>
			<div class="space-y-8">
				<div class="flex items-center gap-3">
					<img src="/logo.png" alt="Sprix logo" class="h-8 w-auto" />

					<div class="space-y-0.5">
						<p class="text-sm font-semibold">Sprix Cloud</p>
						<p class="text-sm text-zinc-500 dark:text-zinc-400">Workspace access</p>
					</div>
				</div>

				<div class="space-y-4">
					<h3 class="max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
						Ship releases, billing, and content from one workspace.
					</h3>
					<p class="max-w-md text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-300">
						Sign in to manage the work behind your product without leaving the same operating
						surface.
					</p>
				</div>
			</div>

			<div class="grid gap-6">
				<div class="grid gap-3 sm:grid-cols-3">
					{#each highlights as highlight}
						<div
							class="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900"
						>
							<p
								class="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
							>
								{highlight.label}
							</p>
							<p class="mt-2 text-xl font-semibold tracking-tight">{highlight.value}</p>
						</div>
					{/each}
				</div>

				<div
					class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300"
				>
					<Link href="/showcase" rightIcon="arrow-top-right-on-square">See product</Link>
					<Link href="/components" rightIcon="arrow-right">Browse components</Link>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-center bg-app-bg px-4 py-8 sm:px-8">
			<Card
				title="Welcome back"
				description="Sign in to continue to your workspace."
				class="w-full max-w-md rounded-3xl border-app-border bg-app-surface"
			>
				<div class="grid gap-4">
					<Field label="Work email" name="auth-email">
						<Input bind:value={email} type="email" placeholder="jawe@sprix.dev" />
					</Field>

					<Field label="Password" name="auth-password">
						<Input bind:value={password} type="password" placeholder="Enter your password" />
					</Field>

					<div class="flex flex-wrap items-center justify-between gap-3">
						<Checkbox bind:checked={remember} label="Remember me" />
						<Link href="/developer">Forgot password</Link>
					</div>
				</div>

				{#snippet footer()}
					<div class="grid gap-3 mt-4">
						<Button>Sign in</Button>
						<Button role="secondary" variant="outline">Continue with GitHub</Button>
						<p class="text-center text-sm text-app-text-muted">
							Need access?
							<Link href="/showcase">Request an invite</Link>
						</p>
					</div>
				{/snippet}
			</Card>
		</div>
	</div>
</div>
