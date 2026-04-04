<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Field as UIField, Select as UISelect } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Grouping and field use' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact utility forms and denser control bars.' },
		{ size: 'md', label: 'Medium', description: 'Default application select density.' },
		{ size: 'lg', label: 'Large', description: 'Roomier forms and more prominent pickers.' }
	] as const;

	const environmentOptions: Select.Option[] = [
		{ value: 'production', label: 'Production', description: 'Live customer traffic', group: 'Environments' },
		{ value: 'staging', label: 'Staging', description: 'Pre-release verification', group: 'Environments' },
		{ value: 'preview', label: 'Preview', description: 'Ephemeral branch builds', group: 'Environments' }
	];

	const ownerOptions: Select.Option[] = [
		{ value: 'mia-santos', label: 'Mia Santos', description: 'Design systems lead', group: 'Design' },
		{ value: 'lara-ong', label: 'Lara Ong', description: 'Operations manager', group: 'Operations' },
		{ value: 'kian-reyes', label: 'Kian Reyes', description: 'Product engineer', group: 'Engineering' }
	];

	const visibilityOptions: Select.Option[] = [
		{ value: 'team', label: 'Team only', description: 'Visible to internal collaborators' },
		{ value: 'customers', label: 'Customers', description: 'Shown in the external workspace' },
		{ value: 'private', label: 'Private', description: 'Restricted to workspace admins' }
	];

	let environment = $state('staging');
	let owner = $state('mia-santos');
	let disabledValue = $state('enterprise');
</script>

<svelte:head>
	<title>Select Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix select primitive, including grouped options, sizes, and state behavior."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Select"
	description="Single-choice field with a custom floating listbox. It keeps the same shell language as `Input`, but uses the existing `createTippy` popup primitive and a typed `options` array instead of a subcomponent family."
	pathLabel="components/select"
	pathHref="/components/select"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Custom select UI without the shadcn-style trigger, content, group, and item split.</h2>
				<p class="lead">
					`Select` is the simpler sibling to `ComboBox`. It is not a native select element, and it does not
					accept free-form input. Instead, it opens a styled listbox via `createTippy`, renders options from
					data, and works cleanly with `Field` for labels, descriptions, helper text, and errors.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIField label="Target environment" name="hero-environment" helper="Choose the environment you want to deploy to.">
					<UISelect bind:value={environment} size="lg" options={environmentOptions} />
				</UIField>

				<UIField label="Owner" name="hero-owner" helper="Group labels come from the option data, not extra components.">
					<UISelect bind:value={owner} size="lg" options={ownerOptions} placeholder="Choose an owner" />
				</UIField>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, same popup pattern.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to align select density with adjacent buttons and inputs.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIField label={`${item.label} select`} name={`size-${item.size}`}>
								<UISelect size={item.size} placeholder="Choose an environment" options={environmentOptions} />
							</UIField>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Field messaging outside, control state inside.</h2>
				</div>
				<p>`Field` handles helper and error copy, while the select shell owns open, selected, and disabled styling.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIField label="Visibility" name="state-helper" helper="Use a simple typed array for single-choice flows.">
						<UISelect options={visibilityOptions} placeholder="Choose visibility" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIField label="Owner" name="state-error" error="Choose an owner before moving this request forward.">
						<UISelect options={ownerOptions} placeholder="Select an owner" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIField label="Workspace tier" name="state-disabled" helper="Disabled controls still preserve the current label.">
						<UISelect bind:value={disabledValue} disabled options={[
							{ value: 'starter', label: 'Starter' },
							{ value: 'growth', label: 'Growth' },
							{ value: 'enterprise', label: 'Enterprise' }
						]} />
					</UIField>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Grouped options and form-friendly field composition.</h2>
				</div>
				<p>
					Use `group` and `description` inside the option data when the list needs more structure, but keep the
					API to one component and one `options` prop.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Grouped owners</span>
					<UIField label="Review owner" name="example-grouped" helper="Selections render descriptions inside the popup only.">
						<UISelect bind:value={owner} options={ownerOptions} placeholder="Assign a reviewer" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Required field</span>
					<UIField label="Deployment target" name="example-required" required helper="The trigger inherits field metadata through context.">
						<UISelect bind:value={environment} options={environmentOptions} />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Placeholder</span>
					<UIField label="Audience" name="example-placeholder" helper="Use placeholders when the current value should remain unset until a choice is made.">
						<UISelect options={visibilityOptions} placeholder="Choose an audience" />
					</UIField>
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
	.hero-card__stack {
		display: grid;
		gap: 0.85rem;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--sprix-app-text-muted);
	}

	h2,
	h3,
	.lead,
	.section-heading p,
	.doc-entry p,
	.state-label {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.5rem, 2.4vw, 2rem);
		line-height: 1.1;
		letter-spacing: -0.04em;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.35;
		letter-spacing: -0.02em;
	}

	.lead,
	.section-heading p,
	.doc-entry p {
		line-height: 1.7;
		color: var(--sprix-app-text-muted);
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-entry,
	.state-card {
		padding: 1.25rem;
		border: 1px solid var(--sprix-app-border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.94));
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.75rem;
	}

	.state-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--sprix-app-text-subtle);
	}

	@media (min-width: 48rem) {
		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
