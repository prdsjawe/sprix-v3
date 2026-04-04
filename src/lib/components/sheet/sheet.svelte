<script lang="ts">
	import './sheet.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { SDC, SZC } from './sheet.record';

	let {
		id = '',
		open = $bindable(false),
		title = '',
		description = '',
		ariaLabel = '',
		side = 'right',
		size = 'md',
		dismissible = true,
		showClose = true,
		closeLabel = 'Close sheet',
		class: className = '',
		children,
		onclose
	}: Partial<Sheet.Props> = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);
	let scrollbarInset = $state(0);

	let resolvedId = $derived.by(() => {
		const source = id || title || description || 'sheet';
		return source
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	});
	let titleId = $derived(title ? `${resolvedId}-title` : '');
	let descriptionId = $derived(description ? `${resolvedId}-description` : '');
	let bodyId = $derived(children ? `${resolvedId}-body` : '');
	let describedBy = $derived([descriptionId, bodyId].filter(Boolean).join(' ') || undefined);
	let hasHeader = $derived(Boolean(title || description));
	let hasBody = $derived(Boolean(children));
	let sheetClass = $derived(classnames('sht', SDC[side], SZC[size], className));
	let headerClass = $derived(classnames('sht-header', !hasHeader && 'sht-header-actions'));
	let bodyClass = $derived(
		classnames('sht-body', hasHeader ? 'sht-body-with-header' : 'sht-body-standalone')
	);
	let sheetStyle = $derived(`padding-right: calc(0.375rem + ${scrollbarInset}px);`);

	const syncScrollbarInset = () => {
		const root = document.documentElement;
		const body = document.body;
		const viewportIsScrollable =
			Math.max(root.scrollHeight, body.scrollHeight, root.offsetHeight, body.offsetHeight) >
			window.innerHeight;

		if (!viewportIsScrollable) {
			scrollbarInset = 0;
			return;
		}

		const scrollbarWidth = Math.max(window.innerWidth - root.clientWidth, 0);

		// Overlay scrollbars can report zero width, so keep a small safety inset when the page scrolls.
		scrollbarInset = Math.max(scrollbarWidth, 12);
	};

	const closeSheet = () => {
		open = false;
	};

	const handleNativeClose = () => {
		if (open) {
			open = false;
		}
	};

	const handleDismissRequest = (event: Utils.DOMEvent<HTMLDialogElement>) => {
		event.preventDefault();

		if (!dismissible) {
			return;
		}

		onclose?.();
		closeSheet();
	};

	const handleBackdropClick = (event: Utils.MouseEvent<HTMLDialogElement>) => {
		if (!dismissible) {
			return;
		}

		const target = event.target;

		if (target instanceof Element && target.closest('.sht-panel')) {
			return;
		}

		onclose?.();
		closeSheet();
	};

	const handleCloseClick = () => {
		onclose?.();
		closeSheet();
	};

	$effect(() => {
		if (!dialogElement) {
			return;
		}

		if (open) {
			if (!dialogElement.open) {
				dialogElement.showModal();
			}

			return;
		}

		if (dialogElement.open) {
			dialogElement.close();
		}
	});

	$effect(() => {
		if (!open) {
			scrollbarInset = 0;
			return;
		}

		syncScrollbarInset();

		const resizeObserver = new ResizeObserver(() => {
			syncScrollbarInset();
		});

		resizeObserver.observe(document.documentElement);
		resizeObserver.observe(document.body);
		window.addEventListener('resize', syncScrollbarInset);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', syncScrollbarInset);
		};
	});
</script>

<dialog
	bind:this={dialogElement}
	class={sheetClass}
	style={sheetStyle}
	aria-labelledby={titleId || undefined}
	aria-describedby={describedBy}
	aria-label={title ? undefined : ariaLabel || 'Sheet'}
	onclose={handleNativeClose}
	oncancel={handleDismissRequest}
	onclick={handleBackdropClick}
>
	<div class="sht-shell">
		<div class="sht-panel">
			{#if hasHeader || (showClose && dismissible)}
				<div class={headerClass}>
					{#if hasHeader}
						<div class="sht-copy">
							{#if title}
								<h2 id={titleId} class="sht-title">{title}</h2>
							{/if}

							{#if description}
								<p id={descriptionId} class="sht-description">{description}</p>
							{/if}
						</div>
					{/if}

					{#if showClose && dismissible}
						<button type="button" class="sht-close" aria-label={closeLabel} onclick={handleCloseClick}>
							<Icon name="x-mark" class="" />
						</button>
					{/if}
				</div>
			{/if}

			{#if hasBody}
				<div id={bodyId || undefined} class={bodyClass}>
					{@render children?.()}
				</div>
			{/if}
		</div>
	</div>
</dialog>
