<script lang="ts">
	let {
		eyebrow = 'Sprix UI',
		title = 'Component Docs',
		description = '',
		pathLabel = 'components/button',
		pathHref = '/components/button'
	}: {
		eyebrow?: string;
		title?: string;
		description?: string;
		pathLabel?: string;
		pathHref?: string;
	} = $props();
</script>

<header class="docs-header">
	<div class="docs-header__inner">
		<div class="docs-header__brand">
			<a href="/" class="docs-header__home">sprix-v3</a>
			<span class="docs-header__sep">/</span>
			<a href={pathHref} class="docs-header__path">{pathLabel}</a>
		</div>

		<div class="docs-header__copy">
			<p class="docs-header__eyebrow">{eyebrow}</p>
			<h1>{title}</h1>
			{#if description}
				<p class="docs-header__description">{description}</p>
			{/if}
		</div>
	</div>
</header>

<style>
	.docs-header {
		position: sticky;
		top: 0;
		z-index: 20;
		border-bottom: 1px solid #e2e8f0;
		background: rgba(255, 255, 255, 0.96);
	}

	.docs-header__inner {
		width: min(100%, 86rem);
		margin: 0 auto;
		padding: 1rem clamp(1rem, 3vw, 2rem);
		display: grid;
		gap: 0.875rem;
	}

	.docs-header__brand {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #64748b;
	}

	.docs-header__home,
	.docs-header__path {
		color: inherit;
		text-decoration: none;
	}

	.docs-header__home:hover,
	.docs-header__path:hover {
		color: #0f172a;
	}

	.docs-header__sep {
		opacity: 0.55;
	}

	.docs-header__copy {
		display: grid;
		gap: 0.35rem;
	}

	.docs-header__eyebrow,
	h1,
	.docs-header__description {
		margin: 0;
	}

	.docs-header__eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	h1 {
		font-size: clamp(1.8rem, 4vw, 2.7rem);
		line-height: 0.96;
		letter-spacing: -0.05em;
		color: #0f172a;
	}

	.docs-header__description {
		max-width: 46rem;
		font-size: 0.97rem;
		line-height: 1.6;
		color: #475569;
	}
</style>
