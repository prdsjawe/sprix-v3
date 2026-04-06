<script lang="ts">
	import { Button as UIButton, ButtonGroup as UIButtonGroup } from '$lib/components';
	import { Header, Sidebar } from '../../../app/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'xs to xl' },
		{ id: 'roles', label: 'Roles', meta: 'Semantic emphasis' },
		{ id: 'variants', label: 'Variants', meta: 'Surface treatment' },
		{ id: 'states', label: 'States', meta: 'Loading and disabled' },
		{ id: 'groups', label: 'Groups', meta: 'Horizontal and vertical' },
		{ id: 'examples', label: 'Examples', meta: 'Common compositions' }
	] as const;

	const sizes = [
		{
			size: 'xs',
			label: 'Extra small',
			description: 'Dense utility controls and compact pagination.'
		},
		{ size: 'sm', label: 'Small', description: 'Dense interfaces and compact rows.' },
		{ size: 'md', label: 'Medium', description: 'Default application control size.' },
		{ size: 'lg', label: 'Large', description: 'Higher emphasis for key actions.' },
		{ size: 'xl', label: 'Extra large', description: 'Hero actions and roomy surfaces.' }
	] as const;

	const roles = [
		{ role: 'primary', label: 'Primary', description: 'Highest emphasis action.' },
		{ role: 'secondary', label: 'Secondary', description: 'Neutral supporting action.' },
		{ role: 'tertiary', label: 'Tertiary', description: 'Low-emphasis neutral action.' },
		{ role: 'danger', label: 'Danger', description: 'Destructive or irreversible action.' },
		{ role: 'success', label: 'Success', description: 'Confirmatory or positive action.' },
		{ role: 'warning', label: 'Warning', description: 'Attention-seeking but not destructive.' }
	] as const;

	const variants = [
		{ variant: 'default', label: 'Default', description: 'Standard filled treatment.' },
		{ variant: 'flat', label: 'Flat', description: 'Reduced elevation with the same palette.' },
		{
			variant: 'outline',
			label: 'Outline',
			description: 'Border-led treatment with a white field.'
		},
		{ variant: 'quiet', label: 'Quiet', description: 'Transparent baseline with hover feedback.' },
		{ variant: 'soft', label: 'Soft', description: 'Tinted surface with moderated contrast.' },
		{ variant: 'disabled', label: 'Disabled', description: 'Locks presentation and interaction.' }
	] as const;
</script>

<svelte:head>
	<title>Button Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix button primitive, including sizes, roles, variants, states, and grouped action patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Button"
	description="Strict native button primitive with explicit size, role, and variant styling. This route documents the current API and intended usage patterns."
	pathLabel="components/button"
	pathHref="/components/button"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use one semantic root and vary the surface around it.</h2>
				<p class="lead">
					The button stays a native `button` element. `role` controls semantic color and intent.
					`variant` controls how strongly that intent is expressed. `size` scales spacing and radius
					without changing the interaction model.
				</p>
			</div>

			<div class="hero-card__actions">
				<UIButton size="xl" role="primary">Create workspace</UIButton>
				<UIButton size="xl" role="secondary" variant="outline">Review changes</UIButton>
				<UIButton size="xl" role="tertiary" variant="quiet">Dismiss</UIButton>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Five tiers, one family.</h2>
				</div>
				<p>Choose size based on layout density, not by inventing a new button style.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIButton size={item.size} role="primary">Primary</UIButton>
							<UIButton size={item.size} role="secondary" variant="outline">Secondary</UIButton>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="roles" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Roles</p>
					<h2>Meaning first.</h2>
				</div>
				<p>Roles define semantic emphasis before variant styling is applied.</p>
			</div>

			<div class="doc-grid">
				{#each roles as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIButton role={item.role} leftIcon="arrow-trending-up">{item.label}</UIButton>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="variants" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Variants</p>
					<h2>Surface treatment on top of role.</h2>
				</div>
				<p>
					These examples keep the role fixed on primary so the variant changes are easier to
					compare.
				</p>
			</div>

			<div class="doc-grid">
				{#each variants as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIButton role="primary" variant={item.variant}>Primary {item.label}</UIButton>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep state legible and stable.</h2>
				</div>
				<p>
					Loading and disabled states should preserve the button footprint and keep intent obvious.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Loading</span>
					<UIButton role="primary" loading>Saving changes</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled prop</span>
					<UIButton role="secondary" disabled>Permission required</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled variant</span>
					<UIButton role="primary" variant="disabled">Unavailable</UIButton>
				</article>
			</div>
		</section>

		<section id="groups" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Groups</p>
					<h2>Cluster related actions into one control band.</h2>
				</div>
				<p>
					`ButtonGroup` keeps adjacent buttons flush by removing the shared corner radius and
					interior borders. Switch `orientation` when the action stack needs to read vertically.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Horizontal</h3>
						<p>Use for segmented action rows, compact filters, and view switches.</p>
					</div>
					<div class="doc-entry__demo">
						<UIButtonGroup ariaLabel="View range">
							<UIButton role="secondary" variant="outline">Day</UIButton>
							<UIButton role="secondary" variant="outline">Week</UIButton>
							<UIButton role="secondary" variant="outline">Month</UIButton>
						</UIButtonGroup>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Vertical</h3>
						<p>
							Use when the group should read as a stacked action block instead of an inline row.
						</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo--start">
						<UIButtonGroup orientation="vertical" ariaLabel="Priority actions">
							<UIButton role="secondary" variant="outline">Edit</UIButton>
							<UIButton role="secondary" variant="outline">Duplicate</UIButton>
							<UIButton role="secondary" variant="outline">Archive</UIButton>
						</UIButtonGroup>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical compositions.</h2>
				</div>
				<p>Use icon slots deliberately and keep icon-only buttons labeled for accessibility.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Adornments</span>
					<UIButton role="secondary" variant="outline" rightIcon="arrow-right">
						{#snippet leftSlot()}
							<span class="dot"></span>
						{/snippet}
						Review changes
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Icon only</span>
					<UIButton role="tertiary" variant="quiet" ariaLabel="Open filters" icon="plus" />
				</article>

				<article class="state-card">
					<span class="state-label">Positive action</span>
					<UIButton role="success" variant="soft">Deployment ready</UIButton>
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
	.state-card {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__actions,
	.doc-entry__demo {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		align-items: center;
	}

	.doc-entry__demo--start {
		align-items: flex-start;
	}

	.hero-card__actions {
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

	.doc-entry__meta {
		display: grid;
		gap: 0.35rem;
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: currentColor;
		opacity: 0.72;
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
