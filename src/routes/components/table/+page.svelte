<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Table as UITable,
		TBody as UITBody,
		TColumn as UITColumn,
		TFooter as UITFooter,
		THeader as UITHeader,
		TRow as UITRow
	} from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'anatomy', label: 'Anatomy', meta: 'Composable pieces' },
		{ id: 'examples', label: 'Examples', meta: 'Common usage' }
	] as const;

	const anatomy = [
		{
			name: 'Table',
			description: 'Semantic root table element with a quiet default treatment.'
		},
		{
			name: 'THeader, TBody, TFooter',
			description: 'Section primitives for header rows, body rows, and summary rows.'
		},
		{
			name: 'TRow',
			description: 'Applies the shared border-bottom row treatment.'
		},
		{
			name: 'TColumn',
			description: 'Renders `th` in the header by default and `td` everywhere else.'
		}
	] as const;
</script>

<svelte:head>
	<title>Table Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix table primitive, including the composable header, body, footer, row, and column pieces."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Table"
	description="Simple table primitive with bottom borders only. The family stays close to native table anatomy while giving each structural part its own reusable component."
	pathLabel="components/table"
	pathHref="/components/table"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Keep the markup semantic and let the row borders do the visual work.</h2>
				<p class="lead">
					The table family stays deliberately small: `Table`, `THeader`, `TBody`, `TFooter`, `TRow`,
					and `TColumn`. It avoids boxed chrome, vertical rules, and nested wrappers so it can fit
					product tables, lightweight summaries, and simple admin views.
				</p>
			</div>

			<div class="hero-card__table">
				<UITable ariaLabel="Deployment overview">
					<UITHeader>
						<UITRow>
							<UITColumn>Environment</UITColumn>
							<UITColumn>Status</UITColumn>
							<UITColumn>Owner</UITColumn>
						</UITRow>
					</UITHeader>
					<UITBody>
						<UITRow>
							<UITColumn>Production</UITColumn>
							<UITColumn>Healthy</UITColumn>
							<UITColumn>Emma</UITColumn>
						</UITRow>
						<UITRow>
							<UITColumn>Preview</UITColumn>
							<UITColumn>Queued</UITColumn>
							<UITColumn>Marco</UITColumn>
						</UITRow>
					</UITBody>
					<UITFooter>
						<UITRow>
							<UITColumn colspan={2}>Open incidents</UITColumn>
							<UITColumn>2</UITColumn>
						</UITRow>
					</UITFooter>
				</UITable>
			</div>
		</section>

		<section id="anatomy" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Anatomy</p>
					<h2>One family, six pieces.</h2>
				</div>
				<p>Each piece maps directly to a native table element so the API stays easy to read.</p>
			</div>

			<div class="doc-grid">
				{#each anatomy as item}
					<article class="doc-entry">
						<h3>{item.name}</h3>
						<p>{item.description}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Use the same pieces for status tables and summary rows.</h2>
				</div>
				<p>The footer stays optional, but it gives simple totals a clear resting place.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Team access</span>
					<UITable ariaLabel="Team access table">
						<UITHeader>
							<UITRow>
								<UITColumn>Member</UITColumn>
								<UITColumn>Role</UITColumn>
								<UITColumn>Last active</UITColumn>
							</UITRow>
						</UITHeader>
						<UITBody>
							<UITRow>
								<UITColumn>Priya Shah</UITColumn>
								<UITColumn>Admin</UITColumn>
								<UITColumn>2 hours ago</UITColumn>
							</UITRow>
							<UITRow>
								<UITColumn>Omar Li</UITColumn>
								<UITColumn>Editor</UITColumn>
								<UITColumn>Yesterday</UITColumn>
							</UITRow>
							<UITRow>
								<UITColumn>Leah Cruz</UITColumn>
								<UITColumn>Viewer</UITColumn>
								<UITColumn>4 days ago</UITColumn>
							</UITRow>
						</UITBody>
					</UITable>
				</article>

				<article class="state-card">
					<span class="state-label">Usage summary</span>
					<UITable ariaLabel="Usage summary table">
						<UITHeader>
							<UITRow>
								<UITColumn>Metric</UITColumn>
								<UITColumn>Current</UITColumn>
							</UITRow>
						</UITHeader>
						<UITBody>
							<UITRow>
								<UITColumn>Seats used</UITColumn>
								<UITColumn>42</UITColumn>
							</UITRow>
							<UITRow>
								<UITColumn>Storage</UITColumn>
								<UITColumn>128 GB</UITColumn>
							</UITRow>
						</UITBody>
						<UITFooter>
							<UITRow>
								<UITColumn>Plan</UITColumn>
								<UITColumn>Scale</UITColumn>
							</UITRow>
						</UITFooter>
					</UITable>
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
	.hero-card__table,
	.section-heading,
	.doc-entry,
	.state-card {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__table,
	.state-card {
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

	.hero-card__copy h2,
	.section-heading h2,
	.doc-entry h3 {
		margin: 0;
		font-size: clamp(1.2rem, 2vw, 1.8rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.doc-entry h3 {
		font-size: 1rem;
		letter-spacing: -0.02em;
	}

	.lead,
	.section-heading p,
	.doc-entry p {
		margin: 0;
		font-size: 0.975rem;
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
		padding: 1rem;
		border: 1px solid #e2e8f0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.92));
	}

	@media (min-width: 48rem) {
		.docs-shell {
			grid-template-columns: minmax(14rem, 16rem) minmax(0, 1fr);
			align-items: start;
		}

		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
