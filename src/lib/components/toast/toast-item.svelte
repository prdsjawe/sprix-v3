<script lang="ts">
	import './toast.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { TIC, TPC, TTC } from './toast.record';

	const FALLBACK_ITEM: Toast.Item = {
		id: '',
		title: '',
		description: '',
		type: 'default',
		duration: 4500,
		dismissible: true,
		group: 'default',
		actionLabel: '',
		createdAt: 0
	};

	let {
		item = FALLBACK_ITEM,
		prompt = 'color',
		closeButton = true,
		ondismiss
	}: Partial<ToastItem.Props> = $props();

	let iconName = $derived(TIC[item.type]);
	let itemClass = $derived(classnames('tst-item', TTC[item.type], TPC[prompt]));

	const handleDismiss = () => {
		ondismiss?.(item.id);
	};

	const handleAction = () => {
		item.onaction?.();
		ondismiss?.(item.id);
	};
</script>

<article
	class={itemClass}
	role={item.type === 'warning' || item.type === 'error' ? 'alert' : 'status'}
	aria-live={item.type === 'warning' || item.type === 'error' ? 'assertive' : 'polite'}
>
	{#if closeButton && item.dismissible}
		<button
			type="button"
			class="tst-close"
			aria-label="Dismiss notification"
			onclick={handleDismiss}
		>
			<Icon name="x-mark" class="" />
		</button>
	{/if}

	<div class="tst-icon" aria-hidden="true">
		<Icon name={iconName} class="" />
	</div>

	<div class="tst-copy">
		<p class="tst-title">{item.title}</p>

		{#if item.description}
			<p class="tst-description">{item.description}</p>
		{/if}

		{#if item.actionLabel && item.onaction}
			<div class="tst-meta">
				<button type="button" class="tst-action" onclick={handleAction}>
					{item.actionLabel}
				</button>
			</div>
		{/if}
	</div>
</article>
