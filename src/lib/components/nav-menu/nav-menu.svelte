<script lang="ts">
	import './nav-menu.css';
	import Button from '../button/button.svelte';
	import Sheet from '../sheet/sheet.svelte';
	import classnames from '$utils/classnames';

	let {
		id = '',
		class: className = '',
		ariaLabel = '',
		fixedOnScroll = false,
		logo,
		right,
		children
	}: Partial<NavMenu.Props> = $props();

	let mobileOpen = $state(false);

	let navMenuClass = $derived(classnames('nvm', fixedOnScroll && 'nvm-fixed-on-scroll', className));
	let mobileSheetId = $derived(id ? `${id}-mobile-sheet` : 'nav-menu-mobile-sheet');

	const toggleMobileMenu = () => {
		mobileOpen = !mobileOpen;
	};

	const closeMobileMenu = () => {
		mobileOpen = false;
	};

	const handleResize = () => {
		if (window.innerWidth >= 768) {
			closeMobileMenu();
		}
	};
</script>

<svelte:window onresize={handleResize} />

<header id={id || undefined} class={navMenuClass}>
	<div class="nvm-topbar">
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

		<div class="nvm-mobile-toggle">
			<Button
				size="sm"
				role="secondary"
				variant="quiet"
				icon="bars-3-bottom-right"
				ariaLabel="Open navigation menu"
				ariaControls={mobileSheetId}
				ariaExpanded={mobileOpen}
				onclick={toggleMobileMenu}
			/>
		</div>
	</div>

	<Sheet
		id={mobileSheetId}
		bind:open={mobileOpen}
		side="right"
		size="sm"
		ariaLabel={ariaLabel || 'Navigation menu'}
		title=""
		description=""
		class="nvm-mobile-sheet"
		onclose={closeMobileMenu}
	>
		<div class="nvm-mobile-shell">
			<nav class="nvm-mobile-nav" aria-label={ariaLabel || 'Mobile navigation menu'}>
				<ul class="nvm-mobile-list">
					{@render children?.()}
				</ul>
			</nav>

			{#if right}
				<div class="nvm-mobile-footer">
					{@render right()}
				</div>
			{/if}
		</div>
	</Sheet>
</header>
