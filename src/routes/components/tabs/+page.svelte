<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Tabs as UITabs } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'variants', label: 'Variants', meta: 'Button and underline' },
		{ id: 'interaction', label: 'Interaction', meta: 'Selection and keyboard' },
		{ id: 'examples', label: 'Examples', meta: 'Typical usage' }
	] as const;

	const workspaceTabs = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'members', label: 'Members' },
		{ value: 'billing', label: 'Billing' }
	] satisfies Tabs.Item[];

	const cadenceTabs = [
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'monthly', label: 'Monthly' },
		{ value: 'quarterly', label: 'Quarterly' }
	] satisfies Tabs.Item[];

	const deliveryTabs = [
		{ value: 'activity', label: 'Activity' },
		{ value: 'timeline', label: 'Timeline' },
		{ value: 'approvals', label: 'Approvals', disabled: true },
		{ value: 'notes', label: 'Notes' }
	] satisfies Tabs.Item[];

	const contentByTab = {
		overview: {
			title: 'Workspace overview',
			description: 'Keep high-level sections compact while preserving a clear active state.'
		},
		members: {
			title: 'Team members',
			description: 'The button variant reads like a segmented control with a clear selected pill.'
		},
		billing: {
			title: 'Billing settings',
			description: 'Use the selected tab to anchor a denser settings panel below the control.'
		},
		weekly: {
			title: 'Weekly cadence',
			description: 'Underline mode keeps the layout lighter while the active bar slides between triggers.'
		},
		monthly: {
			title: 'Monthly cadence',
			description: 'This fits dashboards and analytics headers where chrome should stay restrained.'
		},
		quarterly: {
			title: 'Quarterly cadence',
			description: 'Reserve the heavier button treatment for places where the tabs need more containment.'
		},
		activity: {
			title: 'Recent activity',
			description: 'Arrow keys, Home, and End all move the active tab. Disabled items stay skipped.'
		},
		timeline: {
			title: 'Delivery timeline',
			description: 'Selection remains bindable, so the parent can swap content without extra component state.'
		},
		notes: {
			title: 'Internal notes',
			description: 'Use disabled tabs sparingly and keep them visually subordinate to available actions.'
		}
	} as const;

	const exampleTabs = [
		{ value: 'details', label: 'Details' },
		{ value: 'history', label: 'History' },
		{ value: 'files', label: 'Files' }
	] satisfies Tabs.Item[];

	let workspaceValue = $state('overview');
	let cadenceValue = $state('monthly');
	let deliveryValue = $state('activity');
	let exampleValue = $state('details');

	let workspaceContent = $derived(contentByTab[workspaceValue as keyof typeof contentByTab]);
	let cadenceContent = $derived(contentByTab[cadenceValue as keyof typeof contentByTab]);
	let deliveryContent = $derived(contentByTab[deliveryValue as keyof typeof contentByTab]);
</script>

