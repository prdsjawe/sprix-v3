<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { ToggleGroup as UIToggleGroup } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'variants', label: 'Variants', meta: 'Bordered and ghost' },
		{ id: 'types', label: 'Types', meta: 'Check and radio' },
		{ id: 'states', label: 'States', meta: 'Selected, disabled, indicator' },
		{ id: 'examples', label: 'Examples', meta: 'Common toolbar patterns' }
	] as const;

	const viewItems = [
		{ value: 'board', label: 'Board' },
		{ value: 'list', label: 'List' },
		{ value: 'timeline', label: 'Timeline' }
	] satisfies ToggleGroup.Item[];

	const filterItems = [
		{ value: 'assigned', label: 'Assigned' },
		{ value: 'blocked', label: 'Blocked' },
		{ value: 'urgent', label: 'Urgent' }
	] satisfies ToggleGroup.Item[];

	const disabledItems = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'comfortable', label: 'Comfortable', disabled: true },
		{ value: 'expanded', label: 'Expanded' }
	] satisfies ToggleGroup.Item[];

	const toolbarItems = [
		{ value: 'bold', label: 'Bold' },
		{ value: 'italic', label: 'Italic' },
		{ value: 'underline', label: 'Underline' }
	] satisfies ToggleGroup.Item[];

	let heroView = $state<ToggleGroup.Value>('board');
	let heroFilters = $state<ToggleGroup.Value[]>(['assigned', 'urgent']);
	let borderedView = $state<ToggleGroup.Value>('list');
	let ghostView = $state<ToggleGroup.Value>('timeline');
	let checkSelection = $state<ToggleGroup.Value[]>(['assigned', 'blocked']);
	let radioSelection = $state<ToggleGroup.Value>('timeline');
	let densitySelection = $state<ToggleGroup.Value>('compact');
	let textStyle = $state<ToggleGroup.Value[]>(['bold', 'underline']);
	let handoffTarget = $state<ToggleGroup.Value>('design');
</script>

