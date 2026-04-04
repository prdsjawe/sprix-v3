<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Badge as UIBadge,
		Button as UIButton,
		HoverCard as UIHoverCard,
		Icon as UIIcon
	} from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'placements', label: 'Placements', meta: 'Top, side, bottom' },
		{ id: 'showcase', label: 'Showcase', meta: 'Common card content' }
	] as const;

	const placements = [
		{
			placement: 'top',
			label: 'Top',
			description: 'Useful when the trigger sits low in a dense row or stacked card list.'
		},
		{
			placement: 'right',
			label: 'Right',
			description: 'Good for compact rail items and controls tucked against the left edge.'
		},
		{
			placement: 'bottom',
			label: 'Bottom',
			description: 'Best default when the trigger has breathing room beneath it.'
		},
		{
			placement: 'left',
			label: 'Left',
			description: 'Works well for trailing actions and right-aligned summary blocks.'
		}
	] as const;
</script>

<svelte:head>
	<title>Hover Card Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix hover card primitive, including placement options and card-style rich content examples."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Hover Card"
	description="Tippy-backed hover overlay for custom HTML content that should read like a compact card rather than a terse tooltip. Use it for profile previews, richer status context, and summary panels."
	pathLabel="components/hover-card"
	pathHref="/components/hover-card"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Same wrapper posture as tooltip, but with a real card surface.</h2>
				<p class="lead">
					`HoverCard` wraps arbitrary trigger content and opens richer custom HTML on hover or focus.
					Keep it for contextual previews that need structure, hierarchy, and actions. If the message
					could fit in one short sentence, stay on `Tooltip`.
				</p>
			</div>

			<div class="hero-actions">
				<UIHoverCard placement="bottom-start">
					<button class="person-trigger" type="button">
						<span class="person-trigger__avatar">AD</span>
						<span class="person-trigger__copy">
							<strong>Ana Dela Cruz</strong>
							<span>Product design lead</span>
						</span>
					</button>

					{#snippet content()}
						<div class="hover-panel">
							<div class="hover-panel__header">
								<div>
									<small>Team profile</small>
									<h3>Ana Dela Cruz</h3>
								</div>
								<UIBadge role="success" variant="pill-color" size="sm">Online</UIBadge>
							</div>
							<p>Leads the shared component system, design reviews, and launch QA for product surfaces.</p>
							<div class="hover-panel__meta">
								<span>Manila</span>
								<span>12 active reviews</span>
							</div>
						</div>
					{/snippet}
				</UIHoverCard>

				<UIHoverCard placement="bottom-end" contentClass="w-[20rem]" maxWidth="none">
					<UIButton role="secondary" variant="outline">Release summary</UIButton>

					{#snippet content()}
						<div class="hover-panel">
							<div class="hover-panel__header">
								<div>
									<small>Release train</small>
									<h3>April stable rollout</h3>
								</div>
								<UIBadge role="primary" variant="pill-color" size="sm">83% shipped</UIBadge>
							</div>
							<p>Payments and workspace settings are live. Mobile exports are still in staged rollout.</p>
							<div class="hover-panel__stats">
								<div>
									<strong>27</strong>
									<span>tasks shipped</span>
								</div>
								<div>
									<strong>3</strong>
									<span>items pending</span>
								</div>
							</div>
						</div>
					{/snippet}
				</UIHoverCard>
			</div>
		</section>

		<section id="placements" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Placements</p>
					<h2>Use the same directional placement model as tooltip.</h2>
				</div>
				<p>The trigger contract stays small while the content grows into a bordered card with shadow.</p>
			</div>

			<div class="doc-grid">
				{#each placements as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIHoverCard placement={item.placement}>
								<UIButton role="secondary" variant="soft">{item.label}</UIButton>

								{#snippet content()}
									<div class="hover-mini">
										<small>{item.label} placement</small>
										<h3>Structured preview</h3>
										<p>Keep the content richer than a tooltip, but lighter than a dialog or full popover workflow.</p>
									</div>
								{/snippet}
							</UIHoverCard>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="showcase" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Showcase</p>
					<h2>Patterns that benefit from custom HTML.</h2>
				</div>
				<p>These examples lean on headings, metadata rows, and supporting actions instead of one-line hint copy.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Profile preview</span>
					<UIHoverCard placement="right-start">
						<button class="showcase-trigger" type="button">
							<span class="showcase-trigger__avatar">JD</span>
							<span>
								<strong>Jordan Doyle</strong>
								<span>Frontend engineer</span>
							</span>
						</button>

						{#snippet content()}
							<div class="hover-panel">
								<div class="hover-panel__header">
									<div>
										<small>Contributor</small>
										<h3>Jordan Doyle</h3>
									</div>
									<UIBadge role="secondary" variant="pill" size="sm">Focus mode</UIBadge>
								</div>
								<p>Maintains navigation primitives, docs polish, and state-heavy Svelte component demos.</p>
								<div class="hover-panel__meta">
									<span>11 merged this week</span>
									<span>7 reviews waiting</span>
								</div>
							</div>
						{/snippet}
					</UIHoverCard>
				</article>

				<article class="state-card">
					<span class="state-label">Metric summary</span>
					<UIHoverCard placement="top">
						<div class="metric-trigger">
							<span>Conversion rate</span>
							<strong>4.8%</strong>
						</div>

						{#snippet content()}
							<div class="hover-panel">
								<div class="hover-panel__header">
									<div>
										<small>Weekly metric</small>
										<h3>Conversion rate</h3>
									</div>
									<span class="metric-chip metric-chip--up">
										<UIIcon name="arrow-trending-up" class="size-3.5" />
										+0.7%
									</span>
								</div>
								<p>Improved after the checkout review step was simplified for returning workspace members.</p>
								<div class="hover-panel__stats">
									<div>
										<strong>12.4k</strong>
										<span>visits</span>
									</div>
									<div>
										<strong>591</strong>
										<span>conversions</span>
									</div>
								</div>
							</div>
						{/snippet}
					</UIHoverCard>
				</article>

				<article class="state-card">
					<span class="state-label">Block trigger</span>
					<UIHoverCard as="div" placement="top-start" contentClass="w-[21rem]" maxWidth="none">
						<div class="panel-trigger">
							<div>
								<strong>Workspace health</strong>
								<p>Hover the whole row to preview current infrastructure status.</p>
							</div>
							<UIBadge role="success" variant="pill" size="sm">Healthy</UIBadge>
						</div>

						{#snippet content()}
							<div class="hover-panel">
								<div class="hover-panel__header">
									<div>
										<small>Infrastructure snapshot</small>
										<h3>All systems nominal</h3>
									</div>
									<UIBadge role="success" variant="pill-color" size="sm">99.98%</UIBadge>
								</div>
								<p>API latency is stable, background jobs are draining normally, and no incidents are open.</p>
								<div class="hover-panel__meta">
									<span>API 184ms p95</span>
									<span>Queue delay 9s</span>
								</div>
							</div>
						{/snippet}
					</UIHoverCard>
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
	.doc-entry,
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
	.section-heading p,
	.doc-entry__meta p,
	.state-card p {
		margin: 0;
		color: var(--sprix-app-text-muted);
		line-height: 1.65;
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--sprix-app-text-subtle);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	.doc-card {
		padding: clamp(1.25rem, 3vw, 2rem);
		display: grid;
		gap: 1.5rem;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}

	.doc-entry,
	.state-card {
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.25rem;
		background: var(--sprix-app-surface);
		padding: 1rem;
	}

	.doc-entry {
		display: grid;
		gap: 1rem;
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.5rem;
	}

	.doc-entry__meta h3 {
		margin: 0;
		font-size: 1rem;
		color: var(--sprix-app-text);
	}

	.doc-entry__demo {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 4.5rem;
	}

	.person-trigger,
	.showcase-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		border: 1px solid var(--sprix-app-border-strong);
		border-radius: 999px;
		background: var(--sprix-app-surface);
		padding: 0.6rem 0.85rem 0.6rem 0.65rem;
		font: inherit;
		color: inherit;
		cursor: pointer;
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
	}

	.person-trigger__avatar,
	.showcase-trigger__avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #dbeafe 0%, var(--sprix-app-border) 100%);
		font-size: 0.8rem;
		font-weight: 700;
		color: #1e3a8a;
	}

	.person-trigger__copy,
	.showcase-trigger > span:last-child {
		display: grid;
		text-align: left;
	}

	.person-trigger strong,
	.showcase-trigger strong,
	.metric-trigger strong,
	.panel-trigger strong {
		font-size: 0.95rem;
		color: var(--sprix-app-text);
	}

	.person-trigger__copy > span,
	.showcase-trigger > span:last-child > span,
	.metric-trigger > span,
	.panel-trigger p {
		font-size: 0.875rem;
		color: var(--sprix-app-text-subtle);
	}

	.hover-panel,
	.hover-mini {
		display: grid;
		gap: 0.75rem;
	}

	.hover-panel__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.hover-panel__meta,
	.hover-panel__stats {
		display: grid;
		gap: 0.65rem;
	}

	.hover-panel__meta {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		padding-top: 0.75rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	.hover-panel__meta span {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--sprix-app-text-muted);
	}

	.hover-panel__stats {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.hover-panel__stats div {
		display: grid;
		gap: 0.15rem;
		padding: 0.75rem 0.85rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 0.95rem;
		background: var(--sprix-app-bg);
	}

	.hover-panel__stats strong {
		font-size: 1rem;
		color: var(--sprix-app-text);
	}

	.hover-panel__stats span {
		font-size: 0.8rem;
		color: var(--sprix-app-text-subtle);
	}

	.metric-trigger,
	.panel-trigger {
		display: grid;
		gap: 0.35rem;
		border: 1px solid var(--sprix-app-border-strong);
		border-radius: 1rem;
		background: var(--sprix-app-surface);
		padding: 1rem 1.1rem;
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
	}

	.metric-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.55rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.metric-chip--up {
		background: #ecfdf5;
		color: #166534;
	}

	.panel-trigger {
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: flex-start;
	}

	@media (max-width: 960px) {
		.docs-shell {
			grid-template-columns: 1fr;
		}
	}
</style>
