<script lang="ts">
	type Section = {
		id: string;
		label: string;
		meta?: string;
	};

	let {
		title = 'On this page',
		sections = []
	}: {
		title?: string;
		sections?: readonly Section[];
	} = $props();
</script>

<aside class="docs-sidebar">
	<div class="docs-sidebar__card">
		<p class="docs-sidebar__title">{title}</p>

		<nav aria-label="Page sections">
			<ul class="docs-sidebar__list">
				{#each sections as section}
					<li>
						<a href={`#${section.id}`} class="docs-sidebar__link">
							<span>{section.label}</span>
							{#if section.meta}
								<small>{section.meta}</small>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</aside>

<style>
	.docs-sidebar {
		position: relative;
	}

	.docs-sidebar__card {
		position: sticky;
		top: 8.5rem;
		border-top: 1px solid #e2e8f0;
		padding-top: 1rem;
	}

	.docs-sidebar__title {
		margin: 0 0 0.875rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #475569;
	}

	.docs-sidebar__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0;
	}

	.docs-sidebar__link {
		display: grid;
		gap: 0.2rem;
		padding: 0.9rem 0;
		border-bottom: 1px solid #e2e8f0;
		color: #334155;
		text-decoration: none;
		transition: color 150ms ease-out;
	}

	.docs-sidebar__link:hover {
		color: #0f172a;
	}

	small {
		font-size: 0.75rem;
		color: #64748b;
	}
</style>
