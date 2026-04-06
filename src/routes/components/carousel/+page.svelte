<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Button as UIButton, Carousel as UICarousel } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Viewport-first paging' },
		{ id: 'fit', label: 'Fit Behavior', meta: 'Wide and constrained shells' },
		{ id: 'control', label: 'Controlled Page', meta: 'External navigation' }
	] as const;

	const showcaseItems = [
		{
			id: 'handoff',
			eyebrow: 'Design handoff',
			title: 'Q2 launch review',
			description:
				'Bundle annotated screens, copy locks, and reviewer notes into one release lane.',
			meta: '12 tasks ready',
			tint: '#0f766e'
		},
		{
			id: 'growth',
			eyebrow: 'Growth',
			title: 'Trial conversion',
			description: 'Refine upgrade prompts before the billing experiment moves into staging.',
			meta: '4 blockers',
			tint: '#2563eb'
		},
		{
			id: 'support',
			eyebrow: 'Support',
			title: 'Escalation queue',
			description: 'Keep urgent reports visible while product and QA share the same backlog slice.',
			meta: '9 tickets',
			tint: '#9333ea'
		},
		{
			id: 'content',
			eyebrow: 'Content ops',
			title: 'Release notes',
			description:
				'Track approvals, screenshots, and publish readiness without leaving the docs shell.',
			meta: 'Ready to ship',
			tint: '#ea580c'
		},
		{
			id: 'qa',
			eyebrow: 'QA',
			title: 'Regression sweep',
			description: 'Keep the last verification pass obvious as the team narrows down final fixes.',
			meta: '18 suites',
			tint: '#dc2626'
		},
		{
			id: 'ops',
			eyebrow: 'Operations',
			title: 'Incident review',
			description:
				'Surface timeline, ownership, and follow-ups in a format that still fits smaller frames.',
			meta: 'Postmortem',
			tint: '#475569'
		}
	] satisfies Carousel.Item[];

	let showcasePage = $state(0);
	let compactPage = $state(0);
	let controlledPage = $state(0);

	const getTint = (item: Carousel.Item) => String(item.tint ?? '#0f172a');
</script>

