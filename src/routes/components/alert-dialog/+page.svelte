<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		AlertDialog as UIAlertDialog,
		Button as UIButton,
		Toast as UIToast,
		toast
	} from '$lib/components';

	const DOCS_GROUP = 'alert-dialog-docs';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'types', label: 'Types', meta: 'Info and destructive' },
		{ id: 'dismissal', label: 'Dismissal', meta: 'Esc, backdrop, explicit choice' },
		{ id: 'prompt', label: 'Prompt', meta: 'Typed confirmation' },
		{ id: 'examples', label: 'Examples', meta: 'Async and controlled flows' }
	] as const;

	let overviewOpen = $state(false);
	let infoOpen = $state(false);
	let destructiveOpen = $state(false);
	let dismissibleOpen = $state(false);
	let lockedOpen = $state(false);
	let promptOpen = $state(false);
	let asyncOpen = $state(false);
	let controlledOpen = $state(false);

	const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

	const handleDismissCancel = () => {
		toast.info('Stayed on the rollout', {
			group: DOCS_GROUP,
			description: 'Dismiss callbacks fire from the cancel button, backdrop click, and Escape when enabled.'
		});
	};

	const handleLockedConfirm = () => {
		toast.success('Access retained', {
			group: DOCS_GROUP,
			description: 'Non-dismissible mode required an explicit confirm or cancel decision.'
		});
	};

	const handlePromptConfirm = () => {
		toast.warning('Environment deletion queued', {
			group: DOCS_GROUP,
			description: 'The prompt gate cleared and the destructive action was allowed to continue.'
		});
	};

	const handleAsyncConfirm = async () => {
		await toast.promise(
			() => wait(1400).then(() => 'Growth workspace'),
			{
				group: DOCS_GROUP,
				loading: {
					title: 'Archiving workspace',
					description: 'Background jobs are being paused before the archive is committed.'
				},
				success: (workspace) => ({
					title: 'Workspace archived',
					description: `${workspace} was moved to cold storage and can be restored later.`
				}),
				error: {
					title: 'Archive failed',
					description: 'The dialog stays open if the async step rejects.'
				}
			}
		);
	};

	const handleControlledConfirm = async () => {
		await wait(900);
		controlledOpen = false;

		toast.success('Snapshot removed', {
			group: DOCS_GROUP,
			description: 'This example used `closeOnConfirm={false}` and let the parent close the dialog.'
		});
	};
</script>

<svelte:head>
	<title>Alert Dialog Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix alert dialog primitive, including info and destructive tone, dismissal behavior, typed confirmation, and async control patterns."
	/>
</svelte:head>

<UIToast group={DOCS_GROUP} />

