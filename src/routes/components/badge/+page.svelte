<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Badge } from '$lib/components';
	<\/script>

	<Badge role="success" variant="pill-color">Ready to ship</Badge>`;
</script>

<ComponentDocsPage
	slug="badge"
	title="Badge"
	subtitle="A compact label for status, counts, and lightweight metadata."
	description="Sprix badge component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
			<Badge role="primary" variant="modern">Components</Badge>
			<Badge role="success" variant="pill-color">Ready to ship</Badge>
			<Badge role="warning" variant="badge-color">Needs review</Badge>
			<Badge role="secondary" variant="pill" rightIcon="arrow-right">View rollout</Badge>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Roles and Variants"
			subtitle="Match the badge tone to the meaning of the message."
		>
			<div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="badge">Starter</Badge>
				<Badge role="secondary" variant="pill">Beta</Badge>
				<Badge role="success" variant="badge-color">Healthy</Badge>
				<Badge role="warning" variant="pill-color">Attention</Badge>
				<Badge role="danger" variant="modern">Blocked</Badge>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
