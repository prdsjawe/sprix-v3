<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Badge as UIBadge } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'xs to md' },
		{ id: 'roles', label: 'Roles', meta: 'Semantic color' },
		{ id: 'variants', label: 'Variants', meta: 'Surface and shape' },
		{ id: 'links', label: 'Links', meta: 'Anchor usage' },
		{ id: 'examples', label: 'Examples', meta: 'Status and loading patterns' }
	] as const;

	const sizes = [
		{
			size: 'xs',
			label: 'Extra small',
			description: 'Dense tables, inline metadata, and narrow toolbars.'
		},
		{
			size: 'sm',
			label: 'Small',
			description: 'Default badge size for dashboards and card chrome.'
		},
		{ size: 'md', label: 'Medium', description: 'Higher emphasis labels in roomy panels and docs.' }
	] as const;

	const roles = [
		{
			role: 'primary',
			label: 'Primary',
			description: 'Linked entities, featured labels, and default accent metadata.'
		},
		{
			role: 'secondary',
			label: 'Secondary',
			description: 'Neutral classification and supporting labels.'
		},
		{
			role: 'tertiary',
			label: 'Tertiary',
			description: 'Subdued neutral labels with a softer base tone.'
		},
		{
			role: 'danger',
			label: 'Danger',
			description: 'Failures, blocked states, and destructive warnings.'
		},
		{
			role: 'success',
			label: 'Success',
			description: 'Healthy, shipped, synced, and completed states.'
		},
		{
			role: 'warning',
			label: 'Warning',
			description: 'Cautionary attention without full destructive weight.'
		}
	] as const;

	const variants = [
		{
			variant: 'badge',
			label: 'Badge',
			description: 'Rounded rectangle with tinted background and matching border.'
		},
		{
			variant: 'pill',
			label: 'Pill',
			description: 'Fully rounded version of the same soft treatment.'
		},
		{
			variant: 'badge-color',
			label: 'Badge Color',
			description: 'Filled rounded rectangle for stronger emphasis.'
		},
		{
			variant: 'pill-color',
			label: 'Pill Color',
			description: 'Filled pill for compact, high-contrast status labeling.'
		},
		{
			variant: 'modern',
			label: 'Modern',
			description: 'White surface, gray border, soft shadow, and a leading status dot.'
		}
	] as const;
</script>

