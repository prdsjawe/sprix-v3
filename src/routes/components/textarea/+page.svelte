<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Textarea as UITextarea } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'resize', label: 'Resize', meta: 'None, vertical, both' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common long-form patterns' }
	] as const;

	const sizes = [
		{
			size: 'sm',
			label: 'Small',
			description: 'Compact forms, dense admin tools, and side panels.'
		},
		{
			size: 'md',
			label: 'Medium',
			description: 'Default multiline field for everyday product forms.'
		},
		{
			size: 'lg',
			label: 'Large',
			description: 'Roomier writing surfaces for notes, briefs, and drafts.'
		}
	] as const;

	let incidentSummary = $state(
		'Investigating elevated response times in the uploads service. Early signals point to a cache invalidation spike.'
	);
	let releaseNotes = $state(
		'Shipped the new approval queue, tightened role checks, and reduced dashboard load time by 18%.'
	);
	let internalNote = $state('Workspace archived after consolidation into the enterprise org.');
	let supportReply = $state('');
</script>

<svelte:head>
	<title>Textarea Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix textarea primitive, including sizing, resize modes, field states, and multiline writing patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Textarea"
	description="Multiline text input primitive with the same field anatomy as Input: explicit sizing, helper and error messaging, and a controlled resize surface for longer-form content."
	pathLabel="components/textarea"
	pathHref="/components/textarea"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use the same field contract when content needs more room.</h2>
				<p class="lead">
					The textarea keeps labels, messages, and validation states aligned with the input family
					while giving longer content a stable shell. Use it for notes, summaries, descriptions, and
					reply drafting.
				</p>
			</div>

			<div class="hero-card__stack">
				<UITextarea
					bind:value={incidentSummary}
					id="hero-summary"
					size="lg"
					label="Incident summary"
					rows={5}
					helper="Write the current status and what the team is doing next."
				/>
				<UITextarea
					bind:value={releaseNotes}
					id="hero-release-notes"
					size="lg"
					label="Release notes"
					rows={5}
					resize="both"
					helper="The field can stay vertically constrained or allow larger drafting surfaces."
				/>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three density tiers, same writing model.</h2>
				</div>
				<p>
					Use `sm`, `md`, and `lg` to match layout density without changing the component anatomy.
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
							<UITextarea
								id={`size-${item.size}`}
								size={item.size}
								label={`${item.label} textarea`}
								rows={item.size === 'lg' ? 5 : 4}
								placeholder="Write a longer message"
							/>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="resize" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Resize</p>
					<h2>Control how much authors can expand the field.</h2>
				</div>
				<p>Use `resize` to constrain editing surfaces when layout stability matters.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>`none`</h3>
						<p>Lock the field height when surrounding layout should remain fixed.</p>
					</div>
					<div class="doc-entry__demo">
						<UITextarea
							id="resize-none"
							label="Standup update"
							rows={4}
							resize="none"
							placeholder="Yesterday, today, blockers"
						/>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>`vertical`</h3>
						<p>The default posture for longer writing without risking horizontal layout shifts.</p>
					</div>
					<div class="doc-entry__demo">
						<UITextarea
							id="resize-vertical"
							label="Design feedback"
							rows={4}
							resize="vertical"
							placeholder="Share what feels clear, confusing, or incomplete"
						/>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>`both`</h3>
						<p>Useful for internal tools where the user benefits from a larger drafting surface.</p>
					</div>
					<div class="doc-entry__demo">
						<UITextarea
							id="resize-both"
							label="Migration notes"
							rows={4}
							resize="both"
							placeholder="Capture technical details for the cutover"
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Messaging and availability stay consistent.</h2>
				</div>
				<p>
					Helper text, errors, and disabled appearance follow the same field contract as `Input`.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UITextarea
						id="state-helper"
						label="Team brief"
						rows={4}
						helper="Keep this under 500 characters so it fits the digest email."
						placeholder="Share the latest status with the team"
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UITextarea
						id="state-error"
						label="Change rationale"
						rows={4}
						error="Add more context before requesting approval."
						value="Need to update the environment."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UITextarea
						bind:value={internalNote}
						id="state-disabled"
						label="Archived note"
						rows={4}
						disabled
						helper="Historical notes remain readable even when editing is locked."
					/>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Common long-form field patterns.</h2>
				</div>
				<p>
					Use textarea where the user is composing, explaining, or documenting rather than entering
					a single token.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Required description</span>
					<UITextarea
						id="example-description"
						label="Issue description"
						required
						rows={5}
						helper="Explain what happened, where, and how often it reproduces."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Support reply</span>
					<UITextarea
						bind:value={supportReply}
						id="example-reply"
						label="Draft reply"
						rows={5}
						placeholder="Write a response to the customer"
						minlength={30}
						helper="Short, direct replies tend to resolve faster."
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Length guardrail</span>
					<UITextarea
						id="example-guardrail"
						label="Postmortem summary"
						rows={5}
						maxlength={280}
						helper="Limit this summary to the headline findings before linking the full report."
					/>
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
	.hero-card__stack {
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
	}

	.lead {
		max-width: 48rem;
		font-size: 1rem;
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1.25rem;
	}

	.doc-entry,
	.state-card {
		padding-top: 1rem;
		border-top: 1px solid var(--sprix-app-border);
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.35rem;
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
