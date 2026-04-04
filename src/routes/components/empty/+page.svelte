<script lang="ts">
	import { Button as UIButton, Card as UICard, Empty as UIEmpty } from '$lib/components';
	import { Header, Sidebar } from '../../../app/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'layout', label: 'Layout', meta: 'Size, alignment, variants' },
		{ id: 'examples', label: 'Examples', meta: 'Common zero-state flows' }
	] as const;
</script>

<svelte:head>
	<title>Empty Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix empty-state primitive, including icon and media usage, alignment, size, and surface variants."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Empty"
	description="Structured empty-state primitive for zero-data, zero-results, and first-run flows. It keeps copy, visual treatment, and action placement consistent without forcing page-specific layout."
	pathLabel="components/empty"
	pathHref="/components/empty"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it when the interface needs a clear next step, not placeholder filler.</h2>
				<p class="lead">
					`Empty` handles the structured case for zero results, first-run setup, and sections with no
					content yet. It gives you one consistent wrapper for icon or media, copy, optional supporting
					content, and an action row.
				</p>
			</div>

			<div class="hero-card__demo">
				<UIEmpty
					size="lg"
					align="center"
					eyebrow="No reports yet"
					title="Create your first release report"
					description="Track sign-off, rollout status, and blockers in one place before the launch window opens."
					icon="document-plus"
				>
					<p class="hero-note">
						Start from a template or pull the checklist from the previous release cycle.
					</p>

					{#snippet action()}
						<div class="action-row">
							<UIButton>Create report</UIButton>
							<UIButton role="secondary" variant="outline">Browse templates</UIButton>
						</div>
					{/snippet}
				</UIEmpty>
			</div>
		</section>

		<section id="layout" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Layout</p>
					<h2>Scale the state without changing the structure.</h2>
				</div>
				<p>Keep the API small: size for density, alignment for posture, and variant for whether the surface owns its own panel.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Small and left-aligned</h3>
						<p>Best for inline sections inside dashboards, lists, and compact panes.</p>
					</div>

					<UIEmpty
						size="sm"
						title="No pinned items"
						description="Save a few records here so returning later is faster."
						icon="bookmark"
					>
						{#snippet action()}
							<UIButton size="sm" role="secondary" variant="outline">Browse records</UIButton>
						{/snippet}
					</UIEmpty>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Centered panel</h3>
						<p>Use a centered posture when the state is the main content of the region.</p>
					</div>

					<UIEmpty
						size="md"
						align="center"
						title="No search results"
						description="Try a shorter term or remove one of the active filters."
						icon="magnifying-glass"
					>
						{#snippet action()}
							<UIButton size="sm">Clear filters</UIButton>
						{/snippet}
					</UIEmpty>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Plain variant</h3>
						<p>Use `plain` when the surrounding surface already provides the container styling.</p>
					</div>

					<UICard title="Saved searches" description="Quick access to repeated filter sets.">
						<UIEmpty
							variant="plain"
							size="sm"
							title="No saved searches"
							description="Create one from the current filters to reuse it later."
							icon="funnel"
						>
							{#snippet action()}
								<UIButton size="sm">Save current view</UIButton>
							{/snippet}
						</UIEmpty>
					</UICard>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Use icon mode for speed and media mode for more branded states.</h2>
				</div>
				<p>Most cases should stay on the built-in icon path. Reach for a custom media snippet only when the zero state needs stronger context.</p>
			</div>

			<div class="example-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Inbox zero</h3>
						<p>Simple icon-first empty state for task lists and queues.</p>
					</div>

					<UIEmpty
						align="center"
						eyebrow="All clear"
						title="No unresolved tickets"
						description="New support work will appear here as customers submit requests."
						icon="inbox"
					>
						{#snippet action()}
							<UIButton size="sm" role="secondary" variant="outline">Refresh queue</UIButton>
						{/snippet}
					</UIEmpty>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Custom media</h3>
						<p>Use the media snippet for richer visual storytelling without changing the rest of the API.</p>
					</div>

					<UIEmpty
						align="center"
						title="No analytics snapshots"
						description="Capture a baseline once traffic starts flowing so week-over-week changes have context."
					>
						{#snippet media()}
							<div class="visual-stack" aria-hidden="true">
								<div class="visual-chip visual-chip-a"></div>
								<div class="visual-chip visual-chip-b"></div>
								<div class="visual-panel">
									<div class="visual-bar visual-bar-sm"></div>
									<div class="visual-bar visual-bar-lg"></div>
									<div class="visual-bar visual-bar-md"></div>
								</div>
							</div>
						{/snippet}

						{#snippet action()}
							<UIButton size="sm">Create snapshot</UIButton>
						{/snippet}
					</UIEmpty>
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
	.doc-card,
	.hero-card__copy,
	.hero-card__demo,
	.section-heading,
	.doc-entry,
	.doc-entry__meta {
		display: grid;
		gap: 1rem;
	}

	.hero-card {
		align-items: start;
	}

	.hero-card__copy {
		max-width: 42rem;
	}

	.hero-card__demo {
		justify-items: stretch;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	h2,
	h3 {
		margin: 0;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: #0f172a;
	}

	h2 {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		line-height: 1.05;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.3;
	}

	.lead,
	.section-heading > p,
	.doc-entry__meta p {
		margin: 0;
		max-width: 42rem;
		color: #475569;
		line-height: 1.7;
	}

	.hero-note {
		margin: 0;
		max-width: 34rem;
		text-align: inherit;
		color: #475569;
	}

	.action-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.doc-grid,
	.example-grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}

	.doc-entry {
		align-content: start;
		padding: 1.5rem;
		border: 1px solid #e2e8f0;
		border-radius: 1.5rem;
		background: linear-gradient(180deg, rgba(248, 250, 252, 0.88) 0%, rgba(255, 255, 255, 1) 100%);
	}

	.visual-stack {
		position: relative;
		display: grid;
		place-items: center;
		width: 5.75rem;
		height: 5.75rem;
	}

	.visual-chip {
		position: absolute;
		width: 1rem;
		height: 1rem;
		border-radius: 999px;
	}

	.visual-chip-a {
		top: 0.4rem;
		left: 0.4rem;
		background: #cbd5e1;
	}

	.visual-chip-b {
		right: 0.55rem;
		bottom: 0.5rem;
		background: #93c5fd;
	}

	.visual-panel {
		display: grid;
		gap: 0.45rem;
		width: 4.5rem;
		padding: 0.8rem 0.75rem;
		border: 1px solid #cbd5e1;
		border-radius: 1.1rem;
		background: linear-gradient(180deg, #ffffff 0%, #eff6ff 100%);
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.9);
	}

	.visual-bar {
		height: 0.4rem;
		border-radius: 999px;
		background: #cbd5e1;
	}

	.visual-bar-sm {
		width: 1.5rem;
	}

	.visual-bar-md {
		width: 2rem;
	}

	.visual-bar-lg {
		width: 3rem;
		background: #60a5fa;
	}

	@media (max-width: 48rem) {
		.docs-shell {
			padding-bottom: 2rem;
		}
	}
</style>
