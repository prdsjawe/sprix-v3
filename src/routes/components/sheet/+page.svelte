<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Badge as UIBadge,
		Button as UIButton,
		Field as UIField,
		Input as UIInput,
		Sheet as UISheet,
		Textarea as UITextarea,
		Toast as UIToast,
		toast
	} from '$lib/components';

	const DOCS_GROUP = 'sheet-docs';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Edge-aligned overlay' },
		{ id: 'sides', label: 'Sides', meta: 'Right, left, top, bottom' },
		{ id: 'sizes', label: 'Sizes', meta: 'Axis-aware dimensions' },
		{ id: 'dismissal', label: 'Dismissal', meta: 'Default and locked' },
		{ id: 'examples', label: 'Examples', meta: 'Forms and utilities' }
	] as const;

	let handoffOpen = $state(false);
	let insightOpen = $state(false);
	let leftRailOpen = $state(false);
	let topNoticeOpen = $state(false);
	let bottomQueueOpen = $state(false);
	let smallOpen = $state(false);
	let largeOpen = $state(false);
	let lockedOpen = $state(false);
	let settingsOpen = $state(false);

	let settingsName = $state('Pedro Duarte');
	let settingsRole = $state('Design Engineer');
	let launchSummary = $state('Ship the beta to 12 enterprise accounts before the public changelog goes live.');
	let launchNotes = $state(
		'Confirm support coverage, publish rollback owners, and attach the final QA sign-off before enabling the rollout.'
	);

	const handleDismissClose = () => {
		toast.info('Sheet dismissed', {
			group: DOCS_GROUP,
			description:
				'Backdrop clicks, Escape, and the close button all funnel through `onclose` when dismissal is enabled.'
		});
	};

	const handleSettingsSave = () => {
		if (!settingsName.trim() || !settingsRole.trim()) {
			toast.warning('Complete the profile fields', {
				group: DOCS_GROUP,
				description: 'The parent still owns validation even when the form lives in a sheet.'
			});
			return;
		}

		settingsOpen = false;

		toast.success('Profile updated', {
			group: DOCS_GROUP,
			description: `Saved ${settingsName.trim()} as ${settingsRole.trim()}.`
		});
	};

	const handleLaunchSave = () => {
		if (!launchSummary.trim() || !launchNotes.trim()) {
			toast.warning('Add the rollout details', {
				group: DOCS_GROUP,
				description: 'Large sheets are best for denser editing flows, not empty shells.'
			});
			return;
		}

		largeOpen = false;

		toast.success('Launch plan saved', {
			group: DOCS_GROUP,
			description: `Saved the rollout brief for ${launchSummary.trim().slice(0, 36)}.`
		});
	};
</script>

<svelte:head>
	<title>Sheet Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix sheet primitive, covering side placement, axis-aware sizing, dismissal behavior, and children-driven content composition."
	/>
</svelte:head>

<UIToast group={DOCS_GROUP} />

