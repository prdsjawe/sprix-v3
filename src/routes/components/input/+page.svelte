<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Field as UIField, Input as UIInput } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'types', label: 'Types', meta: 'Text and password' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common field patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact forms and dense utility panels.' },
		{ size: 'md', label: 'Medium', description: 'Default application field size.' },
		{ size: 'lg', label: 'Large', description: 'Roomier forms and prominent entry points.' }
	] as const;

	let name = $state('Mira Valdez');
	let email = $state('mira@sprix.dev');
	let password = $state('Supersafe123');
	let search = $state('');
	let disabledValue = $state('Archived workspace');
</script>

<svelte:head>
	<title>Input Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix input primitive, including sizes, states, and password visibility behavior."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Input"
	description="Single-line control shell with explicit size control, adornments, and a built-in password visibility toggle. Visible labels and field messaging now live in `Field`."
	pathLabel="components/input"
	pathHref="/components/input"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One control shell, multiple field contexts.</h2>
				<p class="lead">
					`Input` now focuses on the control shell itself. Pair it with `Field` when you need the visible
					label, description, helper text, or error message. It still supports `sm`, `md`, and `lg`, and
					password fields automatically get a visibility toggle.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIField label="Workspace name" name="hero-name" helper="Visible to your team members.">
					<UIInput bind:value={name} size="lg" />
				</UIField>
				<UIField label="Admin password" name="hero-password" helper="At least 12 characters.">
					<UIInput bind:value={password} size="lg" type="password" />
				</UIField>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three tiers, same structure.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to match density without changing behavior or field anatomy.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIField label={`${item.label} input`} name={`size-${item.size}`}>
								<UIInput size={item.size} placeholder="Enter a value" />
							</UIField>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="types" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Types</p>
					<h2>Text, email, password.</h2>
				</div>
				<p>
					Password inputs own the visibility toggle so consumers do not have to wire it every time.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Text</h3>
						<p>Standard control paired with field-level label and helper copy.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="Full name" name="type-text" helper="Used across your profile and invoices.">
							<UIInput bind:value={name} />
						</UIField>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Email</h3>
						<p>Uses the same shell with a semantic input type.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="Email address" name="type-email">
							<UIInput bind:value={email} type="email" placeholder="you@company.com" />
						</UIField>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Password</h3>
						<p>Includes an eye toggle to reveal or hide the current value.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="Password" name="type-password" helper="The eye button is built in.">
							<UIInput bind:value={password} type="password" />
						</UIField>
					</div>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Messaging and availability.</h2>
				</div>
				<p>Helper text and errors belong to `Field`, while disabled appearance stays inside the control shell.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIField label="Project slug" name="state-helper" helper="Lowercase, hyphen-separated, and unique.">
						<UIInput placeholder="sprix-v3" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIField label="Subdomain" name="state-error" error="This subdomain is already reserved.">
						<UIInput value="workspace" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIField
						label="Workspace status"
						name="state-disabled"
						helper="Disabled fields still preserve content legibility."
					>
						<UIInput bind:value={disabledValue} disabled />
					</UIField>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Common field patterns.</h2>
				</div>
				<p>Adornments are available when they clarify the field rather than decorate it.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Leading icon</span>
					<UIField label="Search" name="example-search">
						<UIInput
							bind:value={search}
							leftIcon="magnifying-glass"
							placeholder="Search people, projects, or files"
						/>
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Trailing status</span>
					<UIField label="Repository URL" name="example-status" helper="Connection verified and ready.">
						<UIInput rightIcon="check-circle" value="github.com/sprix-v3" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Required password</span>
					<UIField label="New password" name="example-password" required helper="Use a unique password for this workspace.">
						<UIInput type="password" />
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
