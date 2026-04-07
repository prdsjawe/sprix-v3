<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Button, Field, Form, Input } from '$lib/components';

	let formName = $state('');
	let formEmail = $state('');

	const formErrors = {
		email: 'Use a work email before inviting teammates.'
	};

	const basicSnippet = `<script lang="ts">
		import { Button, Field, Form, Input } from '$lib/components';

		let name = $state('');
	<\/script>

	<Form class="grid gap-4">
		<Field label="Project name" name="name">
			<Input bind:value={name} placeholder="Spring launch" />
		</Field>

		<Button type="submit">Create project</Button>
	</Form>`;
</script>

<ComponentDocsPage
	slug="form"
	title="Form"
	subtitle="A submission wrapper that distributes validation state to its fields."
	description="Sprix form component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-xl">
			<Form class="grid gap-4">
				<Field label="Project name" name="name" helper="Keep it short and readable.">
					<Input bind:value={formName} placeholder="Spring launch" />
				</Field>

				<Field label="Invite email" name="email">
					<Input bind:value={formEmail} type="email" placeholder="team@sprix.dev" />
				</Field>

				<div class="flex justify-end">
					<Button type="submit">Create workspace</Button>
				</div>
			</Form>
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="Validation Errors"
			subtitle="Pass form errors once and let each field read the message by name."
		>
			<div class="mx-auto w-full max-w-xl">
				<Form class="grid gap-4" errors={formErrors}>
					<Field label="Invite email" name="email">
						<Input bind:value={formEmail} type="email" placeholder="team@sprix.dev" />
					</Field>

					<div class="flex justify-end">
						<Button role="secondary" variant="outline" type="submit">Send invite</Button>
					</div>
				</Form>
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
