<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Avatar as UIAvatar } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Image-first identity' },
		{ id: 'sizes', label: 'Sizes', meta: 'xs to 3xl' },
		{ id: 'fallback', label: 'Fallback', meta: 'Initials and icon' },
		{ id: 'examples', label: 'Examples', meta: 'Common layouts' }
	] as const;

	const sizes = [
		{
			size: 'xs',
			label: 'Extra small',
			description: 'Badge-adjacent density for tight tables, chips, and compact assignee lists.'
		},
		{
			size: 'sm',
			label: 'Small',
			description: 'Useful in dense menu rows and secondary metadata clusters.'
		},
		{
			size: 'md',
			label: 'Medium',
			description: 'The default balance for lists, cards, and compact profile references.'
		},
		{
			size: 'lg',
			label: 'Large',
			description: 'A clearer identity marker for activity feeds and richer rows.'
		},
		{
			size: 'xl',
			label: 'Extra large',
			description: 'Strong enough for owner callouts and team cards without becoming a hero image.'
		},
		{
			size: '2xl',
			label: '2XL',
			description: 'For prominent profile summaries and account panels.'
		},
		{
			size: '3xl',
			label: '3XL',
			description: 'Full profile-picture scale for dedicated profile surfaces.'
		}
	] satisfies {
		size: Avatar.Size;
		label: string;
		description: string;
	}[];
</script>

<svelte:head>
	<title>Avatar Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix avatar primitive, including its full size scale, image usage, fallback behavior, and common identity layouts."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Avatar"
	description="Identity primitive for user chips, assignee rows, and full profile surfaces. Pass your own `src` when you want a photo. The component does not ship with a default image."
	pathLabel="components/avatar"
	pathHref="/components/avatar"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One avatar scale from tiny presence markers to profile photos.</h2>
				<p class="lead">
					Use `src` for a real image surface and `name` for initials fallback. The same primitive
					covers tight UI like badge rows as well as large account summaries.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="avatar-hero">
					<div class="avatar-cluster">
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="xs" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="sm" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="md" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="lg" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="xl" />
					</div>

					<div class="profile-callout">
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="3xl" />

						<div class="profile-callout__copy">
							<h3>Pedro Duarte</h3>
							<p>Design systems lead coordinating component polish, API clarity, and release QA.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>From badge-sized to profile-picture scale.</h2>
				</div>
				<p>
					All seven sizes keep the same circular treatment. Only density changes, so the component
					stays predictable across list rows, cards, and profile panels.
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
							<div class="avatar-row">
								<UIAvatar
									src="/avatar-img.jpg"
									name="Pedro Duarte"
									alt="Pedro Duarte"
									size={item.size}
								/>
								<UIAvatar name="Sprix Team" size={item.size} />
								<code>{item.size}</code>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="fallback" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Fallback</p>
					<h2>Graceful failure when an image is missing.</h2>
				</div>
				<p>
					If `src` is absent or the image fails, the component falls back to initials from `name`.
					Without a name, it renders a neutral user icon.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Name only</span>
					<div class="stack-list">
						<div class="avatar-row">
							<UIAvatar name="Sprix Team" size="xl" />
							<UIAvatar name="Pedro Duarte" size="md" />
						</div>
						<p>Use `name` when the layout needs identity even before the real image is available.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Broken source</span>
					<div class="stack-list">
						<div class="avatar-row">
							<UIAvatar src="/missing-avatar.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="xl" />
						</div>
						<p>The image surface recovers automatically into initials instead of leaving a broken tag.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">No name</span>
					<div class="stack-list">
						<div class="avatar-row">
							<UIAvatar size="xl" />
						</div>
						<p>A neutral icon keeps the shape stable when no image or identity string is available.</p>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical identity patterns across the product.</h2>
				</div>
				<p>Use smaller sizes in dense collections and reserve the largest tiers for dedicated profile areas.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Assignee cluster</span>
					<div class="stack-list">
						<div class="avatar-cluster">
							<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="sm" />
							<UIAvatar name="Sprix Team" size="sm" />
							<UIAvatar name="Ada Lovelace" size="sm" />
							<UIAvatar size="sm" />
						</div>
						<p>Smaller tiers work well beside chips, labels, and dense metadata without dominating the row.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Activity row</span>
					<div class="person-row">
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="lg" />

						<div class="person-row__copy">
							<h3>Pedro Duarte</h3>
							<p>Updated the release checklist and assigned QA follow-up.</p>
						</div>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Profile summary</span>
					<div class="profile-panel">
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="2xl" />

						<div class="profile-panel__copy">
							<h3>Pedro Duarte</h3>
							<p>Product designer</p>
							<p class="profile-panel__meta">
								Coordinates the visual system across docs, flows, and team surfaces.
							</p>
						</div>
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
	.stack-list,
	.person-row,
	.profile-panel,
	.profile-callout {
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
		line-height: 1.65;
	}

	code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace;
		font-size: 0.8rem;
		color: var(--sprix-app-text-muted);
	}

	.lead {
		max-width: 52rem;
	}

	.doc-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.doc-entry,
	.state-card {
		padding: 1.1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
	}

	.doc-entry__meta,
	.doc-entry__demo,
	.avatar-hero,
	.profile-callout__copy,
	.person-row__copy,
	.profile-panel__copy {
		display: grid;
		gap: 0.7rem;
	}

	.doc-entry__demo,
	.avatar-row,
	.avatar-cluster {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
	}

	.state-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}

	.profile-callout,
	.person-row,
	.profile-panel {
		align-items: center;
	}

	.profile-callout,
	.person-row {
		grid-template-columns: auto minmax(0, 1fr);
	}

	.profile-panel__meta {
		font-size: 0.925rem;
	}

	@media (max-width: 960px) {
		.docs-shell {
			padding-top: 1rem;
		}
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
