<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Toast, toast } from '$lib/components';

	const showSuccessToast = () => {
		toast.success({
			title: 'Campaign scheduled',
			description: 'The launch email is queued for April 12 at 9:00 AM.'
		});
	};

	const showInfoToast = () => {
		toast.info({
			title: 'Preview ready',
			description: 'The release note preview has been refreshed for your team.'
		});
	};

	const showPromiseToast = () => {
		void toast.promise(
			new Promise((resolve) => {
				setTimeout(() => resolve('Launch summary exported.'), 800);
			}),
			{
				loading: { title: 'Exporting summary', description: 'Building the latest launch handoff.' },
				success: (message) => ({ title: 'Export complete', description: String(message) }),
				error: { title: 'Export failed', description: 'Try the export again in a few seconds.' }
			}
		);
	};

	const basicSnippet = `<script lang="ts">
		import { Button, Toast, toast } from '$lib/components';

		const notify = () => {
			toast.success({
				title: 'Campaign scheduled',
				description: 'The launch email is queued for tomorrow morning.'
			});
		};
	<\/script>

	<Toast />
	<Button onclick={notify}>Show toast</Button>`;
</script>

<ComponentDocsPage
	slug="toast"
	title="Toast"
	subtitle="A transient notification system for updates, actions, and async work."
	description="Sprix toast component examples."
	{basicSnippet}
>
	{#snippet live()}
		<Toast />

		<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
			<Button onclick={showSuccessToast}>Show success toast</Button>
			<Button role="secondary" variant="outline" onclick={showInfoToast}>Show info toast</Button>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Promise Updates"
			subtitle="Use the toast API to reflect loading, success, and failure across async work."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Button role="secondary" variant="outline" onclick={showPromiseToast}
					>Run async toast</Button
				>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
