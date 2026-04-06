<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Badge as UIBadge,
		Button as UIButton,
		Command as UICommand,
		Toast as UIToast,
		toast
	} from '$lib/components';

	const DOCS_GROUP = 'command-docs';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Palette posture' },
		{ id: 'anatomy', label: 'Anatomy', meta: 'Items, groups, footer' },
		{ id: 'search', label: 'Search', meta: 'Keywords and empty state' },
		{ id: 'keyboard', label: 'Keyboard', meta: 'Arrow keys and Enter' },
		{ id: 'examples', label: 'Examples', meta: 'Sticky and async flows' }
	] as const;

	const commandItems = [
		{
			value: 'open-homepage',
			label: 'Open components homepage',
			description: 'Jump back to the full component index with the live preview grid.',
			group: 'Navigation',
			icon: 'home',
			shortcut: ['G', 'H'],
			keywords: ['home docs index grid']
		},
		{
			value: 'open-dialog-docs',
			label: 'Open dialog docs',
			description: 'Review the base modal shell that command borrows its surface language from.',
			group: 'Navigation',
			icon: 'rectangle-stack',
			shortcut: ['G', 'D'],
			keywords: ['modal overlay dialog']
		},
		{
			value: 'new-release-note',
			label: 'Create release note',
			description: 'Start a fresh rollout note with the default editorial template.',
			group: 'Actions',
			icon: 'document-plus',
			shortcut: ['N', 'R'],
			badge: 'Draft',
			keywords: ['launch changelog publish']
		},
		{
			value: 'assign-reviewer',
			label: 'Assign reviewer',
			description: 'Add one approver to the current handoff queue.',
			group: 'Actions',
			icon: 'user-plus',
			shortcut: ['A', 'R'],
			keywords: ['qa review approval']
		},
		{
			value: 'open-settings',
			label: 'Open workspace settings',
			description: 'Jump to environment controls, notifications, and access rules.',
			group: 'Workspace',
			icon: 'cog-6-tooth',
			shortcut: ['G', 'S'],
			keywords: ['preferences config workspace']
		},
		{
			value: 'archive-preview',
			label: 'Archive preview environment',
			description: 'Move the current preview branch into cold storage after release.',
			group: 'Workspace',
			icon: 'archive-box',
			shortcut: ['A', 'P'],
			badge: 'Risky',
			keywords: ['cleanup remove environment branch']
		}
	] satisfies Command.Item[];

	const workflowItems = [
		{
			value: 'queue-qa',
			label: 'Queue QA pass',
			description: 'Send the latest build to the review lane.',
			group: 'Release workflow',
			icon: 'check-badge',
			shortcut: ['Q', 'A'],
			keywords: ['review test verification']
		},
		{
			value: 'notify-design',
			label: 'Notify design',
			description: 'Share the review link and capture any last-minute polish notes.',
			group: 'Release workflow',
			icon: 'paint-brush',
			shortcut: ['D', 'N'],
			keywords: ['handoff design feedback']
		},
		{
			value: 'open-launch-brief',
			label: 'Open launch brief',
			description: 'Review the owner matrix, risk notes, and support contacts.',
			group: 'Release workflow',
			icon: 'rocket-launch',
			shortcut: ['L', 'B'],
			keywords: ['launch brief owners support']
		},
		{
			value: 'capture-follow-up',
			label: 'Capture follow-up',
			description: 'Turn the current comment into a backlog item for the next sprint.',
			group: 'Aftercare',
			icon: 'clipboard-document-list',
			shortcut: ['F', 'U'],
			keywords: ['todo backlog sprint']
		}
	] satisfies Command.Item[];

	const asyncItems = [
		{
			value: 'deploy-staging',
			label: 'Deploy staging build',
			description: 'Ship the queued release to the staging environment.',
			group: 'Deployments',
			icon: 'rocket-launch',
			shortcut: ['D', 'S'],
			keywords: ['deploy ship staging']
		},
		{
			value: 'warm-cache',
			label: 'Warm edge cache',
			description: 'Prime the static assets before traffic shifts.',
			group: 'Deployments',
			icon: 'bolt',
			shortcut: ['W', 'C'],
			keywords: ['cache cdn perf']
		},
		{
			value: 'publish-status',
			label: 'Publish status update',
			description: 'Send the launch note into the internal release channel.',
			group: 'Comms',
			icon: 'megaphone',
			shortcut: ['P', 'S'],
			keywords: ['announce slack status']
		}
	] satisfies Command.Item[];

	const filterCount = (items: Command.Item[], query: string) => {
		const normalizedQuery = query.toLowerCase().trim();

		if (!normalizedQuery) {
			return items.length;
		}

		return items.filter((item) =>
			[
				item.label,
				item.description,
				item.group,
				item.badge,
				...(item.keywords ?? []),
				...(Array.isArray(item.shortcut) ? item.shortcut : item.shortcut ? [item.shortcut] : [])
			]
				.filter(Boolean)
				.join(' ')
				.toLowerCase()
				.includes(normalizedQuery)
		).length;
	};

	const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

	let overviewOpen = $state(false);
	let stickyOpen = $state(false);
	let asyncOpen = $state(false);
	let overviewSearch = $state('');
	let stickySearch = $state('');
	let asyncSearch = $state('');
	let overviewValue = $state('new-release-note');
	let stickyValue = $state('queue-qa');
	let asyncValue = $state('deploy-staging');

	let overviewCount = $derived(filterCount(commandItems, overviewSearch));
	let stickyCount = $derived(filterCount(workflowItems, stickySearch));
	let asyncCount = $derived(filterCount(asyncItems, asyncSearch));

	const handleOverviewSelect = (item: Command.Item) => {
		overviewValue = item.value;

		toast.success(item.label, {
			group: DOCS_GROUP,
			description: item.description || 'This action uses the command palette selection callback.'
		});
	};

	const handleStickySelect = (item: Command.Item) => {
		stickyValue = item.value;

		toast.info(`Queued ${item.label}`, {
			group: DOCS_GROUP,
			description: 'This example keeps the palette open with `closeOnSelect={false}`.'
		});
	};

	const handleAsyncSelect = async (item: Command.Item) => {
		asyncValue = item.value;

		await toast.promise(() => wait(950).then(() => item.label), {
			group: DOCS_GROUP,
			loading: {
				title: 'Running command',
				description: `Working on ${item.label.toLowerCase()}.`
			},
			success: (label) => ({
				title: 'Command completed',
				description: `${label} finished and the palette closed after the async step resolved.`
			}),
			error: {
				title: 'Command failed',
				description: 'The palette stays open if the async selection handler rejects.'
			}
		});
	};
