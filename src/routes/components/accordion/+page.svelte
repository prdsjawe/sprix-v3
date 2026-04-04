<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import {
		Accordion as UIAccordion,
		AccordionContent as UIAccordionContent,
		AccordionItem as UIAccordionItem,
		AccordionTrigger as UIAccordionTrigger
	} from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'variants', label: 'Variants', meta: 'Default and card' },
		{ id: 'modes', label: 'Modes', meta: 'Single and multiple' },
		{ id: 'states', label: 'States', meta: 'Controlled, fixed, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Common disclosure patterns' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Dense sidebars, utility drawers, and compact admin flows.' },
		{ size: 'md', label: 'Medium', description: 'Default density for product settings and standard docs.' },
		{ size: 'lg', label: 'Large', description: 'Roomier FAQ and support surfaces with more breathing room.' }
	] as const;

	const variants = [
		{
			variant: 'default',
			label: 'Default',
			description: 'Divider-led disclosure for stacked content inside a larger page.'
		},
		{
			variant: 'card',
			label: 'Card',
			description: 'Elevated grouped panels when each item should feel more self-contained.'
		}
	] as const;

	let heroValue = $state('shipping');
	let policyValue = $state('permissions');
	let rolloutValue = $state<string[]>(['scope', 'rollback']);
	let faqValue = $state<string[]>(['retention']);
</script>

