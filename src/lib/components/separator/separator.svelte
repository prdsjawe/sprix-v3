<script lang="ts">
	import './separator.css';
	import classnames from '$utils/classnames';
	import { SOC } from './separator.record';

	let {
		id = '',
		orientation = 'horizontal',
		decorative = true,
		class: className = ''
	}: Partial<Separator.Props> = $props();

	let separatorClass = $derived(classnames('sep', SOC[orientation], className));
	let ariaOrientation = $derived(orientation);
</script>

<div
	{id}
	class={separatorClass}
	role={decorative ? undefined : 'separator'}
	aria-orientation={decorative ? undefined : ariaOrientation}
	aria-hidden={decorative ? 'true' : undefined}
></div>
