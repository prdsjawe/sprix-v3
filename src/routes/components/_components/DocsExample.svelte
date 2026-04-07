<script lang="ts">
	import { Card } from '$lib/components';

	let {
		title,
		subtitle = '',
		children
	}: {
		title: string;
		subtitle?: string;
		children: Utils.Snippet;
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<h4 class="text-lg font-semibold">{title}</h4>
			{#if subtitle}
				<p class="text-sm text-app-text-muted">{subtitle}</p>
			{/if}
		</div>

		<Card
			class="flex min-h-80 w-full items-center justify-center rounded-3xl border-app-border bg-app-surface"
		>
			{@render children()}
		</Card>
	</div>
</div>
