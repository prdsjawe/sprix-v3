<script lang="ts">
	import { Header } from '../../../app/components';
	import { Sidebar as UISidebar } from '$lib/components';

	const sectionLinks = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'surfaces', label: 'Surfaces' },
		{ id: 'collapse', label: 'Collapse' },
		{ id: 'usage', label: 'Usage' }
	] as const;

	const showcaseItems: Sidebar.Item[] = [
		{
			id: 'overview',
			label: 'Overview',
			icon: 'home'
		},
		{
			id: 'library',
			label: 'Library',
			icon: 'rectangle-stack',
			surface: 'multipanel',
			entries: [
				{
					id: 'components',
					label: 'Components',
					icon: 'squares-2x2'
				},
				{
					id: 'patterns',
					label: 'Patterns',
					icon: 'book-open'
				}
			]
		},
		{
			id: 'inbox',
			label: 'Inbox',
			icon: 'inbox',
			surface: 'dropdown',
			entries: [
				{
					id: 'mentions',
					label: 'Mentions',
					icon: 'chat-bubble-left-right'
				},
				{
					id: 'approvals',
					label: 'Approvals',
					icon: 'check-badge'
				}
			]
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: 'cog-6-tooth'
		}
	];

	let sidebarValue = $state('overview');
	let sidebarOpenItem = $state('');
	let sidebarEntryValue = $state('');
	let sidebarCollapsed = $state(false);
	let sidebarSurface = $derived(
		showcaseItems.find((item) => item.id === sidebarOpenItem)?.surface ?? 'none'
	);
	let sidebarWidth = $derived.by(() => {
		if (sidebarCollapsed && sidebarSurface === 'multipanel') return '22.75rem';
		if (sidebarCollapsed) return '4.75rem';
		if (sidebarSurface === 'multipanel') return '35.5rem';
		return '17.5rem';
	});

</script>

<svelte:head>
	<title>Sidebar Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix sidebar primitive, including collapsed icon rails, dropdown items, and adjacent multipanel behavior."
	/>
</svelte:head>

