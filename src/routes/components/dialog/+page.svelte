<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Button as UIButton,
		Dialog as UIDialog,
		Field as UIField,
		Input as UIInput,
		Textarea as UITextarea,
		Toast as UIToast,
		toast
	} from '$lib/components';

	const DOCS_GROUP = 'dialog-docs';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Modal posture' },
		{ id: 'layout', label: 'Layout', meta: 'Header, body, footer' },
		{ id: 'sizes', label: 'Sizes', meta: 'Small to large' },
		{ id: 'dismissal', label: 'Dismissal', meta: 'Default and locked' },
		{ id: 'examples', label: 'Examples', meta: 'Forms and context' }
	] as const;

	let profileOpen = $state(false);
	let announcementOpen = $state(false);
	let smallOpen = $state(false);
	let lockedOpen = $state(false);
	let largeOpen = $state(false);

	let profileName = $state('Pedro Duarte');
	let profileUsername = $state('@peduarte');
	let workspaceName = $state('Acme workspace');
	let briefTitle = $state('Q3 planning workshop');
	let briefNotes = $state(
		'Share the outline, decision log, and owner matrix before Friday so every team lead arrives with context.'
	);

	const handleAnnouncementClose = () => {
		toast.info('Dialog dismissed', {
			group: DOCS_GROUP,
			description:
				'Backdrop clicks, Escape, and the close button all funnel through `onclose` when dismissal is enabled.'
		});
	};

	const handleProfileSave = () => {
		if (!profileName.trim() || !profileUsername.trim()) {
			toast.warning('Complete every field', {
				group: DOCS_GROUP,
				description: 'This example keeps validation in the parent and uses the dialog as a shell.'
			});
			return;
		}

		profileOpen = false;

		toast.success('Profile updated', {
			group: DOCS_GROUP,
			description: `Saved ${profileName.trim()} as ${profileUsername.trim()}.`
		});
	};

	const handleWorkspaceRename = () => {
		if (!workspaceName.trim()) {
			toast.warning('Workspace name required', {
				group: DOCS_GROUP,
				description: 'Small dialogs still work well for short form steps.'
			});
			return;
		}

		smallOpen = false;

		toast.success('Workspace renamed', {
			group: DOCS_GROUP,
			description: `The workspace is now ${workspaceName.trim()}.`
		});
	};

	const handleLockedSave = () => {
		lockedOpen = false;

		toast.success('Draft saved', {
			group: DOCS_GROUP,
			description: 'Non-dismissible mode kept the modal open until the user chose an explicit action.'
		});
	};

	const handleBriefSave = () => {
		if (!briefTitle.trim() || !briefNotes.trim()) {
			toast.warning('Add the key planning details', {
				group: DOCS_GROUP,
				description: 'Large dialogs are best reserved for structured, multi-field edits.'
			});
			return;
		}

		largeOpen = false;

		toast.success('Planning brief saved', {
			group: DOCS_GROUP,
			description: `Saved ${briefTitle.trim()} for the next review cycle.`
		});
	};
</script>

<svelte:head>
	<title>Dialog Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix dialog primitive, covering modal posture, layout, sizing, dismissal, and form-friendly examples."
	/>
</svelte:head>

<UIToast group={DOCS_GROUP} />

