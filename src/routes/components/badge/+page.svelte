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
		<DocsExample title="Badge" subtitle="Default badge styling across all roles.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="badge">Primary</Badge>
				<Badge role="secondary" variant="badge">Secondary</Badge>
				<Badge role="tertiary" variant="badge">Tertiary</Badge>
				<Badge role="success" variant="badge">Success</Badge>
				<Badge role="warning" variant="badge">Warning</Badge>
				<Badge role="danger" variant="badge">Danger</Badge>
			</div>
		</DocsExample>

		<DocsExample title="Pill" subtitle="Rounded pill styling across all roles.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="pill">Primary</Badge>
				<Badge role="secondary" variant="pill">Secondary</Badge>
				<Badge role="tertiary" variant="pill">Tertiary</Badge>
				<Badge role="success" variant="pill">Success</Badge>
				<Badge role="warning" variant="pill">Warning</Badge>
				<Badge role="danger" variant="pill">Danger</Badge>
			</div>
		</DocsExample>

		<DocsExample title="Badge Color" subtitle="Filled badge styling across all roles.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="badge-color">Primary</Badge>
				<Badge role="secondary" variant="badge-color">Secondary</Badge>
				<Badge role="tertiary" variant="badge-color">Tertiary</Badge>
				<Badge role="success" variant="badge-color">Success</Badge>
				<Badge role="warning" variant="badge-color">Warning</Badge>
				<Badge role="danger" variant="badge-color">Danger</Badge>
			</div>
		</DocsExample>

		<DocsExample title="Pill Color" subtitle="Filled pill styling across all roles.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="pill-color">Primary</Badge>
				<Badge role="secondary" variant="pill-color">Secondary</Badge>
				<Badge role="tertiary" variant="pill-color">Tertiary</Badge>
				<Badge role="success" variant="pill-color">Success</Badge>
				<Badge role="warning" variant="pill-color">Warning</Badge>
				<Badge role="danger" variant="pill-color">Danger</Badge>
			</div>
		</DocsExample>

		<DocsExample title="Modern" subtitle="Modern styling across all roles.">
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Badge role="primary" variant="modern">Primary</Badge>
				<Badge role="secondary" variant="modern">Secondary</Badge>
				<Badge role="tertiary" variant="modern">Tertiary</Badge>
				<Badge role="success" variant="modern">Success</Badge>
				<Badge role="warning" variant="modern">Warning</Badge>
				<Badge role="danger" variant="modern">Danger</Badge>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
