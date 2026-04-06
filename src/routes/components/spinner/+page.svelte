<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Badge as UIBadge, Button as UIButton, Spinner as UISpinner } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'xs to 3xl' },
		{ id: 'roles', label: 'Roles', meta: 'Inherited or semantic tone' },
		{ id: 'contexts', label: 'Contexts', meta: 'Buttons, badges, and page states' }
	] as const;

	const sizes = [
		{ size: 'xs', label: 'Extra small', description: 'Dense badges and compact control chrome.' },
		{ size: 'sm', label: 'Small', description: 'Inline metadata and secondary actions.' },
		{ size: 'md', label: 'Medium', description: 'Default inline loading indicator.' },
		{ size: 'lg', label: 'Large', description: 'Higher emphasis row-level status.' },
		{
			size: 'xl',
			label: 'Extra large',
			description: 'Section-level loading within roomy layouts.'
		},
		{ size: '2xl', label: '2XL', description: 'Primary empty states and panel placeholders.' },
		{ size: '3xl', label: '3XL', description: 'Main application loading moments.' }
	] as const;

	const roles = [
		{
			role: 'current',
			label: 'Current',
			description: 'Inherits from surrounding text or control color.'
		},
		{ role: 'primary', label: 'Primary', description: 'Accent loading for featured flows.' },
		{
			role: 'secondary',
			label: 'Secondary',
			description: 'Quiet neutral feedback on light surfaces.'
		},
		{ role: 'tertiary', label: 'Tertiary', description: 'Subdued neutral loading in dense UI.' },
		{ role: 'danger', label: 'Danger', description: 'Destructive or blocked async work.' },
		{
			role: 'success',
			label: 'Success',
			description: 'Positive confirmation while work completes.'
		},
		{
			role: 'warning',
			label: 'Warning',
			description: 'Attention states without destructive weight.'
		}
	] as const;
</script>

<svelte:head>
	<title>Spinner Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix spinner primitive, including size scaling, tone behavior, and integration into buttons, badges, and broader loading states."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Spinner"
	description="Compact loading primitive that inherits cleanly inside controls, but can also scale into standalone status blocks. Use `current` when the parent already owns the color."
	pathLabel="components/spinner"
	pathHref="/components/spinner"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One loading glyph across controls and layout states.</h2>
				<p class="lead">
					The spinner defaults to `role="current"` so it inherits color inside buttons, badges, and
					other styled surfaces. Scale it with `size`, or pair it with text for broader loading
					feedback.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="badge-cloud">
					<UISpinner size="sm" role="primary" ariaLabel="Loading" />
					<UISpinner size="md" role="secondary">Syncing activity</UISpinner>
					<UISpinner size="lg" role="success">Publishing release</UISpinner>
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Match the loading affordance to the surrounding density.</h2>
				</div>
				<p>
					Smaller tiers align to badges and compact buttons. Larger tiers are for section and page
					states where the spinner must carry more visual weight.
				</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UISpinner size={item.size} role="primary">Loading</UISpinner>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="roles" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Roles</p>
					<h2>Default to inherited color unless the spinner owns the tone.</h2>
				</div>
				<p>
					`current` is for nested loading states. Semantic roles are for standalone indicators that
					need to establish their own color.
				</p>
			</div>

			<div class="doc-grid">
				{#each roles as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UISpinner size="md" role={item.role}>{item.label}</UISpinner>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="contexts" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Contexts</p>
					<h2>Use the same primitive from micro states to full-page loading.</h2>
				</div>
				<p>
					Buttons and badges should keep their own layout and color system. Larger loading states
					can let the spinner carry the message directly.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Button loading</span>
					<UIButton role="primary" loading>Saving changes</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Badge loading</span>
					<div class="badge-row">
						<UIBadge role="secondary" variant="modern" loading>Syncing metadata</UIBadge>
						<UIBadge role="warning" variant="badge" loading>Revalidating cache</UIBadge>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Section loading</span>
					<div class="stack-list">
						<UISpinner size="2xl" role="primary">Loading workspace</UISpinner>
						<p class="badge-note">
							Use a larger tier with a short message when the spinner becomes the primary feedback
							element on screen.
						</p>
					</div>
				</article>
			</div>
		</section>
	</main>
</div>