<svelte:head>
	<title>Accordion Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix accordion primitives, including sizing, variants, single and multiple behavior, and common disclosure patterns."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Accordion"
	description="Disclosure primitive split into `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent`. The root owns open-state behavior while each child piece stays composable and semantic."
	pathLabel="components/accordion"
	pathHref="/components/accordion"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use explicit disclosure structure instead of hiding state in ad hoc toggles.</h2>
				<p class="lead">
					The accordion keeps trigger and content relationships obvious. `Accordion` owns the
					selection model. `AccordionItem` identifies each row. `AccordionTrigger` and
					`AccordionContent` wire the ARIA relationship and open state without burying the markup.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="accordion-surface">
					<UIAccordion bind:value={heroValue} size="lg" variant="card">
						<UIAccordionItem value="shipping">
							<UIAccordionTrigger>Shipping windows</UIAccordionTrigger>
							<UIAccordionContent>
								<p>
									Orders placed before 4 PM ship the same business day. Weekend orders roll into
									Monday pickup unless priority handling is enabled for the account.
								</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="returns">
							<UIAccordionTrigger>Return policy</UIAccordionTrigger>
							<UIAccordionContent>
								<p>
									Standard returns stay open for 30 days. Damaged fulfillment items should be
									reported within 72 hours so replacements can be prioritized.
								</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="billing">
							<UIAccordionTrigger>Billing support</UIAccordionTrigger>
							<UIAccordionContent>
								<p>
									Workspace invoices are generated on the first of the month. Mid-cycle plan
									changes are prorated automatically on the next statement.
								</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three density tiers, same disclosure model.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to match layout density without rewriting the pattern.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>

						<div class="doc-entry__demo">
							<UIAccordion size={item.size} value={`${item.size}-overview`}>
								<UIAccordionItem value={`${item.size}-overview`}>
									<UIAccordionTrigger>{item.label} overview</UIAccordionTrigger>
									<UIAccordionContent>
										<p>
											This size keeps the same open and close behavior while adjusting spacing,
											radius, and content rhythm.
										</p>
									</UIAccordionContent>
								</UIAccordionItem>

								<UIAccordionItem value={`${item.size}-details`}>
									<UIAccordionTrigger>Usage guidance</UIAccordionTrigger>
									<UIAccordionContent>
										<p>
											Choose the size based on page density and reading distance, not as a new
											visual style.
										</p>
									</UIAccordionContent>
								</UIAccordionItem>
							</UIAccordion>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="variants" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Variants</p>
					<h2>Pick the surface treatment based on context.</h2>
				</div>
				<p>`default` stays quiet inside a larger page. `card` gives each disclosure its own container.</p>
			</div>

			<div class="doc-grid">
				{#each variants as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>

						<div class="doc-entry__demo">
							<UIAccordion variant={item.variant} value={`${item.variant}-summary`}>
								<UIAccordionItem value={`${item.variant}-summary`}>
									<UIAccordionTrigger>Implementation summary</UIAccordionTrigger>
									<UIAccordionContent>
										<p>
											The variant changes the surrounding shell while keeping the trigger,
											content, and state model intact.
										</p>
									</UIAccordionContent>
								</UIAccordionItem>

								<UIAccordionItem value={`${item.variant}-notes`}>
									<UIAccordionTrigger>Design notes</UIAccordionTrigger>
									<UIAccordionContent>
										<p>
											Use the quieter default surface inside dense documentation. Use card when
											the accordion should read like a grouped panel.
										</p>
									</UIAccordionContent>
								</UIAccordionItem>
							</UIAccordion>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="modes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Modes</p>
					<h2>Choose one-open or many-open behavior deliberately.</h2>
				</div>
				<p>`type="single"` fits FAQs and mutually exclusive reading flows. `type="multiple"` fits checklists and grouped references.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Single mode</span>
					<UIAccordion bind:value={policyValue} type="single" variant="card">
						<UIAccordionItem value="permissions">
							<UIAccordionTrigger>Permission changes</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Route access updates through workspace admins so approval history stays auditable.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="retention">
							<UIAccordionTrigger>Data retention</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Project activity logs are retained for 180 days on Growth and 365 days on Enterprise.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>

				<article class="state-card">
					<span class="state-label">Multiple mode</span>
					<UIAccordion bind:value={rolloutValue} type="multiple" variant="card">
						<UIAccordionItem value="scope">
							<UIAccordionTrigger>Scope verified</UIAccordionTrigger>
							<UIAccordionContent>
								<p>The release owner confirmed affected services, dashboards, and feature flags.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="rollback">
							<UIAccordionTrigger>Rollback ready</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Previous image tags and environment variables are stored alongside the rollout ticket.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="communication">
							<UIAccordionTrigger>Stakeholders notified</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Support and operations channels have the release window and escalation owner.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep interaction rules explicit.</h2>
				</div>
				<p>Use `collapsible` when zero-open is acceptable, and disable only the specific rows that should not be interactive.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Fixed open item</span>
					<UIAccordion value="required" collapsible={false}>
						<UIAccordionItem value="required">
							<UIAccordionTrigger>Required review path</UIAccordionTrigger>
							<UIAccordionContent>
								<p>The active section cannot be collapsed, which is useful when one panel must stay visible.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="secondary">
							<UIAccordionTrigger>Secondary notes</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Users can still move between items, but the accordion never settles into an all-closed state.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled row</span>
					<UIAccordion variant="card" value="available">
						<UIAccordionItem value="available">
							<UIAccordionTrigger>Available today</UIAccordionTrigger>
							<UIAccordionContent>
								<p>General workspace settings can be updated immediately by organization admins.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="locked" disabled>
							<UIAccordionTrigger>Locked by compliance</UIAccordionTrigger>
							<UIAccordionContent>
								<p>This content is intentionally unreachable because the row is disabled.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>

				<article class="state-card">
					<span class="state-label">Controlled FAQ</span>
					<UIAccordion bind:value={faqValue} type="multiple">
						<UIAccordionItem value="retention">
							<UIAccordionTrigger>How long do exports stay available?</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Signed export URLs remain active for 24 hours before the archive must be regenerated.</p>
							</UIAccordionContent>
						</UIAccordionItem>

						<UIAccordionItem value="guests">
							<UIAccordionTrigger>Can guests approve requests?</UIAccordionTrigger>
							<UIAccordionContent>
								<p>No. Guest access is view-only unless the workspace upgrades the role assignment policy.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Good disclosure patterns are structured, not decorative.</h2>
				</div>
				<p>Use accordion when the user benefits from scanning labels first, then opening only the content they need.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Support center</span>
					<UIAccordion variant="card" value="refunds">
						<UIAccordionItem value="refunds">
							<UIAccordionTrigger>Refund eligibility</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Monthly plans can be refunded within seven days when no billable usage has been recorded.</p>
							</UIAccordionContent>
						</UIAccordionItem>
						<UIAccordionItem value="transfers">
							<UIAccordionTrigger>Workspace transfers</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Ownership transfers require confirmation from both the current owner and the receiving admin.</p>
							</UIAccordionContent>
						</UIAccordionItem>
						<UIAccordionItem value="security">
							<UIAccordionTrigger>Security reviews</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Enterprise customers can request the latest security packet from the trust center workspace.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>

				<article class="state-card">
					<span class="state-label">Release checklist</span>
					<UIAccordion type="multiple" variant="card" value={['monitoring']}>
						<UIAccordionItem value="monitoring">
							<UIAccordionTrigger>Monitoring ready</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Dashboards, alerts, and incident escalation notes were updated before the rollout window.</p>
							</UIAccordionContent>
						</UIAccordionItem>
						<UIAccordionItem value="messaging">
							<UIAccordionTrigger>Customer messaging</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Status page drafts and in-app notices are prepared in case the rollout window extends.</p>
							</UIAccordionContent>
						</UIAccordionItem>
						<UIAccordionItem value="handoff">
							<UIAccordionTrigger>On-call handoff</UIAccordionTrigger>
							<UIAccordionContent>
								<p>The next on-call engineer has the rollback plan, owner list, and success metrics.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</article>

				<article class="state-card">
					<span class="state-label">Settings explainer</span>
					<UIAccordion value="sso">
						<UIAccordionItem value="sso">
							<UIAccordionTrigger>Single sign-on</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Use disclosure to keep advanced configuration readable while preserving a predictable settings page rhythm.</p>
							</UIAccordionContent>
						</UIAccordionItem>
						<UIAccordionItem value="audit">
							<UIAccordionTrigger>Audit exports</UIAccordionTrigger>
							<UIAccordionContent>
								<p>Export access logs, role updates, and sign-in events when your compliance workflow requires archival copies.</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
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
	.section-heading,
	.doc-entry,
	.state-card,
	.hero-card__stack,
	.doc-entry__demo,
	.accordion-surface {
		display: grid;
		gap: 0.85rem;
	}

	.hero-card__stack {
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
		color: #475569;
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
		border-top: 1px solid #e2e8f0;
	}

	.doc-entry__meta {
		display: grid;
		gap: 0.35rem;
	}

	.accordion-surface {
		width: min(100%, 44rem);
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