<Header
	eyebrow="Documentation"
	title="Sheet"
	description="Edge-aligned overlay for utilities, side-panel editing, and contextual workflows that should keep the page frame visible. It stays controlled like Dialog, but shifts the surface to a viewport edge and keeps a deliberate inset around it."
	pathLabel="components/sheet"
	pathHref="/components/sheet"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it when the work belongs to an edge panel, not a centered modal.</h2>
				<p class="lead">
					`Sheet` uses the same controlled overlay posture as `Dialog`, but aligns the surface to a chosen
					side and keeps a `p-1.5` viewport inset so the panel never hard-touches the screen edge. The header
					is optional. The main content lives in `children`.
				</p>
			</div>

			<div class="hero-preview">
				<div class="preview-card">
					<p class="surface-kicker">Live preview</p>
					<h3>Right panel or bottom tray</h3>
					<p>
						Open a side-oriented handoff panel or a short bottom tray. Both rely on the same primitive and
						keep the layout structure inside `children`.
					</p>

					<div class="hero-card__actions">
						<UIButton size="lg" role="primary" onclick={() => (handoffOpen = true)}>
							Open right sheet
						</UIButton>
						<UIButton
							size="lg"
							role="secondary"
							variant="outline"
							onclick={() => (insightOpen = true)}
						>
							Open bottom sheet
						</UIButton>
					</div>
				</div>

				<div class="principles">
					<article class="principle">
						<span class="principle__index">01</span>
						<div>
							<h3>Keep the page frame visible</h3>
							<p>Sheets are useful when the user still benefits from seeing the underlying screen context.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">02</span>
						<div>
							<h3>Inset the surface from the viewport</h3>
							<p>The panel lives inside a padded viewport shell, so it never slams into the device edge.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">03</span>
						<div>
							<h3>Let children own the body</h3>
							<p>Use regular layout, form, and action primitives inside the sheet instead of inventing extra slots.</p>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section id="sides" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sides</p>
					<h2>Choose the edge that matches the task and the amount of context the user should retain.</h2>
				</div>
				<p>
					`side` controls alignment. Right is the default. Left works well for utility rails, while top and
					bottom turn the primitive into a tray that can host short summaries or mobile-friendly workflows.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Right and left</h3>
						<p>Use vertical sheets for settings, properties, activity, or tools that should feel adjacent to the page.</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="primary" onclick={() => (handoffOpen = true)}>Open right</UIButton>
						<UIButton role="secondary" variant="outline" onclick={() => (leftRailOpen = true)}>
							Open left
						</UIButton>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Top and bottom</h3>
						<p>Use horizontal trays for alerts, queue state, or quick command surfaces that should span the viewport.</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="secondary" variant="outline" onclick={() => (topNoticeOpen = true)}>
							Open top
						</UIButton>
						<UIButton role="warning" onclick={() => (bottomQueueOpen = true)}>
							Open bottom
						</UIButton>
					</div>
				</article>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Size follows the axis: width for side panels, height for top and bottom trays.</h2>
				</div>
				<p>
					`sm`, `md`, and `lg` change max width for left and right sheets, and max height for top and bottom
					sheets. That keeps the API simple while respecting the geometry of the chosen side.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Small</span>
					<p class="state-copy">
						Best for short task lists, properties, and compact side utilities.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (smallOpen = true)}>
						Open compact sheet
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Large</span>
					<p class="state-copy">
						Use the larger shell for richer editing flows, long notes, or structured preparation work.
					</p>
					<UIButton role="primary" onclick={() => (largeOpen = true)}>Open large sheet</UIButton>
				</article>
			</div>
		</section>

		<section id="dismissal" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Dismissal</p>
					<h2>Default to dismissible behavior, then lock the panel only when a deliberate action is required.</h2>
				</div>
				<p>
					`dismissible` defaults to `true`, which keeps backdrop click, Escape, and the close button available.
					Turn it off only when the user must explicitly choose an in-panel action before leaving.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Dismissible</span>
					<p class="state-copy">
						Lightweight utility and inspection panels should generally stay easy to leave.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (handoffOpen = true)}>
						Open dismissible sheet
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Locked</span>
					<p class="state-copy">
						Disable backdrop and Escape dismissal when the staged work needs an explicit keep-or-discard choice.
					</p>
					<UIButton role="warning" onclick={() => (lockedOpen = true)}>Open locked sheet</UIButton>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Compose the body with the existing form primitives and regular actions.</h2>
				</div>
				<p>
					These examples keep layout and submit logic in the parent route. The sheet provides the shell,
					the rest of the structure stays in `children`.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Profile settings</span>
					<p class="state-copy">
						A medium right sheet works well for adjacent editing without fully pulling the user out of the page.
					</p>
					<UIButton role="primary" onclick={() => (settingsOpen = true)}>Open settings form</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Launch plan</span>
					<p class="state-copy">
						A larger sheet can carry multi-field editing, notes, and supporting status context in one pass.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (largeOpen = true)}>
						Open launch planner
					</UIButton>
				</article>
			</div>
		</section>
	</main>
