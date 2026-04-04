<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Button as UIButton, Toast as UIToast, toast } from '$lib/components';

	const DOCS_GROUP = 'toast-docs';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'types', label: 'Types', meta: 'Default to promise' },
		{ id: 'prompt', label: 'Prompt', meta: 'mono and color' },
		{ id: 'stacking', label: 'Stacking', meta: 'Depth and dismissal' },
		{ id: 'promise', label: 'Promise', meta: 'Pending to settled' },
		{ id: 'examples', label: 'Examples', meta: 'Common feedback flows' }
	] as const;

	const variants = [
		{
			type: 'default',
			label: 'Default',
			role: 'secondary',
			title: 'Changes queued',
			description: 'Your workspace edits were saved locally and will sync in the background.'
		},
		{
			type: 'success',
			label: 'Success',
			role: 'success',
			title: 'Deployment shipped',
			description: 'Version 2.7.1 is live and traffic has been shifted to the new release.'
		},
		{
			type: 'info',
			label: 'Info',
			role: 'primary',
			title: 'Review requested',
			description: 'Legal tagged two clauses for sign-off before the contract can be finalized.'
		},
		{
			type: 'warning',
			label: 'Warning',
			role: 'warning',
			title: 'Rate limit nearing',
			description: 'API usage crossed 85% of the current plan allocation for this billing cycle.'
		},
		{
			type: 'error',
			label: 'Error',
			role: 'danger',
			title: 'Sync failed',
			description: 'The finance export could not finish because the remote destination timed out.'
		}
	] as const satisfies readonly {
		type: Exclude<Toast.Type, 'promise'>;
		label: string;
		role: Button.Role;
		title: string;
		description: string;
	}[];

	const stackSequence = [
		{
			type: 'info',
			title: 'Invoice sent',
			description: 'Billing emailed the Q2 summary to every finance approver.'
		},
		{
			type: 'success',
			title: 'Seats reassigned',
			description: 'Inactive editor seats were moved back into the shared pool.'
		},
		{
			type: 'warning',
			title: 'SSO drift detected',
			description: 'One identity provider mapping no longer matches the production rule set.'
		},
		{
			type: 'default',
			title: 'Follow-up scheduled',
			description: 'Support will reopen the case automatically if the customer stays quiet for 48 hours.'
		}
	] as const;

	const resolveAfter = <T>(value: T, delay = 1800) =>
		new Promise<T>((resolve) => {
			setTimeout(() => resolve(value), delay);
		});

	const rejectAfter = (message: string, delay = 1800) =>
		new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error(message)), delay);
		});

	let prompt = $state<Toast.Prompt>('color');

	const fireToast = (type: Exclude<Toast.Type, 'promise'>, title: string, description: string) => {
		switch (type) {
			case 'success':
				toast.success(title, { description, group: DOCS_GROUP });
				return;
			case 'info':
				toast.info(title, { description, group: DOCS_GROUP });
				return;
			case 'warning':
				toast.warning(title, { description, group: DOCS_GROUP });
				return;
			case 'error':
				toast.error(title, { description, group: DOCS_GROUP });
				return;
			default:
				toast(title, { description, group: DOCS_GROUP });
		}
	};

	const fireStack = () => {
		stackSequence.forEach((entry, index) => {
			setTimeout(() => {
				fireToast(entry.type, entry.title, entry.description);
			}, index * 110);
		});
	};

	const firePromiseSuccess = async () => {
		await toast.promise(resolveAfter('Preview environment is live.'), {
			group: DOCS_GROUP,
			loading: {
				title: 'Provisioning preview',
				description: 'Cloning the branch, restoring cache, and starting the worker image.'
			},
			success: (message) => ({
				title: 'Preview ready',
				description: message,
				actionLabel: 'Open',
				onaction: () => {
					toast.info('Console opened', {
						description: 'The preview URL was copied into the review handoff.',
						group: DOCS_GROUP
					});
				}
			}),
			error: (error) => ({
				title: 'Preview failed',
				description: error instanceof Error ? error.message : 'The request failed.'
			})
		});
	};

	const firePromiseError = async () => {
		try {
			await toast.promise(rejectAfter('The worker image never became healthy.'), {
				group: DOCS_GROUP,
				loading: {
					title: 'Publishing release',
					description: 'Uploading assets, invalidating cache, and warming the edge route.'
				},
				success: 'Release published',
				error: (error) => ({
					title: 'Release blocked',
					description: error instanceof Error ? error.message : 'The request failed.'
				})
			});
		} catch {
			return;
		}
	};
</script>

<svelte:head>
	<title>Toast Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix toast primitive with Sonner-style stacking, semantic types, promise handling, and mono or color prompt modes."
	/>
</svelte:head>

