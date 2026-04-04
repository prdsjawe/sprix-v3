<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Badge as UIBadge, Separator as UISeparator } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Rule and spacing rhythm' },
		{ id: 'orientation', label: 'Orientation', meta: 'Horizontal and vertical' },
		{ id: 'semantics', label: 'Semantics', meta: 'Decorative vs announced' },
		{ id: 'examples', label: 'Examples', meta: 'Stacks and toolbars' }
	] as const;
</script>

<svelte:head>
	<title>Separator Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix separator primitive, including horizontal and vertical orientation, semantic usage, and common layout patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Separator"
	description="Minimal dividing rule for breaking content into readable groups. It supports horizontal and vertical orientation without adding extra layout logic to the parent surface."
	pathLabel="components/separator"
	pathHref="/components/separator"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it to establish rhythm between related blocks, not as decoration-by-default.</h2>
				<p class="lead">
					`Separator` is a small structural primitive. Horizontal rules split stacked content. Vertical rules
					split inline controls, metadata, and compact toolbars. The default is decorative so it stays quiet
					unless you explicitly need assistive semantics.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="stack-demo">
					<div class="stack-row">
						<p class="stack-title">Deployment summary</p>
						<p class="stack-copy">QA passed on production candidate `v3.9.1`.</p>
					</div>

					<UISeparator />

					<div class="stack-row">
						<p class="stack-title">Next action</p>
						<p class="stack-copy">Confirm support coverage before the rollout window opens.</p>
					</div>
				</div>
			</div>
		</section>

		<section id="orientation" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Orientation</p>
					<h2>Match the axis of the layout you are dividing.</h2>
				</div>
				<p>
					Use the default horizontal rule for stacked sections. Switch to `orientation="vertical"` inside
					inline groups, filters, and compact command rows.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Horizontal</h3>
						<p>Best for stacked cards, grouped settings, and sectioned forms.</p>
					</div>

					<div class="stack-demo">
						<div class="stack-row">
							<p class="stack-title">Workspace access</p>
							<p class="stack-copy">32 members, 4 admins, 2 pending invites.</p>
						</div>

						<UISeparator />

						<div class="stack-row">
							<p class="stack-title">Security review</p>
							<p class="stack-copy">SSO required for production workspaces.</p>
						</div>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Vertical</h3>
						<p>Use vertical separators in inline metadata, segmented actions, and command bars.</p>
					</div>

					<div class="inline-demo">
						<UIBadge size="xs" role="primary" variant="badge">Preview</UIBadge>
						<UISeparator orientation="vertical" />
						<span>12 files changed</span>
						<UISeparator orientation="vertical" />
						<span>Ready to review</span>
					</div>
				</article>
			</div>
		</section>

		<section id="semantics" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Semantics</p>
					<h2>Default to decorative. Opt into separator semantics only when the rule carries structure.</h2>
				</div>
				<p>
					The component defaults to `decorative={true}` so visual dividers do not add noise to screen reader
					output. Set `decorative={false}` when the separator represents a meaningful section boundary.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Decorative</span>
					<p class="state-copy">
						Use for common visual rhythm inside cards, drawers, or list groups.
					</p>
					<UISeparator />
				</article>

				<article class="state-card">
					<span class="state-label">Semantic</span>
					<p class="state-copy">
						Use `decorative={false}` when the divider signals a real content boundary.
					</p>
					<UISeparator decorative={false} />
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Keep grouped content readable without inventing one-off border wrappers.</h2>
				</div>
				<p>
					Separators work best when the parent already owns layout and spacing. The rule only defines the
					break, not the container system around it.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Settings stack</span>
					<div class="stack-demo">
						<div class="stack-row">
							<p class="stack-title">Email digest</p>
							<p class="stack-copy">Bundle unresolved activity every Friday at 6 PM.</p>
						</div>

						<UISeparator />

						<div class="stack-row">
							<p class="stack-title">Incident alerts</p>
							<p class="stack-copy">Escalate paging issues directly to the on-call lead.</p>
						</div>

						<UISeparator />

						<div class="stack-row">
							<p class="stack-title">Access review</p>
							<p class="stack-copy">Require admin approval before adding production members.</p>
						</div>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Toolbar meta</span>
					<div class="inline-demo inline-demo-toolbar">
						<span>Published</span>
						<UISeparator orientation="vertical" />
						<span>Marketing site</span>
						<UISeparator orientation="vertical" />
						<span>2 min ago</span>
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
	.hero-card__stack,
	.section-heading,
	.doc-entry,
	.state-card,
	.stack-demo,
	.stack-row {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__stack {
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
	}

	.doc-entry,
	.state-card {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(248 250 252 / 0.92));
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
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	.lead,
	.section-heading > p,
	.doc-entry__meta p,
	.state-copy,
	.stack-copy {
		color: #475569;
		line-height: 1.7;
	}

	.stack-demo {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		background: #fff;
	}

	.stack-title {
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.inline-demo {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid #e2e8f0;
		background: #fff;
		color: #334155;
	}

	.inline-demo :global(.sep.sep-vertical) {
		min-height: 1rem;
	}

	.inline-demo-toolbar {
		font-size: 0.875rem;
	}

	@media (min-width: 64rem) {
		.docs-shell {
			grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
		}
	}
</style>
