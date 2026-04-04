<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Link as UILink } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'icons', label: 'Icons', meta: 'Leading and trailing' },
		{ id: 'examples', label: 'Examples', meta: 'Inline and grouped usage' }
	] as const;
</script>

<svelte:head>
	<title>Link Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix link primitive, including inline text usage, icon adornments, and small navigation examples."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Link"
	description="Inline anchor primitive for text passages, metadata rows, and lightweight navigation. It keeps the browser's native link semantics while adding optional left and right icons."
	pathLabel="components/link"
	pathHref="/components/link"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use text as the affordance, not button chrome.</h2>
				<p class="lead">
					`Link` is intentionally light. It should stay inline, inherit surrounding typography, and
					work naturally inside sentences. Reach for it when a button would add too much weight or
					padding to the flow.
				</p>
			</div>

			<div class="hero-card__demo">
				<p class="inline-copy">
					Read the
					<UILink href="/components/input">Input docs</UILink>
					before wiring field-level help text, then review the
					<UILink href="/components/field" rightIcon="arrow-up-right">Field wrapper</UILink>
					for labels and validation messaging.
				</p>
			</div>
		</section>

		<section id="icons" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Icons</p>
					<h2>Optional adornments, still inline.</h2>
				</div>
				<p>
					Use icons when they clarify direction or category. The component keeps them optically tight
					so the link still reads like text rather than a chip.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Leading icon</h3>
						<p>Useful for categories, resource types, or lightweight badges inside copy.</p>
					</div>
					<div class="demo-frame">
						<UILink href="/components/badge" leftIcon="tag">Browse badge variants</UILink>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Trailing icon</h3>
						<p>Good for forward movement, external destinations, or small “view more” moments.</p>
					</div>
					<div class="demo-frame">
						<UILink href="/components/sidebar" rightIcon="arrow-up-right">Open sidebar patterns</UILink>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Text flows, metadata rows, and current-page states.</h2>
				</div>
				<p>Keep it quiet and readable. If a link needs container chrome, it probably wants to be a button instead.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Inline copy</span>
					<p class="inline-copy">
						Need a stronger location cue? Pair
						<UILink href="/components/breadcrumb" class="mx-1">Breadcrumb</UILink>
						with
						<UILink href="/components/nav-menu" class="mx-1">Nav Menu</UILink>
						when docs start getting deep.
					</p>
				</article>

				<article class="state-card">
					<span class="state-label">Metadata row</span>
					<div class="meta-row">
						<span>Updated April 2026</span>
						<span aria-hidden="true">•</span>
						<UILink href="/components/table" leftIcon="document-text">Release notes</UILink>
						<span aria-hidden="true">•</span>
						<UILink href="/components/toast" rightIcon="chevron-right">View changelog</UILink>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Current page</span>
					<div class="demo-frame">
						<UILink href="/components/link" ariaCurrent="page">Link documentation</UILink>
					</div>
				</article>
			</div>
		</section>
	</main>
</div>

<style>
	:global(body) {
		background: #ffffff;
		color: #0f172a;
	}

	.docs-shell {
		width: min(100%, 86rem);
		margin: 0 auto;
		padding: 1.5rem clamp(1rem, 3vw, 2rem) 3rem;
		display: grid;
		gap: 2rem;
	}

	.docs-main {
		display: grid;
		gap: 0;
	}

	.doc-section {
		scroll-margin-top: 7rem;
		padding: clamp(1.5rem, 3vw, 2rem) 0;
		border-top: 1px solid #e2e8f0;
	}

	.docs-main > :last-child {
		border-bottom: 1px solid #e2e8f0;
	}

	.hero-card,
	.doc-card {
		display: grid;
		gap: 1.25rem;
	}

	.hero-card__copy,
	.hero-card__demo,
	.section-heading,
	.doc-entry,
	.state-card {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__demo,
	.demo-frame,
	.state-card {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #f8fafc;
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	h2,
	h3,
	p {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.45rem, 3vw, 2rem);
		line-height: 1;
		letter-spacing: -0.04em;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.15;
	}

	p {
		color: #475569;
	}

	.lead,
	.inline-copy {
		max-width: 52rem;
		font-size: 1rem;
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-grid {
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}

	.state-grid {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.5rem;
	}

	.meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		color: #475569;
	}

	@media (min-width: 64rem) {
		.docs-shell {
			grid-template-columns: 16rem minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
