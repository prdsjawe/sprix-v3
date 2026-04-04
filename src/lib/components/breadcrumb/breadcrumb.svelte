<script lang="ts">
	import './breadcrumb.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';

	let {
		id = '',
		class: className = '',
		ariaLabel = 'Breadcrumb',
		items = []
	}: Partial<Breadcrumb.Props> = $props();

	const getRel = (item: Breadcrumb.Item) =>
		item.target === '_blank' ? classnames('noopener', 'noreferrer', item.rel) : item.rel;

	let breadcrumbClass = $derived(classnames('brd', className));
</script>

<nav {id} class={breadcrumbClass} aria-label={ariaLabel}>
	<ol class="brd-list">
		{#each items as item, index}
			{@const current = item.current ?? index === items.length - 1}

			<li class="brd-item">
				{#if index > 0}
					<span class="brd-separator" aria-hidden="true">
						<Icon name="chevron-right" class="" />
					</span>
				{/if}

				{#if item.href && !current}
					<a href={item.href} target={item.target} rel={getRel(item)} class="brd-link">
						{#if item.icon}
							<span class="brd-icon" aria-hidden="true">
								<Icon name={item.icon} class="" />
							</span>
						{/if}
						{item.label}
					</a>
				{:else}
					<span class={classnames('brd-label', current && 'brd-label-current')} aria-current={current ? 'page' : undefined}>
						{#if item.icon}
							<span class="brd-icon" aria-hidden="true">
								<Icon name={item.icon} class="" />
							</span>
						{/if}
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
