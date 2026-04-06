<script lang="ts">
	import { Pagination as UIPagination } from '$lib/components';
	import { Header, Sidebar } from '../../../app/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'xs to md' },
		{ id: 'ranges', label: 'Ranges', meta: 'Windowing and truncation' },
		{ id: 'examples', label: 'Examples', meta: 'Common pagination flows' }
	] as const;

	const sizes = [
		{
			size: 'xs',
			label: 'Extra small',
			description: 'Default dense footer for tables and document lists.'
		},
		{
			size: 'sm',
			label: 'Small',
			description: 'Roomier list views that still need compact navigation.'
		},
		{
			size: 'md',
			label: 'Medium',
			description: 'Broader surfaces where pagination should read as a stronger control row.'
		}
	] as const;

	let heroPage = $state(8);
	let compactPage = $state(4);
	let reviewPage = $state(12);
</script>

<svelte:head>
	<title>Pagination Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix pagination primitive, including compact sizing, truncation behavior, and controlled page-change examples."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Pagination"
	description="Compact pagination nav built from ghost buttons with a promoted current page. The parent owns page state while the component handles truncation, previous and next controls, and compact sizing."
	pathLabel="components/pagination"
	pathHref="/components/pagination"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Keep page navigation present, not loud.</h2>
				<p class="lead">
					Pagination stays intentionally compact. Every control remains quiet by default, and the
					current page steps up to the secondary button surface so the user always knows where they
					are without turning the footer into a toolbar.
				</p>
			</div>

			<div class="hero-card__demo">
				<div class="pagination-frame">
					<p class="pagination-frame__label">Release archive</p>
					<UIPagination count={18} page={heroPage} onpagechange={(page) => (heroPage = page)} />
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Default to `xs`, scale only when the layout needs it.</h2>
				</div>
				<p>
					Pagination borrows the button size system, but it stays denser than general action rows by
					design.
				</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="pagination-frame">
							<p class="pagination-frame__label">Page footer</p>
							<UIPagination
								size={item.size}
								count={11}
								page={item.size === 'xs' ? 4 : item.size === 'sm' ? 5 : 6}
							/>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="ranges" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Ranges</p>
					<h2>Show the current neighborhood and trim the rest.</h2>
				</div>
				<p>
					The component keeps the current page, its nearby siblings, and the outer boundaries
					visible. Gaps collapse into ellipses so long runs still read cleanly.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Default window</h3>
						<p>One sibling on each side is enough for most content indexes and admin tables.</p>
					</div>
					<div class="pagination-frame">
						<p class="pagination-frame__label">63 results pages</p>
						<UIPagination
							count={63}
							page={reviewPage}
							onpagechange={(page) => (reviewPage = page)}
						/>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Tighter boundaries</h3>
						<p>Reduce boundary and sibling counts when the footer must stay especially compact.</p>
					</div>
					<div class="pagination-frame">
						<p class="pagination-frame__label">Compact audit log</p>
						<UIPagination count={24} page={9} siblingCount={0} boundaryCount={1} />
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Use it as a controlled nav row.</h2>
				</div>
				<p>
					The parent keeps page state, which makes it straightforward to sync list queries, filters,
					or URL params.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Inbox</span>
					<div class="pagination-frame">
						<p class="pagination-frame__label">Showing page {compactPage} of 14</p>
						<UIPagination
							count={14}
							page={compactPage}
							onpagechange={(page) => (compactPage = page)}
						/>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<div class="pagination-frame">
						<p class="pagination-frame__label">Bulk export in progress</p>
						<UIPagination count={14} page={6} disabled />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">No arrows</span>
					<div class="pagination-frame">
						<p class="pagination-frame__label">Inline page jump</p>
						<UIPagination count={9} page={3} showPrevNext={false} />
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
	.hero-card__demo {
		display: grid;
		gap: 0.85rem;
	}

	.section-kicker,
	.state-label,
	.pagination-frame__label {
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
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	p {
		max-width: 68ch;
		color: var(--sprix-app-text-muted);
		line-height: 1.7;
	}

	.lead {
		font-size: 1rem;
		color: var(--sprix-app-text-muted);
	}

	.doc-grid {
		display: grid;
		gap: 1rem;
	}

	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.pagination-frame {
		display: grid;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid var(--sprix-app-border);
		background: var(--sprix-app-bg);
	}

	@media (min-width: 720px) {
		.docs-shell {
			grid-template-columns: minmax(0, 13rem) minmax(0, 1fr);
			align-items: start;
		}

		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.state-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
