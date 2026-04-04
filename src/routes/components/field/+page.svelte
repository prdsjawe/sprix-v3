<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Button as UIButton,
		Checkbox as UICheckbox,
		Field as UIField,
		Form as UIForm,
		Input as UIInput,
		Radio as UIRadio,
		Textarea as UITextarea,
		Toggle as UIToggle
	} from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Form shell and field chrome' },
		{ id: 'layout', label: 'Layout', meta: 'Vertical and horizontal' },
		{ id: 'errors', label: 'Errors', meta: 'Helper, error, zod-style maps' },
		{ id: 'examples', label: 'Examples', meta: 'Input and textarea flows' }
	] as const;

	let fullName = $state('Evil Rabbit');
	let cardNumber = $state('1234 5678 9012 3456');
	let comments = $state('');
	let supportEmail = $state('help@sprix.dev');
	let workspaceNotes = $state('Share the rollback owner, support readiness, and customer comms status.');
	let releaseAlerts = $state(true);
	let termsAccepted = $state(false);
	let billingPlan = $state<Radio.Value>('monthly');

	let formErrors = $state<Form.Errors>({
		card_number: ['Enter a valid 16-digit card number'],
		comments: { _errors: ['Add any context the fulfillment team should know before approval.'] }
	});
</script>

<svelte:head>
	<title>Field Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix form and field primitives, including helper copy, error messaging, horizontal layout, and zod-friendly error compatibility."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Field"
	description="Field owns label, description, helper, and error chrome. Form is the companion wrapper that can provide zod-friendly field errors by name so controls like Input and Textarea stay focused on the control shell."
	pathLabel="components/field"
	pathHref="/components/field"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Move field chrome out of the input and keep controls focused on the control shell.</h2>
				<p class="lead">
					`Field` wraps any compatible control and renders the visible label, description, helper, and error
					text. `Form` is a light semantic wrapper that can also pass zod-style error objects to fields by
					name.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIForm class="max-w-xl gap-4">
					<UIField
						label="Support email"
						name="support_email"
						description="This inbox receives escalations and customer follow-up requests."
						helper="Use a monitored address during launch windows."
						required
					>
						<UIInput bind:value={supportEmail} type="email" placeholder="team@company.com" />
					</UIField>

					<UIField
						label="Launch notes"
						name="launch_notes"
						helper="These notes stay below the control and remain reusable across any textarea flow."
					>
						<UITextarea bind:value={workspaceNotes} rows={4} resize="vertical" />
					</UIField>
				</UIForm>
			</div>
		</section>

		<section id="layout" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Layout</p>
					<h2>Default to vertical fields, then switch to horizontal rows for inline decisions and actions.</h2>
				</div>
				<p>
					`orientation="horizontal"` keeps the control row inline without forcing a subcomponent family. It is
					useful for action rows, checkbox lines, and compact confirmation controls.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Vertical</h3>
						<p>The common case: label above, control in the middle, helper or error beneath.</p>
					</div>

					<UIField label="Full name" name="full_name" helper="Shown across invoices and customer summaries.">
						<UIInput bind:value={fullName} placeholder="Evil Rabbit" />
					</UIField>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Horizontal</h3>
						<p>Clicker-style controls and action rows can stay on one line while helper copy still sits below.</p>
					</div>

					<UIField orientation="horizontal" helper="Use horizontal layout when the control row should read as one compact unit.">
						<UIButton type="button">Submit</UIButton>
						<UIButton type="button" variant="outline" role="secondary">Cancel</UIButton>
					</UIField>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Field-aware controls</h3>
						<p>Checkbox, radio, and toggle can also consume field context when you want the wrapper to own helper and error copy.</p>
					</div>

					<div class="stack-demo">
						<UIField
							label="Release alerts"
							name="release_alerts"
							orientation="horizontal"
							helper="Toggle now reads the field metadata without requiring its own label prop."
						>
							<UIToggle bind:checked={releaseAlerts} />
						</UIField>

						<UIField
							label="Terms agreement"
							name="terms_accepted"
							orientation="horizontal"
							error="You must accept the workspace terms before continuing."
							required
						>
							<UICheckbox bind:checked={termsAccepted} />
						</UIField>

						<UIField
							label="Monthly billing"
							name="billing_plan"
							orientation="horizontal"
							helper="Radio options also inherit the name and described-by attributes from the field."
							required
						>
							<UIRadio bind:group={billingPlan} value="monthly" />
						</UIField>
					</div>
				</article>
			</div>
		</section>

		<section id="errors" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Errors</p>
					<h2>Explicit `error` props and zod-style form maps both resolve to the same field surface.</h2>
				</div>
				<p>
					`Form` accepts `errors` as `string`, `string[]`, or an object with an `_errors` array, which
					matches the shapes you typically flatten out of zod validation results.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Explicit error</span>
					<UIField
						label="Card number"
						name="card_number"
						error="Enter a valid 16-digit card number."
						helper="This is ignored when an explicit error is present."
					>
						<UIInput bind:value={cardNumber} inputmode="numeric" placeholder="1234 5678 9012 3456" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Form errors map</span>
					<UIForm errors={formErrors} class="gap-4">
						<UIField
							label="Card number"
							name="card_number"
							description="The field pulls its error from the parent form by matching `name`."
						>
							<UIInput bind:value={cardNumber} inputmode="numeric" placeholder="1234 5678 9012 3456" />
						</UIField>

						<UIField label="Comments" name="comments" helper="Zod arrays and `_errors` normalize into one string.">
							<UITextarea bind:value={comments} rows={3} />
						</UIField>
					</UIForm>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Compose full forms without baking label and message layout into every control.</h2>
				</div>
				<p>
					The control stays reusable, while `Field` keeps the surrounding form anatomy consistent across input
					and textarea.
				</p>
			</div>

			<div class="example-card">
				<UIForm class="max-w-2xl gap-5" errors={formErrors}>
					<UIField
						label="Name on card"
						name="cardholder_name"
						description="All transactions are secure and encrypted."
						required
					>
						<UIInput bind:value={fullName} placeholder="Evil Rabbit" />
					</UIField>

					<UIField label="Card number" name="card_number" required>
						<UIInput bind:value={cardNumber} inputmode="numeric" placeholder="1234 5678 9012 3456" />
					</UIField>

					<UIField
						label="Comments"
						name="comments"
						helper="Keep comments concise so support can scan them quickly during fulfillment."
					>
						<UITextarea bind:value={comments} rows={4} resize="none" placeholder="Add any additional comments" />
					</UIField>

					<UIField orientation="horizontal">
						<UIButton type="submit">Submit</UIButton>
						<UIButton type="button" variant="outline" role="secondary">Cancel</UIButton>
					</UIField>
				</UIForm>
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
	.example-card,
	.stack-demo {
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
		line-height: 1.7;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1.25rem;
	}

	.doc-entry,
	.state-card,
	.example-card {
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
