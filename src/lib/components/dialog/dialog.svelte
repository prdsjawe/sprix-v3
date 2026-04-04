<script lang="ts">
	import './dialog.css';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { DSC } from './dialog.record';

	let {
		id = '',
		open = $bindable(false),
		title = '',
		description = '',
		ariaLabel = '',
		size = 'md',
		dismissible = true,
		showClose = true,
		closeLabel = 'Close dialog',
		class: className = '',
		children,
		footer,
		onclose
	}: Partial<Dialog.Props> = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);

	let resolvedId = $derived.by(() => {
		const source = id || title || description || 'dialog';
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
	let hasFooter = $derived(Boolean(footer));
	let dialogClass = $derived(classnames('dlg', DSC[size], className));
	let headerClass = $derived(classnames('dlg-header', !hasHeader && 'dlg-header-actions'));
	let bodyClass = $derived(
		classnames('dlg-body', hasHeader ? 'dlg-body-divided' : 'dlg-body-standalone')
	);
	let footerClass = $derived(
		classnames(
			'dlg-footer',
			hasHeader || hasBody ? 'dlg-footer-divided' : 'dlg-footer-standalone'
		)
	);

	const closeDialog = () => {
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
		closeDialog();
	};

	const handleBackdropClick = (event: Utils.MouseEvent<HTMLDialogElement>) => {
		if (event.target !== event.currentTarget || !dismissible) {
			return;
		}

		onclose?.();
		closeDialog();
	};

	const handleCloseClick = () => {
		onclose?.();
		closeDialog();
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
</script>

<dialog
	bind:this={dialogElement}
	class={dialogClass}
	aria-labelledby={titleId || undefined}
	aria-describedby={describedBy}
	aria-label={title ? undefined : ariaLabel || 'Dialog'}
	onclose={handleNativeClose}
	oncancel={handleDismissRequest}
	onclick={handleBackdropClick}
>
	<div class="dlg-shell">
		{#if hasHeader || (showClose && dismissible)}
			<div class={headerClass}>
				{#if hasHeader}
					<div class="dlg-copy">
						<div class="dlg-heading">
							{#if title}
								<h2 id={titleId} class="dlg-title">{title}</h2>
							{/if}

							{#if showClose && dismissible}
								<button
									type="button"
									class="dlg-close"
									aria-label={closeLabel}
									onclick={handleCloseClick}
								>
									<Icon name="x-mark" class="" />
								</button>
							{/if}
						</div>

						{#if description}
							<p id={descriptionId} class="dlg-description">{description}</p>
						{/if}
					</div>
				{:else if showClose && dismissible}
					<button
						type="button"
						class="dlg-close"
						aria-label={closeLabel}
						onclick={handleCloseClick}
					>
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

		{#if hasFooter}
			<div class={footerClass}>
				{@render footer?.()}
			</div>
		{/if}
	</div>
</dialog>
