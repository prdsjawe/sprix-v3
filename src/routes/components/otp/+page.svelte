<script lang="ts">
	import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';
	import DocsExample from '../_components/DocsExample.svelte';
	import { Otp } from '$lib/components';

	let code = $state('');
	let backupCode = $state('');

	const basicSnippet = `<script lang="ts">
		import { Otp } from '$lib/components';

		let value = $state('');
	<\/script>

	<Otp bind:value={value} length={6} ariaLabel="Verification code" />`;
</script>

<ComponentDocsPage
	slug="otp"
	title="OTP"
	subtitle="A segmented verification input for short confirmation codes."
	description="Sprix otp component examples."
	{basicSnippet}
>
	{#snippet live()}
		<div class="mx-auto w-full max-w-md">
			<Otp bind:value={code} length={6} ariaLabel="Verification code" />
		</div>
	{/snippet}

	{#snippet examples()}
		<DocsExample
			title="States"
			subtitle="Use invalid and disabled states to reflect delivery and retry flows."
		>
			<div class="mx-auto grid w-full max-w-md gap-4">
				<Otp bind:value={backupCode} length={4} ariaLabel="Backup verification code" invalid />
				<Otp value="4821" length={4} ariaLabel="Disabled verification code" disabled />
			</div>
		</DocsExample>
	{/snippet}
</ComponentDocsPage>
