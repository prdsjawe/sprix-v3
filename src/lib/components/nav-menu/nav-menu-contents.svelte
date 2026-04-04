<script lang="ts">
	import './nav-menu.css';
	import { onDestroy } from 'svelte';
	import classnames from '$utils/classnames';
	import { getNavMenuItemContext } from './nav-menu.context';

	const item = getNavMenuItemContext();

	let {
		class: className = '',
		children
	}: Partial<NavMenuContents.Props> = $props();

	let contentElement = $state<HTMLDivElement | null>(null);
	let contentClass = $derived(classnames('nvm-content', className));

	item.setContentDeclared(true);

	onDestroy(() => {
		item.setContentDeclared(false);
	});

	$effect(() => {
		item.setContentElement(contentElement);
	});
</script>

<div class="nvm-content-host" aria-hidden="true">
	<div id={item.getContentId()} bind:this={contentElement} class={contentClass}>
		{@render children?.()}
	</div>
</div>
