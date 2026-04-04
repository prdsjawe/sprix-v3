<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Slider as UISlider } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and API' },
		{ id: 'values', label: 'Values', meta: 'Single and range' },
		{ id: 'states', label: 'States', meta: 'Default, stepped, disabled' }
	] as const;

	let volume = $state([75]);
	let coverage = $state([20, 80]);
	let pacing = $state([30]);

	const formatValues = (values: number[]) => values.join(' - ');
</script>

<svelte:head>
	<title>Slider Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix slider primitive, including single-thumb, range, stepped, and disabled usage patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Slider"
	description="Array-based range selector with a compact shadcn-style track and thumb treatment. Single-value and multi-thumb cases share the same contract so the control stays easy to compose."
	pathLabel="components/slider"
	pathHref="/components/slider"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One slider contract for single values and ranges.</h2>
				<p class="lead">
					The default posture stays close to shadcn: a compact 6px track, a 16px circular thumb, and
					an array-based value shape. That means the exact single-thumb API stays minimal:
					`defaultValue={[75]}`, `max={100}`, `step={1}`.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="slider-stack">
					<div class="value-row">
						<span class="value-label">shadcn-style default</span>
						<span class="value-pill">75</span>
					</div>
					<UISlider
						defaultValue={[75]}
						max={100}
						step={1}
						class="mx-auto w-full max-w-xs"
						ariaLabel="Default volume"
					/>
				</div>
			</div>
		</section>

		<section id="values" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Values</p>
					<h2>Use the same API for one thumb or many.</h2>
				</div>
				<p>
					Bind `value` when the parent needs the live number, or pass `defaultValue` for an
					uncontrolled starting point.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Single value</span>
					<div class="slider-stack">
						<div class="value-row">
							<span class="value-label">Volume</span>
							<span class="value-pill">{formatValues(volume)}</span>
						</div>
						<UISlider bind:value={volume} max={100} step={1} ariaLabel="Volume" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Range selection</span>
					<div class="slider-stack">
						<div class="value-row">
							<span class="value-label">Coverage</span>
							<span class="value-pill">{formatValues(coverage)}</span>
						</div>
						<UISlider
							bind:value={coverage}
							max={100}
							step={1}
							minStepsBetweenThumbs={5}
							ariaLabel="Coverage range"
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep precision and disabled behavior obvious.</h2>
				</div>
				<p>
					Use `step` for snapped increments and `disabled` when the value should stay visible but
					locked.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Stepped input</span>
					<div class="slider-stack">
						<div class="value-row">
							<span class="value-label">Pacing</span>
							<span class="value-pill">{formatValues(pacing)}</span>
						</div>
						<UISlider bind:value={pacing} min={0} max={60} step={5} ariaLabel="Pacing" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<div class="slider-stack">
						<div class="value-row">
							<span class="value-label">Read only</span>
							<span class="value-pill">60</span>
						</div>
						<UISlider
							defaultValue={[60]}
							max={100}
							step={1}
							disabled
							ariaLabel="Read only allocation"
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
		letter-spacing: -0.03em;
		color: var(--sprix-app-text);
	}

	.hero-card__copy h2,
	.section-heading h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.05;
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

	.slider-stack {
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
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--sprix-app-text-muted);
	}

	.value-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 3rem;
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		background: #dbeafe;
		color: #1d4ed8;
		font-size: 0.82rem;
		font-weight: 700;
	}

	@media (max-width: 960px) {
		.docs-shell {
			grid-template-columns: 1fr;
		}
	}
</style>
