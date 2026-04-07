<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Badge, Table, TBody, TColumn, THeader, TRow } from '$lib/components';

	const rows = [
		{ campaign: 'Homepage banner', owner: 'Emma Li', status: 'Ready' },
		{ campaign: 'Lifecycle email', owner: 'Lara Ong', status: 'Reviewing' },
		{ campaign: 'Help center update', owner: 'Mina Park', status: 'Drafting' }
	];

	const basicSnippet = `<script lang="ts">
		import { Table, TBody, TColumn, THeader, TRow } from '$lib/components';
	<\/script>

	<Table ariaLabel="Launch tasks">
		<THeader>
			<TRow>
				<TColumn>Task</TColumn>
				<TColumn>Owner</TColumn>
			</TRow>
		</THeader>
		<TBody>
			<TRow>
				<TColumn>Launch brief</TColumn>
				<TColumn>Emma Li</TColumn>
			</TRow>
		</TBody>
	</Table>`;
</script>

<ComponentDocsPage
	slug="table"
	title="Table"
	subtitle="A semantic table primitive for structured row and column data."
	description="Sprix table component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div
			class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border bg-app-surface"
		>
			<Table ariaLabel="Launch campaign status">
				<THeader>
					<TRow>
						<TColumn>Campaign</TColumn>
						<TColumn>Owner</TColumn>
						<TColumn>Status</TColumn>
					</TRow>
				</THeader>
				<TBody>
					{#each rows as row}
						<TRow>
							<TColumn>{row.campaign}</TColumn>
							<TColumn>{row.owner}</TColumn>
							<TColumn>
								<Badge role={row.status === 'Ready' ? 'success' : 'secondary'} variant="pill-color">
									{row.status}
								</Badge>
							</TColumn>
						</TRow>
					{/each}
				</TBody>
			</Table>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Compact Summary"
			subtitle="Use a minimal table for dense operational lists."
		>
			<div
				class="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-app-border bg-app-surface"
			>
				<Table ariaLabel="Compact launch ownership">
					<TBody>
						{#each rows as row}
							<TRow>
								<TColumn>{row.campaign}</TColumn>
								<TColumn>{row.owner}</TColumn>
							</TRow>
						{/each}
					</TBody>
				</Table>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
