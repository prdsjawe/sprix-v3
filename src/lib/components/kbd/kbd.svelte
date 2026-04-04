<script lang="ts">
	import './kbd.css';
	import classnames from '$utils/classnames';

	let { id = '', class: className = '', children }: Partial<Kbd.Props> = $props();

	let kbdClass = $derived(classnames('kbd', className));
</script>

<kbd id={id || undefined} class={kbdClass}>
	{@render children?.()}
</kbd>
