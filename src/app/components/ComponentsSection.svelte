<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
		Avatar,
		Badge,
		Button,
		Card,
		Checkbox,
		Input,
		Kbd,
		Link,
		Progress,
		Radio,
		Tabs,
		Textarea,
		Toggle
	} from '$lib/components';

	const previewCardClass = 'h-full rounded-3xl border-app-border bg-app-surface text-app-text';

	const previewTabs = [
		{ value: 'inputs', label: 'Inputs' },
		{ value: 'feedback', label: 'Feedback' },
		{ value: 'layout', label: 'Layout' }
	] satisfies Tabs.Item[];

	let alertsChecked = $state(true);
	let digestChecked = $state(false);
	let notificationsEnabled = $state(true);
	let publishTarget = $state('team');
	let activePreviewTab = $state('inputs');
	let openPreviewAccordion = $state('shipping');
	let textareaValue = $state('Ready for review. Assets are attached and billing is confirmed.');
</script>

<section
	class="border-b border-app-border bg-app-bg py-16 text-app-text transition-colors sm:py-20 lg:py-24"
>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
		<div class="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<div class="space-y-4">
				<Badge role="primary" variant="modern">Components</Badge>

				<div class="space-y-3">
					<h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
						Ready to compose.
					</h2>
					<p class="max-w-3xl text-base leading-7 text-app-text-muted sm:text-lg">
						A tighter slice of the library: actions, forms, navigation, and feedback primitives
						already shaped for real screens.
					</p>
				</div>
			</div>

			<div class="md:justify-self-end">
				<Link href="/components" rightIcon="arrow-right">Browse components</Link>
			</div>
		</div>
	</div>
</section>
