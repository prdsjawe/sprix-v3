<script lang="ts">
	import { Header } from '../../../app/components';
	import {
		Button as UIButton,
		Icon as UIIcon,
		NavMenu as UINavMenu,
		NavMenuContents as UINavMenuContents,
		NavMenuItem as UINavMenuItem,
		NavMenuRight as UINavMenuRight,
		NavMenuTrigger as UINavMenuTrigger
	} from '$lib/components';

	const sectionLinks = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'anatomy', label: 'Anatomy' },
		{ id: 'interaction', label: 'Interaction' },
		{ id: 'usage', label: 'Usage' }
	] as const;

	const platformItems = [
		{
			title: 'Release desk',
			description: 'Approve launch windows, owner sign-off, and final scope without leaving the header.',
			meta: '4 queued',
			href: '#usage',
			icon: 'rocket-launch'
		},
		{
			title: 'Ops watch',
			description: 'Track incidents, service health, and escalation ownership from one compact surface.',
			meta: 'Live status',
			href: '#interaction',
			icon: 'server-stack'
		},
		{
			title: 'Design review',
			description: 'Keep feedback rounds, implementation notes, and locked revisions in a single review lane.',
			meta: '12 pending',
			href: '#anatomy',
			icon: 'paint-brush'
		}
	] as const;

	const solutionItems = [
		{
			title: 'Product teams',
			description: 'Roadmaps, QA, release notes, and docs that need quick top-level switching.',
			meta: 'Internal ops',
			href: '#overview',
			icon: 'rectangle-stack'
		},
		{
			title: 'Client programs',
			description: 'Shared navigation for approvals, assets, delivery status, and stakeholder visibility.',
			meta: 'External review',
			href: '#usage',
			icon: 'briefcase'
		},
		{
			title: 'Governed workspaces',
			description: 'Permission-aware discovery for security, support, and controlled rollout surfaces.',
			meta: 'Access-aware',
			href: '#interaction',
			icon: 'shield-check'
		}
	] as const;

	const resourceItems = [
		{
			label: 'Implementation guide',
			description: 'Anatomy, trigger behavior, and snippet composition for the reusable primitive.',
			meta: 'Docs route',
			href: '#usage',
			icon: 'book-open'
		},
		{
			label: 'Interaction notes',
			description: 'Why the hover delay, focus path, and dismissal model stay intentionally restrained.',
			meta: 'Behavior',
			href: '#interaction',
			icon: 'clock'
		},
		{
			label: 'Related sidebar',
			description: 'Use the sidebar instead when the information architecture turns into a deeper tree.',
			meta: 'Compare',
			href: '/components/sidebar',
			icon: 'lifebuoy'
		}
	] as const;
</script>

<svelte:head>
	<title>Nav Menu Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix nav-menu family, including logo and right-side composition, hover flyouts, and trigger anatomy."
	/>
</svelte:head>