<Header
	eyebrow="Documentation"
	title="Alert Dialog"
	description="Blocking confirmation primitive for actions that need deliberate acknowledgement. It keeps open state controlled, supports async confirm work, and can escalate into typed confirmation for irreversible mutations."
	pathLabel="components/alert-dialog"
	pathHref="/components/alert-dialog"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it when a decision should interrupt the flow and require an explicit answer.</h2>
				<p class="lead">
					`AlertDialog` stays intentionally narrow: controlled `open` state, semantic `type`,
					optional `confirmPrompt`, and async-safe `onconfirm` / `oncancel` callbacks. The goal is a
					strong default for risky actions, not a generic modal shell.
				</p>
			</div>

			<div class="hero-preview">
				<div class="preview-card">
					<p class="surface-kicker">Live preview</p>
					<h3>Delete production environment</h3>
					<p>
						Combine destructive tone, extra body copy, and a typed confirmation prompt when the
						action cannot be undone.
					</p>

					<div class="hero-card__actions">
						<UIButton size="lg" role="danger" onclick={() => (overviewOpen = true)}>
							Open destructive dialog
						</UIButton>
						<UIButton
							size="lg"
							role="secondary"
							variant="outline"
							onclick={() => (infoOpen = true)}
						>
							Open info dialog
						</UIButton>
					</div>
				</div>

				<div class="principles">
					<article class="principle">
						<span class="principle__index">01</span>
						<div>
							<h3>Control the state outside</h3>
							<p>`bind:open` keeps routing, mutation, and analytics decisions in the parent.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">02</span>
						<div>
							<h3>Escalate only when needed</h3>
							<p>Use prompt confirmation and non-dismissible mode for actions with real consequence.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">03</span>
						<div>
							<h3>Let async work own the loading state</h3>
							<p>The confirm action awaits promises and locks the dialog while the request is active.</p>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section id="types" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Types</p>
					<h2>Keep the API narrow and let tone follow intent.</h2>
				</div>
				<p>
					`info` fits interruptions that need acknowledgement. `destructive` raises the stakes and
					automatically shifts the confirm button into the danger role.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Info</h3>
						<p>For blocking notices, policy acknowledgements, or confirmation before a major context change.</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="primary" onclick={() => (infoOpen = true)}>Review notice</UIButton>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Destructive</h3>
						<p>For archive, delete, revoke, or similar irreversible actions that should feel visibly riskier.</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="danger" onclick={() => (destructiveOpen = true)}>Open destructive state</UIButton>
					</div>
				</article>
			</div>
		</section>

		<section id="dismissal" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Dismissal</p>
					<h2>Decide whether the user may back out with Esc or a backdrop click.</h2>
				</div>
				<p>
					`dismissible` defaults to `true`. Turn it off only when the flow truly requires an explicit
					confirm or cancel button choice.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Dismissible</span>
					<p class="state-copy">
						Cancel button, backdrop click, and Escape all close the dialog and call `oncancel`.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (dismissibleOpen = true)}>
						Open dismissible dialog
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Non-dismissible</span>
					<p class="state-copy">
						Backdrop and Escape are blocked. The user must choose one of the explicit actions.
					</p>
					<UIButton role="warning" onclick={() => (lockedOpen = true)}>
						Open locked decision
					</UIButton>
				</article>
			</div>
		</section>

		<section id="prompt" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Prompt</p>
					<h2>Add a typed confirmation when visual emphasis alone is not enough.</h2>
				</div>
				<p>
					`confirmPrompt` disables the confirm action until the user types the exact value. This is
					the right escalation path for environment deletes, access revocations, and data purges.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Typed confirmation</span>
					<p class="state-copy">
						The confirm button stays disabled until the prompt value matches, and Enter submits once
						the requirement is satisfied.
					</p>
					<UIButton role="danger" onclick={() => (promptOpen = true)}>
						Require DELETE prompt
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Children content</span>
					<p class="state-copy">
						Use the `children` snippet for structured context such as impact summaries, counts, or
						approval notes.
					</p>
					<ul class="detail-list">
						<li>3 connected queues will stop accepting jobs.</li>
						<li>26 GB of cached assets will be purged.</li>
						<li>Restoration requires a manual support request.</li>
					</ul>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Support both auto-closing async confirms and fully controlled closures.</h2>
				</div>
				<p>
					By default the dialog closes after a successful confirm. Set `closeOnConfirm={false}` when
					the parent should decide exactly when the overlay is allowed to disappear.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Async confirm</span>
					<p class="state-copy">
						Return a promise from `onconfirm`. The dialog enters a locked loading state and closes
						when the promise resolves.
					</p>
					<UIButton role="primary" onclick={() => (asyncOpen = true)}>Archive workspace</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Parent-controlled close</span>
					<p class="state-copy">
						Keep the dialog open during the async phase, then close it from the parent after any
						follow-up work completes.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (controlledOpen = true)}>
						Open controlled example
					</UIButton>
				</article>
			</div>
		</section>
	</main>
</div>

<UIAlertDialog
	bind:open={overviewOpen}
	type="destructive"
	title="Delete production environment?"
	description="This environment is serving live traffic. Deleting it removes deployment history, secrets, and rollback points."
	confirmLabel="Delete environment"
	confirmPrompt="DELETE"
	onconfirm={handlePromptConfirm}