</script>

<svelte:head>
	<title>Command Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix command palette primitive, including grouped items, search, keyboard behavior, footer content, and async-safe selection flows."
	/>
</svelte:head>

<UIToast group={DOCS_GROUP} />

<Header
	eyebrow="Documentation"
	title="Command"
	description="Search-driven command palette for jump actions, workspace utilities, and action-heavy flows. It uses the same modal surface language as Dialog, but the body is optimized for filtering and keyboard-first selection."
	pathLabel="components/command"
	pathHref="/components/command"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it when users should search, skim grouped actions, and execute one result fast.</h2>
				<p class="lead">
					`Command` is a dialog-backed command palette with grouped items, search filtering,
					keyboard navigation, optional footer content, and async-safe selection. It borrows the
					same border, radius, backdrop, and elevation language as `Dialog`, but the layout is tuned
					for fast action discovery instead of general modal content.
				</p>
			</div>

			<div class="hero-preview">
				<div class="preview-card">
					<p class="surface-kicker">Live preview</p>
					<h3>Global jump and action palette</h3>
					<p>
						Open the palette, type a keyword, move with arrow keys, and hit Enter to trigger the
						current item.
					</p>

					<div class="hero-card__actions">
						<UIButton size="lg" role="primary" onclick={() => (overviewOpen = true)}>
							Open command palette
						</UIButton>
						<UIButton
							size="lg"
							role="secondary"
							variant="outline"
							onclick={() => {
								overviewSearch = 'deploy';
								overviewOpen = true;
							}}
						>
							Open filtered example
						</UIButton>
					</div>
				</div>

				<div class="principles">
					<article class="principle">
						<span class="principle__index">01</span>
						<div>
							<h3>Dialog shell, command posture</h3>
							<p>
								The component stays visually aligned with the modal family, but its main body is
								optimized for search and selection.
							</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">02</span>
						<div>
							<h3>Groups keep density readable</h3>
							<p>
								Short labels, useful descriptions, and grouped headings prevent long command lists
								from turning into flat noise.
							</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">03</span>
						<div>
							<h3>Selection logic stays in the parent</h3>
							<p>
								The route owns follow-up navigation, mutations, and toasts through `onselect`, while
								the component owns filtering and keyboard motion.
							</p>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section id="anatomy" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Anatomy</p>
					<h2>Keep the item contract explicit and let the palette layout do the heavy lifting.</h2>
				</div>
				<p>
					Each item can carry a label, description, group, icon, shortcut, badge, and keyword
					aliases. The footer remains a simple snippet so the parent can add hints or result
					summaries without rebuilding the palette shell.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Item fields</h3>
						<p>
							Use `group` for headings, `keywords` for search aliases, and `shortcut` for the
							compact key hints shown on the right edge.
						</p>
					</div>

					<ul class="detail-list">
						<li>`label` and `description` define the main scan target.</li>
						<li>`badge` is useful for status or risk labels such as Draft or Risky.</li>
						<li>`disabled` keeps an item visible without allowing selection.</li>
					</ul>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Footer snippet</h3>
						<p>
							Keep the footer concise. It works well for keyboard hints, current result count, or
							one small piece of state from the parent.
						</p>
					</div>

					<div class="command-inline-footer">
						<span class="footer-chip">Use Up / Down</span>
						<span class="footer-chip footer-chip-accent">Press Enter</span>
						<span class="footer-chip">Esc to close</span>
					</div>
				</article>
			</div>
		</section>

		<section id="search" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Search</p>
					<h2>Filter against real keywords, not just the visible label.</h2>
				</div>
				<p>
					The palette matches against label, description, group, badge, and optional keyword
					aliases. That keeps the visible copy tight while still letting users search the language
					they naturally type.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Keyword aliases</span>
					<p class="state-copy">
						Searching `qa`, `launch`, or `config` still finds the relevant commands even when those
						terms do not appear in the visible label.
					</p>
					<UIButton
						role="secondary"
						variant="outline"
						onclick={() => {
							overviewSearch = 'config';
							overviewOpen = true;
						}}
					>
						Open keyword search
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Empty state</span>
					<p class="state-copy">
						If nothing matches, the palette swaps to a structured empty state instead of leaving a
						blank results area.
					</p>
					<UIButton
						role="secondary"
						variant="outline"
						onclick={() => {
							overviewSearch = 'billing';
							overviewOpen = true;
						}}
					>
						Open empty result
					</UIButton>
				</article>
			</div>
		</section>

		<section id="keyboard" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Keyboard</p>
					<h2>Make the search field and list feel usable without ever touching the mouse.</h2>
				</div>
				<p>
					The input keeps focus while the active item moves underneath it, so the user can type,
					press arrow keys, and submit with Enter in one uninterrupted flow.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Supported keys</h3>
						<p>The built-in key handling covers the core command palette loop.</p>
					</div>

					<ul class="detail-list">
						<li>`ArrowDown` and `ArrowUp` move the active item across enabled results.</li>
						<li>`Home` and `End` jump to the first or last enabled command.</li>
						<li>`Enter` triggers the active item and awaits async selection work.</li>
					</ul>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Dismissal</h3>
						<p>
							`Escape`, backdrop clicks, and the optional close button all respect the same
							`dismissible` and busy-state checks.
						</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="primary" onclick={() => (overviewOpen = true)}
							>Try keyboard flow</UIButton
						>
					</div>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>
						Keep close behavior configurable for the workflow instead of hardcoding one posture.
					</h2>
				</div>
				<p>
					The default flow closes after selection. You can also keep the palette open for repeated
					actions or let an async command resolve before the modal dismisses.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<div class="state-card__header">
						<span class="state-label">Sticky selection</span>
						<UIBadge size="xs" role="secondary" variant="modern">closeOnSelect=false</UIBadge>
					</div>
					<p class="state-copy">
						This version stays open after each selection so a user can queue several small release
						tasks without reopening the palette.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (stickyOpen = true)}>
						Open sticky palette
					</UIButton>
				</article>

				<article class="state-card">
					<div class="state-card__header">
						<span class="state-label">Async-safe actions</span>
						<UIBadge size="xs" role="success" variant="pill-color">await onselect</UIBadge>
					</div>
					<p class="state-copy">
						The palette disables while the selected command runs, then closes only after the async
						handler resolves successfully.
					</p>
					<UIButton role="primary" onclick={() => (asyncOpen = true)}>Open async palette</UIButton>
				</article>
			</div>
		</section>
	</main>
