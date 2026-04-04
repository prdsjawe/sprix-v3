<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Checkbox as UICheckbox } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Checked, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common checkbox patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Dense option lists and compact preference panes.' },
		{ size: 'md', label: 'Medium', description: 'Default checkbox density for application forms.' },
		{ size: 'lg', label: 'Large', description: 'Roomier selection rows for higher emphasis tasks.' }
	] as const;

	let productUpdates = $state(true);
	let weeklyReport = $state(false);
	let confirmTerms = $state(true);
	let securityCopy = $state(false);
	let disabledState = $state(true);
</script>

<svelte:head>
	<title>Checkbox Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix checkbox primitive, including size, state, and multi-selection usage patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Checkbox"
	description="Binary selection primitive for lists, permissions, and confirmation flows. It follows the same size and messaging posture as the rest of the Sprix form controls."
	pathLabel="components/checkbox"
	pathHref="/components/checkbox"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use checkboxes when multiple options can be true at once.</h2>
				<p class="lead">
					Checkboxes are best for confirmation and multi-select flows. The component keeps a single
					selection row, consistent helper and error messaging, and explicit `sm`, `md`, and `lg`
					sizes.
				</p>
			</div>

			<div class="hero-card__stack">
				<UICheckbox
					bind:checked={productUpdates}
					size="lg"
					label="Product updates"
					helper="Receive release notes, roadmap updates, and important deprecation notices."
				/>
				<UICheckbox
					bind:checked={weeklyReport}
					size="lg"
					label="Weekly performance report"
					helper="Deliver a summary of unresolved issues and deployment status every Monday."
				/>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, one rhythm.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to fit the layout without changing selection behavior.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UICheckbox
								size={item.size}
								label={`${item.label} checkbox`}
								helper="Use this when multiple settings can be enabled together."
								checked={item.size !== 'sm'}
							/>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep feedback local to the control.</h2>
				</div>
				<p>Checked, error, and disabled states stay inside the same checkbox contract.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Checked</span>
					<UICheckbox
						bind:checked={confirmTerms}
						label="Confirm backup policy"
						helper="Snapshots will be retained for 30 days."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UICheckbox
						bind:checked={securityCopy}
						label="Acknowledge security copy"
						error="You must confirm this before publishing the workspace."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UICheckbox
						bind:checked={disabledState}
						label="Managed by organization policy"
						disabled
						helper="This setting is enforced by your admin."
					/>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical checklist flows.</h2>
				</div>
				<p>Use checkboxes for independent choices, not mutually exclusive options.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Release checklist</span>
					<div class="stack-list">
						<UICheckbox label="Run smoke tests" checked />
						<UICheckbox label="Verify analytics" />
						<UICheckbox label="Post changelog" checked />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Consent</span>
					<UICheckbox
						label="I agree to the workspace terms"
						required
						helper="This consent is required before the workspace can be created."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Notifications</span>
					<div class="stack-list">
						<UICheckbox label="Incident alerts" checked />
						<UICheckbox label="Daily digest" checked />
						<UICheckbox label="Marketing updates" />
					</div>
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
		gap: 1.25rem;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card,
	.hero-card__stack,
	.stack-list {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__stack {
		padding-top: 1rem;
		border-top: 1px solid #e2e8f0;
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
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
		color: #475569;
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
		border-top: 1px solid #e2e8f0;
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.35rem;
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
