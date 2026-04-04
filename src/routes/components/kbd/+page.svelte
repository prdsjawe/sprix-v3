<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Kbd as UIKbd } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'combinations', label: 'Combinations', meta: 'Common shortcut stacks' },
		{ id: 'examples', label: 'Examples', meta: 'Inline and trailing usage' }
	] as const;

	const combinations = [
		{
			label: 'Global search',
			keys: ['Ctrl', 'K'],
			description: 'Open command search, quick actions, or the global docs index.'
		},
		{
			label: 'Quick publish',
			keys: ['Ctrl', 'Shift', 'P'],
			description: 'Useful for editor actions, deploy menus, and review handoffs.'
		},
		{
			label: 'New draft',
			keys: ['Alt', 'N'],
			description: 'Compact enough for menus, sidebars, and dense settings surfaces.'
		}
	] as const;
</script>

<svelte:head>
	<title>Kbd Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix kbd primitive, including inline key labels, common shortcut combinations, and compact trailing shortcut hints."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Kbd"
	description="Small keyboard keycap primitive for shortcuts, inline key references, and trailing command hints. It stays intentionally simple: one semantic element, one neutral surface."
	pathLabel="components/kbd"
	pathHref="/components/kbd"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it for keystrokes, not decorative pills.</h2>
				<p class="lead">
					`Kbd` wraps the native `kbd` element with a quiet neutral surface. It works best inline
					inside copy, paired in shortcut rows, or aligned to the edge of command and menu items.
				</p>
			</div>

			<div class="hero-card__demo">
				<div class="shortcut-stack">
					<div class="shortcut-row">
						<UIKbd>Ctrl</UIKbd>
						<span class="shortcut-plus">+</span>
						<UIKbd>K</UIKbd>
						<span class="shortcut-copy">Open the workspace command palette.</span>
					</div>

					<div class="shortcut-row">
						<UIKbd>⌘</UIKbd>
						<span class="shortcut-plus">+</span>
						<UIKbd>K</UIKbd>
						<span class="shortcut-copy">Mac-style search trigger.</span>
					</div>
				</div>
			</div>
		</section>

		<section id="combinations" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Combinations</p>
					<h2>Keep shortcut groups readable at a glance.</h2>
				</div>
				<p>
					Most combinations only need text separators around the keys. The component should stay small
					enough to stack without turning into button chrome.
				</p>
			</div>

			<div class="doc-grid">
				{#each combinations as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>

						<div class="demo-frame">
							<div class="shortcut-row">
								{#each item.keys as key, index}
									<UIKbd>{key}</UIKbd>

									{#if index < item.keys.length - 1}
										<span class="shortcut-plus">+</span>
									{/if}
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Inline references and trailing hints are the two main jobs.</h2>
				</div>
				<p>
					Use inline keycaps inside prose when you need quick instruction. Use aligned rows when the
					shortcut is secondary metadata for a command or menu item.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Inline copy</span>
					<p class="inline-copy">
						Press <UIKbd>Tab</UIKbd> to move focus forward, then use <UIKbd>Enter</UIKbd> to confirm
						the selected action.
					</p>
				</article>

				<article class="state-card">
					<span class="state-label">Command row</span>
					<div class="command-row">
						<div>
							<strong>Open search</strong>
							<p>Jump to any page, command, or workspace entity.</p>
						</div>

						<div class="shortcut-row">
							<UIKbd>Ctrl</UIKbd>
							<span class="shortcut-plus">+</span>
							<UIKbd>K</UIKbd>
						</div>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Dense list</span>
					<div class="shortcut-list">
						<div class="shortcut-list__row">
							<span>Comment</span>
							<UIKbd>C</UIKbd>
						</div>
						<div class="shortcut-list__row">
							<span>Archive</span>
							<UIKbd>E</UIKbd>
						</div>
						<div class="shortcut-list__row">
							<span>Assign</span>
							<UIKbd>A</UIKbd>
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
	.hero-card__demo,
	.section-heading,
	.doc-entry,
	.state-card {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__demo,
	.demo-frame,
	.state-card,
	.shortcut-list {
		padding: 1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1rem;
		background: var(--sprix-app-bg);
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
		color: var(--sprix-app-text-muted);
	}

	h2,
	h3,
	p,
	strong {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.45rem, 3vw, 2rem);
		line-height: 1;
		letter-spacing: -0.04em;
	}

	h3,
	strong {
		font-size: 1rem;
		line-height: 1.15;
	}

	p {
		color: var(--sprix-app-text-muted);
	}

	.lead,
	.inline-copy,
	.section-heading p,
	.doc-entry__meta p,
	.state-card p {
		max-width: 52rem;
		font-size: 1rem;
		line-height: 1.7;
	}

	.shortcut-row,
	.command-row,
	.shortcut-list__row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.shortcut-stack {
		display: grid;
		gap: 0.75rem;
	}

	.command-row,
	.shortcut-list__row {
		justify-content: space-between;
	}

	.command-row {
		align-items: flex-start;
		gap: 1rem;
	}

	.shortcut-copy,
	.shortcut-plus {
		font-size: 0.875rem;
		color: var(--sprix-app-text-subtle);
	}

	.shortcut-list {
		display: grid;
		gap: 0.75rem;
	}

	.shortcut-list__row + .shortcut-list__row {
		padding-top: 0.75rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	@media (min-width: 960px) {
		.docs-shell {
			grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
			gap: clamp(2rem, 4vw, 3.5rem);
		}
	}
</style>