<svelte:head>
	<title>Badge Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix badge primitive, including sizes, semantic roles, visual variants, and linked badge usage."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Badge"
	description="Compact feedback primitive for labels, status, and small metadata. It supports soft and filled surfaces, pill and rounded-rectangle shapes, plus an understated modern variant."
	pathLabel="components/badge"
	pathHref="/components/badge"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Keep status labels small, legible, and deliberate.</h2>
				<p class="lead">
					Badges should clarify status, ownership, or classification without turning into mini
					buttons. `role` controls semantic color. `variant` controls shape and surface treatment.
					`size` only scales density.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="badge-cloud">
					<UIBadge leftIcon="academic-cap" size="md" role="success" variant="pill-color"
						>Live</UIBadge
					>
					<UIBadge size="md" role="primary" variant="modern">Version 3.4</UIBadge>
					<UIBadge size="md" role="warning" variant="badge">Pending review</UIBadge>
					<UIBadge size="md" role="danger" variant="pill">Needs action</UIBadge>
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three densities, one visual language.</h2>
				</div>
				<p>
					Choose `xs`, `sm`, or `md` based on layout density. The meaning and styling posture stay
					the same.
				</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<div class="badge-row">
								<UIBadge size={item.size} role="primary" variant="badge">Feature</UIBadge>
								<UIBadge size={item.size} role="success" variant="pill-color">Healthy</UIBadge>
								<UIBadge size={item.size} role="secondary" variant="modern">Internal</UIBadge>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="roles" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Roles</p>
					<h2>Meaning first, treatment second.</h2>
				</div>
				<p>Keep the variant fixed when comparing roles so semantic color remains easy to scan.</p>
			</div>

			<div class="doc-grid">
				{#each roles as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<div class="badge-row">
								<UIBadge role={item.role} variant="badge">{item.label}</UIBadge>
								<UIBadge role={item.role} variant="modern">{item.label} status</UIBadge>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="variants" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Variants</p>
					<h2>Surface and shape should stay predictable.</h2>
				</div>
				<p>
					These examples keep the role on `primary` so the variant differences are easier to
					compare.
				</p>
			</div>

			<div class="doc-grid">
				{#each variants as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<div class="badge-row">
								<UIBadge role="primary" variant={item.variant}>Primary {item.label}</UIBadge>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="links" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Links</p>
					<h2>Use anchors when the label is navigational.</h2>
				</div>
				<p>`link` switches the root to an anchor. Keep that for navigation, not state toggling.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Internal route</span>
					<div class="badge-row">
						<UIBadge role="primary" variant="badge" link="/components/button">Button docs</UIBadge>
						<UIBadge role="secondary" variant="modern" link="/components/input">Input docs</UIBadge>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">External target</span>
					<div class="badge-row">
						<UIBadge
							role="success"
							variant="pill-color"
							link="https://kit.svelte.dev"
							target="_blank"
						>
							SvelteKit
						</UIBadge>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Modern navigation</span>
					<div class="badge-row">
						<UIBadge role="warning" variant="modern" link="/components/accordion">
							Review disclosure patterns
						</UIBadge>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical metadata and status usage.</h2>
				</div>
				<p>
					Badges work best as short labels attached to richer content rather than standalone UI.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Release metadata</span>
					<div class="stack-list">
						<div class="badge-row">
							<UIBadge role="success" variant="pill-color">Shipped</UIBadge>
							<UIBadge role="primary" variant="badge">Sprint 24</UIBadge>
							<UIBadge role="secondary" variant="modern">Owned by platform</UIBadge>
						</div>
						<p class="badge-note">
							Use a stronger filled badge for the primary state, then quieter labels for supporting
							metadata.
						</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Triage queue</span>
					<div class="stack-list">
						<div class="badge-row">
							<UIBadge size="xs" role="danger" variant="pill">Escalated</UIBadge>
							<UIBadge size="xs" role="warning" variant="badge">Awaiting customer</UIBadge>
							<UIBadge size="xs" role="secondary" variant="modern">Ticket #4821</UIBadge>
						</div>
						<p class="badge-note">
							The smaller `xs` size is useful when the surrounding layout already carries most of
							the visual weight.
						</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Collection tags</span>
					<div class="stack-list">
						<div class="badge-cloud">
							<UIBadge role="primary" variant="pill">Design system</UIBadge>
							<UIBadge role="success" variant="pill">Stable</UIBadge>
							<UIBadge role="warning" variant="pill">Beta API</UIBadge>
							<UIBadge role="tertiary" variant="pill">Internal</UIBadge>
							<UIBadge role="danger" variant="pill">Deprecated soon</UIBadge>
						</div>
						<p class="badge-note">
							The pill variants work well for tag clouds because they feel grouped without reading
							as buttons.
						</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Loading status</span>
					<div class="stack-list">
						<div class="badge-row">
							<UIBadge role="secondary" variant="modern" loading>Syncing assets</UIBadge>
							<UIBadge size="xs" role="warning" variant="badge" loading>Retrying</UIBadge>
						</div>
						<p class="badge-note">
							Use `loading` when the badge itself is the status label. The spinner inherits the
							badge color and size rather than introducing a separate style.
						</p>
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
		gap: 2rem;
	}

	.docs-main {
		display: grid;
		gap: 0;
	}

	.doc-section {
		scroll-margin-top: 7rem;
		padding: clamp(1.5rem, 3vw, 2rem) 0;
		border-top: 1px solid var(--sprix-app-border);
	}

	.docs-main > :last-child {
		border-bottom: 1px solid var(--sprix-app-border);
	}

	.hero-card,
	.doc-card {
		display: grid;
		gap: 1.25rem;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card,
	.hero-card__stack,
	.stack-list {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__stack {
		padding-top: 1rem;
		border-top: 1px solid var(--sprix-app-border);
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
		color: var(--sprix-app-text-muted);
		line-height: 1.65;
	}

	.lead {
		max-width: 52rem;
	}

	.doc-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.doc-entry,
	.state-card {
		padding: 1.1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.7rem;
	}

	.doc-entry__demo,
	.badge-row,
	.badge-cloud {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.state-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}

	.badge-note {
		font-size: 0.925rem;
	}

	@media (max-width: 960px) {
		.docs-shell {
			padding-top: 1rem;
		}
	}

	@media (min-width: 960px) {
		.docs-shell {
			grid-template-columns: 16rem minmax(0, 1fr);
			align-items: start;
		}

		.section-heading {
			grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
			align-items: end;
		}

		.doc-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.state-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
