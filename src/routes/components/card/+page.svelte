<script lang="ts">
	import { Button as UIButton, Card as UICard, Input as UIInput } from '$lib/components';
	import { Header, Sidebar } from '../../../app/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'anatomy', label: 'Anatomy', meta: 'Header, content, footer' },
		{ id: 'example', label: 'Example', meta: 'Login card demo' }
	] as const;

	let accountEmail = $state('');
	let accountPassword = $state('');
	let inviteEmail = $state('');
</script>

<svelte:head>
	<title>Card Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix card primitive, including the smaller header-action-footer API and a login card example."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Card"
	description="Bordered content container with optional header copy, header action, and footer composition. This keeps the API smaller than a full `Card*` subcomponent family."
	pathLabel="components/card"
	pathHref="/components/card"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it for grouped content, not generic boxed layout.</h2>
				<p class="lead">
					`Card` is a restrained bordered surface with a built-in title, description, optional header
					action, and optional footer snippet. It avoids a shadow by default and leaves width,
					internal form layout, and nested content up to the caller.
				</p>
			</div>

			<div class="hero-card__demo">
				<UICard
					class="w-full max-w-sm"
					title="Workspace access"
					description="Invite one teammate to help review the release candidate."
				>
					{#snippet action()}
						<a href="#example" class="card-link">Manage</a>
					{/snippet}

					<div class="card-stack">
						<div class="field-stack">
							<label class="field-label" for="overview-email">Email</label>
							<UIInput
								id="overview-email"
								bind:value={inviteEmail}
								type="email"
								placeholder="m@example.com"
							/>
						</div>
					</div>

					{#snippet footer()}
						<div class="footer-stack">
							<UIButton class="w-full">Send invite</UIButton>
							<UIButton class="w-full" role="secondary" variant="outline">Copy link</UIButton>
						</div>
					{/snippet}
				</UICard>
			</div>
		</section>

		<section id="anatomy" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Anatomy</p>
					<h2>Keep the surface quiet and the structure obvious.</h2>
				</div>
				<p>Most usage should stay within the built-in title, description, action, children, and footer hooks.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Header copy</h3>
						<p>Use `title` and `description` for the common case rather than custom header markup.</p>
					</div>
					<UICard
						title="Deployment notes"
						description="Rollout begins after sign-off from design and QA."
					>
						<div class="card-stack">
							<p class="entry-copy">Cards work well for compact summaries, forms, and grouped actions.</p>
						</div>
					</UICard>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Header action</h3>
						<p>Keep the action secondary so the card content remains the primary focus.</p>
					</div>
					<UICard
						title="Access request"
						description="A new teammate needs a seat on the workspace."
					>
						{#snippet action()}
							<a href="#example" class="card-link">Review</a>
						{/snippet}

						<div class="card-stack">
							<p class="entry-copy">A single quiet action in the header is enough for most cards.</p>
						</div>
					</UICard>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Footer actions</h3>
						<p>Use the footer for stacked actions that should sit beneath the main content.</p>
					</div>
					<UICard
						title="Publish changelog"
						description="Review the release notes before sending them to customers."
					>
						<div class="card-stack">
							<p class="entry-copy">The footer stays outside the content body so action groups read as a separate step.</p>
						</div>

						{#snippet footer()}
							<div class="footer-stack">
								<UIButton class="w-full">Publish</UIButton>
								<UIButton class="w-full" role="secondary" variant="outline">Save draft</UIButton>
							</div>
						{/snippet}
					</UICard>
				</article>
			</div>
		</section>

		<section id="example" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Example</p>
					<h2>Login card.</h2>
				</div>
				<p>The layout below mirrors the requested reference but keeps the card itself as a single reusable primitive.</p>
			</div>

			<div class="example-shell">
				<UICard
					class="w-full max-w-sm"
					title="Login to your account"
					description="Enter your email below to login to your account"
				>
					{#snippet action()}
						<a href="#signup" class="card-link">Sign up</a>
					{/snippet}

					<form class="card-stack" onsubmit={(event) => event.preventDefault()}>
						<div class="field-stack">
							<label class="field-label" for="card-email">Email</label>
							<UIInput
								id="card-email"
								bind:value={accountEmail}
								type="email"
								placeholder="m@example.com"
							/>
						</div>

						<div class="field-stack">
							<div class="field-row">
								<label class="field-label" for="card-password">Password</label>
								<a href="#forgot-password" class="field-link">Forgot your password?</a>
							</div>
							<UIInput id="card-password" bind:value={accountPassword} type="password" />
						</div>
					</form>

					{#snippet footer()}
						<div class="footer-stack">
							<UIButton class="w-full" type="button">Login</UIButton>
							<UIButton class="w-full" type="button" role="secondary" variant="outline">
								Login with Google
							</UIButton>
						</div>
					{/snippet}
				</UICard>
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
	.doc-card,
	.hero-card__copy,
	.hero-card__demo,
	.section-heading,
	.doc-entry,
	.doc-entry__meta,
	.example-shell {
		display: grid;
		gap: 1rem;
	}

	.hero-card {
		align-items: start;
	}

	.hero-card__copy {
		max-width: 42rem;
	}

	.hero-card__demo,
	.example-shell {
		justify-items: start;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	h2,
	h3 {
		margin: 0;
		color: #0f172a;
	}

	h2 {
		font-size: clamp(1.35rem, 2vw, 1.75rem);
		line-height: 1.15;
	}

	p {
		margin: 0;
	}

	.lead,
	.section-heading > p,
	.doc-entry__meta p,
	.entry-copy {
		line-height: 1.7;
		color: #475569;
	}

	.doc-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-entry {
		padding: 1.25rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.88));
	}

	.card-stack,
	.field-stack,
	.footer-stack {
		display: grid;
	}

	.card-stack {
		gap: 1.5rem;
	}

	.field-stack {
		gap: 0.5rem;
	}

	.footer-stack {
		gap: 0.5rem;
	}

	.field-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.field-label {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.4;
		color: #0f172a;
	}

	.field-link,
	.card-link {
		font-size: 0.875rem;
		font-weight: 500;
		color: #2563eb;
		text-decoration: none;
	}

	.field-link {
		margin-left: auto;
	}

	.field-link:hover,
	.card-link:hover {
		text-decoration: underline;
		text-underline-offset: 0.25rem;
	}

	@media (min-width: 960px) {
		.docs-shell {
			grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
		}

		.hero-card {
			grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 24rem);
		}

		.doc-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