</div>

<UICommand
	bind:open={overviewOpen}
	bind:search={overviewSearch}
	bind:value={overviewValue}
	title="Search docs and workspace actions"
	description="Type to filter by command label, shortcut aliases, or keyword metadata."
	items={commandItems}
	showClose
	onselect={handleOverviewSelect}
>
	{#snippet footer()}
		<p class="command-footer-copy">Use Up / Down and Enter for the fastest path.</p>
		<span class="command-result-pill">{overviewCount} results</span>
	{/snippet}
</UICommand>

<UICommand
	bind:open={stickyOpen}
	bind:search={stickySearch}
	bind:value={stickyValue}
	title="Queue release workflow steps"
	description="This palette stays open after selection so the user can run a few related tasks in one pass."
	items={workflowItems}
	closeOnSelect={false}
	showClose
	onselect={handleStickySelect}
>
	{#snippet footer()}
		<p class="command-footer-copy">Palette stays open after selection.</p>
		<span class="command-result-pill">{stickyCount} workflow steps</span>
	{/snippet}
</UICommand>

<UICommand
	bind:open={asyncOpen}
	bind:search={asyncSearch}
	bind:value={asyncValue}
	title="Run deployment commands"
	description="Async selection is awaited before the palette closes, which keeps the busy state honest."
	items={asyncItems}
	onselect={handleAsyncSelect}
>
	{#snippet footer()}
		<p class="command-footer-copy">Async commands lock the palette while the action is running.</p>
		<span class="command-result-pill">{asyncCount} commands</span>
	{/snippet}
</UICommand>

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
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card,
	.preview-card,
	.principles,
	.principle,
	.command-inline-footer {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__actions,
	.doc-entry__demo,
	.command-inline-footer,
	.state-card__header {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		align-items: center;
	}

	.hero-preview {
		display: grid;
		gap: 1rem;
	}

	.preview-card {
		padding: 1.35rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.35rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.92)),
			var(--sprix-app-surface);
	}

	.principles {
		padding: 1rem 1.1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.25rem;
		background: var(--sprix-app-bg);
	}

	.principle {
		grid-template-columns: auto 1fr;
		align-items: start;
		padding-top: 0.9rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	.principles > :first-child {
		padding-top: 0;
		border-top: 0;
	}

	.principle__index {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		background: var(--sprix-app-border);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--sprix-app-text-muted);
	}

	.section-kicker,
	.state-label,
	.surface-kicker {
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
	ul {
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

	.lead,
	.state-copy {
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1.25rem;
	}

	.doc-entry,
	.state-card {
		padding: 1.1rem;
		border: 1px solid var(--sprix-app-border);
		border-radius: 1.25rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.88)),
			var(--sprix-app-surface);
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.35rem;
	}

	.detail-list {
		padding-left: 1rem;
		color: var(--sprix-app-text-muted);
		display: grid;
		gap: 0.5rem;
	}

	.footer-chip,
	.command-result-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 1.9rem;
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		border: 1px solid var(--sprix-app-border);
		background: var(--sprix-app-surface);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--sprix-app-text-muted);
	}

	.footer-chip-accent,
	.command-result-pill {
		border-color: #bfdbfe;
		background: #eff6ff;
		color: #1d4ed8;
	}

	.command-footer-copy {
		font-size: 0.85rem;
		line-height: 1.6;
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

		.hero-card {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
			align-items: start;
		}

		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
