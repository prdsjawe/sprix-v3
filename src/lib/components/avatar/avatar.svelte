<script lang="ts">
	import './avatar.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { ASC } from './avatar.record';

	let {
		id = '',
		src = '',
		name = '',
		alt = '',
		size = 'md',
		class: className = '',
		onload,
		onerror
	}: Partial<Avatar.Props> = $props();

	let imageFailed = $state(false);

	$effect(() => {
		src;
		imageFailed = false;
	});

	const getInitials = (value: string) => {
		let trimmed = value.trim();

		if (!trimmed) return '';

		let words = trimmed.split(/\s+/).slice(0, 2);

		if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

		return words
			.map((word) => word[0] || '')
			.join('')
			.slice(0, 2)
			.toUpperCase();
	};

	let resolvedAlt = $derived(alt || name);
	let hasImage = $derived(Boolean(src) && !imageFailed);
	let fallbackText = $derived(getInitials(name || alt));
	let avatarClass = $derived(classnames('avatar', ASC[size], className));

	const handleLoad = (event: Event) => {
		onload?.(event as Utils.DOMEvent<HTMLImageElement>);
	};

	const handleError = (event: Event) => {
		imageFailed = true;
		onerror?.(event as Utils.DOMEvent<HTMLImageElement>);
	};
</script>

<span
	id={id || undefined}
	class={avatarClass}
	role={!hasImage && resolvedAlt ? 'img' : undefined}
	aria-label={!hasImage && resolvedAlt ? resolvedAlt : undefined}
>
	{#if hasImage}
		<img
			class="avatar-image"
			{src}
			alt={resolvedAlt}
			draggable="false"
			onload={handleLoad}
			onerror={handleError}
		/>
	{:else if fallbackText}
		<span class="avatar-fallback" aria-hidden="true">{fallbackText}</span>
	{:else}
		<span class="avatar-icon" aria-hidden="true">
			<Icon name="user" class="" />
		</span>
	{/if}
</span>