<main class="nav-menu-docs">
	<div class="nav-menu-docs__showcase">
		<UINavMenu id="nav-menu-showcase" class="nav-menu-docs__menu">
			{#snippet logo()}
				<a href="/" class="nav-menu-brand" aria-label="Sprix home">
					<span class="nav-menu-brand__mark">S</span>
					<span class="nav-menu-brand__copy">
						<strong>Sprix</strong>
					</span>
				</a>
			{/snippet}

			<UINavMenuItem>
				<UINavMenuTrigger href="#overview" current>Overview</UINavMenuTrigger>
			</UINavMenuItem>

			<UINavMenuItem>
				<UINavMenuTrigger>Platform</UINavMenuTrigger>
				<UINavMenuContents>
					<div class="flyout-stack">
						<div class="flyout-copy">
							<p class="flyout-eyebrow">Platform</p>
							<h2>Header-level actions should feel like deliberate destination buttons.</h2>
							<p>
								Use the flyout for grouped discovery and high-signal decisions, not for dumping the
								entire sitemap into a thin dropdown.
							</p>
						</div>

						<div class="flyout-feature-grid">
							{#each platformItems as item}
								<a class="flyout-feature" href={item.href}>
									<div class="flyout-feature__head">
										<span class="flyout-icon" aria-hidden="true">
											<UIIcon name={item.icon} class="" />
										</span>

										<span class="flyout-chip">{item.meta}</span>
									</div>

									<div class="flyout-feature__copy">
										<p>{item.title}</p>
										<span>{item.description}</span>
									</div>

									<span class="flyout-link-line">
										Open surface
										<UIIcon name="arrow-right" class="" />
									</span>
								</a>
							{/each}
						</div>
					</div>
				</UINavMenuContents>
			</UINavMenuItem>

			<UINavMenuItem>
				<UINavMenuTrigger>Solutions</UINavMenuTrigger>
				<UINavMenuContents class="flyout-split">
					<div class="flyout-copy">
						<p class="flyout-eyebrow">Solutions</p>
						<h2>The dropdown rows can carry more than a plain label.</h2>
						<p>
							The content is still just a snippet, so each row can behave like a compact decision card
							with context, metadata, and a clear next step.
						</p>
					</div>

					<div class="flyout-list">
						{#each solutionItems as item}
							<a class="flyout-row" href={item.href}>
								<span class="flyout-row__icon" aria-hidden="true">
									<UIIcon name={item.icon} class="" />
								</span>

								<span class="flyout-row__copy">
									<span class="flyout-row__meta">{item.meta}</span>
									<strong>{item.title}</strong>
									<small>{item.description}</small>
								</span>

								<span class="flyout-row__trail" aria-hidden="true">
									<UIIcon name="arrow-right" class="" />
								</span>
							</a>
						{/each}
					</div>
				</UINavMenuContents>
			</UINavMenuItem>

			<UINavMenuItem placement="bottom-end">
				<UINavMenuTrigger>Resources</UINavMenuTrigger>
				<UINavMenuContents class="flyout-compact">
					<div class="flyout-list">
						{#each resourceItems as item}
							<a class="flyout-row" href={item.href}>
								<span class="flyout-row__icon" aria-hidden="true">
									<UIIcon name={item.icon} class="" />
								</span>

								<span class="flyout-row__copy">
									<span class="flyout-row__meta">{item.meta}</span>
									<strong>{item.label}</strong>
									<small>{item.description}</small>
								</span>

								<span class="flyout-row__trail" aria-hidden="true">
									<UIIcon name="arrow-up-right" class="" />
								</span>
							</a>
						{/each}
					</div>
				</UINavMenuContents>
			</UINavMenuItem>

			{#snippet right()}
				<UINavMenuRight>
					<UIButton size="sm" role="secondary" variant="quiet" rightIcon="arrow-up-right">
						View changelog
					</UIButton>
					<UIButton size="sm" role="primary" rightIcon="arrow-right">Start workspace</UIButton>
				</UINavMenuRight>
			{/snippet}
		</UINavMenu>
	</div>

	<div class="nav-menu-docs__content">
		<Header
			eyebrow="Documentation"
			title="Nav Menu"
			description="Horizontal navigation shell with snippet-based flyouts. This showcase keeps the component as the actual top frame of the page so you can judge spacing, hover timing, and right-side actions at real scale."
			pathLabel="components/nav-menu"
			pathHref="/components/nav-menu"
		/>

		<div class="nav-menu-docs__copy">
			<div class="content-toolbar">
				<nav class="section-links" aria-label="Nav menu docs sections">
					{#each sectionLinks as section}
						<a href={`#${section.id}`}>{section.label}</a>
					{/each}
				</nav>
			</div>

			<section id="overview" class="doc-section doc-section-hero">
				<div class="section-heading">
					<p class="section-kicker">Overview</p>
					<h2>The nav menu is the top chrome, not a mini card preview.</h2>
					<p>
						The wrapper owns the horizontal shell. The logo snippet sits on the left, item triggers
						stay in the center lane as discrete action buttons, and the right slot carries account or
						CTA actions without introducing another layout component.
					</p>
				</div>
			</section>

			<section id="anatomy" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Anatomy</p>
					<h2>Compose it from small internal parts.</h2>
					<p>
						`NavMenu` gives you the frame. `NavMenuItem` owns one hover surface. `NavMenuTrigger`
						can render either a direct anchor or a flyout button with a caret. `NavMenuContents`
						becomes the tippy-backed popover. Use `NavMenuRight` as the house wrapper for trailing
						actions, and treat dropdown rows like compact cards rather than anonymous list links.
					</p>
				</div>

				<div class="doc-grid">
					<article class="doc-card">
						<h3>Left side</h3>
						<p>
							Keep the logo compact and stable. The item row should read like a set of separate
							buttons, not a single segmented control.
						</p>
					</article>

					<article class="doc-card">
						<h3>Flyout content</h3>
						<p>
							Because the content is a snippet, you can render richer button rows with metadata,
							icons, and stronger hierarchy without creating a second API for each shape.
						</p>
					</article>
				</div>
			</section>

			<section id="interaction" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Interaction</p>
					<h2>Hover opens the surface and the caret rotates with it.</h2>
					<p>
						Each item creates its own tippy instance. Hover and focus open the content, outside
						clicks dismiss it, and link-only triggers stay as real anchors so the top bar can mix
						direct navigation with richer flyouts that still read like product controls.
					</p>
				</div>
			</section>

			<section id="usage" class="doc-section">
				<div class="section-heading">
					<p class="section-kicker">Usage</p>
					<h2>Best fit</h2>
					<p>
						Use this when the application needs persistent top-level discovery and only a handful of
						destinations deserve a richer flyout. If every trigger needs deep tree navigation, the
						sidebar or a dedicated command surface is still the better primitive.
					</p>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	:global(body) {
		background: #f8fafc;
		color: #0f172a;
	}

	.nav-menu-docs {
		--nav-menu-showcase-height: 4.85rem;
		min-height: 100svh;
		background:
			radial-gradient(circle at top left, rgba(191, 219, 254, 0.45), transparent 28rem),
			linear-gradient(180deg, #ffffff 0%, #f8fafc 20%, #f8fafc 100%);
	}

	.nav-menu-docs__showcase {
		position: sticky;
		top: 0;
		z-index: 40;
		border-bottom: 1px solid rgba(226, 232, 240, 0.92);
		background: rgba(248, 250, 252, 0.88);
		backdrop-filter: blur(18px);
	}

	:global(.nav-menu-docs__menu) {
		width: min(100%, 88rem);
		margin: 0 auto;
		padding-inline: clamp(1rem, 3vw, 2rem);
		border-bottom: 0;
		background: transparent;
	}

	.nav-menu-docs__content {
		width: min(100%, 88rem);
		margin: 0 auto;
		padding: 0 0 4rem;
	}

	.nav-menu-docs__content :global(.docs-header) {
		top: var(--nav-menu-showcase-height);
		background: rgba(248, 250, 252, 0.94);
	}

	.nav-menu-docs__copy {
		width: min(100%, 54rem);
		padding: 1.5rem clamp(1rem, 3vw, 2.5rem) 0;
		display: grid;
		gap: 0;
	}

	.content-toolbar,
	.section-heading,
	.doc-card,
	.nav-menu-brand__copy,
	.flyout-copy,
	.flyout-stack,
	.flyout-list,
	.flyout-feature__copy,
	.flyout-row__copy {
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
		border: 1px solid #cbd5e1;
		background: rgba(255, 255, 255, 0.82);
		color: #334155;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.section-links a:hover {
		border-color: #94a3b8;
		color: #0f172a;
	}

	.doc-section {
		scroll-margin-top: 9rem;
		padding: 1.75rem 0;
		border-top: 1px solid #e2e8f0;
	}

	.doc-section-hero {
		padding-top: 0.5rem;
		border-top: 0;
	}

	.section-kicker,
	.flyout-eyebrow {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #64748b;
	}

	.section-heading h2,
	.doc-card h3,
	.flyout-copy h2 {
		margin: 0;
	}

	.section-heading p,
	.doc-card p,
	.flyout-copy p,
	.flyout-feature p,
	.flyout-feature span,
	.flyout-row strong,
	.flyout-row small,
	.flyout-row__meta {
		margin: 0;
	}

	.section-heading h2,
	.flyout-copy h2 {
		font-size: clamp(1.45rem, 2.4vw, 2rem);
		line-height: 1.08;
		letter-spacing: -0.04em;
	}

	.section-heading p,
	.doc-card p,
	.flyout-copy p {
		line-height: 1.75;
		color: #475569;
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
		border: 1px solid #dbe4f0;
		background: rgba(255, 255, 255, 0.88);
	}

	.doc-card h3 {
		font-size: 1rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.nav-menu-brand {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		color: #0f172a;
		text-decoration: none;
	}

	.nav-menu-brand__mark {
		display: flex;
		width: 2.5rem;
		height: 2.5rem;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border-radius: 1rem;
		background: #eff6ff;
		border: 1px solid #dbeafe;
		color: #2563eb;
		font-weight: 800;
		letter-spacing: -0.04em;
	}

	.nav-menu-brand__copy {
		min-width: 0;
	}

	.nav-menu-brand__copy strong,
	.nav-menu-brand__copy small {
		display: block;
	}

	.nav-menu-brand__copy strong {
		font-size: 0.95rem;
		letter-spacing: -0.03em;
	}

	.nav-menu-brand__copy small {
		color: #64748b;
		font-size: 0.78rem;
	}

	.flyout-stack {
		max-width: 34rem;
	}

	.flyout-feature-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
	}

	.flyout-feature,
	.flyout-row {
		text-decoration: none;
		color: inherit;
		border-radius: 1.15rem;
		border: 0;
		background: transparent;
		transition: background-color 180ms ease, color 180ms ease;
	}

	.flyout-feature:hover,
	.flyout-row:hover {
		background: #f8fafc;
	}

	.flyout-feature {
		display: grid;
		gap: 0.85rem;
		padding: 0.9rem;
	}

	.flyout-feature__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.flyout-feature p,
	.flyout-row strong {
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: #0f172a;
	}

	.flyout-feature span,
	.flyout-row small {
		line-height: 1.55;
		color: #475569;
	}

	.flyout-icon,
	.flyout-row__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2.15rem;
		height: 2.15rem;
		border-radius: 0.9rem;
		background: #f1f5f9;
		color: #334155;
	}

	.flyout-icon :global(svg),
	.flyout-row__icon :global(svg) {
		width: 1rem;
		height: 1rem;
		fill: transparent;
		stroke: currentColor;
	}

	.flyout-chip,
	.flyout-row__meta {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		background: #f1f5f9;
		color: #475569;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.flyout-link-line {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: #0f172a;
		font-size: 0.84rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.flyout-link-line :global(svg) {
		width: 0.95rem;
		height: 0.95rem;
		fill: transparent;
		stroke: currentColor;
	}

	:global(.flyout-split) {
		min-width: 34rem;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
	}

	:global(.flyout-compact) {
		min-width: 22rem;
	}

	.flyout-row {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.85rem 0.9rem;
	}

	.flyout-row__copy {
		min-width: 0;
		flex: 1;
	}

	.flyout-row small {
		display: block;
		padding-top: 0.2rem;
	}

	.flyout-row__trail {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: #64748b;
	}

	.flyout-row__trail :global(svg) {
		width: 1rem;
		height: 1rem;
		fill: transparent;
		stroke: currentColor;
	}

	@media (max-width: 960px) {
		.nav-menu-docs__showcase {
			position: relative;
		}

		.nav-menu-docs__content :global(.docs-header) {
			top: 0;
		}

		.flyout-feature-grid,
		:global(.flyout-split) {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 760px) {
		.doc-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.nav-menu-brand__copy {
			display: none;
		}
	}
</style>
