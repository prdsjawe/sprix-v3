<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Pagination } from '$lib/components';

	let currentPage = $state(6);
	let compactPage = $state(2);

	const basicSnippet = `<script lang="ts">
		import { Pagination } from '$lib/components';

		let page = $state(3);
	<\/script>

	<Pagination count={12} page={page} onpagechange={(nextPage) => (page = nextPage)} />`;
</script>

<ComponentDocsPage
	slug="pagination"
	title="Pagination"
	subtitle="A page navigator for lists, tables, and archive views."
	description="Sprix pagination component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto flex w-full max-w-4xl justify-center">
			<Pagination
				count={18}
				page={currentPage}
				onpagechange={(nextPage) => (currentPage = nextPage)}
			/>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Compact Size"
			subtitle="Reduce the control size for dense dashboards and side panels."
		>
			<div class="mx-auto flex w-full max-w-4xl justify-center">
				<Pagination
					count={8}
					page={compactPage}
					size="sm"
					siblingCount={0}
					onpagechange={(nextPage) => (compactPage = nextPage)}
				/>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
