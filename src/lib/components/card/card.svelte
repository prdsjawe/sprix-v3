<script lang="ts">
	import './card.css';
	import classnames from '$utils/classnames';

	let {
		id = '',
		title = '',
		description = '',
		class: className = '',
		header,
		action,
		footer,
		children
	}: Partial<Card.Props> = $props();

	let hasHeader = $derived(Boolean(header || title || description || action));
	let hasCopy = $derived(Boolean(title || description));
	let hasFooter = $derived(Boolean(footer));
	let cardClass = $derived(classnames('card', className));
	let contentClass = $derived(classnames('card-content', hasFooter && 'card-content-with-footer'));
</script>

<div id={id || undefined} class={cardClass}>
	{#if hasHeader}
		<div class="card-header">
			{#if header}
				{@render header()}
			{:else}
				{#if hasCopy}
					<div class="card-copy">
						{#if title}
							<h3 class="card-title">{title}</h3>
						{/if}

						{#if description}
							<p class="card-description">{description}</p>
						{/if}
					</div>
				{/if}

				{#if action}
					<div class="card-action">
						{@render action()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	{#if children}
		<div class={contentClass}>
			{@render children()}
		</div>
	{/if}

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>
