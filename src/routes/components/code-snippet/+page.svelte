<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { CodeSnippet as UICodeSnippet } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'gutter', label: 'Gutter', meta: 'Line numbers on or off' },
		{ id: 'examples', label: 'Examples', meta: 'Wrapped and plain previews' }
	] as const;

	const heroSnippet = [
		"import { Button, CodeSnippet } from '$lib/components';",
		'',
		'const preview = [',
		"\t{ label: 'Ship', role: 'primary' },",
		"\t{ label: 'Schedule', role: 'secondary' }",
		'];',
		'',
		'<CodeSnippet filename="toolbar.svelte" language="svelte" code={preview} />'
	].join('\n');

	const componentSnippet = [
		"import { CodeSnippet } from '$lib/components';",
		'',
		'const installCommand = "npm run check";',
		'',
		'<CodeSnippet',
		'\tfilename="terminal.sh"',
		'\tlanguage="bash"',
		'\tcode={installCommand}',
		'/>'
	].join('\n');

	const wrappedSnippet = [
		'const releaseQuery =',
		'\t"/api/releases?workspace=sprix&status=ready-for-review&include=owner,notes,qa-summary";',
		'',
		'await fetch(releaseQuery);'
	].join('\n');
	const plainSnippet = ['npm install', 'npm run check', 'npm run dev'].join('\n');
</script>

<svelte:head>
	<title>Code Snippet Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix code snippet primitive, including line-number gutters, optional headers, and wrapped preview examples."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Code Snippet"
	description="Preformatted code preview for docs, onboarding steps, and lightweight implementation references. The numbers are line numbers; the left column is the gutter."
	pathLabel="components/code-snippet"
	pathHref="/components/code-snippet"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it for readable previews, not as an editor surface.</h2>
				<p class="lead">
					`CodeSnippet` is for showing code clearly inside docs and showcase cards. Keep the gutter on
					when the snippet will be discussed line by line, and turn it off when the preview is just
					supporting metadata.
				</p>
			</div>

			<div class="hero-card__demo">
				<UICodeSnippet
					filename="toolbar.svelte"
					language="svelte"
					code={heroSnippet}
				/>
			</div>
		</section>

		<section id="gutter" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Gutter</p>
					<h2>Line numbers are useful when the snippet is instructional.</h2>
				</div>
				<p>
					The default keeps the gutter visible. Disable `showLineNumbers` when a small preview should
					read more like a terminal fragment than a referenced source block.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Default gutter</h3>
						<p>Best for docs, code review notes, and any example you might describe by line number.</p>
					</div>

					<UICodeSnippet
						filename="usage.svelte"
						language="svelte"
						code={componentSnippet}
					/>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Plain preview</h3>
						<p>Hide the gutter when the snippet is short and the chrome would outweigh the content.</p>
					</div>

					<UICodeSnippet
						filename="terminal.sh"
						language="bash"
						code={plainSnippet}
						showLineNumbers={false}
					/>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Keep the API small: code, an optional header, and wrap when needed.</h2>
				</div>
				<p>
					Long URLs and queries will overflow naturally by default. Use `wrap` only when the snippet
					needs to stay inside a tighter card width.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Wrapped line</span>
					<UICodeSnippet
						filename="release-query.ts"
						language="ts"
						code={wrappedSnippet}
						wrap
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Headerless</span>
					<UICodeSnippet code={'npm run build\nnpm run preview'} showLineNumbers={false} />
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
	.doc-card,
	.hero-card__copy,
	.hero-card__demo,
	.section-heading,
	.doc-entry,
	.doc-entry__meta,
	.state-card {
		display: grid;
		gap: 0.9rem;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
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
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	p {
		font-size: 0.95rem;
		line-height: 1.7;
		color: #475569;
	}

	.lead {
		max-width: 62ch;
	}
	
	.state-card {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #f8fafc;
	}

	@media (min-width: 960px) {
		.hero-card {
			grid-template-columns: minmax(0, 0.92fr) minmax(19rem, 1.08fr);
			align-items: start;
		}
	}
</style>