</div>

<UISheet
	bind:open={handoffOpen}
	title="Team handoff"
	description="Use a right sheet for contextual updates, quick ownership changes, and short action bundles."
	onclose={handleDismissClose}
>
	<div class="sheet-stack">
		<p class="sheet-copy">
			Design has signed off on the final QA pass. Product still needs a rollout owner and the customer support note.
		</p>

		<div class="chip-row">
			<UIBadge role="primary" variant="badge">Beta rollout</UIBadge>
			<UIBadge role="warning" variant="modern">Owner missing</UIBadge>
			<UIBadge role="success" variant="pill-color">QA approved</UIBadge>
		</div>

		<ul class="detail-list">
			<li>Assign the go-live owner for the European region.</li>
			<li>Attach the support macros before the customer email lands.</li>
			<li>Schedule the monitoring check 30 minutes after release.</li>
		</ul>

		<div class="sheet-actions">
			<UIButton role="secondary" variant="outline" onclick={() => (handoffOpen = false)}>
				Close
			</UIButton>
			<UIButton onclick={() => (handoffOpen = false)}>Share handoff</UIButton>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={insightOpen}
	side="bottom"
	size="sm"
	title="Rollout insights"
	description="Bottom trays are useful for short summaries and mobile-oriented context."
>
	<div class="metric-grid">
		<article class="metric-card">
			<span>Queued accounts</span>
			<strong>12</strong>
		</article>
		<article class="metric-card">
			<span>Support readiness</span>
			<strong>94%</strong>
		</article>
		<article class="metric-card">
			<span>Rollback owners</span>
			<strong>3 of 4</strong>
		</article>
	</div>
</UISheet>

<UISheet
	bind:open={leftRailOpen}
	side="left"
	size="sm"
	title="Workspace rail"
	description="Left sheets can behave like temporary utility rails without turning into a permanent layout commitment."
>
	<div class="sheet-stack">
		<div class="rail-card">
			<h3>Recent surfaces</h3>
			<p>Access policy, billing thresholds, deployment schedule</p>
		</div>
		<div class="rail-card">
			<h3>Next action</h3>
			<p>Review the billing alert copy before the next monthly cycle starts.</p>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={topNoticeOpen}
	side="top"
	size="sm"
	title="Maintenance notice"
	description="Top sheets work well for broad alerts that still need more structure than a toast."
>
	<div class="sheet-stack">
		<p class="sheet-copy">
			API writes pause for 20 minutes tonight at 23:00 UTC while the storage cluster is rebalanced.
		</p>
		<div class="sheet-actions">
			<UIButton size="sm" role="secondary" variant="outline" onclick={() => (topNoticeOpen = false)}>
				Dismiss
			</UIButton>
			<UIButton size="sm" onclick={() => (topNoticeOpen = false)}>View checklist</UIButton>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={bottomQueueOpen}
	side="bottom"
	title="Queue monitor"
	description="Bottom sheets can hold short operational dashboards without stealing the whole screen."
>
	<div class="sheet-stack">
		<ul class="detail-list">
			<li>4 deployments are waiting on a human approval step.</li>
			<li>2 jobs are blocked by expired environment tokens.</li>
			<li>1 release is paused until customer support copy is approved.</li>
		</ul>
	</div>
</UISheet>

<UISheet
	bind:open={smallOpen}
	size="sm"
	title="Rename workspace"
	description="Use the compact width for single-step updates."
>
	<div class="sheet-stack">
		<UIField label="Workspace name" name="sheet-workspace-name">
			<UIInput value="Acme workspace" />
		</UIField>

		<div class="sheet-actions">
			<UIButton role="secondary" variant="outline" onclick={() => (smallOpen = false)}>
				Cancel
			</UIButton>
			<UIButton onclick={() => (smallOpen = false)}>Save</UIButton>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={largeOpen}
	size="lg"
	title="Launch plan"
	description="Larger sheets support multi-field editing while still keeping the page frame in view."