<main class="sidebar-docs" style={`--sidebar-showcase-width: ${sidebarWidth};`}>
	<aside class="sidebar-docs__rail">
		<UISidebar
			id="sidebar-showcase"
			items={showcaseItems}
			bind:value={sidebarValue}
			bind:openItem={sidebarOpenItem}
			bind:entryValue={sidebarEntryValue}
			bind:collapsed={sidebarCollapsed}
		>
			{#snippet header()}
				<div class="sidebar-brand">
					<div class="sidebar-brand__mark">S</div>

					{#if !sidebarCollapsed}
						<div class="sidebar-brand__copy">
							<p>Sprix</p>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet footer()}
				<div class="sidebar-account">
					<div class="sidebar-account__avatar">JD</div>

					{#if !sidebarCollapsed}
						<div class="sidebar-account__copy">
							<p>Jae Ordillano</p>
						</div>
					{/if}
				</div>
			{/snippet}
		</UISidebar>
	</aside>

	<div class="sidebar-docs__content">
		<Header
			eyebrow="Documentation"
			title="Sidebar"
			description="Collapsible application rail with item-level surface control. This showcase keeps the sidebar as the literal left-side frame instead of nesting it inside a demo card."
			pathLabel="components/sidebar"
			pathHref="/components/sidebar"
		/>

		<div class="sidebar-docs__copy">
			<div class="content-toolbar">
				<nav class="section-links" aria-label="Sidebar docs sections">
					{#each sectionLinks as section}
						<a href={`#${section.id}`}>{section.label}</a>
					{/each}
				</nav>
			</div>

			<section id="overview" class="doc-section doc-section-hero">
				<div class="section-heading">
					<p class="section-kicker">Overview</p>
					<h2>The sidebar is the layout.</h2>
					<p>
						This page uses the component as the actual left side of the viewport. There is no extra
						showcase shell around it anymore, so you can evaluate the rail at its intended scale.
					</p>
				</div>
			</section>

			<section id="surfaces" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Surfaces</p>
					<h2>Each item decides its own follow-up surface.</h2>
					<p>
						Use `surface="dropdown"` when an item only needs a small popover. Use
						`surface="multipanel"` when the item needs an attached second column. Leave `surface`
						unset for plain destinations.
					</p>
				</div>

				<div class="doc-grid">
					<article class="doc-card">
						<h3>Dropdown item</h3>
						<p>
							`Inbox` demonstrates the lighter surface. It opens a compact floating list without
							turning the whole rail into a larger layout.
						</p>
					</article>

					<article class="doc-card">
						<h3>Multipanel item</h3>
						<p>
							`Library` demonstrates the heavier surface. It keeps a second navigation column
							attached to the rail, which works better for denser app hierarchies.
						</p>
					</article>
				</div>
			</section>

			<section id="collapse" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Collapse</p>
					<h2>Collapse without changing the item data.</h2>
					<p>
						The same `items` array powers both states. Collapsing only changes the rail width and
						label visibility, which keeps the parent API simple.
					</p>
				</div>
			</section>

			<section id="usage" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Usage</p>
					<h2>Best fit</h2>
					<p>
						This component makes sense when the app has a persistent left navigation frame and only
						a few destinations need extra depth. It is not meant to replace every menu, sheet, or
						command surface.
					</p>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	:global(body) {
		background: var(--sprix-app-surface);
		color: var(--sprix-app-text);
	}

	.sidebar-docs {
		min-height: 100svh;
		display: flex;
	}

	.sidebar-docs__rail {
		flex: 0 0 var(--sidebar-showcase-width);
		position: sticky;
		top: 0;
		width: var(--sidebar-showcase-width);
		height: 100svh;
		min-width: 0;
		overflow: visible;
		background: transparent;
		transition:
			width 750ms cubic-bezier(0.22, 1, 0.36, 1),
			flex-basis 750ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.sidebar-docs__rail :global(.sdb) {
		height: 100svh;
		border: 0;
		border-right: 1px solid var(--sprix-app-border);
		border-radius: 0;
		background: transparent;
		box-shadow: none;
	}

	.sidebar-docs__rail :global(.sdb-rail) {
		min-height: 100svh;
		border-right-color: var(--sprix-app-border);
	}

	.sidebar-docs__rail :global(.sdb-panel) {
		border-left-color: var(--sprix-app-border);
	}

	.sidebar-docs__rail :global(.sdb-body) {
		flex: 1;
	}

	.sidebar-docs__content {
		flex: 1 1 auto;
		min-width: 0;
		background: var(--sprix-app-bg);
		border-left: 1px solid rgba(148, 163, 184, 0.16);
	}

	.sidebar-docs__copy {
		width: min(100%, 54rem);
		padding: 1.5rem clamp(1rem, 3vw, 2.5rem) 3.5rem;
		display: grid;
		gap: 0;
	}

	.content-toolbar,
	.section-heading,
	.doc-card,
	.sidebar-brand__copy,
	.sidebar-account__copy {
		display: grid;
		gap: 0.8rem;
	}

	.content-toolbar {
		padding-bottom: 1.25rem;
	}

	.section-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.section-links a {
		padding: 0.55rem 0.85rem;
		border-radius: 999px;
		border: 1px solid var(--sprix-app-border-strong);
		background: rgba(255, 255, 255, 0.82);
		color: var(--sprix-app-text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.section-links a:hover {
		border-color: #94a3b8;
		color: var(--sprix-app-text);
	}

	.doc-section {
		scroll-margin-top: 7rem;
		padding: 1.75rem 0;
		border-top: 1px solid var(--sprix-app-border);
	}

	.doc-section-hero {
		padding-top: 0.5rem;
		border-top: 0;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--sprix-app-text-subtle);
	}

	.section-heading h2,
	.doc-card h3 {
		margin: 0;
	}

	.section-heading p,
	.doc-card p,
	.sidebar-brand__copy p,
	.sidebar-account__copy p {
		margin: 0;
	}

	.section-heading h2 {
		font-size: clamp(1.45rem, 2.4vw, 2rem);
		line-height: 1.08;
		letter-spacing: -0.04em;
	}

	.section-heading p,
	.doc-card p {
		line-height: 1.75;
		color: var(--sprix-app-text-muted);
	}

	.doc-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding-top: 1.15rem;
	}

	.doc-card {
		padding: 1.1rem;
		border-radius: 1.35rem;
		border: 1px solid var(--sprix-app-border);
		background: rgba(255, 255, 255, 0.88);
	}

	.doc-card h3 {
		font-size: 1rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.sidebar-brand,
	.sidebar-account {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		min-width: 0;
	}

	.sidebar-brand__mark,
	.sidebar-account__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border-radius: 1rem;
	}

	.sidebar-brand__mark {
		width: 2.5rem;
		height: 2.5rem;
		background: linear-gradient(135deg, #dbeafe, #bfdbfe);
		border: 1px solid #bfdbfe;
		color: #2563eb;
		font-weight: 800;
		letter-spacing: -0.04em;
	}

	.sidebar-account__avatar {
		width: 2.35rem;
		height: 2.35rem;
		background: var(--sprix-app-surface);
		border: 1px solid var(--sprix-app-border);
		color: var(--sprix-app-text-muted);
		font-size: 0.85rem;
		font-weight: 700;
	}

	.sidebar-brand__copy,
	.sidebar-account__copy {
		min-width: 0;
	}

	.sidebar-brand__copy p,
	.sidebar-account__copy p {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--sprix-app-text);
	}

	@media (max-width: 1100px) {
		:global(body) {
			background: var(--sprix-app-surface);
		}

		.sidebar-docs {
			flex-direction: column;
		}

		.sidebar-docs__rail {
			position: relative;
			height: auto;
		}

		.sidebar-docs__rail :global(.sdb) {
			height: auto;
			min-height: 28rem;
		}

		.sidebar-docs__content {
			border-left: 0;
			border-top: 1px solid rgba(148, 163, 184, 0.16);
		}
	}

	@media (max-width: 760px) {
		.content-toolbar,
		.doc-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