<Header
	eyebrow="Documentation"
	title="Dialog"
	description="General-purpose modal shell for information and form completion. Unlike AlertDialog, it does not assume a risky decision flow or built-in confirm and cancel semantics."
	pathLabel="components/dialog"
	pathHref="/components/dialog"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use it for context, short workflows, and structured edits that should stay inside a modal.</h2>
				<p class="lead">
					`Dialog` is deliberately broader than `AlertDialog`: it provides a controlled overlay, title,
					description, body, and optional footer snippet, then leaves validation, submit behavior, and
					action meaning to the parent.
				</p>
			</div>

			<div class="hero-preview">
				<div class="preview-card">
					<p class="surface-kicker">Live preview</p>
					<h3>Profile editor and announcement modal</h3>
					<p>
						Open a compact form dialog or a read-only information modal. Both use the same shell,
						but neither is framed as a destructive interruption.
					</p>

					<div class="hero-card__actions">
						<UIButton size="lg" role="primary" onclick={() => (profileOpen = true)}>
							Edit profile
						</UIButton>
						<UIButton
							size="lg"
							role="secondary"
							variant="outline"
							onclick={() => (announcementOpen = true)}
						>
							Open announcement
						</UIButton>
					</div>
				</div>

				<div class="principles">
					<article class="principle">
						<span class="principle__index">01</span>
						<div>
							<h3>Not a confirmation primitive</h3>
							<p>Choose `AlertDialog` for risky choices. Use `Dialog` when the work is informational or task-oriented.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">02</span>
						<div>
							<h3>Parent keeps the logic</h3>
							<p>Open state, validation, save handlers, and follow-up toasts stay in the route or feature layer.</p>
						</div>
					</article>

					<article class="principle">
						<span class="principle__index">03</span>
						<div>
							<h3>Footer is optional</h3>
							<p>Use the `footer` snippet for action rows when the body alone is not enough.</p>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section id="layout" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Layout</p>
					<h2>Keep the API narrow, then compose the body and footer from the parent.</h2>
				</div>
				<p>
					The primitive exposes `title`, `description`, `children`, and `footer`. That keeps the shell
					reusable without recreating a larger subcomponent family.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Header and body</h3>
						<p>
							Accessible labeling comes from `title` and `description`, while the main content lives in
							the default snippet.
						</p>
					</div>

					<ul class="detail-list">
						<li>`title` and `description` define the modal copy.</li>
						<li>`children` handles fields, summaries, or custom content.</li>
						<li>`showClose` keeps a light escape hatch for non-blocking flows.</li>
					</ul>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Footer snippet</h3>
						<p>
							Render action buttons only when the modal needs them. Information-only content can omit the
							footer entirely.
						</p>
					</div>

					<div class="doc-entry__demo">
						<UIButton role="secondary" variant="outline" onclick={() => (announcementOpen = true)}>
							Open footer example
						</UIButton>
					</div>
				</article>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Match the width to the amount of work, not to the existence of a modal.</h2>
				</div>
				<p>
					`sm` works well for quick edits. `md` is the default. `lg` should be reserved for denser
					multi-field editing and longer supporting copy.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Small</span>
					<p class="state-copy">
						Short, focused tasks such as renaming a workspace or updating a single setting fit the compact shell.
					</p>
					<UIButton role="primary" onclick={() => (smallOpen = true)}>Rename workspace</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Large</span>
					<p class="state-copy">
						Use larger widths for multi-field forms, supporting notes, and more deliberate editing sessions.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (largeOpen = true)}>
						Open planning brief
					</UIButton>
				</article>
			</div>
		</section>

		<section id="dismissal" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Dismissal</p>
					<h2>Default to a dismissible modal, then lock it only when the flow truly requires a clear choice.</h2>
				</div>
				<p>
					`dismissible` defaults to `true`, which keeps backdrop clicks, Escape, and the close button available.
					Turn it off when the user must actively choose an explicit action inside the footer.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Dismissible</span>
					<p class="state-copy">
						Close button, Escape, and backdrop click all call `onclose`, which makes lightweight analytics or toast feedback straightforward.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (announcementOpen = true)}>
						Open dismissible dialog
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Locked</span>
					<p class="state-copy">
						Disable dismissal when the task needs an explicit button press, such as saving or abandoning staged work.
					</p>
					<UIButton role="warning" onclick={() => (lockedOpen = true)}>Open locked dialog</UIButton>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Build on the shell with existing input primitives and route-owned state.</h2>
				</div>
				<p>
					These examples use `Input`, `Textarea`, and `Button` directly in the body and footer without
					introducing extra dialog-specific helper components.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Profile form</span>
					<p class="state-copy">
						Compact edit flow with two text fields and a standard footer row. Save behavior lives entirely in the parent.
					</p>
					<UIButton role="primary" onclick={() => (profileOpen = true)}>Open profile form</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Planning brief</span>
					<p class="state-copy">
						Larger dialog with long-form input and more room for supporting copy. It still uses the same primitive.
					</p>
					<UIButton role="secondary" variant="outline" onclick={() => (largeOpen = true)}>
						Open planning editor
					</UIButton>
				</article>
			</div>
		</section>
	</main>
</div>

<UIDialog
	bind:open={profileOpen}
	size="sm"
	title="Edit profile"
	description="Make changes to the profile details here. Save when the draft is ready."
