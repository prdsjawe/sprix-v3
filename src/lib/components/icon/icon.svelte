<script lang="ts">
	let { name, class: className }: Partial<Icon.Props> = $props();
	let IconComponent = $state<typeof import('svelte').SvelteComponent | null>(null);

	$effect(() => {
		if (!name) {
			IconComponent = null;
			return;
		}

		import(`./icons/${name}.svg?component`).then((module) => {
			IconComponent = module.default;
		});
	});
</script>

{#if IconComponent}
	<IconComponent class={className} />
{/if}
