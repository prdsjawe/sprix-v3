<script lang="ts">
	import './nav-menu.css';
	import classnames from '$utils/classnames';

	let {
		id = '',
		class: className = '',
		ariaLabel = '',
		logo,
		right,
		children
	}: Partial<NavMenu.Props> = $props();

	let navMenuClass = $derived(classnames('nvm', className));
</script>

<header id={id || undefined} class={navMenuClass}>
	<div class="nvm-main">
		{#if logo}
			<div class="nvm-brand">
				{@render logo()}
			</div>
		{/if}

		<nav class="nvm-nav" aria-label={ariaLabel || 'Navigation menu'}>
			<ul class="nvm-list">
				{@render children?.()}
			</ul>
		</nav>
	</div>

	{#if right}
		<div class="nvm-right-rail">
			{@render right()}
		</div>
	{/if}
</header>
