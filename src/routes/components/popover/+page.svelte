<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Badge as UIBadge,
		Button as UIButton,
		Input as UIInput,
		Popover as UIPopover,
		Separator as UISeparator
	} from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'placements', label: 'Placements', meta: 'Top, side, bottom' },
		{ id: 'showcase', label: 'Showcase', meta: 'Interactive patterns' }
	] as const;

	const placements = [
		{
			placement: 'top',
			label: 'Top',
			description: 'Useful when the trigger sits near the bottom edge of a dense panel.'
		},
		{
			placement: 'right',
			label: 'Right',
			description: 'Good for side rails, filters, and compact lists aligned to the left.'
		},
		{
			placement: 'bottom',
			label: 'Bottom',
			description: 'Best default when the trigger sits in regular content flow.'
		},
		{
			placement: 'left',
			label: 'Left',
			description: 'Helpful for trailing utilities and right-aligned trigger rows.'
		}
	] as const;

	let invitePopoverOpen = $state(false);
	let inviteEmail = $state('marco@sprix.dev');
	let releasePopoverOpen = $state(false);
	let releaseChannel = $state('#launch-updates');
	let quickNoteOpen = $state(false);
</script>

<svelte:head>
	<title>Popover Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix popover primitive, including interactive form content, placement options, and click-driven overlay behavior."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Popover"
	description="Click-driven floating card for interactive content such as forms, button groups, filters, and compact workflows. Use it when the overlay needs real controls rather than hover-only preview content."
	pathLabel="components/popover"
	pathHref="/components/popover"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it when the overlay needs a real mini workflow.</h2>
				<p class="lead">
					`Popover` keeps the same floating card posture as `HoverCard`, but it is opened by click and
					meant for interactive content. Use it for quick forms, inline actions, and focused settings
					that should not escalate into a full dialog.
				</p>
			</div>

			<div class="hero-actions">
				<UIPopover bind:open={invitePopoverOpen} placement="bottom-start" contentClass="w-[22rem]" maxWidth="none">
					<UIButton role="secondary" variant="outline">
						{invitePopoverOpen ? 'Close invite panel' : 'Invite teammate'}
					</UIButton>

					{#snippet content()}
						<div class="popover-panel">
							<div class="popover-panel__header">
								<div>
									<small>Quick invite</small>
									<h3>Share workspace access</h3>
								</div>
								<UIBadge role="primary" variant="pill-color" size="sm">Editor</UIBadge>
							</div>

							<p>Send one private invite without leaving the current release workflow.</p>

							<UISeparator class="w-full" />

							<div class="popover-panel__fields">
								<label class="popover-label" for="invite-email">Email</label>
								<UIInput
									id="invite-email"
									bind:value={inviteEmail}
									type="email"
									placeholder="name@company.com"
								/>
							</div>

							<div class="popover-panel__footer">
								<UIButton role="secondary" variant="outline" onclick={() => (invitePopoverOpen = false)}>
									Cancel
								</UIButton>
								<UIButton onclick={() => (invitePopoverOpen = false)}>Send invite</UIButton>
							</div>
						</div>
					{/snippet}
				</UIPopover>

				<UIPopover bind:open={releasePopoverOpen} placement="bottom-end" contentClass="w-[20rem]" maxWidth="none">
					<UIButton role="secondary" variant="soft">
						{releasePopoverOpen ? 'Hide release actions' : 'Release actions'}
					</UIButton>

					{#snippet content()}
						<div class="popover-panel">
							<div class="popover-panel__header">
								<div>
									<small>Publish flow</small>
									<h3>Stage release update</h3>
								</div>
								<UIBadge role="success" variant="pill" size="sm">Ready</UIBadge>
							</div>

							<p>Post the rollout note to one channel and keep the current screen context.</p>

							<UISeparator class="w-full" />

							<div class="popover-panel__fields">
								<label class="popover-label" for="release-channel">Channel</label>
								<UIInput id="release-channel" bind:value={releaseChannel} />
							</div>

							<div class="popover-actions">
								<UIButton role="secondary" variant="outline" onclick={() => (releasePopoverOpen = false)}>
									Save draft
								</UIButton>
								<UIButton role="success" onclick={() => (releasePopoverOpen = false)}>Publish</UIButton>
							</div>
						</div>
					{/snippet}
				</UIPopover>
			</div>
		</section>

		<section id="placements" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Placements</p>
					<h2>Keep the same directional placement model as tooltip and hover card.</h2>
				</div>
				<p>The behavior changes to click-driven interaction, but placement still passes directly through to tippy.</p>
			</div>

			<div class="doc-grid">
				{#each placements as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIPopover placement={item.placement}>
								<UIButton role="secondary" variant="outline">{item.label}</UIButton>

								{#snippet content()}
									<div class="popover-mini">
										<small>{item.label} placement</small>
										<h3>Compact action card</h3>
										<p>Use the same placement primitives when the overlay needs buttons or fields instead of passive text.</p>
									</div>
								{/snippet}
							</UIPopover>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="showcase" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Showcase</p>
					<h2>Examples that need more than hover-only preview content.</h2>
				</div>
				<p>These examples keep the popover open while the user types, reviews metadata, and clicks through actions.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Form actions</span>
					<UIPopover placement="right-start" contentClass="w-[21rem]" maxWidth="none">
						<UIButton role="secondary" variant="outline">Add reviewer</UIButton>

						{#snippet content()}
							<div class="popover-panel">
								<div class="popover-panel__header">
									<div>
										<small>Review access</small>
										<h3>Add one reviewer</h3>
									</div>
									<UIBadge role="warning" variant="pill" size="sm">Needs response</UIBadge>
								</div>

								<p>Invite one stakeholder into this approval thread without leaving the release page.</p>

								<UISeparator class="w-full" />

								<div class="popover-panel__fields">
									<label class="popover-label" for="reviewer-email">Email</label>
									<UIInput id="reviewer-email" value="nina@sprix.dev" type="email" />
								</div>

								<div class="popover-panel__footer">
									<UIButton role="secondary" variant="outline">Dismiss</UIButton>
									<UIButton>Send invite</UIButton>
								</div>
							</div>
						{/snippet}
					</UIPopover>
				</article>

				<article class="state-card">
					<span class="state-label">Action stack</span>
					<UIPopover bind:open={quickNoteOpen} placement="top" contentClass="w-[19.5rem]" maxWidth="none">
						<div class="metric-trigger">
							<span>Open issues</span>
							<strong>3 blockers</strong>
						</div>

						{#snippet content()}
							<div class="popover-panel">
								<div class="popover-panel__header">
									<div>
										<small>Release blockers</small>
										<h3>Next actions</h3>
									</div>
									<UIBadge role="danger" variant="pill-color" size="sm">High risk</UIBadge>
								</div>

								<div class="popover-list">
									<div class="popover-list__item">
										<strong>Billing receipts</strong>
										<p>Accounting still needs the final export sample.</p>
									</div>
									<div class="popover-list__item">
										<strong>Mobile redirect</strong>
										<p>QA reported one stale cache path in staged rollout.</p>
									</div>
								</div>

								<UISeparator class="w-full" />

								<div class="popover-actions">
									<UIButton role="secondary" variant="outline" onclick={() => (quickNoteOpen = false)}>
										Later
									</UIButton>
									<UIButton role="danger" onclick={() => (quickNoteOpen = false)}>Resolve now</UIButton>
								</div>
							</div>
						{/snippet}
					</UIPopover>
				</article>

				<article class="state-card">
					<span class="state-label">Block trigger</span>
					<UIPopover as="div" tabindex={0} placement="top-start" contentClass="w-[21rem]" maxWidth="none">
						<div class="panel-trigger">
							<div>
								<strong>Notification routing</strong>
								<p>Open a compact action panel from a full-width row trigger.</p>
							</div>
							<UIBadge role="secondary" variant="pill" size="sm">Slack</UIBadge>
						</div>

						{#snippet content()}
							<div class="popover-panel">
								<div class="popover-panel__header">
									<div>
										<small>Delivery settings</small>
										<h3>Route release alerts</h3>
									</div>
									<UIBadge role="success" variant="pill-color" size="sm">Active</UIBadge>
								</div>

								<p>Push deployment notes to the primary team room and keep email alerts disabled for this workflow.</p>

								<UISeparator class="w-full" />

								<div class="popover-list">
									<div class="popover-list__item">
										<strong>Primary channel</strong>
										<p>#launch-updates</p>
									</div>
									<div class="popover-list__item">
										<strong>Email fallback</strong>
										<p>Disabled</p>
									</div>
								</div>

								<div class="popover-actions">
									<UIButton role="secondary" variant="outline">Edit</UIButton>
									<UIButton>Confirm</UIButton>
								</div>
							</div>
						{/snippet}
					</UIPopover>
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

	.popover-panel,
	.popover-mini {
		display: grid;
		gap: 0.9rem;
	}

	.popover-panel__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.popover-panel__fields,
	.popover-list {
		display: grid;
		gap: 0.75rem;
	}

	.popover-label {
		font-size: 0.8125rem;
		font-weight: 700;
		color: #334155;
	}

	.popover-panel__footer,
	.popover-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.popover-list__item {
		display: grid;
		gap: 0.2rem;
		padding: 0.85rem 0.95rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #f8fafc;
	}

	.metric-trigger,
	.panel-trigger {
		display: grid;
		gap: 0.35rem;
		border: 1px solid #cbd5e1;
		border-radius: 1rem;
		background: #ffffff;
		padding: 1rem 1.1rem;
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
	}

	.metric-trigger strong,
	.panel-trigger strong {
		font-size: 0.95rem;
		color: #0f172a;
	}

	.metric-trigger > span,
	.panel-trigger p {
		font-size: 0.875rem;
		color: #64748b;
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
