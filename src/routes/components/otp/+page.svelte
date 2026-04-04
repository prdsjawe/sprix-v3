<script lang="ts">
	import { Header, Sidebar } from '../../../app/components';
	import { Field as UIField, Otp as UIOtp } from '$lib/components';

	const sections = [
		{ id: 'overview', label: 'Overview', meta: 'Intent and posture' },
		{ id: 'length', label: 'Length', meta: '4 to 8 cells' },
		{ id: 'states', label: 'States', meta: 'Helper, error, disabled' },
		{ id: 'examples', label: 'Examples', meta: 'PIN and verification flows' }
	] as const;

	let heroCode = $state('482913');
	let compactCode = $state('7284');
	let longCode = $state('19482037');
	let helperCode = $state('');
	let errorCode = $state('12');
	let disabledCode = $state('930271');
</script>

<svelte:head>
	<title>OTP Docs</title>
	<meta
		name="description"
		content="Documentation for the Sprix OTP primitive, including the length prop, verification states, and paste-friendly interaction behavior."
	/>
</svelte:head>

<Header
	eyebrow="Documentation"
	title="OTP"
	description="Large single-character verification cells with a white surface, gray border, rounded corners, no shadows, and a bindable `value` string. Use the `length` prop to switch between short PINs and longer verification codes."
	pathLabel="components/otp"
	pathHref="/components/otp"
/>

<div class="docs-shell">
	<Sidebar {sections} />

	<main class="docs-main">
		<section id="overview" class="doc-section hero-card">
			<div class="hero-card__copy">
				<p class="section-kicker">Overview</p>
				<h2>Verification input that reads clearly at a glance.</h2>
				<p class="lead">
					`Otp` is a form primitive for one-time codes, PINs, and checkpoint verification. It keeps each
					character in its own large cell, supports overwrite, backspace navigation, and multi-character
					paste, and works cleanly with `Field` for labels, helper text, and errors.
				</p>
			</div>

			<div class="hero-card__stack">
				<UIField
					label="Verification code"
					name="hero-code"
					helper="Paste a full code or type through one character at a time."
				>
					<UIOtp bind:value={heroCode} />
				</UIField>

				<UIField label="Backup PIN" name="hero-pin" helper="The same primitive can shorten to four cells.">
					<UIOtp bind:value={compactCode} length={4} />
				</UIField>
			</div>
		</section>

		<section id="length" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Length</p>
					<h2>One component, different verification footprints.</h2>
				</div>
				<p>
					Use the numeric `length` prop to match the code format without changing styling or interaction
					behavior.
				</p>
			</div>

			<div class="doc-grid">
				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>4 digits</h3>
						<p>Compact PIN confirmation and short lock-screen flows.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="4 digit code" name="otp-4">
							<UIOtp bind:value={compactCode} length={4} />
						</UIField>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>6 digits</h3>
						<p>Default SMS and email verification code length.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="6 digit code" name="otp-6">
							<UIOtp bind:value={heroCode} />
						</UIField>
					</div>
				</article>

				<article class="doc-entry">
					<div class="doc-entry__meta">
						<h3>8 digits</h3>
						<p>Longer recovery or backup verification patterns.</p>
					</div>
					<div class="doc-entry__demo">
						<UIField label="8 digit code" name="otp-8">
							<UIOtp bind:value={longCode} length={8} />
						</UIField>
					</div>
				</article>
			</div>
		</section>

		<section id="states" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">States</p>
					<h2>Field messaging outside, verification cells inside.</h2>
				</div>
				<p>
					`Field` owns helper and error copy, while `Otp` owns the visible cell treatment, focus, disabled,
					and invalid border behavior.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Helper</span>
					<UIField label="SMS code" name="state-helper" helper="The component advances as you type or paste.">
						<UIOtp bind:value={helperCode} />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Error</span>
					<UIField label="Verification code" name="state-error" error="Enter the full six-digit code to continue.">
						<UIOtp bind:value={errorCode} />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Disabled</span>
					<UIField label="Recovery code" name="state-disabled" helper="Disabled cells keep the same layout footprint.">
						<UIOtp bind:value={disabledCode} disabled />
					</UIField>
				</article>
			</div>
		</section>

		<section id="examples" class="doc-section doc-card">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Examples</p>
					<h2>Short PINs, standard OTPs, and longer checkpoints.</h2>
				</div>
				<p>
					Keep it inside `Field` when the form needs visible label and copy, or use it standalone for compact
					verification panels.
				</p>
			</div>

			<div class="state-grid">
				<article class="state-card">
					<span class="state-label">Standalone</span>
					<div class="demo-stack">
						<UIOtp ariaLabel="Standalone verification code" bind:value={heroCode} />
						<p class="demo-copy">Standalone use still binds one string value for the full code.</p>
					</div>
				</article>

				<article class="state-card">
					<span class="state-label">Four-digit PIN</span>
					<UIField label="Door PIN" name="example-pin" helper="Set the length prop to 4 for shorter entry flows.">
						<UIOtp bind:value={compactCode} length={4} />
					</UIField>
				</article>

				<article class="state-card">
					<span class="state-label">Eight-digit checkpoint</span>
					<UIField label="Recovery checkpoint" name="example-long" helper="Longer codes keep the same visual language.">
						<UIOtp bind:value={longCode} length={8} />
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
	.demo-stack {
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
	.demo-copy {
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
	.doc-entry p,
	.demo-copy {
		font-size: 0.98rem;
		line-height: 1.75;
		color: #475569;
	}

	.doc-grid,
	.state-grid {
		display: grid;
		gap: 1rem;
	}

	.doc-entry,
	.state-card {
		padding: 1.25rem;
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
	}

	.doc-entry__demo,
	.state-card :global(.otp-field) {
		align-self: start;
	}

	.state-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #64748b;
	}

	@media (min-width: 768px) {
		.doc-grid,
		.state-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