>
	<div class="sheet-stack">
		<UIField label="Summary" name="launch-summary">
			<UIInput bind:value={launchSummary} />
		</UIField>
		<UIField
			label="Preparation notes"
			name="launch-notes"
			helper="Capture owners, support readiness, rollback posture, and any final approvals."
		>
			<UITextarea bind:value={launchNotes} rows={7} />
		</UIField>

		<div class="sheet-actions">
			<UIButton role="secondary" variant="outline" onclick={() => (largeOpen = false)}>
				Cancel
			</UIButton>
			<UIButton onclick={handleLaunchSave}>Save plan</UIButton>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={lockedOpen}
	side="left"
	dismissible={false}
	showClose={false}
	title="Review staged changes"
	description="This example blocks backdrop click and Escape dismissal until the user chooses an explicit action."
>
	<div class="sheet-stack">
		<p class="sheet-copy">
			Three staged updates are waiting on a decision. Keep editing or save the current draft before leaving.
		</p>

		<ul class="detail-list">
			<li>Customer-facing copy has not been approved.</li>
			<li>The rollback owner is still unassigned.</li>
			<li>The support macro has not been attached.</li>
		</ul>

		<div class="sheet-actions">
			<UIButton role="secondary" variant="outline" onclick={() => (lockedOpen = false)}>
				Keep editing
			</UIButton>
			<UIButton onclick={() => (lockedOpen = false)}>Save draft</UIButton>
		</div>
	</div>
</UISheet>

<UISheet
	bind:open={settingsOpen}
	title="Profile settings"
	description="Use `children` for the full body structure, including action rows."
>
	<div class="sheet-stack">
		<UIField label="Name" name="sheet-settings-name">
			<UIInput bind:value={settingsName} placeholder="Pedro Duarte" />
		</UIField>
		<UIField label="Role" name="sheet-settings-role">
			<UIInput bind:value={settingsRole} placeholder="Design Engineer" />
		</UIField>

		<div class="sheet-actions">
			<UIButton role="secondary" variant="outline" onclick={() => (settingsOpen = false)}>
				Cancel
			</UIButton>
			<UIButton onclick={handleSettingsSave}>Save changes</UIButton>
		</div>
	</div>
</UISheet>

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
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card,
	.preview-card,
	.principles,
	.principle,
	.sheet-stack,
	.rail-card,
	.metric-grid {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__actions,
	.doc-entry__demo,
	.sheet-actions,
	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		align-items: center;
	}

	.hero-preview {
		display: grid;
		gap: 1rem;
	}

	.preview-card {
		padding: 1.35rem;
		border: 1px solid #dbe4f1;
		border-radius: 1.35rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.92)),
			#ffffff;
	}

	.principles {
		padding: 1rem 1.1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background: #f8fafc;
	}

	.principle {
		grid-template-columns: auto 1fr;
		align-items: start;
		padding-top: 0.9rem;
		border-top: 1px solid #e2e8f0;
	}

	.principles > :first-child {
		padding-top: 0;
		border-top: 0;
	}

	.principle__index {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		background: #e2e8f0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #334155;
	}

	.section-kicker,
	.state-label,
	.surface-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	h2,
	h3,
	p,
	ul,
	strong,
	span {
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
		color: #475569;
	}

	.lead,
	.state-copy,
	.sheet-copy {
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1.25rem;
	}

	.doc-entry,
	.state-card,
	.rail-card,
	.metric-card {
		padding: 1.1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.88)),
			#ffffff;
	}

	.doc-entry__meta,
	.metric-card {
		display: grid;
		gap: 0.35rem;
	}

	.detail-list {
		padding-left: 1rem;
		color: #475569;
		display: grid;
		gap: 0.5rem;
	}

	.metric-grid {
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}

	.metric-card span {
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #64748b;
	}

	.metric-card strong {
		font-size: 1.35rem;
		letter-spacing: -0.04em;
		color: #0f172a;
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

		.hero-card {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
			align-items: start;
		}

		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
