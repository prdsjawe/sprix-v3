<script lang="ts">
	import { Link, Tabs } from '$lib/components';
	import AuthenticationExample from './AuthenticationExample.svelte';
	import CmsExample from './CmsExample.svelte';
	import DashboardExample from './DashboardExample.svelte';
	import ExampleAppShell from './ExampleAppShell.svelte';
	import PaymentExample from './PaymentExample.svelte';

	const exampleTabs = [
		{ value: 'payment', label: 'Payment' },
		{ value: 'authentication', label: 'Authentication' },
		{ value: 'dashboard', label: 'Dashboard' },
		{ value: 'cms', label: 'CMS' }
	] satisfies Tabs.Item[];

	let activeExample = $state('payment');

	const paymentSidebar = [
		{ id: 'overview', label: 'Overview', icon: 'home' },
		{ id: 'payment-methods', label: 'Payment methods', icon: 'credit-card', active: true },
		{ id: 'billing', label: 'Billing', icon: 'document-currency-dollar' },
		{ id: 'history', label: 'History', icon: 'clipboard-document-list' }
	] as const;

	const dashboardSidebar = [
		{ id: 'overview', label: 'Overview', icon: 'home', active: true },
		{ id: 'operations', label: 'Operations', icon: 'chart-bar' },
		{ id: 'teams', label: 'Teams', icon: 'building-office' },
		{ id: 'reports', label: 'Reports', icon: 'document-chart-bar' }
	] as const;

	const cmsSidebar = [
		{ id: 'drafts', label: 'Drafts', icon: 'document-text' },
		{ id: 'editor', label: 'Editor', icon: 'pencil-square', active: true },
		{ id: 'media', label: 'Media', icon: 'folder' },
		{ id: 'publishing', label: 'Publishing', icon: 'paper-airplane' }
	] as const;
</script>

<section
	class="border-b border-app-border bg-app-surface py-16 text-app-text transition-colors sm:py-20 lg:py-24"
>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
		<div class="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<div class="space-y-3">
				<h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
					Product screens built with Sprix.
				</h2>
				<p class="max-w-3xl text-base leading-7 text-app-text-muted sm:text-lg">
					Payment, authentication, dashboard, and CMS flows composed from the same system.
				</p>
			</div>

			<div class="md:justify-self-end">
				<Link href="/showcase" rightIcon="arrow-top-right-on-square">View showcase</Link>
			</div>
		</div>

		<Tabs
			variant="underline"
			items={exampleTabs}
			bind:value={activeExample}
			ariaLabel="Examples showcase"
		/>

		<div class="min-h-96">
			{#if activeExample === 'payment'}
				<ExampleAppShell
					appName="Sprix Billing"
					pageTitle="Checkout"
					statusLabel="Ready to charge"
					sidebarTitle="Billing"
					sidebarItems={paymentSidebar}
					secondaryActionLabel="Save draft"
					primaryActionLabel="Submit payment"
				>
					<PaymentExample />
				</ExampleAppShell>
			{:else if activeExample === 'authentication'}
				<AuthenticationExample />
			{:else if activeExample === 'dashboard'}
				<ExampleAppShell
					appName="Sprix Ops"
					pageTitle="Operations dashboard"
					statusLabel="Live"
					sidebarTitle="Workspace"
					sidebarItems={dashboardSidebar}
					secondaryActionLabel="Export report"
					primaryActionLabel="Create update"
				>
					<DashboardExample />
				</ExampleAppShell>
			{:else}
				<ExampleAppShell
					appName="Sprix CMS"
					pageTitle="Article editor"
					statusLabel="Autosaved"
					sidebarTitle="Content"
					sidebarItems={cmsSidebar}
					secondaryActionLabel="Preview"
					primaryActionLabel="Publish"
				>
					<CmsExample />
				</ExampleAppShell>
			{/if}
		</div>
	</div>
</section>
