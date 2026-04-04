<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		Accordion as UIAccordion,
		AccordionContent as UIAccordionContent,
		AccordionItem as UIAccordionItem,
		AccordionTrigger as UIAccordionTrigger,
		AlertDialog as UIAlertDialog,
		Avatar as UIAvatar,
		Badge as UIBadge,
		Breadcrumb as UIBreadcrumb,
		Button as UIButton,
		ButtonGroup as UIButtonGroup,
		Card as UICard,
		Carousel as UICarousel,
		Checkbox as UICheckbox,
		CodeSnippet as UICodeSnippet,
		ComboBox as UIComboBox,
		ComboBoxItem as UIComboBoxItem,
		Command as UICommand,
		DatePicker as UIDatePicker,
		Dialog as UIDialog,
		Empty as UIEmpty,
		Field as UIField,
		Form as UIForm,
		HoverCard as UIHoverCard,
		Input as UIInput,
		Kbd as UIKbd,
		Link as UILink,
		NavMenu as UINavMenu,
		NavMenuContents as UINavMenuContents,
		NavMenuItem as UINavMenuItem,
		NavMenuRight as UINavMenuRight,
		NavMenuTrigger as UINavMenuTrigger,
		Otp as UIOtp,
		Pagination as UIPagination,
		Popover as UIPopover,
		Progress as UIProgress,
		Radio as UIRadio,
		Separator as UISeparator,
		Select as UISelect,
		Sheet as UISheet,
		Sidebar as UISidebar,
		Slider as UISlider,
		Spinner as UISpinner,
		Tabs as UITabs,
		Table as UITable,
		TBody as UITBody,
		TColumn as UITColumn,
		TFooter as UITFooter,
		THeader as UITHeader,
		TRow as UITRow,
		Textarea as UITextarea,
		Toast as UIToast,
		Toggle as UIToggle,
		ToggleGroup as UIToggleGroup,
		Tooltip as UITooltip,
		toast
	} from '$lib/components';
	import { readTheme, setTheme } from '$lib/theme';

	const HOME_TOAST_GROUP = 'home-preview';

	let accordionValue = $state('access');
	let alertDialogOpen = $state(false);
	let checkboxChecked = $state(true);
	let carouselPage = $state(0);
	let comboValue = $state('Emma');
	let commandOpen = $state(false);
	let commandSearch = $state('');
	let commandValue = $state('open-command-docs');
	let datePickerValue = $state(['2026-04-18']);
	let dialogOpen = $state(false);
	let dialogName = $state('Pedro Duarte');
	let dialogUsername = $state('@peduarte');
	let fieldEmail = $state('team@sprix.dev');
	let otpValue = $state('482913');
	let paginationPage = $state(4);
	let radioValue = $state('pro');
	let selectValue = $state('staging');
	let sheetOpen = $state(false);
	let sidebarValue = $state('projects');
	let sidebarOpenItem = $state('projects');
	let sidebarEntryValue = $state('roadmap');
	let sliderValue = $state([72]);
	let tabsValue = $state('overview');
	let themeReady = $state(false);
	let themeIsDark = $state(false);
	let toggleChecked = $state(true);
	let toggleGroupValue = $state<ToggleGroup.Value>('week');

	const previewTabs = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'activity', label: 'Activity' },
		{ value: 'files', label: 'Files' }
	] satisfies Tabs.Item[];

	const previewToggleGroupItems = [
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' }
	] satisfies ToggleGroup.Item[];

	const previewCommandItems = [
		{
			value: 'open-command-docs',
			label: 'Open command docs',
			description: 'Review the full API, keyboard flow, and grouped item patterns.',
			group: 'Navigation',
			icon: 'command-line',
			shortcut: ['G', 'C']
		},
		{
			value: 'stage-release-note',
			label: 'Stage release note',
			description: 'Create a new launch draft with the default handoff template.',
			group: 'Actions',
			icon: 'document-plus',
			shortcut: ['N', 'R'],
			badge: 'Draft',
			keywords: ['release publish draft']
		},
		{
			value: 'assign-reviewer',
			label: 'Assign reviewer',
			description: 'Send the latest build into the review lane.',
			group: 'Actions',
			icon: 'user-plus',
			shortcut: ['A', 'R'],
			keywords: ['qa review approval']
		},
		{
			value: 'open-workspace-settings',
			label: 'Open workspace settings',
			description: 'Jump to notifications, environments, and access rules.',
			group: 'Workspace',
			icon: 'cog-6-tooth',
			shortcut: ['G', 'S'],
			keywords: ['config preferences settings']
		}
	] satisfies Command.Item[];

	const previewCarouselItems = [
		{
			id: 'brief',
			title: 'Launch brief',
			description: 'A compact showcase for release highlights, handoff cards, or product spotlights.',
			meta: 'Fits the card frame',
			tint: '#0f766e'
		},
		{
			id: 'notes',
			title: 'Review notes',
			description: 'Cards page in full-width groups instead of stretching into an unstable strip.',
			meta: 'No peeking edges',
			tint: '#2563eb'
		},
		{
			id: 'queue',
			title: 'Queue status',
			description: 'The visible set recalculates from the container width so narrow shells still behave.',
			meta: 'Auto-fit columns',
			tint: '#ea580c'
		}
	] satisfies Carousel.Item[];

	let previewCommandLabel = $derived(
		previewCommandItems.find((item) => item.value === commandValue)?.label ?? 'Use Up / Down and Enter'
	);

	const previewBreadcrumbItems = [
		{ label: 'Home', icon: 'home', href: '/' },
		{ label: 'Projects', href: '/components/sidebar' },
		{ label: 'Website redesign' },
		{ label: 'Assets' }
	] satisfies Breadcrumb.Item[];

	const previewSidebarItems = [
		{ id: 'overview', label: 'Overview', icon: 'home', hint: 'Workspace health and traffic.' },
		{
			id: 'projects',
			label: 'Projects',
			icon: 'rectangle-stack',
			hint: 'Second-column navigation for active work.',
			surface: 'multipanel',
			entries: [
				{
					id: 'roadmap',
					label: 'Roadmap',
					description: 'Quarter planning and delivery milestones.',
					icon: 'map'
				},
				{
					id: 'handoff',
					label: 'Design handoff',
					description: 'Ready-for-build screens and review notes.',
					icon: 'paint-brush'
				}
			]
		},
		{
			id: 'inbox',
			label: 'Inbox',
			icon: 'inbox',
			badge: '4',
			hint: 'Quick triage via a compact dropdown surface.',
			surface: 'dropdown',
			entries: [
				{
					id: 'mentions',
					label: 'Mentions',
					description: 'Latest requests',
					icon: 'chat-bubble-left-right'
				},
				{
					id: 'approvals',
					label: 'Approvals',
					description: 'Pending sign-offs',
					icon: 'check-badge'
				}
			]
		}
	] satisfies Sidebar.Item[];

	const previewCodeSnippet = [
		"export const sections = [",
		"\t{ id: 'overview', label: 'Overview' },",
		"\t{ id: 'examples', label: 'Examples' }",
		'];'
	].join('\n');

	const openDocs = (href: string) => {
		goto(href);
	};

	const getCarouselTint = (item: Carousel.Item) => String(item.tint ?? '#0f172a');

	onMount(() => {
		themeIsDark = readTheme() === 'dark';
		themeReady = true;
	});

	$effect(() => {
		if (!themeReady) {
			return;
		}

		setTheme(themeIsDark ? 'dark' : 'light');
	});

	const showToastPreview = () => {
		toast.success('Saved to queue', {
			group: HOME_TOAST_GROUP,
			description: 'The homepage preview toast is using the same mounted viewport as the docs.'
		});
	};
