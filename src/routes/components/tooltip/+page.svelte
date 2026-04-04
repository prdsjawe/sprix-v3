<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Badge as UIBadge, Button as UIButton, Tooltip as UITooltip } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Wrapper contract' },
		{ id: 'placements', label: 'Placements', meta: 'Top, side, bottom' },
		{ id: 'content', label: 'Content', meta: 'Text and rich snippet' }
	] as const;

	const placements = [
		{
			placement: 'top',
			label: 'Top',
			description: 'Default posture for compact button and icon hints.'
		},
		{
			placement: 'right',
			label: 'Right',
			description: 'Useful when the trigger sits in a narrow list or rail.'
		},
		{
			placement: 'bottom',
			label: 'Bottom',
			description: 'Good for inline text affordances and badge-like triggers.'
		},
		{
			placement: 'left',
			label: 'Left',
			description: 'Works well for right-aligned controls and trailing utilities.'
		}
	] as const;
</script>

<svelte:head>
	<title>Tooltip Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix tooltip primitive, including wrapper usage, placement options, and rich snippet content."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Tooltip"
	description="Small tippy-backed overlay for concise hints and lightweight contextual guidance. It wraps arbitrary trigger content and keeps the popup surface narrow by default."
	pathLabel="components/tooltip"
	pathHref="/components/tooltip"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Wrap the trigger, keep the message small.</h2>
				<p class="lead">
					`Tooltip` is a wrapper primitive, so the trigger can be a button, badge, inline label, or
					any other element you render inside it. Use the `text` prop for short hints, or a `content`
					snippet when the overlay needs a little more structure.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="hero-actions">
					<UITooltip text="Copy the workspace invite URL">
						<UIButton role="secondary" variant="outline">Copy invite link</UIButton>
					</UITooltip>

					<UITooltip text="This environment is live and accepting traffic">
						<UIBadge role="success" variant="pill-color" size="md">Production</UIBadge>
					</UITooltip>

					<UITooltip text="Quiet hours are active from 10 PM to 6 AM">
						<span class="inline-trigger">Quiet hours</span>
					</UITooltip>
				</div>
			</div>
		</section>

		<section id="placements" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Placements</p>
					<h2>Choose position based on the trigger’s surrounding density.</h2>
				</div>
				<p>The component passes placement through to tippy, so the common directional positions stay available.</p>
			</div>

			<div class="doc-grid">
				{#each placements as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UITooltip placement={item.placement} text={`${item.label} tooltip placement`}>
								<UIButton role="secondary" variant="soft">{item.label}</UIButton>
							</UITooltip>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="content" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Content</p>
					<h2>Start with text, escalate to a snippet only when needed.</h2>
				</div>
				<p>
					Rich content stays available for denser contextual help. Set `interactive` when the tooltip
					itself needs hoverable content.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Text only</span>
					<UITooltip text="Muted alerts still appear in the activity feed.">
						<UIButton role="secondary" variant="outline">Muted notifications</UIButton>
					</UITooltip>
				</article>

				<article class="state-card">
					<span class="state-label">Rich snippet</span>
					<UITooltip interactive placement="bottom-start">
						<UIButton role="secondary" variant="outline">Deployment status</UIButton>

						{#snippet content()}
							<div class="tooltip-card">
								<div class="tooltip-card__eyebrow">Staging cluster</div>
								<strong>Healthy</strong>
								<p>Last deploy finished 3 minutes ago with zero failed checks.</p>
							</div>
						{/snippet}
					</UITooltip>
				</article>

				<article class="state-card">
					<span class="state-label">Block trigger</span>
					<UITooltip as="div" placement="top" text="This wrapper can also host a block trigger.">
						<div class="panel-trigger">
							<div>
								<strong>Workspace audit log</strong>
								<p>Hover the card, not just the text.</p>
							</div>
						</div>
					</UITooltip>
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
		border: 1px solid #e2e8f0;
		border-radius: 1.5rem;
		background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
	}

	.hero-card {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		display: grid;
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
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
		color: #0f172a;
	}

	.lead,
	.section-heading p,
	.doc-entry__meta p,
	.state-card p {
		margin: 0;
		color: #475569;
		line-height: 1.65;
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #64748b;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	.inline-trigger {
		display: inline-flex;
		align-items: center;
		border-radius: 999px;
		border: 1px dashed #cbd5e1;
		padding: 0.55rem 0.85rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #334155;
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
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background: #ffffff;
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
		color: #0f172a;
	}

	.doc-entry__demo {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 4.5rem;
	}

	.tooltip-card {
		display: grid;
		gap: 0.35rem;
	}

	.tooltip-card__eyebrow {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #64748b;
	}

	.panel-trigger {
		display: grid;
		gap: 0.35rem;
		border: 1px solid #cbd5e1;
		border-radius: 1rem;
		background: #ffffff;
		padding: 1rem 1.1rem;
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
	}

	.panel-trigger strong {
		font-size: 0.95rem;
		color: #0f172a;
	}

	.panel-trigger p {
		margin: 0;
		font-size: 0.875rem;
		color: #64748b;
	}

	@media (max-width: 960px) {
		.docs-shell {
			grid-template-columns: 1fr;
		}
	}
</style>
