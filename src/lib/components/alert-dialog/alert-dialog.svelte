<script lang="ts">
	import './alert-dialog.css';
	import Button from '../button/button.svelte';
	import Icon from '../icon/icon.svelte';
	import classnames from '$utils/classnames';
	import { ADIC, ADTC } from './alert-dialog.record';

	let {
		id = '',
		open = $bindable(false),
		type = 'info',
		title = '',
		description = '',
		confirmLabel = 'Continue',
		cancelLabel = 'Cancel',
		confirmPrompt = '',
		dismissible = true,
		closeOnConfirm = true,
		class: className = '',
		children,
		onconfirm,
		oncancel
	}: Partial<AlertDialog.Props> = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);
	let promptValue = $state('');
	let isConfirming = $state(false);

	let resolvedId = $derived.by(() => {
		const source = id || title || description || 'alert-dialog';
		return source
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	});
	let titleId = $derived(title ? `${resolvedId}-title` : '');
	let descriptionId = $derived(description ? `${resolvedId}-description` : '');
	let bodyId = $derived(children || confirmPrompt ? `${resolvedId}-body` : '');
	let describedBy = $derived([descriptionId, bodyId].filter(Boolean).join(' ') || undefined);
	let dialogClass = $derived(classnames('ald', ADTC[type], className));
	let promptMatches = $derived(
		!confirmPrompt || promptValue.trim() === confirmPrompt.trim()
	);
	let confirmRole: Button.Role = $derived(type === 'destructive' ? 'danger' : 'primary');

	const closeDialog = () => {
		open = false;
	};

	const handleNativeClose = () => {
		if (open) {
			open = false;
		}

		promptValue = '';
		isConfirming = false;
	};

	const handleDismissRequest = (event: Utils.DOMEvent<HTMLDialogElement>) => {
		event.preventDefault();

		if (!dismissible || isConfirming) {
			return;
		}

		oncancel?.();
		closeDialog();
	};

	const handleBackdropClick = (event: Utils.MouseEvent<HTMLDialogElement>) => {
		if (event.target !== event.currentTarget || !dismissible || isConfirming) {
			return;
		}

		oncancel?.();
		closeDialog();
	};

	const handleCancelClick = () => {
		if (isConfirming) {
			return;
		}

		oncancel?.();
		closeDialog();
	};

	const handleConfirm = async () => {
		if (!promptMatches || isConfirming) {
			return;
		}

		isConfirming = true;

		try {
			const result = await onconfirm?.();

			if (result === false) {
				return;
			}

			if (closeOnConfirm) {
				closeDialog();
			}
		} catch (error) {
			console.error(error);
		} finally {
			if (open) {
				isConfirming = false;
			}
		}
	};

	const handlePromptKeydown = (event: Utils.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}

		event.preventDefault();
		void handleConfirm();
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
		if (open) {
			return;
		}

		promptValue = '';
		isConfirming = false;
	});
</script>

<dialog
	bind:this={dialogElement}
	class={dialogClass}
	aria-labelledby={titleId || undefined}
	aria-describedby={describedBy}
	aria-label={title ? undefined : confirmLabel}
	onclose={handleNativeClose}
	oncancel={handleDismissRequest}
	onclick={handleBackdropClick}
>
	<div class="ald-shell">
		<div class="ald-header">
			<span class="ald-icon" aria-hidden="true">
				<Icon name={ADIC[type]} class="" />
			</span>

			<div class="ald-copy">
				{#if title}
					<h2 id={titleId} class="ald-title">{title}</h2>
				{/if}

				{#if description}
					<p id={descriptionId} class="ald-description">{description}</p>
				{/if}
			</div>
		</div>

		{#if children || confirmPrompt}
			<div id={bodyId || undefined} class="ald-body">
				{#if children}
					<div class="ald-content">
						{@render children()}
					</div>
				{/if}

				{#if confirmPrompt}
					<label class="ald-prompt">
						<span class="ald-prompt-label">Type {confirmPrompt} to continue</span>
						<input
							bind:value={promptValue}
							class="ald-prompt-input"
							type="text"
							placeholder={confirmPrompt}
							disabled={isConfirming}
							autocapitalize="off"
							autocomplete="off"
							autocorrect="off"
							spellcheck="false"
							onkeydown={handlePromptKeydown}
						/>
					</label>
				{/if}
			</div>
		{/if}

		<div class="ald-actions">
			<Button role="secondary" variant="outline" disabled={isConfirming} onclick={handleCancelClick}>
				{cancelLabel}
			</Button>

			<Button
				role={confirmRole}
				disabled={!promptMatches}
				loading={isConfirming}
				onclick={() => void handleConfirm()}
			>
				{confirmLabel}
			</Button>
		</div>
	</div>
</dialog>
