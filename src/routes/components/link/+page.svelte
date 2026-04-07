<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Link } from '$lib/components';

	const basicSnippet = `<script lang="ts">
		import { Link } from '$lib/components';
	<\/script>

	<Link href="/components" rightIcon="arrow-right">Browse components</Link>`;
</script>

<ComponentDocsPage
	slug="link"
	title="Link"
	subtitle="A navigational text primitive with optional leading and trailing icons."
	description="Sprix link component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4">
			<Link href="/components" rightIcon="arrow-right">Browse components</Link>
			<Link href="/showcase" rightIcon="arrow-top-right-on-square">View showcase</Link>
			<Link href="/" leftIcon="home">Back home</Link>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Inline Use"
			subtitle="Use links inline when the next step is navigational rather than confirmational."
		>
			<div class="mx-auto max-w-2xl text-center text-sm text-app-text-muted">
				Read the <Link href="/components/button">Button docs</Link> before wiring primary actions into
				a launch flow.
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
