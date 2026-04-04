<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { DatePicker as UIDatePicker, Field as UIField } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'sizes', label: 'Sizes', meta: 'sm to lg' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'Single, range, constraints' }
	] as const;

	const sizes = [
		{ size: 'sm', label: 'Small', description: 'Compact utility bars and tighter admin forms.' },
		{ size: 'md', label: 'Medium', description: 'Default calendar density for product flows.' },
		{ size: 'lg', label: 'Large', description: 'Roomier date entry for prominent booking or scheduling steps.' }
	] as const;

	const stringifyValue = (value: string[]) => JSON.stringify(value);

	let publishDate = $state(['2026-04-18']);
	let launchWindow = $state(['2026-04-16', '2026-04-21']);
	let constrainedRange = $state<string[]>([]);
	let disabledDate = $state(['2026-05-01']);
</script>

<svelte:head>
	<title>DatePicker Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix date picker primitive, including single-date mode, date ranges, sizing, and constrained booking windows."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="DatePicker"
	description="Calendar field built on the same shell language as `Input` and `Select`, but with a Tippy-powered picker panel and one consistent return shape: `string[]`."
	pathLabel="components/date-picker"
	pathHref="/components/date-picker"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>One trigger, one floating calendar, one value shape.</h2>
				<p class="lead">
					`DatePicker` keeps the same calm shell as the other form primitives and always binds to a
					`string[]`. Single mode returns one ISO date. `range` mode returns two ISO dates in ascending
					order after the second selection.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="demo-card">
					<UIField label="Publish date" name="hero-publish" helper="Single selection returns one value in the array.">
						<UIDatePicker bind:value={publishDate} size="lg" />
					</UIField>
					<code>{stringifyValue(publishDate)}</code>
				</div>

				<div class="demo-card">
					<UIField label="Launch window" name="hero-window" helper="Range mode stays open until the second date is picked.">
						<UIDatePicker bind:value={launchWindow} size="lg" range />
					</UIField>
					<code>{stringifyValue(launchWindow)}</code>
				</div>
			</div>
		</section>

		<section id="sizes" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Sizes</p>
					<h2>Three densities, same calendar anatomy.</h2>
				</div>
				<p>Use `sm`, `md`, and `lg` to align with adjacent inputs and selects without changing behavior.</p>
			</div>

			<div class="doc-grid">
				{#each sizes as item}
					<article class="doc-entry">
						<div class="doc-entry__meta">
							<h3>{item.label}</h3>
							<p>{item.description}</p>
						</div>
						<div class="doc-entry__demo">
							<UIField label={`${item.label} picker`} name={`size-${item.size}`}>
								<UIDatePicker size={item.size} placeholder="Select a date" />
							</UIField>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Field messaging outside, control state inside.</h2>
				</div>
				<p>`Field` still owns the visible label and descriptions, while the picker shell handles open, disabled, and invalid states.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIField label="Review date" name="state-helper" helper="Use the control on its own or bind the array into a form model.">
						<UIDatePicker placeholder="Select a review date" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIField label="Approval window" name="state-error" error="Choose a valid date before continuing.">
						<UIDatePicker range placeholder="Select an approval window" />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIField label="Archive date" name="state-disabled" helper="Disabled pickers still preserve the selected label.">
						<UIDatePicker bind:value={disabledDate} disabled />
					</UIField>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Single-date and range flows with constraints.</h2>
				</div>
				<p>Use `range`, `min`, `max`, and `weekStartsOn` to keep the component narrow but useful across scheduling flows.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Single value API</span>
					<UIField label="Content embargo" name="example-single" helper="Still returns an array so upstream state stays consistent.">
						<UIDatePicker bind:value={publishDate} />
					</UIField>
					<code>{stringifyValue(publishDate)}</code>
				</article>

				<article class="state-card">
					<span class="state-label">Date range API</span>
					<UIField label="Booking window" name="example-range" helper="The second selection closes the picker and finalizes the range.">
						<UIDatePicker bind:value={constrainedRange} range min="2026-04-10" max="2026-04-28" />
					</UIField>
					<code>{stringifyValue(constrainedRange)}</code>
				</article>

				<article class="state-card">
					<span class="state-label">Monday start</span>
					<UIField label="Sprint planning" name="example-week" helper="Shift the calendar grid when a Monday-first layout is the better default.">
						<UIDatePicker range weekStartsOn={1} placeholder="Select sprint dates" />
					</UIField>
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
	.demo-card {
		display: grid;
		gap: 0.85rem;
	}

	.section-kicker {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #475569;
	}

	h2,
	h3,
	.lead,
	.section-heading p,
	.doc-entry p,
	.state-label,
	code {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.5rem, 2.4vw, 2rem);
		line-height: 1.1;
		letter-spacing: -0.04em;
	}

	h3 {
		font-size: 1rem;
		line-height: 1.35;
		letter-spacing: -0.02em;
	}

	.lead,
	.section-heading p,
	.doc-entry p {
		max-width: 45rem;
		color: #475569;
		line-height: 1.75;
	}

	.hero-card__stack,
	.state-grid {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.doc-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.doc-entry,
	.state-card,
	.demo-card {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #f8fafc;
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.75rem;
	}

	.state-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #64748b;
	}

	code {
		font-size: 0.875rem;
		line-height: 1.6;
		color: #0f172a;
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 0.875rem;
		padding: 0.75rem 0.875rem;
		overflow-x: auto;
	}

	@media (min-width: 72rem) {
		.docs-shell {
			grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