<UIToast group={DOCS_GROUP} {prompt} />

	<Header
	eyebrow="Documentation"
	title="Toast"
	description="Mounted notification viewport with a Sonner-inspired stack. Use the `toast` helper for semantic states, promise lifecycles, and compact feedback that stays out of the way."
	pathLabel="components/toast"
	pathHref="/components/toast"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Feedback should feel immediate, layered, and unobtrusive.</h2>
				<p class="lead">
					Mount the viewport once, then push notifications with `toast(...)`. When several arrive in
					quick succession, they compress into a stacked deck and expand on hover or keyboard focus.
				</p>
			</div>

			<div class="hero-card__actions">
				<UIButton role="primary" onclick={() => fireToast('default', 'Update queued', 'Cache refresh will finish after the current batch completes.')}>
					Show default
				</UIButton>
				<UIButton role="secondary" variant="outline" onclick={fireStack}>Show stack</UIButton>
				<UIButton role="tertiary" variant="quiet" onclick={() => toast.dismiss()}>Clear all</UIButton>
			</div>
		</section>

		<section id="types" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Types</p>
					<h2>Use semantic states without rebuilding the shell each time.</h2>
				</div>
				<p>
					Use `default`, `success`, `info`, `warning`, and `error` for direct status feedback, then
					use `promise` when one request needs a pending state and a settled outcome.
				</p>
			</div>

			<div class="doc-grid">
				{#each variants as variant}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{variant.label}</h3>
							<p>{variant.description}</p>
						</div>

						<div class="doc-entry__demo">
							<UIButton
								role={variant.role}
								variant={variant.role === 'secondary' ? 'outline' : 'default'}
								onclick={() => fireToast(variant.type, variant.title, variant.description)}
							>
								Show {variant.label}
							</UIButton>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="prompt" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Prompt</p>
					<h2>Switch between `color` and `mono` without changing the API.</h2>
				</div>
				<p>
					`color` lets each type carry its own tone. `mono` forces the same black surface for every
					toast while preserving the semantic icon and copy.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Prompt mode</span>
					<div class="prompt-toggle">
						<UIButton
							role={prompt === 'color' ? 'primary' : 'secondary'}
							variant={prompt === 'color' ? 'default' : 'outline'}
							onclick={() => (prompt = 'color')}
						>
							color
						</UIButton>
						<UIButton
							role={prompt === 'mono' ? 'primary' : 'secondary'}
							variant={prompt === 'mono' ? 'default' : 'outline'}
							onclick={() => (prompt = 'mono')}
						>
							mono
						</UIButton>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Preview</span>
					<UIButton
						role="primary"
						onclick={() =>
							fireToast(
								'warning',
								'Attention needed',
								prompt === 'mono'
									? 'Mono keeps the entire stack black, including warning and error states.'
									: 'Color lets every toast type carry its own visual tone.'
							)}
						>
						Preview current prompt
					</UIButton>
				</article>
			</div>
		</section>

		<section id="stacking" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Stacking</p>
					<h2>Multiple notifications collapse into one compact stack.</h2>
				</div>
				<p>
					The latest toast stays fully readable while older ones tuck behind it. Hover or focus the
					viewport to expand the full stack, pause timers, and interact with each toast directly.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Burst notifications</span>
					<UIButton role="primary" onclick={fireStack}>Create a burst</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Interaction</span>
					<p class="state-copy">
						Hover after firing a burst. The stack opens, timers pause, and each toast becomes
						individually interactive.
					</p>
				</article>
			</div>
		</section>

		<section id="promise" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Promise</p>
					<h2>Keep async feedback inside one notification lifecycle.</h2>
				</div>
				<p>
					`toast.promise(...)` starts in a loading state, then upgrades the same toast to success or
					error when the request settles.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Resolve</span>
					<UIButton role="success" onclick={firePromiseSuccess}>Run successful promise</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Reject</span>
					<UIButton role="danger" onclick={firePromiseError}>Run failed promise</UIButton>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical product feedback flows.</h2>
				</div>
				<p>Keep titles short, use one clear line of outcome copy, and only add actions when the next step is obvious.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Undoable mutation</span>
					<UIButton
						role="secondary"
						variant="outline"
						onclick={() =>
							toast.success('Column archived', {
								group: DOCS_GROUP,
								description: 'The board was cleaned up and will stay restorable for 30 days.',
								actionLabel: 'Undo',
								onaction: () => {
									toast.info('Archive reversed', {
										group: DOCS_GROUP,
										description: 'The column was restored to its previous position.'
									});
								}
							})}
					>
						Show undo pattern
					</UIButton>
				</article>

				<article class="state-card">
					<span class="state-label">Quiet confirmation</span>
					<UIButton
						role="tertiary"
						variant="quiet"
						onclick={() =>
							toast('Draft saved', {
								group: DOCS_GROUP,
								description: 'The editor captured the latest changes without interrupting the flow.'
							})}
					>
						Show quiet confirm
					</UIButton>
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
		gap: 1.5rem;
	}

	.hero-card {
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		align-items: center;
	}

	.hero-card__copy,
	.section-heading,
	.doc-entry,
	.state-card {
		display: grid;
		gap: 0.75rem;
	}

	.hero-card__copy h2,
	.section-heading h2,
	.doc-entry h3,
	.state-label,
	.lead,
	p {
		margin: 0;
	}

	.hero-card__actions,
	.doc-entry__demo,
	.prompt-toggle {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.section-kicker {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	.hero-card__copy h2,
	.section-heading h2 {
		font-size: clamp(1.35rem, 3vw, 2rem);
		line-height: 1.02;
		letter-spacing: -0.045em;
	}

	.lead,
	.section-heading p,
	.doc-entry p,
	.state-copy {
		color: #475569;
		line-height: 1.65;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-grid {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.state-grid {
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
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

	.doc-entry h3 {
		font-size: 1rem;
		letter-spacing: -0.02em;
	}

	.state-label {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #334155;
	}

	@media (min-width: 72rem) {
		.docs-shell {
			grid-template-columns: 14rem minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
