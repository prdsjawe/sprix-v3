<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { CodeSnippet } from '$lib/components';

	const installSnippet = `pnpm add sprix-v3`;

	const longSnippet = `<Card title="Launch status" description="Everything is ready">
		<Badge role="success" variant="pill-color">Ready to ship</Badge>
	</Card>`;

	const basicSnippet = `<script lang="ts">
		import { CodeSnippet } from '$lib/components';

		const code = \`pnpm add sprix-v3\`;
	<\/script>

	<CodeSnippet code={code} language="bash" />`;
</script>

<ComponentDocsPage
	slug="code-snippet"
	title="Code Snippet"
	subtitle="A formatted code block for examples, setup guides, and API references."
	description="Sprix code snippet component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-4xl">
			<CodeSnippet filename="install.sh" language="bash" code={installSnippet} />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Wrapped Content"
			subtitle="Show line numbers or wrapped content when the example needs more room."
		>
			<div class="mx-auto grid w-full max-w-4xl gap-4">
				<CodeSnippet
					filename="+page.svelte"
					language="svelte"
					code={longSnippet}
					wrap
					showLineNumbers
				/>
				<CodeSnippet size="xs" language="bash" code="pnpm run check" />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