<svelte:head>
	<title>Toggle Group Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix toggle-group primitive, including bordered and ghost variants plus check and radio selection modes."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="Toggle Group"
	description="Button-like selection rows for filters, segmented views, and compact toolbars. `type` decides whether the buttons behave like checkboxes or radios, while `variant` controls the surface treatment."
	pathLabel="components/toggle-group"
	pathHref="/components/toggle-group"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Use toggle groups when the selection itself should feel actionable.</h2>
				<p class="lead">
					This primitive sits between a button row and a checkbox or radio set. Each option is its
					own button, not a fused button group, so the control reads clearly in filters, view
					switchers, and editor toolbars.
				</p>
			</div>

			<div class="hero-card__stack">
				<div class="stack-list">
					<UIToggleGroup
						bind:value={heroView}
						type="radio"
						variant="bordered"
						items={viewItems}
						ariaLabel="Hero view mode"
					/>
					<p class="selection-note">Selected view: {heroView}</p>
				</div>

				<div class="stack-list">
					<UIToggleGroup
						bind:values={heroFilters}
						type="check"
						variant="ghost"
						items={filterItems}
						ariaLabel="Hero filters"
					/>
					<p class="selection-note">Active filters: {heroFilters.join(', ')}</p>
				</div>
			</div>
		</section>

		<section id="variants" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Variants</p>
					<h2>Choose how much chrome the control should carry.</h2>
				</div>
				<p>`bordered` reads like a compact segmented control. `ghost` stays lighter for toolbars and filter bars.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Bordered</h3>
						<p>Use when the buttons need a clear surface even before selection happens.</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo--start">
						<UIToggleGroup
							bind:value={borderedView}
							type="radio"
							variant="bordered"
							items={viewItems}
							ariaLabel="Bordered view mode"
						/>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Ghost</h3>
						<p>Use when the surrounding layout already defines the surface and the state can stay lighter.</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo--start">
						<UIToggleGroup
							bind:value={ghostView}
							type="radio"
							variant="ghost"
							items={viewItems}
							ariaLabel="Ghost view mode"
						/>
					</div>
				</article>
			</div>
		</section>

		<section id="types" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Types</p>
					<h2>Pick the selection model first.</h2>
				</div>
				<p>`check` allows multiple active buttons. `radio` keeps the set mutually exclusive.</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Check</h3>
						<p>Ideal for layered filters and formatting tools where several options can stay active together.</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo--start">
						<UIToggleGroup
							bind:values={checkSelection}
							type="check"
							variant="bordered"
							items={filterItems}
							ariaLabel="Check selection example"
						/>
						<p class="selection-note">Selected: {checkSelection.join(', ')}</p>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>Radio</h3>
						<p>Use when one answer should win and the control needs stronger button affordance than plain radios.</p>
					</div>
					<div class="doc-entry__demo doc-entry__demo--start">
						<UIToggleGroup
							bind:value={radioSelection}
							type="radio"
							variant="bordered"
							items={viewItems}
							ariaLabel="Radio selection example"
						/>
						<p class="selection-note">Selected: {radioSelection}</p>
					</div>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Keep selected and unavailable options obvious.</h2>
				</div>
				<p>
					The selected button changes surface treatment and indicator state, while disabled items
					stay readable without competing.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Selected</span>
					<UIToggleGroup
						values={['assigned', 'urgent']}
						type="check"
						variant="ghost"
						items={filterItems}
						ariaLabel="Selected state preview"
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled item</span>
					<UIToggleGroup
						bind:value={densitySelection}
						type="radio"
						variant="bordered"
						items={disabledItems}
						ariaLabel="Density selection"
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled group</span>
					<UIToggleGroup
						values={['bold']}
						type="check"
						variant="bordered"
						items={toolbarItems}
						disabled
						ariaLabel="Disabled toolbar example"
					/>
				</article>

				<article class="state-card">
					<span class="state-label">Indicator removed</span>
					<UIToggleGroup
						bind:value={handoffTarget}
						type="radio"
						variant="ghost"
						indicator={false}
						items={[
							{ value: 'design', label: 'Design' },
							{ value: 'product', label: 'Product' },
							{ value: 'engineering', label: 'Engineering' }
						]}
						ariaLabel="Indicatorless handoff owner"
					/>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Typical toolbar and filter usage.</h2>
				</div>
				<p>Use concise labels and let the selected surface carry the state instead of surrounding the whole row with extra chrome.</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Editor formatting</span>
					<UIToggleGroup
						bind:values={textStyle}
						type="check"
						variant="ghost"
						indicator={false}
						items={toolbarItems}
						ariaLabel="Text style controls"
					/>
					<p class="selection-note">Styles: {textStyle.join(', ')}</p>
				</article>

				<article class="state-card">
					<span class="state-label">Handoff owner</span>
					<UIToggleGroup
						bind:value={handoffTarget}
						type="radio"
						variant="bordered"
						items={[
							{ value: 'design', label: 'Design' },
							{ value: 'product', label: 'Product' },
							{ value: 'engineering', label: 'Engineering' }
						]}
						ariaLabel="Handoff owner"
					/>
					<p class="selection-note">Owner: {handoffTarget}</p>
				</article>

				<article class="state-card">
					<span class="state-label">Quick filters</span>
					<UIToggleGroup
						values={['assigned', 'blocked']}
						type="check"
						variant="bordered"
						items={filterItems}
						ariaLabel="Quick filter example"
					/>
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
	.stack-list {
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
		line-height: 1.7;
	}

	.lead {
		max-width: 60ch;
		font-size: 1rem;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-grid {
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}

	.state-grid {
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	}

	.doc-entry,
	.state-card {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		background: #f8fafc;
	}

	.doc-entry__meta,
	.doc-entry__demo {
		display: grid;
		gap: 0.65rem;
	}

	.doc-entry__demo {
		align-content: center;
		min-height: 7rem;
	}

	.doc-entry__demo--start {
		align-content: start;
	}

	.selection-note {
		font-size: 0.875rem;
		color: #334155;
	}

	@media (max-width: 960px) {
		.docs-shell {
			padding-bottom: 2.5rem;
		}
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
	}
</style>
