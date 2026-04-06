<script lang="ts">
	import {
		Breadcrumb,
		Button,
		Card,
		Empty,
		Field,
		Input,
		Slider,
		Textarea,
		Toggle
	} from '$lib/components';

	const breadcrumbItems: Breadcrumb.Item[] = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Content', href: '/components' },
		{ label: 'New article', current: true }
	];

	let articleTitle = $state('April release notes');
	let articleSummary = $state(
		'A short update covering shipping improvements, billing changes, and the latest product fixes.'
	);
	let publishImmediately = $state(false);
	let emphasis = $state([72]);
</script>

<div class="grid gap-4 xl:grid-cols-2">
	<Card title="Editor" class="rounded-3xl border-app-border bg-app-surface">
		<div class="grid gap-5">
			<Breadcrumb items={breadcrumbItems} />

			<div class="grid gap-4">
				<Field label="Article title" name="cms-title">
					<Input bind:value={articleTitle} placeholder="Enter article title" />
				</Field>

				<Field label="Summary" name="cms-summary">
					<Textarea bind:value={articleSummary} rows={5} resize="vertical" />
				</Field>

				<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
					<div class="space-y-3">
						<div class="flex items-center justify-between gap-3">
							<p class="text-sm font-medium text-app-text">Hero emphasis</p>
							<p class="text-sm text-app-text-subtle">{emphasis[0]}%</p>
						</div>
						<Slider bind:value={emphasis} ariaLabel="Hero emphasis" />
					</div>
				</div>

				<Field label="Publish immediately" name="cms-publish" orientation="horizontal">
					<Toggle bind:checked={publishImmediately} />
				</Field>
			</div>
		</div>

		{#snippet footer()}
			<div class="mt-4 flex flex-wrap justify-end gap-3">
				<Button role="secondary" variant="outline">Save draft</Button>
				<Button>Publish</Button>
			</div>
		{/snippet}
	</Card>

	<Card title="Media" class="rounded-3xl border-app-border bg-app-surface">
		<Empty
			align="center"
			icon="document-plus"
			eyebrow="No assets yet"
			title="Upload your first asset"
			description="Add images, video, or PDFs to build this article."
		>
			<div
				class="rounded-2xl border border-dashed border-app-border px-4 py-3 text-sm text-app-text-subtle"
			>
				Drop files here or browse the library.
			</div>
		</Empty>

		{#snippet footer()}
			<div class="mt-4 flex justify-center">
				<Button leftIcon="cloud-arrow-up">Upload media</Button>
			</div>
		{/snippet}
	</Card>
</div>