<svelte:head>
	<title>Tabs Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix tabs primitive, including button and underline variants with animated active indicators."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Tabs"
	description="Compact horizontal navigation with two surface variants. `button` uses a lifted active pill inside a muted track, while `underline` keeps the chrome light and moves a sliding bar under the current tab."
	pathLabel="components/tabs"
	pathHref="/components/tabs"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One state model, two visual weights.</h2>
				<p class="lead">
					Use `button` when the tabs need to read like a contained control group. Use `underline`
					when the surrounding layout already provides enough structure and the navigation should stay lighter.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="preview-card">
					<UITabs items={workspaceTabs} bind:value={workspaceValue} ariaLabel="Workspace sections" />
					<div class="preview-card__body">
						<p class="preview-card__eyebrow">{workspaceContent.title}</p>
						<p>{workspaceContent.description}</p>
					</div>
				</div>

				<div class="preview-card preview-card-muted">
					<UITabs
						items={cadenceTabs}
						bind:value={cadenceValue}
						variant="underline"
						ariaLabel="Reporting cadence"
					/>
					<div class="preview-card__body preview-card__body-plain">
						<p class="preview-card__eyebrow">{cadenceContent.title}</p>
						<p>{cadenceContent.description}</p>
					</div>
				</div>
			</div>
		</section>

		<section id="variants" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Variants</p>
					<h2>Choose weight based on the surrounding surface.</h2>
				</div>
				<p>Both variants share the same selection model and keyboard behavior. Only the presentation changes.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Button</h3>
						<p>
							The active tab lifts onto a white surface with a subtle border and shadow while the
							rest blend into the gray track.
						</p>
					</div>
					<div class="doc-entry__demo">
						<UITabs items={workspaceTabs} bind:value={workspaceValue} ariaLabel="Button tabs demo" />
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Underline</h3>
						<p>
							The selection bar slides along the bottom edge, keeping the tab row visually lighter
							than the button treatment.
						</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo-underline">
						<UITabs
							items={cadenceTabs}
							bind:value={cadenceValue}
							variant="underline"
							ariaLabel="Underline tabs demo"
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="interaction" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Interaction</p>
					<h2>State stays bindable and keyboard safe.</h2>
				</div>
				<p>
					The component keeps the selected value normalized to the first enabled item, skips disabled tabs,
					and supports Arrow keys plus Home and End.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Disabled item</span>
					<UITabs items={deliveryTabs} bind:value={deliveryValue} ariaLabel="Delivery views" />
				</article>

				<article class="state-card state-card-copy">
					<span class="state-label">Current selection</span>
					<h3>{deliveryContent.title}</h3>
					<p>{deliveryContent.description}</p>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Use tabs to switch dense content without changing page frame.</h2>
				</div>
				<p>
					This pattern works well inside settings surfaces, analytics headers, and compact content modules.
				</p>
			</div>

			<div class="example-shell">
				<div class="example-shell__head">
					<div>
						<p class="section-kicker">Detail module</p>
						<h3>Release review</h3>
					</div>

					<UITabs
						items={exampleTabs}
						bind:value={exampleValue}
						variant="underline"
						ariaLabel="Release review sections"
					/>
				</div>

				<div class="example-shell__body">
					{#if exampleValue === 'details'}
						<p>Keep critical release notes, rollout owners, and guardrails in one compact panel.</p>
					{:else if exampleValue === 'history'}
						<p>Switch to audit history without introducing a modal or pushing the user into a new route.</p>
					{:else}
						<p>Use the same tab state to reveal attachments, screenshots, or linked QA evidence.</p>
					{/if}
				</div>
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
	.hero-card__stack {
		display: grid;
		gap: 0.85rem;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--sprix-app-text-subtle);
	}

	h2,
	h3,
	p {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.3;
		letter-spacing: -0.02em;
	}

	.lead,
	.section-heading > p,
	.doc-entry__meta p,
	.state-card p,
	.example-shell__body p {
		color: var(--sprix-app-text-muted);
		line-height: 1.75;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.state-grid {
		align-items: start;
	}

	.preview-card,
	.doc-entry,
	.state-card,
	.example-shell {
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.5rem;
		background: var(--sprix-app-surface);
		padding: 1rem;
	}

	.preview-card {
		gap: 1rem;
	}

	.preview-card-muted {
		background: linear-gradient(180deg, var(--sprix-app-surface) 0%, var(--sprix-app-bg) 100%);
	}

	.preview-card__body,
	.example-shell__body {
		display: grid;
		gap: 0.35rem;
	}

	.preview-card__body {
		border-radius: 1rem;
		background: var(--sprix-app-bg);
		padding: 1rem;
	}

	.preview-card__body-plain {
		background: transparent;
		padding: 0.35rem 0 0;
	}

	.preview-card__eyebrow,
	.state-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--sprix-app-text-subtle);
	}

	.doc-entry__demo {
		padding-top: 0.15rem;
	}

	.doc-entry__demo-underline {
		padding-top: 0.5rem;
	}

	.state-card-copy {
		align-content: start;
	}

	.example-shell {
		gap: 1rem;
	}

	.example-shell__head {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.doc-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.state-grid {
			grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.9fr);
		}

		.example-shell__head {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: end;
		}
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
	}
</style>