<svelte:head>
	<title>Carousel Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix carousel primitive, including auto-fit column behavior, controls, and externally controlled paging."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Carousel"
	description="Viewport-first carousel for grouped content cards. It calculates how many slides can fit from the actual container width, then pages those groups cleanly so the visible set stays inside the frame instead of peeking or overflowing."
	pathLabel="components/carousel"
	pathHref="/components/carousel"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Group cards into full-width pages instead of letting a long strip drift around.</h2>
				<p class="lead">
					The component keeps one stable viewport, hides overflow, and recalculates columns from the
					container width. That means it avoids the usual carousel issues: clipped last cards,
					partial peeking, and awkward wrap behavior when the shell gets tighter.
				</p>
			</div>

			<UICarousel
				id="carousel-overview"
				items={showcaseItems}
				bind:page={showcasePage}
				maxColumns={3}
				minItemWidth={230}
				gap={16}
				ariaLabel="Carousel overview showcase"
			>
				{#snippet slide(item)}
					<article class="showcase-slide" style={`--slide-accent: ${getTint(item)};`}>
						<span class="showcase-slide__accent"></span>
						<p class="showcase-slide__eyebrow">{item.eyebrow}</p>
						<h3>{item.title}</h3>
						<p class="showcase-slide__body">{item.description}</p>
						<span class="showcase-slide__meta">{item.meta}</span>
					</article>
				{/snippet}
			</UICarousel>
		</section>

		<section id="fit" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Fit Behavior</p>
					<h2>The same data still fits when the shell gets narrower.</h2>
				</div>
				<p>
					Both examples below use the same carousel logic. Only the wrapper width changes, so you
					can evaluate the fit behavior directly instead of guessing at breakpoints.
				</p>
			</div>

			<div class="fit-grid">
				<article class="fit-card">
					<div class="fit-card__heading">
						<span class="fit-label">Wide frame</span>
						<p>Up to three cards when the container can afford them.</p>
					</div>

					<UICarousel
						id="carousel-wide"
						items={showcaseItems}
						maxColumns={3}
						minItemWidth={230}
						gap={16}
						ariaLabel="Wide fit carousel"
					/>
				</article>

				<article class="fit-card fit-card-compact">
					<div class="fit-card__heading">
						<span class="fit-label">Constrained frame</span>
						<p>The same cards tighten down without any slide peeking or overflow.</p>
					</div>

					<div class="compact-shell">
						<UICarousel
							id="carousel-compact"
							items={showcaseItems}
							bind:page={compactPage}
							maxColumns={3}
							minItemWidth={230}
							gap={16}
							ariaLabel="Compact fit carousel"
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="control" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Controlled Page</p>
					<h2>Bind the page when the parent needs stronger orchestration.</h2>
				</div>
				<p>
					For onboarding flows or release spotlights, keep the carousel on one column and drive the
					active page from external controls.
				</p>
			</div>

			<div class="control-stack">
				<div class="control-row" aria-label="Carousel page shortcuts">
					{#each showcaseItems as item, index (item.id)}
						<UIButton
							size="xs"
							role={controlledPage === index ? 'primary' : 'secondary'}
							variant={controlledPage === index ? 'default' : 'outline'}
							onclick={() => (controlledPage = index)}
						>
							{index + 1}. {item.title}
						</UIButton>
					{/each}
				</div>

				<UICarousel
					id="carousel-controlled"
					items={showcaseItems}
					bind:page={controlledPage}
					maxColumns={1}
					minItemWidth={360}
					gap={16}
					showDots={false}
					ariaLabel="Controlled carousel"
				>
					{#snippet slide(item)}
						<article
							class="showcase-slide showcase-slide-featured"
							style={`--slide-accent: ${getTint(item)};`}
						>
							<span class="showcase-slide__accent"></span>
							<p class="showcase-slide__eyebrow">{item.eyebrow}</p>
							<h3>{item.title}</h3>
							<p class="showcase-slide__body">{item.description}</p>
							<div class="showcase-slide__footer">
								<span class="showcase-slide__meta">{item.meta}</span>
								<UIButton size="sm" role="secondary" variant="outline">Review</UIButton>
							</div>
						</article>
					{/snippet}
				</UICarousel>
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

	.doc-card {
		padding: clamp(1.25rem, 2.8vw, 2rem);
		display: grid;
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
	.fit-card,
	.control-stack {
		display: grid;
		gap: 0.8rem;
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
	.fit-card__heading p {
		margin: 0;
		color: var(--sprix-app-text-muted);
		line-height: 1.65;
	}

	.section-kicker,
	.fit-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--sprix-app-text-muted);
	}

	.fit-grid {
		display: grid;
		gap: 1rem;
	}

	.fit-card {
		padding: 1.2rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.2rem;
		background: rgba(255, 255, 255, 0.92);
	}

	.compact-shell {
		width: min(100%, 34rem);
	}

	.control-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.showcase-slide {
		display: grid;
		gap: 0.75rem;
		height: 100%;
		padding: 1.15rem;
		border: 1px solid color-mix(in srgb, var(--slide-accent) 20%, var(--sprix-app-border-strong));
		border-radius: 1.1rem;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(248, 250, 252, 0.95) 100%
		);
	}

	.showcase-slide-featured {
		padding: clamp(1.15rem, 3vw, 1.5rem);
	}

	.showcase-slide__accent {
		width: 2.75rem;
		height: 0.35rem;
		border-radius: 999px;
		background: var(--slide-accent);
	}

	.showcase-slide__eyebrow,
	.showcase-slide__meta {
		margin: 0;
	}

	.showcase-slide__eyebrow {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--slide-accent) 72%, var(--sprix-app-text-muted));
	}

	.showcase-slide h3 {
		margin: 0;
		font-size: 1rem;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: var(--sprix-app-text);
	}

	.showcase-slide__body {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--sprix-app-text-muted);
	}

	.showcase-slide__meta {
		margin-top: auto;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--sprix-app-text-muted);
	}

	.showcase-slide__footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: auto;
	}

	@media (max-width: 960px) {
		.docs-shell {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
