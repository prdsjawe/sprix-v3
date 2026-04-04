<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Radio as UIRadio } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Selected, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common radio patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Dense selection lists and utility panes.' },
		{ size: 'md', label: 'Medium', description: 'Default option group density.' },
		{ size: 'lg', label: 'Large', description: 'More prominent single-choice rows.' }
	] as const;

	let billingCycle = $state('monthly');
	let visibility = $state('team');
	let environment = $state('staging');
	let releaseChannel = $state('stable');
	let planSelection = $state<Radio.Value>('starter');
	let accessLevel = $state<Radio.Value>('editor');
	let backupFrequency = $state<Radio.Value>('weekly');
</script>

<svelte:head>
	<title>Radio Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix radio primitive, including size, state, and single-selection usage patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Radio"
	description="Single-choice selection primitive for mutually exclusive options. It exposes a bindable group value while keeping size and messaging aligned with the rest of the Sprix form controls."
	pathLabel="components/radio"
	pathHref="/components/radio"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use radios when only one option can be active.</h2>
				<p class="lead">
					Radio controls work best for short, exclusive sets where users should see every option at
					once. The component keeps a custom indicator, helper and error messaging, and a bindable
					`group` value.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIRadio
					bind:group={billingCycle}
					name="hero-billing"
					value="monthly"
					size="lg"
					label="Monthly billing"
					helper="Lower upfront commitment with a recurring invoice."
				/>
				<UIRadio
					bind:group={billingCycle}
					name="hero-billing"
					value="yearly"
					size="lg"
					label="Yearly billing"
					helper="Save on platform fees with an annual plan."
				/>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, same contract.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to fit layout density without changing group behavior.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIRadio
								size={item.size}
								name={`size-${item.size}`}
								value={item.size}
								group={item.size}
								label={`${item.label} radio`}
								helper="Use this when only one answer should be selected."
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
					<h2>Keep single-choice feedback obvious.</h2>
				</div>
				<p>Selected, error, and disabled states stay within the same radio component contract.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Selected</span>
					<div class="stack-list">
						<UIRadio
							bind:group={visibility}
							name="state-visibility"
							value="team"
							label="Visible to team members"
						/>
						<UIRadio
							bind:group={visibility}
							name="state-visibility"
							value="private"
							label="Only visible to admins"
						/>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<div class="stack-list">
						<UIRadio
							bind:group={environment}
							name="state-environment"
							value="production"
							label="Production"
							error="Choose a non-production environment before running this migration."
						/>
						<UIRadio
							bind:group={environment}
							name="state-environment"
							value="staging"
							label="Staging"
						/>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<div class="stack-list">
						<UIRadio
							bind:group={releaseChannel}
							name="state-channel"
							value="stable"
							label="Stable"
							disabled
							helper="Locked by organization release policy."
						/>
						<UIRadio
							bind:group={releaseChannel}
							name="state-channel"
							value="beta"
							label="Beta"
							disabled
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical single-select flows.</h2>
				</div>
				<p>Use radios when every option should remain visible and one answer must win.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Plan selection</span>
					<div class="stack-list">
						<UIRadio bind:group={planSelection} name="plan" value="starter" label="Starter" />
						<UIRadio bind:group={planSelection} name="plan" value="growth" label="Growth" />
						<UIRadio bind:group={planSelection} name="plan" value="scale" label="Scale" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Access level</span>
					<div class="stack-list">
						<UIRadio bind:group={accessLevel} name="access" value="viewer" label="Viewer" />
						<UIRadio bind:group={accessLevel} name="access" value="editor" label="Editor" />
						<UIRadio bind:group={accessLevel} name="access" value="admin" label="Admin" />
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Required selection</span>
					<div class="stack-list">
						<UIRadio
							bind:group={backupFrequency}
							name="backup-frequency"
							value="daily"
							label="Daily backups"
							required
						/>
						<UIRadio
							bind:group={backupFrequency}
							name="backup-frequency"
							value="weekly"
							label="Weekly backups"
							required
						/>
					</div>
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
	.hero-card__stack,
	.stack-list {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__stack {
		padding-top: 1rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	.section-kicker,
	.state-label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--sprix-app-text-muted);
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
		color: var(--sprix-app-text-muted);
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
		border-top: 1px solid var(--sprix-app-border);
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
