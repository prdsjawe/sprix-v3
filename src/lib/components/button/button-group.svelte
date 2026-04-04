<script lang="ts">
	import './button.css';
	import classnames from '$utils/classnames';
	import { BGOC } from './button.record';

	let {
		id = '',
		orientation = 'horizontal',
		class: className = '',
		ariaLabel,
		children
	}: Partial<ButtonGroup.Props> = $props();

	let buttonGroupClass = $derived(classnames('btn-group', BGOC[orientation], className));
</script>

<div
	id={id || undefined}
	class={buttonGroupClass}
	role="group"
	aria-label={ariaLabel || undefined}
	data-orientation={orientation}
>
	{@render children?.()}
</div>
