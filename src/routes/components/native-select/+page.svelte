<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Field as UIField, NativeSelect as UINativeSelect } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Native option markup' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact utility forms and denser control bars.' },
		{ size: 'md', label: 'Medium', description: 'Default application select density.' },
		{ size: 'lg', label: 'Large', description: 'Roomier forms and more prominent pickers.' }
	] as const;

	let environment = $state('staging');
	let owner = $state('');
	let visibility = $state('');
	let disabledValue = $state('enterprise');
</script>

<svelte:head>
	<title>Native Select Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix native select primitive, including sizes, placeholder behavior, optgroups, and field integration."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Native Select"
	description="Single-choice field built on the native `select` element. It keeps the same shell language as `Input`, works with `Field` context, and expects plain `option` or `optgroup` markup instead of a custom popup API."
	pathLabel="components/native-select"
	pathHref="/components/native-select"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use the browser-native control, then style the shell around it.</h2>
				<p class="lead">
					`NativeSelect` renders a real native select element and accepts plain child markup. That keeps
					keyboard and form behavior native, while the component still aligns with Sprix field spacing,
					focus treatment, and error states.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIField label="Target environment" name="hero-environment" helper="Choose the environment you want to deploy to.">
					<UINativeSelect bind:value={environment} size="lg">
						<option value="production">Production</option>
						<option value="staging">Staging</option>
						<option value="preview">Preview</option>
					</UINativeSelect>
				</UIField>

				<UIField label="Owner" name="hero-owner" helper="Use native placeholder text and optgroups when the list needs more structure.">
					<UINativeSelect bind:value={owner} size="lg" placeholder="Choose an owner">
						<optgroup label="Design">
							<option value="mia-santos">Mia Santos</option>
						</optgroup>
						<optgroup label="Operations">
							<option value="lara-ong">Lara Ong</option>
						</optgroup>
						<optgroup label="Engineering">
							<option value="kian-reyes">Kian Reyes</option>
						</optgroup>
					</UINativeSelect>
				</UIField>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three densities, same native control.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to align the native select with adjacent buttons, inputs, and textareas.</p>
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
								<UINativeSelect size={item.size} placeholder="Choose an environment">
									<option value="production">Production</option>
									<option value="staging">Staging</option>
									<option value="preview">Preview</option>
								</UINativeSelect>
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
				<p>`Field` handles helper and error copy, while the native select shell owns focus, invalid, and disabled styling.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIField label="Visibility" name="state-helper" helper="Plain option tags are enough for common single-choice flows.">
						<UINativeSelect bind:value={visibility} placeholder="Choose visibility">
							<option value="team">Team only</option>
							<option value="customers">Customers</option>
							<option value="private">Private</option>
						</UINativeSelect>
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIField label="Owner" name="state-error" error="Choose an owner before moving this request forward.">
						<UINativeSelect placeholder="Select an owner">
							<option value="mia-santos">Mia Santos</option>
							<option value="lara-ong">Lara Ong</option>
							<option value="kian-reyes">Kian Reyes</option>
						</UINativeSelect>
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIField label="Workspace tier" name="state-disabled" helper="Disabled controls still preserve the current selected value.">
						<UINativeSelect bind:value={disabledValue} disabled>
							<option value="starter">Starter</option>
							<option value="growth">Growth</option>
							<option value="enterprise">Enterprise</option>
						</UINativeSelect>
					</UIField>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Compose plain option markup inside a reusable shell.</h2>
				</div>
				<p>
					Keep the control API small: pass native `option` tags for simple lists, then reach for `optgroup`
					when the choices need structure.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Native options</span>
					<UIField label="Deployment target" name="example-native" helper="Use direct child markup instead of a custom data adapter.">
						<UINativeSelect bind:value={environment}>
							<option value="production">Production</option>
							<option value="staging">Staging</option>
							<option value="preview">Preview</option>
						</UINativeSelect>
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Optgroups</span>
					<UIField label="Review owner" name="example-optgroup" helper="Optgroups stay native and require no sibling item component.">
						<UINativeSelect bind:value={owner} placeholder="Assign a reviewer">
							<optgroup label="Design">
								<option value="mia-santos">Mia Santos</option>
							</optgroup>
							<optgroup label="Operations">
								<option value="lara-ong">Lara Ong</option>
							</optgroup>
							<optgroup label="Engineering">
								<option value="kian-reyes">Kian Reyes</option>
							</optgroup>
						</UINativeSelect>
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Required field</span>
					<UIField label="Audience" name="example-required" required helper="When `placeholder` is present, the empty option stays disabled on required fields.">
						<UINativeSelect placeholder="Choose an audience">
							<option value="team">Team only</option>
							<option value="customers">Customers</option>
							<option value="private">Private</option>
						</UINativeSelect>
					</UIField>
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

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #475569;
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
		color: #475569;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-entry,
	.state-card {
		padding: 1.25rem;
		border: 1px solid #e2e8f0;
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
		color: #64748b;
	}

	@media (min-width: 48rem) {
		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
