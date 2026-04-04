<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Button as UIButton, Progress as UIProgress } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and contract' },
		{ id: 'states', label: 'States', meta: 'Default, capped, complete' },
		{ id: 'styling', label: 'Styling', meta: 'Height and tone overrides' }
	] as const;

	const deploymentPresets = [24, 68, 92] as const;

	let deployment = $state(68);

	const formatPercent = (value: number, max = 100) => `${Math.round((value / max) * 100)}%`;
</script>

<svelte:head>
	<title>Progress Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix progress primitive, including basic determinate usage, capped values, and simple styling overrides."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Progress"
	description="Compact linear progressbar with a simple value/max contract, a rounded-full track, and light styling hooks for height or indicator color."
	pathLabel="components/progress"
	pathHref="/components/progress"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One determinate bar, no extra ceremony.</h2>
				<p class="lead">
					The base contract stays intentionally small: pass `value`, optionally change `max`, and
					override track or indicator classes when you need a different tone. The default posture keeps
					the same rounded track language as `Slider`.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="progress-stack">
					<div class="value-row">
						<span class="value-label">Release progress</span>
						<span class="value-pill">{deployment}%</span>
					</div>
					<UIProgress value={deployment} ariaLabel="Release progress" class="mx-auto w-full max-w-md" />
					<div class="preset-row">
						{#each deploymentPresets as preset}
							<UIButton
								size="sm"
								role="secondary"
								variant={preset === deployment ? 'soft' : 'outline'}
								onclick={() => (deployment = preset)}
							>
								{preset}%
							</UIButton>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Use the same bar for normal, capped, and finished values.</h2>
				</div>
				<p>
					Values are clamped into the allowed range, so the component stays safe even when upstream
					data gets noisy.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Default scale</span>
					<div class="progress-stack">
						<div class="value-row">
							<span class="value-label">Upload</span>
							<span class="value-pill">42%</span>
						</div>
						<UIProgress value={42} ariaLabel="Upload progress" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Custom max</span>
					<div class="progress-stack">
						<div class="value-row">
							<span class="value-label">Seats assigned</span>
							<span class="value-pill">7 / 12</span>
						</div>
						<UIProgress
							value={7}
							max={12}
							ariaLabel="Seats assigned"
							getValueLabel={(value, max) => `${value} of ${max}`}
						/>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Complete</span>
					<div class="progress-stack">
						<div class="value-row">
							<span class="value-label">Checklist</span>
							<span class="value-pill">100%</span>
						</div>
						<UIProgress value={100} ariaLabel="Checklist complete" />
					</div>
				</article>
			</div>
		</section>

		<section id="styling" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Styling</p>
					<h2>Keep overrides light and utility-driven.</h2>
				</div>
				<p>
					Use `class` for track size or layout, and `indicatorClass` when a status color needs to shift.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Taller track</span>
					<div class="progress-stack">
						<div class="value-row">
							<span class="value-label">Migration</span>
							<span class="value-pill">{formatPercent(56)}</span>
						</div>
						<UIProgress value={56} class="h-2.5" ariaLabel="Migration progress" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Success tone</span>
					<div class="progress-stack">
						<div class="value-row">
							<span class="value-label">Sync status</span>
							<span class="value-pill">{formatPercent(88)}</span>
						</div>
						<UIProgress
							value={88}
							indicatorClass="bg-emerald-600"
							ariaLabel="Sync status"
						/>
					</div>
				</article>
			</div>
		</section>
	</main>
</div>

<style>
	:global(body) {
		background: var(--sprix-app-surface);
		color: var(--sprix-app-text);
	}

	.docs-shell {
		width: min(100%, 86rem);
		margin: 0 auto;
		padding: 1.5rem clamp(1rem, 3vw, 2rem) 3rem;
		display: grid;
		grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
		gap: clamp(2rem, 4vw, 3.5rem);
	}

	.docs-main {
		display: grid;
		gap: 1.5rem;
	}

	.doc-section {
		scroll-margin-top: 7rem;
	}

	.hero-card,
	.doc-card {
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.5rem;
		background: linear-gradient(180deg, var(--sprix-app-surface) 0%, var(--sprix-app-bg) 100%);
	}

	.hero-card {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		display: grid;
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
	.state-card {
		display: grid;
		gap: 0.75rem;
	}

	.hero-card__copy h2,
	.section-heading h2 {
		margin: 0;
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: var(--sprix-app-text);
	}

	.lead,
	.section-heading p {
		margin: 0;
		color: var(--sprix-app-text-muted);
		line-height: 1.65;
	}

	.hero-card__stack,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-card {
		padding: clamp(1.25rem, 2.8vw, 2rem);
		display: grid;
		gap: 1.5rem;
	}

	.state-grid {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.state-card {
		align-content: start;
		padding: 1.25rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.1rem;
		background: rgba(255, 255, 255, 0.92);
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--sprix-app-text-muted);
	}

	.progress-stack {
		display: grid;
		gap: 0.9rem;
	}

	.value-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.value-label {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--sprix-app-text-muted);
	}

	.value-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
		background: #eff6ff;
		font-size: 0.8rem;
		font-weight: 700;
		color: #1d4ed8;
	}

	.preset-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (max-width: 960px) {
		.docs-shell {
			grid-template-columns: 1fr;
		}
	}
</style>
