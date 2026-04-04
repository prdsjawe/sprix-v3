<script lang="ts">
	import './toast.css';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import classnames from '$utils/classnames';
	import {
		dismissToast,
		pauseToastGroup,
		registerToastViewport,
		resumeToastGroup,
		toastStore
	} from './toast.api';
	import ToastItem from './toast-item.svelte';

	let {
		group = 'default',
		prompt = 'color',
		visibleToasts = 4,
		duration = 4500,
		closeButton = true,
		class: className = ''
	}: Partial<Toast.Props> = $props();

	let rootElement = $state<HTMLDivElement | null>(null);
	let pointerInside = $state(false);
	let focusInside = $state(false);

	let groupedToasts = $derived.by(() =>
		$toastStore.filter((item) => item.group === group).sort((a, b) => b.createdAt - a.createdAt)
	);
	let renderedToasts = $derived.by(() =>
		groupedToasts.slice(0, Math.max(1, visibleToasts))
	);
	let expanded = $derived(pointerInside || focusInside);
	let rootClass = $derived(classnames('tst-root', expanded && 'tst-root-expanded', className));

	const syncPointerState = (clientX: number, clientY: number) => {
		if (!rootElement) return;

		const target = document.elementFromPoint(clientX, clientY);
		pointerInside = Boolean(target && rootElement.contains(target));
	};

	const handlePointerEnter = () => {
		pointerInside = true;
	};

	const handlePointerLeave = (event: Utils.PointerEvent<HTMLDivElement>) => {
		requestAnimationFrame(() => {
			syncPointerState(event.clientX, event.clientY);
		});
	};

	const handleFocusIn = () => {
		focusInside = true;
	};

	const handleFocusOut = (event: Utils.FocusEvent<HTMLDivElement>) => {
		if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget as Node)) {
			return;
		}

		focusInside = false;
	};

	$effect(() => registerToastViewport(group, { duration }));

	$effect(() => {
		if (expanded) {
			pauseToastGroup(group);
			return;
		}

		resumeToastGroup(group);
	});
</script>

{#if renderedToasts.length}
	<div
		bind:this={rootElement}
		class={rootClass}
		role="region"
		aria-label="Notification center"
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		onfocusin={handleFocusIn}
		onfocusout={handleFocusOut}
	>
		<ol class="tst-list" aria-label="Notifications">
			{#each renderedToasts as item, index (item.id)}
				<li
					class="tst-shell"
					style={`--toast-index:${index};`}
					animate:flip={{ duration: 180, easing: cubicOut }}
					in:fly={{ y: -20, opacity: 0, duration: 180, easing: cubicOut }}
					out:fly={{ y: -10, opacity: 0, duration: 150, easing: cubicOut }}
				>
					<ToastItem {item} {prompt} {closeButton} ondismiss={dismissToast} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