>
	<div class="form-grid">
		<UIField label="Name" name="profile-name">
			<UIInput bind:value={profileName} placeholder="Pedro Duarte" />
		</UIField>
		<UIField label="Username" name="profile-username">
			<UIInput bind:value={profileUsername} placeholder="@peduarte" />
		</UIField>
	</div>

	{#snippet footer()}
		<UIButton role="secondary" variant="outline" onclick={() => (profileOpen = false)}>
			Cancel
		</UIButton>
		<UIButton onclick={handleProfileSave}>Save changes</UIButton>
	{/snippet}
</UIDialog>

<UIDialog
	bind:open={announcementOpen}
	title="Maintenance window scheduled"
	description="A short information modal can carry supporting context without turning into a confirm-only interruption."
	onclose={handleAnnouncementClose}
>
	<div class="modal-stack">
		<p class="dialog-copy">
			Deployment environments move into read-only mode on Friday at 23:00 UTC. New jobs queue automatically and
			restart once maintenance ends.
		</p>

		<ul class="detail-list">
			<li>Status pages stay online throughout the window.</li>
			<li>Existing sessions remain valid after the maintenance completes.</li>
			<li>Only deployment and billing mutations are paused.</li>
		</ul>
	</div>

	{#snippet footer()}
		<UIButton onclick={() => (announcementOpen = false)}>Understood</UIButton>
	{/snippet}
</UIDialog>

<UIDialog
	bind:open={smallOpen}
	size="sm"
	title="Rename workspace"
	description="Use the compact size for short forms that should finish in one pass."
>
	<UIField label="Workspace name" name="workspace-name">
		<UIInput bind:value={workspaceName} />
	</UIField>

	{#snippet footer()}
		<UIButton role="secondary" variant="outline" onclick={() => (smallOpen = false)}>
			Cancel
		</UIButton>
		<UIButton onclick={handleWorkspaceRename}>Save</UIButton>
	{/snippet}
</UIDialog>

<UIDialog
	bind:open={lockedOpen}
	title="Review staged checklist"
	description="This example disables backdrop and Escape dismissal so the user must choose a footer action."
	dismissible={false}
>
	<div class="modal-stack">
		<p class="dialog-copy">
			Three checklist items are still marked as draft-only. Keep editing or save the draft before leaving this flow.
		</p>

		<ul class="detail-list">
			<li>Vendor approval summary is still missing.</li>
			<li>Rollback owners were added but not reviewed.</li>
			<li>Incident comms draft has pending edits.</li>
		</ul>
	</div>

	{#snippet footer()}
		<UIButton role="secondary" variant="outline" onclick={() => (lockedOpen = false)}>
			Continue editing
		</UIButton>
		<UIButton onclick={handleLockedSave}>Save draft</UIButton>
	{/snippet}
</UIDialog>

<UIDialog
	bind:open={largeOpen}
	size="lg"
	title="Edit planning brief"
	description="Use the larger shell when the body needs more breathing room for copy and multi-field edits."
>
	<div class="form-grid">
		<UIField label="Session name" name="brief-title">
			<UIInput bind:value={briefTitle} />
		</UIField>
		<UIField
			label="Preparation notes"
			name="brief-notes"
			helper="Summarize the goals, decisions needed, and any pre-reads the team should review."
		>
			<UITextarea bind:value={briefNotes} rows={6} />
		</UIField>
	</div>

	{#snippet footer()}
		<UIButton role="secondary" variant="outline" onclick={() => (largeOpen = false)}>
			Cancel
		</UIButton>
		<UIButton onclick={handleBriefSave}>Save brief</UIButton>
	{/snippet}
</UIDialog>

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
		gap: 1.5rem;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card,
	.preview-card,
	.principles,
	.principle,
	.modal-stack,
	.form-grid {
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
		border: 1px solid #dbe4f1;
		border-radius: 1.35rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.92)),
			#ffffff;
	}

	.principles {
		padding: 1rem 1.1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background: #f8fafc;
	}

	.principle {
		grid-template-columns: auto 1fr;
		align-items: start;
		padding-top: 0.9rem;
		border-top: 1px solid #e2e8f0;
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
		background: #e2e8f0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #334155;
	}

	.section-kicker,
	.state-label,
	.surface-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
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
		color: #475569;
	}

	.lead,
	.state-copy,
	.dialog-copy {
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
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.88)),
			#ffffff;
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.35rem;
	}

	.detail-list {
		padding-left: 1rem;
		color: #475569;
		display: grid;
		gap: 0.5rem;
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
