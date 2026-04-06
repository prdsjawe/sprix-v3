<script lang="ts">
	import { onMount } from 'svelte';
	import { Icon, Toggle } from '$lib/components';
	import { applyTheme, isTheme, readTheme, setTheme } from '$lib/theme';

	let { class: className = '', ariaLabel = 'Toggle dark mode' }: App.Components.DarkModeProps =
		$props();

	let isDark = $state(false);

	const resolveTheme = () => {
		if (typeof document === 'undefined') {
			return readTheme();
		}

		const root = document.documentElement;
		const rootTheme = root.dataset.theme ?? null;

		if (isTheme(rootTheme)) {
			return rootTheme;
		}

		if (root.classList.contains('dark')) {
			return 'dark';
		}

		return readTheme();
	};

	const handleToggleChange = (event: Event) => {
		const target = event.currentTarget;

		if (!(target instanceof HTMLInputElement)) {
			return;
		}

		isDark = target.checked;
		setTheme(isDark ? 'dark' : 'light');
	};

	onMount(() => {
		const theme = resolveTheme();
		isDark = theme === 'dark';
		applyTheme(theme);
	});
</script>

<div class={`flex items-center gap-2 ${className}`.trim()}>
	<Icon
		name="sun"
		class="size-6 fill-transparent stroke-gray-500 stroke-2 transition-colors dark:stroke-zinc-300"
	/>
	<Toggle size="sm" checked={isDark} {ariaLabel} onchange={handleToggleChange} />
	<Icon
		name="moon"
		class="size-6 fill-transparent stroke-gray-500 stroke-2 transition-colors dark:stroke-zinc-300"
	/>
</div>