</script>

<svelte:head>
	<title>Sprix UI</title>
	<meta
		name="description"
		content="Component documentation routes for Sprix UI primitives, shown as a bordered grid with live previews."
	/>
</svelte:head>

<UIToast group={HOME_TOAST_GROUP} />

<main
	class="min-h-svh bg-linear-to-b from-slate-50 dark:from-slate-950 via-indigo-50 dark:via-indigo-950/40 to-slate-50 dark:to-slate-950 px-4 py-8 text-slate-900 dark:text-slate-100 sm:px-6 lg:px-8"
>
	<div class="mx-auto grid w-full max-w-344 gap-6">
		<section class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
			<div class="grid max-w-176 gap-2.5">
				<p class="m-0 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">Documentation</p>
				<h1 class="m-0 text-4xl leading-none tracking-tight sm:text-5xl">Components</h1>
				<p class="m-0 leading-7 text-slate-600 dark:text-slate-400">
					A compact index of the current Sprix primitives. Each card includes a quick description, one
					live instance, and a direct path into the full docs route.
				</p>
			</div>

			<div
				class="flex items-center justify-between gap-3 rounded-full border border-slate-300/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 px-4 py-3 backdrop-blur-md"
			>
				<div class="grid gap-0.5">
					<span class="text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">
						Theme
					</span>
					<p class="m-0 text-sm text-slate-600 dark:text-slate-400">
						{themeIsDark ? 'Dark mode' : 'Light mode'}
					</p>
				</div>
				<UIToggle
					size="sm"
					bind:checked={themeIsDark}
					ariaLabel="Toggle dark mode"
				/>
			</div>
		</section>

		<section class="grid gap-0 sm:grid-cols-2 lg:grid-cols-3" aria-label="Component library">
			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Accordion</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Structured disclosure for FAQs, settings, and dense reference pages.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIAccordion value={accordionValue} size="sm">
						<UIAccordionItem value="access">
							<UIAccordionTrigger>Workspace access</UIAccordionTrigger>
							<UIAccordionContent>
								<p class="m-0 leading-6 text-slate-600 dark:text-slate-400">
									Keep teams scoped by role and environment.
								</p>
							</UIAccordionContent>
						</UIAccordionItem>
					</UIAccordion>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/accordion')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Popover</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Click-driven floating card for forms, compact actions, and interactive inline workflows.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIPopover placement="top" contentClass="w-[19rem]" maxWidth="none">
						<UIButton size="sm" role="secondary" variant="soft">Share release</UIButton>

						{#snippet content()}
							<div class="grid gap-3">
								<div class="flex items-start justify-between gap-4">
									<div class="grid gap-1">
										<small class="text-[11px] font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">
											Quick action
										</small>
										<h3 class="m-0 text-sm font-semibold text-slate-950 dark:text-slate-50">Share release note</h3>
									</div>
									<span
										class="inline-flex rounded-full bg-blue-50 dark:bg-blue-950/40 px-2 py-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300"
									>
										Editor
									</span>
								</div>
								<UIInput value="launch@sprix.dev" ariaLabel="Share email" />
								<UISeparator />
								<div class="flex justify-end gap-2">
									<UIButton size="sm" role="secondary" variant="outline">Cancel</UIButton>
									<UIButton size="sm">Send</UIButton>
								</div>
							</div>
						{/snippet}
					</UIPopover>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/popover')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Hover Card</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Richer hover surface for custom HTML content that should read like a compact card.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIHoverCard placement="top" contentClass="w-[18rem]" maxWidth="none">
						<button
							type="button"
							class="inline-flex items-center gap-3 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 px-3 py-2 text-left text-sm shadow-sm"
						>
							<span
								class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-100 dark:from-blue-950/55 to-slate-200 dark:to-slate-800 text-xs font-bold text-blue-900 dark:text-blue-100"
							>
								AD
							</span>
							<span class="grid">
								<strong class="text-sm text-slate-950 dark:text-slate-50">Ana Dela Cruz</strong>
								<span class="text-sm text-slate-500 dark:text-slate-400">Design lead</span>
							</span>
						</button>

						{#snippet content()}
							<div class="grid gap-3">
								<div class="flex items-start justify-between gap-4">
									<div class="grid gap-1">
										<small class="text-[11px] font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">
											Team profile
										</small>
										<h3 class="m-0 text-sm font-semibold text-slate-950 dark:text-slate-50">Ana Dela Cruz</h3>
									</div>
									<span
										class="inline-flex rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
									>
										Online
									</span>
								</div>
								<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
									Owns the shared component library and current documentation polish pass.
								</p>
							</div>
						{/snippet}
					</UIHoverCard>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/hover-card')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Alert Dialog</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Blocking confirmation for risky actions, with prompt gating and async-safe confirm
						flows.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIButton size="sm" role="danger" onclick={() => (alertDialogOpen = true)}>
						Open dialog
					</UIButton>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/alert-dialog')}
				>
					Learn more
				</UIButton>

				<UIAlertDialog
					bind:open={alertDialogOpen}
					title="Leave review mode?"
					description="This preview uses the same alert-dialog primitive as the dedicated docs route."
					confirmLabel="Continue"
					cancelLabel="Stay here"
				>
					<p class="m-0 leading-6 text-slate-600 dark:text-slate-400">
						Use it when the next step should interrupt the flow and require an explicit choice.
					</p>
				</UIAlertDialog>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Avatar</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Identity primitive for assignee rows, team clusters, and larger profile surfaces.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<div class="flex flex-wrap items-center gap-3">
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="xs" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="md" />
						<UIAvatar src="/avatar-img.jpg" name="Pedro Duarte" alt="Pedro Duarte" size="xl" />
						<UIAvatar name="Sprix Team" size="md" />
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/avatar')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Button</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Action primitive with semantic roles, clear surface variants, and grouped controls.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIButtonGroup ariaLabel="Release actions">
						<UIButton size="sm" role="secondary" variant="outline">Preview</UIButton>
						<UIButton size="sm" role="secondary" variant="outline">Schedule</UIButton>
						<UIButton size="sm" role="primary">Ship</UIButton>
					</UIButtonGroup>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/button')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Card</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Quiet bordered container for grouped content, supporting built-in header copy and footer
						actions.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UICard
						class="max-w-72"
						title="Release note"
						description="Ship the April update after review."
					>
						{#snippet footer()}
							<UIButton size="sm" class="w-full">Open draft</UIButton>
						{/snippet}
					</UICard>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/card')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Carousel</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Viewport-first content slider that groups cards into full-width pages so the visible set
						stays clean inside the frame.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UICarousel
						id="home-preview-carousel"
						items={previewCarouselItems}
						bind:page={carouselPage}
						maxColumns={1}
						minItemWidth={220}
						gap={10}
						ariaLabel="Component preview carousel"
					>
						{#snippet slide(item)}
							<article
								class="grid gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/92 dark:bg-slate-950/92 p-3"
								style={`border-color: color-mix(in srgb, ${getCarouselTint(item)} 18%, var(--sprix-app-border-strong));`}
							>
								<span
									class="h-1.5 w-10 rounded-full"
									style={`background: ${getCarouselTint(item)};`}
								></span>
								<div class="grid gap-1">
									<h3 class="m-0 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
										{item.title}
									</h3>
									<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
								</div>
								<span class="text-xs font-medium text-slate-500 dark:text-slate-400">{item.meta}</span>
							</article>
						{/snippet}
					</UICarousel>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/carousel')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Dialog</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						General-purpose modal shell for forms, supporting context, and non-destructive secondary
						flows.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIButton size="sm" role="primary" onclick={() => (dialogOpen = true)}>
						Open dialog
					</UIButton>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/dialog')}
				>
					Learn more
				</UIButton>

				<UIDialog
					bind:open={dialogOpen}
					size="sm"
					title="Edit profile"
					description="This preview uses the same dialog primitive as the dedicated docs route."
				>
					<div class="grid gap-3">
						<UIField label="Name" name="dialog-name">
							<UIInput bind:value={dialogName} />
						</UIField>
						<UIField label="Username" name="dialog-username">
							<UIInput bind:value={dialogUsername} />
						</UIField>
					</div>

					{#snippet footer()}
						<UIButton role="secondary" variant="outline" onclick={() => (dialogOpen = false)}>
							Cancel
						</UIButton>
						<UIButton onclick={() => (dialogOpen = false)}>Save changes</UIButton>
					{/snippet}
				</UIDialog>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Sheet</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Edge-aligned overlay for utility panels, contextual editing, and flows that should keep
						the page frame visible.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIButton size="sm" role="primary" onclick={() => (sheetOpen = true)}>
						Open sheet
					</UIButton>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/sheet')}
				>
					Learn more
				</UIButton>

				<UISheet
					bind:open={sheetOpen}
					title="Team handoff"
					description="This preview uses the same sheet primitive as the dedicated docs route."
				>
					<div class="grid gap-3">
						<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
							Keep the main page in view while staging notes, ownership, and next actions in a side
							panel.
						</p>

						<div class="flex flex-wrap gap-2">
							<UIBadge size="xs" role="primary" variant="badge">Beta rollout</UIBadge>
							<UIBadge size="xs" role="success" variant="pill-color">Ready</UIBadge>
						</div>

						<div class="flex flex-wrap gap-2">
							<UIButton
								size="sm"
								role="secondary"
								variant="outline"
								onclick={() => (sheetOpen = false)}
							>
								Close
							</UIButton>
							<UIButton size="sm" onclick={() => (sheetOpen = false)}>Share</UIButton>
						</div>
					</div>
				</UISheet>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Badge</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Compact status and metadata label with soft, filled, and modern treatments.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-2 pt-px">
					<div class="flex flex-wrap items-center gap-2">
						<UIBadge size="xs" role="success" variant="pill-color">Healthy</UIBadge>
						<UIBadge size="xs" role="primary" variant="badge">Design system</UIBadge>
						<UIBadge size="xs" role="secondary" variant="modern">Internal</UIBadge>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/badge')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Spinner</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Shared loading primitive for standalone status blocks and embedded control states.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<div class="flex flex-wrap items-center gap-3">
						<UISpinner size="sm" role="primary" ariaLabel="Loading workspace" />
						<UIBadge size="xs" role="secondary" variant="modern" loading>Syncing</UIBadge>
						<UIButton size="sm" role="primary" loading>Saving</UIButton>
					</div>
					<UISpinner size="md" role="secondary">Refreshing activity</UISpinner>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/spinner')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Checkbox</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Binary choice control for consent, batch actions, and lightweight settings.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UICheckbox bind:checked={checkboxChecked} size="sm" label="Email alerts" />
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/checkbox')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">ComboBox</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Searchable text input with a floating option panel for selection-heavy flows.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIComboBox
						size="sm"
						bind:value={comboValue}
						ariaLabel="Assign owner"
						placeholder="Assign owner"
					>
						<UIComboBoxItem size="sm" value="Emma" label="Emma" selected />
						<UIComboBoxItem size="sm" value="Marco" label="Marco" />
						<UIComboBoxItem size="sm" value="Priya" label="Priya" />
					</UIComboBox>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/combo-box')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Command</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Search-first command palette for keyboard-driven navigation and quick workspace actions.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<UIButton size="sm" role="primary" onclick={() => (commandOpen = true)}>
						Open command palette
					</UIButton>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">Current highlight: {previewCommandLabel}</p>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/command')}
				>
					Learn more
				</UIButton>

				<UICommand
					bind:open={commandOpen}
					bind:search={commandSearch}
					bind:value={commandValue}
					title="Jump to a command"
					description="This preview uses the same command palette primitive as the dedicated docs route."
					items={previewCommandItems}
				>
					{#snippet footer()}
						<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">Use Up / Down and Enter for the fastest flow.</p>
					{/snippet}
				</UICommand>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Kbd</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Small semantic keycap for shortcuts, inline references, and trailing command hints.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Press <UIKbd>Ctrl</UIKbd> + <UIKbd>K</UIKbd> to search the workspace, then hit
						<UIKbd>Enter</UIKbd> to open the highlighted result.
					</p>

					<div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
						<span>Quick publish</span>
						<UIKbd>Ctrl</UIKbd>
						<span>+</span>
						<UIKbd>Shift</UIKbd>
						<span>+</span>
						<UIKbd>P</UIKbd>
					</div>

					<div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
						<span>Mac search</span>
						<UIKbd>⌘</UIKbd>
						<span>+</span>
						<UIKbd>K</UIKbd>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/kbd')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Input</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Text field shell with icons, validation states, and aligned spacing rules.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIInput
						size="sm"
						value="Acme workspace"
						ariaLabel="Workspace name"
						placeholder="Workspace name"
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/input')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">OTP</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Prominent verification input with large single-character cells and paste-friendly behavior.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIOtp bind:value={otpValue} ariaLabel="Verification code" />
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/otp')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Link</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Inline anchor primitive for text flows, metadata rows, and small navigational cues.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<p class="m-0 max-w-72 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Read the
						<UILink href="/components/input" class="mx-1">field guidance</UILink>
						before wiring longer forms, or jump to
						<UILink href="/components/breadcrumb" rightIcon="arrow-up-right" class="mx-1">
							navigation patterns
						</UILink>
						for hierarchical routes.
					</p>

					<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
						<UILink href="/components/badge" leftIcon="tag">Status docs</UILink>
						<UILink href="/components/sidebar" rightIcon="chevron-right">Sidebar guide</UILink>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/link')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md sm:col-span-2 lg:col-span-2"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Nav Menu</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Top-level navigation shell with separate trigger buttons, hover flyouts, and right-side
						actions.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
						<UINavMenu class="min-h-0 gap-3 border-b-0 px-3 py-2.5">
							{#snippet logo()}
								<div class="flex items-center gap-2">
									<div
										class="flex size-8 items-center justify-center rounded-xl border border-blue-200 dark:border-blue-800/80 bg-blue-50 dark:bg-blue-950/40 text-sm font-extrabold text-blue-600 dark:text-blue-300"
									>
										S
									</div>
								</div>
							{/snippet}

							<UINavMenuItem>
								<UINavMenuTrigger href="/components/nav-menu" current class="h-9 px-3">
									Overview
								</UINavMenuTrigger>
							</UINavMenuItem>

							<UINavMenuItem>
								<UINavMenuTrigger class="h-9 px-3">Platform</UINavMenuTrigger>
								<UINavMenuContents class="min-w-72">
									<div class="grid gap-2.5">
										<p class="m-0 text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">
											Platform
										</p>
										<a
											href="/components/nav-menu#overview"
											class="grid gap-1 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 no-underline transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
										>
											<span class="text-sm font-semibold tracking-tight">Release desk</span>
											<span class="text-sm leading-6 text-slate-600 dark:text-slate-400">
												Launch windows, sign-off, and final checks in one flyout card.
											</span>
										</a>
									</div>
								</UINavMenuContents>
							</UINavMenuItem>

							<UINavMenuItem placement="bottom-end">
								<UINavMenuTrigger class="h-9 px-3">Resources</UINavMenuTrigger>
								<UINavMenuContents class="min-w-72">
									<div class="grid gap-2">
										<a
											href="/components/nav-menu"
											class="grid gap-1 rounded-xl px-2.5 py-2 text-sm text-slate-900 dark:text-slate-100 no-underline transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
										>
											<span class="font-semibold tracking-tight">Implementation guide</span>
											<span class="leading-6 text-slate-600 dark:text-slate-400">
												Trigger behavior, layout anatomy, and flyout composition notes.
											</span>
										</a>
										<a
											href="/components/sidebar"
											class="grid gap-1 rounded-xl px-2.5 py-2 text-sm text-slate-900 dark:text-slate-100 no-underline transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
										>
											<span class="font-semibold tracking-tight">Related sidebar</span>
											<span class="leading-6 text-slate-600 dark:text-slate-400">
												Use the sidebar when the tree gets too deep for top-level flyouts.
											</span>
										</a>
									</div>
								</UINavMenuContents>
							</UINavMenuItem>

							{#snippet right()}
								<UINavMenuRight>
									<UIButton size="sm" role="secondary" variant="quiet" rightIcon="arrow-up-right">
										Docs
									</UIButton>
								</UINavMenuRight>
							{/snippet}
						</UINavMenu>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/nav-menu')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">DatePicker</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Calendar field with a Tippy-driven panel and a consistent array return shape.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIDatePicker size="sm" bind:value={datePickerValue} ariaLabel="Review date" />
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/date-picker')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Select</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Single-choice field with a custom floating listbox and grouped option data.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UISelect
						size="sm"
						bind:value={selectValue}
						ariaLabel="Environment"
						options={[
							{ value: 'production', label: 'Production', group: 'Environments' },
							{ value: 'staging', label: 'Staging', group: 'Environments' },
							{ value: 'preview', label: 'Preview', group: 'Environments' }
						]}
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/select')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Field</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Form wrapper and field chrome for labels, descriptions, helper copy, and error
						messaging.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIForm class="gap-3">
						<UIField
							label="Contact email"
							name="field-email"
							helper="This shape works with any control that reads field context."
						>
							<UIInput bind:value={fieldEmail} size="sm" type="email" />
						</UIField>
					</UIForm>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/field')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Separator</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Lightweight dividing rule for stacked sections, inline metadata, and compact toolbars.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<div class="grid gap-3">
						<div class="grid gap-1">
							<p class="m-0 text-sm font-medium text-slate-900 dark:text-slate-100">Overview</p>
							<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
								Split related content without adding one-off borders.
							</p>
						</div>

						<UISeparator />

						<div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
							<span>Published</span>
							<UISeparator orientation="vertical" />
							<span>Internal</span>
						</div>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/separator')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Breadcrumb</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Compact location trail for nested screens, docs, and deeper content hierarchies.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIBreadcrumb items={previewBreadcrumbItems} />
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/breadcrumb')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Table</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Simple data display primitive with only bottom borders and semantic table sections.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UITable ariaLabel="Component preview table">
						<UITHeader>
							<UITRow>
								<UITColumn>Item</UITColumn>
								<UITColumn>Status</UITColumn>
							</UITRow>
						</UITHeader>
						<UITBody>
							<UITRow>
								<UITColumn>Release notes</UITColumn>
								<UITColumn>Ready</UITColumn>
							</UITRow>
							<UITRow>
								<UITColumn>QA checklist</UITColumn>
								<UITColumn>Pending</UITColumn>
							</UITRow>
						</UITBody>
						<UITFooter>
							<UITRow>
								<UITColumn>Total</UITColumn>
								<UITColumn>2</UITColumn>
							</UITRow>
						</UITFooter>
					</UITable>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/table')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Pagination</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Compact page navigation primitive built from ghost buttons with a promoted current page.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIPagination
						count={12}
						page={paginationPage}
						onpagechange={(page) => (paginationPage = page)}
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/pagination')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Sidebar</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Collapsible app rail with per-item dropdowns and adjacent multipanel navigation.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
						<UISidebar
							items={previewSidebarItems}
							bind:value={sidebarValue}
							bind:openItem={sidebarOpenItem}
							bind:entryValue={sidebarEntryValue}
							collapsed
							ariaLabel="Component preview sidebar"
						/>
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/sidebar')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Slider</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Array-based range control with a compact track, circular thumb, and optional multi-thumb
						selection.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<UISlider
						bind:value={sliderValue}
						max={100}
						step={1}
						class="max-w-52"
						ariaLabel="Confidence"
					/>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">{sliderValue[0]}%</p>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/slider')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Empty</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Structured zero-state primitive for empty lists, no-results screens, and first-run setup.
					</p>
				</div>

				<div class="grid min-h-28 items-start">
					<UIEmpty
						variant="plain"
						size="sm"
						title="No drafts yet"
						description="Create one template now and reuse it for future launches."
						icon="document-plus"
					>
						{#snippet action()}
							<UIButton size="sm">New draft</UIButton>
						{/snippet}
					</UIEmpty>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/empty')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Progress</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Determinate progressbar with the same rounded-full track language as Slider and a simple
						value/max contract.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<UIProgress value={68} class="max-w-52" ariaLabel="Release progress" />
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">68% shipped</p>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/progress')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Toast</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Mounted notification viewport with layered stacking and compact async feedback.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UIButton size="sm" role="success" variant="soft" onclick={showToastPreview}>
						Show toast
					</UIButton>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/toast')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Tooltip</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Small tippy-backed overlay for concise hints and lightweight contextual guidance.
					</p>
				</div>

				<div class="grid min-h-28 items-center">
					<UITooltip text="Last deploy succeeded and all checks passed.">
						<UIButton size="sm" role="secondary" variant="soft">Staging healthy</UIButton>
					</UITooltip>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/tooltip')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Textarea</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Multi-line input for notes, drafts, and longer form responses.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UITextarea
						size="sm"
						rows={3}
						value="Release notes are ready for editorial review."
						ariaLabel="Release notes"
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/textarea')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Radio</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Single-select choice pattern for pricing, delivery, and mode selection.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<div class="grid gap-2">
						<UIRadio
							bind:group={radioValue}
							size="sm"
							name="plan"
							value="starter"
							label="Starter plan"
						/>
						<UIRadio bind:group={radioValue} size="sm" name="plan" value="pro" label="Pro plan" />
					</div>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/radio')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Toggle</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Switch control for preferences, availability, and persistent account settings.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIToggle bind:checked={toggleChecked} size="sm" label="Auto-assign tickets" />
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/toggle')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Toggle Group</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Button-like single or multi-select control for filters, view switches, and compact
						toolbars.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UIToggleGroup
						bind:value={toggleGroupValue}
						type="radio"
						variant="bordered"
						items={previewToggleGroupItems}
						ariaLabel="Reporting range"
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/toggle-group')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Tabs</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Horizontal section navigation with a sliding active treatment for both button and
						underline styles.
					</p>
				</div>

				<div class="grid min-h-28 content-start gap-3 pt-px">
					<UITabs bind:value={tabsValue} items={previewTabs} ariaLabel="Component preview tabs" />
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						{tabsValue === 'overview'
							? 'Use the button variant when the selected tab should feel lifted from the track.'
							: tabsValue === 'activity'
								? 'Keep the selection bindable so parent content can swap without extra ceremony.'
								: 'The same API also drives the lighter underline treatment in the docs route.'}
					</p>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/tabs')}
				>
					Learn more
				</UIButton>
			</article>

			<article
				class="flex min-h-71 flex-col gap-4 border border-slate-300/40 dark:border-slate-600/40 bg-linear-to-b from-white/90 dark:from-slate-950/90 to-slate-50/85 dark:to-slate-950/85 p-4 backdrop-blur-md"
			>
				<div class="grid gap-2">
					<h2 class="m-0 text-base leading-tight tracking-tight">Code Snippet</h2>
					<p class="m-0 text-sm leading-6 text-slate-600 dark:text-slate-400">
						Preformatted code preview with an optional header and a line-number gutter for docs and
						reference cards.
					</p>
				</div>

				<div class="grid min-h-28 items-start pt-px">
					<UICodeSnippet
						filename="+page.svelte"
						language="ts"
						code={previewCodeSnippet}
					/>
				</div>

				<UIButton
					class="mt-auto"
					size="sm"
					role="secondary"
					variant="outline"
					onclick={() => openDocs('/components/code-snippet')}
				>
					Learn more
				</UIButton>
			</article>
		</section>
	</div>
</main>