>
	<ul class="dialog-list">
		<li>3 active releases will be removed from the deployment board.</li>
		<li>2 on-call schedules reference this environment as the primary target.</li>
		<li>Recent logs remain exportable for 7 days, then expire permanently.</li>
	</ul>
</UIAlertDialog>

<UIAlertDialog
	bind:open={infoOpen}
	title="Switch the billing owner?"
	description="Changing the billing owner updates invoice notifications and card management permissions for the workspace."
	confirmLabel="Transfer ownership"
	cancelLabel="Keep current owner"
>
	<p class="dialog-copy">
		Use the info tone when the flow is sensitive but not destructive. The emphasis stays clear without
		signaling irreversible loss.
	</p>
</UIAlertDialog>

<UIAlertDialog
	bind:open={destructiveOpen}
	type="destructive"
	title="Archive the release branch?"
	description="Archiving removes the branch from active release dashboards but keeps the audit history available."
	confirmLabel="Archive branch"
	cancelLabel="Keep branch"
>
	<p class="dialog-copy">Choose destructive when the action should visually separate itself from routine decisions.</p>
</UIAlertDialog>

<UIAlertDialog
	bind:open={dismissibleOpen}
	title="Leave the rollout checklist?"
	description="The current checklist draft is unsaved. Dismissing this dialog should feel lightweight."
	confirmLabel="Leave checklist"
	cancelLabel="Stay here"
	oncancel={handleDismissCancel}
>
	<p class="dialog-copy">Try Escape or click the backdrop to verify the default dismissal behavior.</p>
</UIAlertDialog>

<UIAlertDialog
	bind:open={lockedOpen}
	type="destructive"
	title="Revoke vendor access?"
	description="This vendor is actively connected to project billing data. An explicit choice is required before continuing."
	confirmLabel="Revoke access"
	cancelLabel="Keep access"
	dismissible={false}
	onconfirm={handleLockedConfirm}
>
	<p class="dialog-copy">This flow blocks backdrop and Escape dismissal because the operator must make a clear decision.</p>
</UIAlertDialog>

<UIAlertDialog
	bind:open={promptOpen}
	type="destructive"
	title="Delete project backups?"
	description="Deleting backups removes every restorable copy created in the last 30 days."
	confirmLabel="Delete backups"
	cancelLabel="Keep backups"
	confirmPrompt="DELETE"
	onconfirm={handlePromptConfirm}
>
	<ul class="dialog-list">
		<li>Nightly recovery points will be erased immediately.</li>
		<li>Compliance exports referencing these backups will lose their source files.</li>
		<li>This action cannot be reversed from the UI.</li>
	</ul>
</UIAlertDialog>

<UIAlertDialog
	bind:open={asyncOpen}
	title="Archive Growth workspace?"
	description="The workspace becomes read-only while the archive is prepared. This example closes automatically after the async confirm resolves."
	confirmLabel="Archive workspace"
	cancelLabel="Keep active"
	onconfirm={handleAsyncConfirm}
>
	<p class="dialog-copy">The confirm button enters a loading state and cancellation is temporarily disabled during the request.</p>
</UIAlertDialog>

<UIAlertDialog
	bind:open={controlledOpen}
	type="destructive"
	title="Delete deployment snapshot?"
	description="The parent keeps control of close timing so follow-up work can finish before the overlay disappears."
	confirmLabel="Delete snapshot"
	cancelLabel="Keep snapshot"
	closeOnConfirm={false}
	onconfirm={handleControlledConfirm}
>
	<p class="dialog-copy">
		This pattern is useful when you need to finish extra local state updates before closing the dialog.
	</p>
</UIAlertDialog>

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
	.principle {
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

	.detail-list,
	.dialog-list {
		padding-left: 1rem;
		color: var(--sprix-app-text-muted);
		display: grid;
		gap: 0.5rem;
	}

	.dialog-copy {
		line-height: 1.65;
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

		.doc-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.state-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
