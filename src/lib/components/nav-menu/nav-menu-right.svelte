<script lang="ts">
	import './nav-menu.css';
	import classnames from '$utils/classnames';

	let {
		class: className = '',
		children
	}: Partial<NavMenuRight.Props> = $props();

	let rightClass = $derived(classnames('nvm-right', className));
</script>

<div class={rightClass}>
	{@render children?.()}
</div>
