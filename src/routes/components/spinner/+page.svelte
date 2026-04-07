<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Spinner } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Spinner } from '$lib/components';
	<\/script>

	<Spinner ariaLabel="Loading" />`;
</script>

<ComponentDocsPage
	slug="spinner"
	title="Spinner"
	subtitle="A loading indicator for short waits and background work."
	description="Sprix spinner component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl items-center justify-center gap-6">
			<Spinner size="sm" ariaLabel="Loading small" />
			<Spinner size="md" ariaLabel="Loading medium" />
			<Spinner size="lg" ariaLabel="Loading large" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Roles"
			subtitle="Match the spinner tone to the surrounding action or surface."
		>
			<div class="mx-auto flex w-full max-w-4xl items-center justify-center gap-6">
				<Spinner role="primary" ariaLabel="Primary loading" />
				<Spinner role="success" ariaLabel="Success loading" />
				<Spinner role="warning" ariaLabel="Warning loading" />
				<Spinner role="danger" ariaLabel="Danger loading" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
