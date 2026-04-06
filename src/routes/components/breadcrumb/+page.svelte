<script lang="ts">
	import { Breadcrumb as UIBreadcrumb } from '$lib/components';
	import { Header, Sidebar } from '../../../app/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'patterns', label: 'Patterns', meta: 'Linked ancestors' },
		{ id: 'examples', label: 'Examples', meta: 'Common trails' }
	] as const;

	const workspaceTrail = [
		{ label: 'Home', icon: 'home', href: '/' },
		{ label: 'Projects', href: '/components/card' },
		{ label: 'Website redesign', href: '/components/tabs' },
		{ label: 'Assets' }
	] satisfies Breadcrumb.Item[];

	const docsTrail = [
		{ label: 'Home', icon: 'home', href: '/' },
		{ label: 'Docs', href: '/' },
		{ label: 'Components', href: '/components/button' },
		{ label: 'Breadcrumb' }
	] satisfies Breadcrumb.Item[];

	const releaseTrail = [
		{ label: 'Home', icon: 'home', href: '/' },
		{ label: 'Releases', href: '/components/table' },
		{ label: 'April update', href: '/components/badge' },
		{ label: 'QA checklist' }
	] satisfies Breadcrumb.Item[];

	const archiveTrail = [
		{ label: 'Home', icon: 'home', href: '/' },
		{ label: 'Archive', href: '/components/sidebar' },
		{ label: '2026', href: '/components/progress' },
		{ label: 'Sprint 14' }
	] satisfies Breadcrumb.Item[];
</script>

<svelte:head>
	<title>Breadcrumb Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix breadcrumb primitive, including basic usage patterns and common nested-page trails."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Breadcrumb"
	description="Simple location trail for nested pages, documentation routes, and step-based product surfaces. The current item stays plain text while ancestors can remain navigable."
	pathLabel="components/breadcrumb"
	pathHref="/components/breadcrumb"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Keep hierarchy visible without turning it into chrome.</h2>
				<p class="lead">
					Breadcrumb should stay lightweight. Use it when the user benefits from seeing where a
					screen sits inside a larger structure. Ancestors can link back up the tree. The current
					page should read as text.
				</p>
			</div>

			<div class="hero-card__trail">
				<UIBreadcrumb items={workspaceTrail} />
			</div>
		</section>

		<section id="patterns" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Patterns</p>
					<h2>Keep the trail short and predictable.</h2>
				</div>
				<p>
					Use linked ancestors when the user may need to move upward. Let the last item represent
					the current page unless you explicitly mark another item as current.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Linked ancestors</h3>
						<p>Earlier items remain navigable so the trail works as both context and shortcut.</p>
					</div>
					<div class="trail-frame">
						<UIBreadcrumb items={docsTrail} />
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Neutral surface</h3>
						<p>
							The default treatment stays quiet: gray background, muted labels, and a clearer
							current page.
						</p>
					</div>
					<div class="trail-frame">
						<UIBreadcrumb items={releaseTrail} />
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical product and documentation trails.</h2>
				</div>
				<p>
					Keep labels concise. If the path is getting long, the information architecture probably
					needs work first.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Project assets</span>
					<div class="trail-stack">
						<UIBreadcrumb items={workspaceTrail} />
						<p>Nested workspace pages where users frequently move one level up.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Documentation</span>
					<div class="trail-stack">
						<UIBreadcrumb items={docsTrail} />
						<p>Docs routes where the trail mirrors the section hierarchy.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Archive view</span>
					<div class="trail-stack">
						<UIBreadcrumb items={archiveTrail} />
						<p>Longer content trees still stay readable when each label is kept tight.</p>
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
	.trail-stack {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__trail {
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
	}

	.lead {
		max-width: 48rem;
		font-size: 1rem;
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1.25rem;
	}

	.doc-entry,
	.state-card {
		padding-top: 1rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.35rem;
	}

	.trail-frame {
		padding: 1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1rem;
		background: var(--sprix-app-surface);
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
