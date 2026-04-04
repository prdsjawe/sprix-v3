<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { ComboBox as UIComboBox, ComboBoxItem as UIComboBoxItem } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Composition patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact utility panels and denser toolbars.' },
		{ size: 'md', label: 'Medium', description: 'Default application combobox density.' },
		{ size: 'lg', label: 'Large', description: 'Roomier search and selection surfaces.' }
	] as const;

	const owners = [
		{ value: 'mia-santos', label: 'Mia Santos', description: 'Design systems lead' },
		{ value: 'kian-reyes', label: 'Kian Reyes', description: 'Product engineer' },
		{ value: 'lara-ong', label: 'Lara Ong', description: 'Operations manager' }
	] as const;

	const environments = [
		{ value: 'production', label: 'Production', description: 'Live customer traffic' },
		{ value: 'staging', label: 'Staging', description: 'Pre-release verification' },
		{ value: 'preview', label: 'Preview', description: 'Ephemeral branch builds' }
	] as const;

	const tags = [
		{ value: 'security', label: 'Security', description: 'Access, audit, and auth work' },
		{ value: 'billing', label: 'Billing', description: 'Invoices, plans, and subscriptions' },
		{ value: 'support', label: 'Support', description: 'Tickets, queues, and workflows' }
	] as const;

	let ownerValue = $state('Mia Santos');
	let environmentValue = $state('Staging');
	let reviewerValue = $state('Lara Ong');
	let disabledValue = $state('Enterprise workspace');
	let searchValue = $state('');
	let filterValue = $state('');
</script>

<svelte:head>
	<title>ComboBox Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix combobox primitive, including sizing, state behavior, and composition with ComboBoxItem."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="ComboBox"
	description="Searchable selection field built from a text-input shell plus a popup listbox. The field owns the input and popup behavior, while `ComboBoxItem` keeps the option rendering composable."
	pathLabel="components/combo-box"
	pathHref="/components/combo-box"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use one field shell and render your own option rows inside it.</h2>
				<p class="lead">
					The combobox follows the same field anatomy as `Input`, but opens a popup listbox through
					`createTippy`. `ComboBox` handles the control shell and popup lifecycle. `ComboBoxItem`
					keeps the option rows reusable, typed, and easy to render from your own data.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIComboBox
					bind:value={ownerValue}
					id="hero-owner"
					size="lg"
					label="Assign owner"
					helper="Search by name, then pick a single reviewer from the list."
				>
					<div class="option-stack">
						{#each owners as item}
							<UIComboBoxItem
								label={item.label}
								description={item.description}
								size="lg"
								selected={ownerValue === item.label}
								onclick={() => {
									ownerValue = item.label;
								}}
							/>
						{/each}
					</div>
				</UIComboBox>

				<UIComboBox
					bind:value={environmentValue}
					id="hero-environment"
					size="lg"
					label="Target environment"
					helper="Use the same shell for searchable environment or deployment pickers."
				>
					<div class="option-stack">
						{#each environments as item}
							<UIComboBoxItem
								label={item.label}
								description={item.description}
								size="lg"
								selected={environmentValue === item.label}
								onclick={() => {
									environmentValue = item.label;
								}}
							/>
						{/each}
					</div>
				</UIComboBox>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, same selection model.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to match layout density without changing the popup pattern.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIComboBox
								id={`size-${item.size}`}
								size={item.size}
								label={`${item.label} combobox`}
								placeholder="Choose an owner"
							>
								<div class="option-stack">
									{#each owners as owner}
										<UIComboBoxItem
											label={owner.label}
											description={owner.description}
											size={item.size}
										/>
									{/each}
								</div>
							</UIComboBox>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep feedback inside the same field contract.</h2>
				</div>
				<p>Helper text, validation, and disabled behavior should stay local to the field shell.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIComboBox
						bind:value={reviewerValue}
						id="state-helper"
						label="Reviewer"
						helper="Pick a final reviewer before moving this request to approval."
					>
						<div class="option-stack">
							{#each owners as item}
								<UIComboBoxItem
									label={item.label}
									description={item.description}
									selected={reviewerValue === item.label}
									onclick={() => {
										reviewerValue = item.label;
									}}
								/>
							{/each}
						</div>
					</UIComboBox>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIComboBox
						id="state-error"
						label="Workspace tag"
						value="Internal"
						error="Choose one of the approved tags before continuing."
					>
						<div class="option-stack">
							{#each tags as item}
								<UIComboBoxItem
									label={item.label}
									description={item.description}
								/>
							{/each}
						</div>
					</UIComboBox>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIComboBox
						bind:value={disabledValue}
						id="state-disabled"
						label="Workspace tier"
						disabled
						helper="This value is managed by your organization billing plan."
					>
						<div class="option-stack">
							<UIComboBoxItem label="Starter" />
							<UIComboBoxItem label="Growth" />
							<UIComboBoxItem label="Enterprise" selected />
						</div>
					</UIComboBox>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Composition stays in the parent, not hidden in the primitive.</h2>
				</div>
				<p>
					Render `ComboBoxItem` from your data source and decide how selection updates the bound
					input value.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Search field</span>
					<UIComboBox
						bind:value={searchValue}
						id="example-search"
						label="Jump to owner"
						placeholder="Type a teammate name"
					>
						<div class="option-stack">
							{#each owners.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())) as item}
								<UIComboBoxItem
									label={item.label}
									description={item.description}
									selected={searchValue === item.label}
									onclick={() => {
										searchValue = item.label;
									}}
								/>
							{/each}
						</div>
					</UIComboBox>
				</article>

				<article class="state-card">
					<span class="state-label">Structured options</span>
					<UIComboBox
						bind:value={filterValue}
						id="example-structured"
						label="Filter by team"
						placeholder="Choose a category"
					>
						<div class="option-stack">
							{#each tags as item}
								<UIComboBoxItem
									size="lg"
									selected={filterValue === item.label}
									onclick={() => {
										filterValue = item.label;
									}}
								>
									<span>{item.label}</span>
								</UIComboBoxItem>
							{/each}
						</div>
					</UIComboBox>
				</article>

				<article class="state-card">
					<span class="state-label">Read-only suggestions</span>
					<UIComboBox
						id="example-suggestions"
						label="Suggested environment"
						value="Staging"
						readonly
						helper="Readonly keeps the field stable while still letting users inspect suggestions."
					>
						<div class="option-stack">
							{#each environments as item}
								<UIComboBoxItem
									label={item.label}
									description={item.description}
									selected={item.label === 'Staging'}
								/>
							{/each}
						</div>
					</UIComboBox>
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
	.doc-entry__demo,
	.option-stack {
		display: grid;
		gap: 0.35rem;
	}

	.option-stack {
		gap: 0.25rem;
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
