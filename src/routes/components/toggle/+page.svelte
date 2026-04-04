<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Toggle as UIToggle } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Checked, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common switch patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact settings rows and utility panes.' },
		{ size: 'md', label: 'Medium', description: 'Default application toggle density.' },
		{ size: 'lg', label: 'Large', description: 'Roomier preference panels and key settings.' }
	] as const;

	let autoAssign = $state(true);
	let releaseAlerts = $state(false);
	let workspaceLock = $state(true);
	let emailDigest = $state(true);
	let errorState = $state(false);
	let disabledState = $state(false);
</script>

<svelte:head>
	<title>Toggle Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix toggle primitive, including size, state, and preference-switch usage patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Toggle"
	description="Binary switch primitive for preference and availability settings. It keeps the same helper, error, and size discipline as the input family while exposing a bindable checked state."
	pathLabel="components/toggle"
	pathHref="/components/toggle"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use one field shell for on or off decisions.</h2>
				<p class="lead">
					The toggle follows the same shell logic as `Input`: explicit sizing, helper and error
					messaging, and a stable control wrapper. Use it for binary preferences, access gates, and
					environment settings.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIToggle
					bind:checked={autoAssign}
					id="hero-auto-assign"
					size="lg"
					label="Auto-assign new tickets"
					helper="Route unassigned work to the active support lead."
				/>
				<UIToggle
					bind:checked={releaseAlerts}
					id="hero-release-alerts"
					size="lg"
					label="Release alerts"
					helper="Post deployment status updates to the operations channel."
				/>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, same behavior.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to fit layout density without changing the control model.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIToggle
								id={`size-${item.size}`}
								size={item.size}
								label={`${item.label} toggle`}
								helper="Use this setting when the workflow should be enabled."
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
					<h2>Keep state visible and readable.</h2>
				</div>
				<p>Checked, error, and disabled conditions stay inside the same component contract.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Checked</span>
					<UIToggle
						bind:checked={workspaceLock}
						id="state-checked"
						label="Workspace lock"
						helper="Prevent non-admin members from editing production settings."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIToggle
						bind:checked={errorState}
						id="state-error"
						label="Public access"
						error="Disable public access before rotating the API key."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIToggle
						bind:checked={disabledState}
						id="state-disabled"
						label="Email digest"
						disabled
						helper="This preference is managed by your organization."
					/>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical preference flows.</h2>
				</div>
				<p>Use concise labels and let helper copy explain the outcome of turning the switch on.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Security</span>
					<UIToggle
						label="Require sign-in approval"
						checked
						helper="Team members must confirm new device logins before access is granted."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Notifications</span>
					<UIToggle
						bind:checked={emailDigest}
						label="Weekly email digest"
						helper="Bundle unresolved activity into one summary every Friday."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Required</span>
					<UIToggle
						label="Acknowledge maintenance mode"
						required
						error="You must confirm this before continuing."
					/>
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
	.hero-card__stack {
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
