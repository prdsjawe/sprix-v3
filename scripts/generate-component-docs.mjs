import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routesRoot = path.join(root, 'src/routes/components');

const indent = (value, level = 1) => {
	const prefix = '\t'.repeat(level);
	return value
		.trim()
		.split('\n')
		.map((line) => (line ? `${prefix}${line}` : ''))
		.join('\n');
};

const escapeTemplateLiteral = (value) =>
	value
		.replaceAll('\\', '\\\\')
		.replaceAll('`', '\\`')
		.replaceAll('${', '\\${')
		.replaceAll('</script>', '<\\/script>');

const renderExamples = (examples) =>
	examples
		.map(
			(example) => `
		<DocsExample title=${JSON.stringify(example.title)} subtitle=${JSON.stringify(example.subtitle)}>
${indent(example.markup, 3)}
		</DocsExample>`
		)
		.join('\n');

const renderPage = (doc) => {
	const importLines = [
		"import ComponentDocsPage from '../_components/ComponentDocsPage.svelte';",
		"import DocsExample from '../_components/DocsExample.svelte';"
	];

	if (doc.imports?.length) {
		importLines.push(`import { ${doc.imports.join(', ')} } from '$lib/components';`);
	}

	for (const line of doc.extraImports ?? []) {
		importLines.push(line);
	}

	const setupBlock = doc.setup?.trim() ? `${doc.setup.trim()}\n\n` : '';
	const basicSnippet = escapeTemplateLiteral(doc.snippet.trim());
	const description = doc.description ?? `Sprix ${doc.title.toLowerCase()} component examples.`;

	return `<script lang="ts">
${indent(importLines.join('\n'))}

${indent(`${setupBlock}const basicSnippet = \`${basicSnippet}\`;`)}
</script>

<ComponentDocsPage
	slug=${JSON.stringify(doc.slug)}
	title=${JSON.stringify(doc.title)}
	subtitle=${JSON.stringify(doc.subtitle)}
	description=${JSON.stringify(description)}
	basicSnippet={basicSnippet}
>
	{#snippet live()}
${indent(doc.live, 2)}
	{/snippet}

	{#snippet examples()}
${renderExamples(doc.examples)}
	{/snippet}
</ComponentDocsPage>
`;
};

const docs = [
	{
		slug: 'alert-dialog',
		title: 'Alert Dialog',
		subtitle: 'A focused confirmation surface for important decisions.',
		imports: ['AlertDialog', 'Button'],
		setup: `
let infoOpen = $state(false);
let destructiveOpen = $state(false);
let promptOpen = $state(false);`,
		snippet: `
<script lang="ts">
	import { AlertDialog, Button } from '$lib/components';

	let open = $state(false);
</script>

<Button role="danger" variant="soft" onclick={() => (open = true)}>Delete project</Button>

<AlertDialog
	bind:open={open}
	type="destructive"
	title="Delete project"
	description="This action removes the workspace and cannot be undone."
	confirmLabel="Delete"
	cancelLabel="Keep project"
/>
`,
		live: `
<div class="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3">
	<Button role="secondary" variant="outline" onclick={() => (infoOpen = true)}>Review changes</Button>
	<Button role="danger" variant="soft" onclick={() => (destructiveOpen = true)}>
		Delete workspace
	</Button>
</div>

<AlertDialog
	bind:open={infoOpen}
	title="Save before leaving?"
	description="Unsaved edits in this release brief will be lost if you close the editor now."
	confirmLabel="Save draft"
	cancelLabel="Keep editing"
/>

<AlertDialog
	bind:open={destructiveOpen}
	type="destructive"
	title="Delete workspace"
	description="This permanently removes teammates, drafts, and billing history from the workspace."
	confirmLabel="Delete workspace"
	cancelLabel="Cancel"
/>`,
		examples: [
			{
				title: 'Confirmation Prompt',
				subtitle: 'Require an explicit prompt when the action is irreversible.',
				markup: `
<div class="mx-auto flex w-full max-w-3xl justify-center">
	<Button role="danger" variant="outline" onclick={() => (promptOpen = true)}>Archive account</Button>
</div>

<AlertDialog
	bind:open={promptOpen}
	type="destructive"
	title="Archive account"
	description="Type ARCHIVE to confirm before the account is moved out of production."
	confirmLabel="Archive account"
	cancelLabel="Not now"
	confirmPrompt="ARCHIVE"
/>`
			}
		]
	},
	{
		slug: 'avatar',
		title: 'Avatar',
		subtitle: 'A profile image or fallback mark for people, teams, and workspaces.',
		imports: ['Avatar'],
		snippet: `
<script lang="ts">
	import { Avatar } from '$lib/components';
</script>

<Avatar name="Emma Li" size="lg" />
`,
		live: `
<div class="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-4">
	<Avatar name="Emma Li" size="md" />
	<Avatar name="Design Team" size="lg" />
	<Avatar src="/logo.png" alt="Sprix logo" name="Sprix" size="xl" />
</div>`,
		examples: [
			{
				title: 'Sizes',
				subtitle: 'Scale the avatar from dense rows to profile callouts.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-end justify-center gap-4">
	<Avatar name="Jawe Ordillano" size="xs" />
	<Avatar name="Jawe Ordillano" size="sm" />
	<Avatar name="Jawe Ordillano" size="md" />
	<Avatar name="Jawe Ordillano" size="lg" />
	<Avatar name="Jawe Ordillano" size="xl" />
	<Avatar name="Jawe Ordillano" size="2xl" />
	<Avatar name="Jawe Ordillano" size="3xl" />
</div>`
			}
		]
	},
	{
		slug: 'badge',
		title: 'Badge',
		subtitle: 'A compact label for status, counts, and lightweight metadata.',
		imports: ['Badge'],
		snippet: `
<script lang="ts">
	import { Badge } from '$lib/components';
</script>

<Badge role="success" variant="pill-color">Ready to ship</Badge>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
	<Badge role="primary" variant="modern">Components</Badge>
	<Badge role="success" variant="pill-color">Ready to ship</Badge>
	<Badge role="warning" variant="badge-color">Needs review</Badge>
	<Badge role="secondary" variant="pill" rightIcon="arrow-right">View rollout</Badge>
</div>`,
		examples: [
			{
				title: 'Roles and Variants',
				subtitle: 'Match the badge tone to the meaning of the message.',
				markup: `
<div class="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3">
	<Badge role="primary" variant="badge">Starter</Badge>
	<Badge role="secondary" variant="pill">Beta</Badge>
	<Badge role="success" variant="badge-color">Healthy</Badge>
	<Badge role="warning" variant="pill-color">Attention</Badge>
	<Badge role="danger" variant="modern">Blocked</Badge>
</div>`
			}
		]
	},
	{
		slug: 'breadcrumb',
		title: 'Breadcrumb',
		subtitle: 'A compact path that helps users stay oriented in deeper flows.',
		imports: ['Breadcrumb'],
		setup: `
const breadcrumbPathItems = [
	{ label: 'Workspace', href: '/components' },
	{ label: 'Content' },
	{ label: 'Articles' },
	{ label: 'Launch brief', current: true }
] satisfies Breadcrumb.Item[];

const iconBreadcrumbItems = [
	{ label: 'Home', href: '/', icon: 'home' },
	{ label: 'Components', href: '/components' },
	{ label: 'Breadcrumb', current: true }
] satisfies Breadcrumb.Item[];`,
		snippet: `
<script lang="ts">
	import { Breadcrumb } from '$lib/components';

	const items = [
		{ label: 'Workspace', href: '/components' },
		{ label: 'Settings' },
		{ label: 'Billing', current: true }
	];
</script>

<Breadcrumb items={items} />
`,
		live: `
<div class="mx-auto w-full max-w-4xl">
				<Breadcrumb items={breadcrumbPathItems} />
			</div>`,
		examples: [
			{
				title: 'Icons',
				subtitle: 'Use icons sparingly for the first step in a path.',
				markup: `
<div class="mx-auto w-full max-w-4xl">
	<Breadcrumb items={iconBreadcrumbItems} />
</div>`
			}
		]
	},
	{
		slug: 'button-group',
		title: 'Button Group',
		subtitle: 'A compact wrapper for adjacent actions that belong together.',
		imports: ['Button', 'ButtonGroup'],
		snippet: `
<script lang="ts">
	import { Button, ButtonGroup } from '$lib/components';
</script>

<ButtonGroup>
	<Button role="secondary" variant="outline">Day</Button>
	<Button role="secondary" variant="outline">Week</Button>
	<Button role="secondary" variant="outline">Month</Button>
</ButtonGroup>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<ButtonGroup>
		<Button role="secondary" variant="outline">Day</Button>
		<Button role="secondary" variant="outline">Week</Button>
		<Button role="secondary" variant="outline">Month</Button>
	</ButtonGroup>
</div>`,
		examples: [
			{
				title: 'Vertical Stack',
				subtitle: 'Switch the group orientation for tool trays and side panels.',
				markup: `
<div class="mx-auto flex w-full max-w-3xl justify-center">
	<ButtonGroup orientation="vertical">
		<Button role="secondary" variant="outline" leftIcon="sparkles">Overview</Button>
		<Button role="secondary" variant="outline" leftIcon="chart-bar">Reports</Button>
		<Button role="secondary" variant="outline" leftIcon="users">Team</Button>
	</ButtonGroup>
</div>`
			}
		]
	},
	{
		slug: 'card',
		title: 'Card',
		subtitle: 'A structured surface for grouped content and actions.',
		imports: ['Badge', 'Button', 'Card'],
		snippet: `
<script lang="ts">
	import { Card } from '$lib/components';
</script>

<Card title="Project status" description="Weekly launch summary">
	<p class="text-sm text-app-text-muted">All milestones are on track for Friday.</p>
</Card>
`,
		live: `
<div class="mx-auto w-full max-w-xl">
	<Card
		title="Project status"
		description="Weekly launch summary for the launch workspace."
		class="rounded-3xl border-app-border bg-app-surface"
	>
		<div class="space-y-4">
			<div class="flex items-center justify-between gap-3 rounded-2xl border border-app-border bg-app-bg px-4 py-4">
				<div>
					<p class="font-medium text-app-text">Launch brief</p>
					<p class="text-sm text-app-text-muted">Copy, legal review, and QA are all signed off.</p>
				</div>
				<Badge role="success" variant="pill-color">Ready</Badge>
			</div>
		</div>

		{#snippet footer()}
			<div class="flex justify-end gap-2">
				<Button role="secondary" variant="outline">Review</Button>
				<Button>Publish</Button>
			</div>
		{/snippet}
	</Card>
</div>`,
		examples: [
			{
				title: 'Action Header',
				subtitle: 'Pair summary copy with a lightweight action in the header.',
				markup: `
<div class="mx-auto w-full max-w-xl">
	<Card title="Team inbox" description="Open conversations across support and growth.">
		{#snippet action()}
			<Button size="sm" role="secondary" variant="quiet" rightIcon="arrow-right">View all</Button>
		{/snippet}

		<div class="grid gap-3">
			<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
				<p class="font-medium text-app-text">Priority launch notes</p>
				<p class="text-sm text-app-text-muted">Three unanswered threads need a response today.</p>
			</div>
		</div>
	</Card>
</div>`
			}
		]
	},
	{
		slug: 'carousel',
		title: 'Carousel',
		subtitle: 'A paged surface for showcasing sets of related content.',
		imports: ['Badge', 'Card', 'Carousel'],
		setup: `
let releasePage = $state(0);

const releaseSlides = [
	{
		id: 'release-1',
		eyebrow: 'Planning',
		title: 'Launch checklist',
		description: 'Track legal, QA, and campaign approvals in one place.',
		meta: 'Updated 5 minutes ago'
	},
	{
		id: 'release-2',
		eyebrow: 'Content',
		title: 'Editorial pipeline',
		description: 'Review summaries, hero copy, and partner quotes before publish.',
		meta: '6 tasks left'
	},
	{
		id: 'release-3',
		eyebrow: 'Growth',
		title: 'Acquisition plan',
		description: 'Coordinate paid, lifecycle, and homepage placement from one view.',
		meta: 'Ready for launch'
	},
	{
		id: 'release-4',
		eyebrow: 'Support',
		title: 'Help center updates',
		description: 'Prep launch FAQs and rollout notices for customer success.',
		meta: '2 drafts pending'
	}
];`,
		snippet: `
<script lang="ts">
	import { Carousel } from '$lib/components';

	const items = [
		{ id: 'one', title: 'Launch checklist', description: 'Coordinate every approval in one view.' },
		{ id: 'two', title: 'Editorial pipeline', description: 'Track final content updates before publish.' },
		{ id: 'three', title: 'Help center updates', description: 'Ship release notes alongside the product.' }
	];
</script>

<Carousel items={items} ariaLabel="Release highlights" />
`,
		live: `
<div class="mx-auto w-full max-w-5xl">
	<Carousel items={releaseSlides} bind:page={releasePage} ariaLabel="Release highlights">
		{#snippet slide(item)}
			<Card title={item.title} description={item.description} class="h-full rounded-3xl border-app-border bg-app-surface">
				<div class="space-y-3">
					<Badge role="primary" variant="modern">{item.eyebrow}</Badge>
					<p class="text-sm text-app-text-muted">{item.meta}</p>
				</div>
			</Card>
		{/snippet}
	</Carousel>
</div>`,
		examples: [
			{
				title: 'Two Columns',
				subtitle: 'Constrain the visible columns for denser editorial and commerce rails.',
				markup: `
<div class="mx-auto w-full max-w-4xl">
	<Carousel items={releaseSlides} maxColumns={2} showDots={false} ariaLabel="Editorial highlights" />
</div>`
			}
		]
	},
	{
		slug: 'checkbox',
		title: 'Checkbox',
		subtitle: 'A binary control for selections, filters, and opt-in settings.',
		imports: ['Checkbox'],
		setup: `
let publishNow = $state(true);
let reminders = $state(false);
let consent = $state(false);`,
		snippet: `
<script lang="ts">
	import { Checkbox } from '$lib/components';

	let checked = $state(false);
</script>

<Checkbox bind:checked={checked} label="Email me weekly updates" />
`,
		live: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Checkbox bind:checked={publishNow} label="Publish this article immediately" />
	<Checkbox bind:checked={reminders} label="Send rollout reminders to the launch team" />
	<Checkbox bind:checked={consent} label="Require sign-off from compliance before launch" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle: 'Pair helper and error copy with disabled and unavailable states.',
				markup: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Checkbox checked label="Available option" helper="This preference is applied to every new project." />
	<Checkbox disabled label="Locked preference" helper="Only workspace owners can edit this setting." />
	<Checkbox label="Missing requirement" error="You need to confirm this before continuing." />
</div>`
			}
		]
	},
	{
		slug: 'code-snippet',
		title: 'Code Snippet',
		subtitle: 'A formatted code block for examples, setup guides, and API references.',
		imports: ['CodeSnippet'],
		setup: `
const installSnippet = \`pnpm add sprix-v3\`;

const longSnippet = \`<Card title="Launch status" description="Everything is ready">
\t<Badge role="success" variant="pill-color">Ready to ship</Badge>
</Card>\`;`,
		snippet: `
<script lang="ts">
	import { CodeSnippet } from '$lib/components';

	const code = \`pnpm add sprix-v3\`;
</script>

<CodeSnippet code={code} language="bash" />
`,
		live: `
<div class="mx-auto w-full max-w-4xl">
	<CodeSnippet filename="install.sh" language="bash" code={installSnippet} />
</div>`,
		examples: [
			{
				title: 'Wrapped Content',
				subtitle: 'Show line numbers or wrapped content when the example needs more room.',
				markup: `
<div class="mx-auto grid w-full max-w-4xl gap-4">
	<CodeSnippet filename="+page.svelte" language="svelte" code={longSnippet} wrap showLineNumbers />
	<CodeSnippet size="xs" language="bash" code="pnpm run check" />
</div>`
			}
		]
	},
	{
		slug: 'combo-box',
		title: 'ComboBox',
		subtitle: 'A searchable text field with a custom suggestion list.',
		imports: ['ComboBox', 'ComboBoxItem'],
		setup: `
let assignee = $state('');
let assigneeOpen = $state(false);
let channel = $state('');
let channelOpen = $state(false);

const selectAssignee = (value: string) => {
	assignee = value;
	assigneeOpen = false;
};

const selectChannel = (value: string) => {
	channel = value;
	channelOpen = false;
};`,
		snippet: `
<script lang="ts">
	import { ComboBox, ComboBoxItem } from '$lib/components';

	let value = $state('');
	let open = $state(false);
</script>

<ComboBox bind:value={value} bind:open={open} placeholder="Choose assignee">
	<ComboBoxItem label="Emma Li" onclick={() => ((value = 'Emma Li'), (open = false))} />
	<ComboBoxItem label="Mina Park" onclick={() => ((value = 'Mina Park'), (open = false))} />
</ComboBox>
`,
		live: `
<div class="mx-auto w-full max-w-md">
	<ComboBox bind:value={assignee} bind:open={assigneeOpen} placeholder="Choose assignee">
		<ComboBoxItem
			label="Emma Li"
			description="Operations lead"
			selected={assignee === 'Emma Li'}
			onclick={() => selectAssignee('Emma Li')}
		/>
		<ComboBoxItem
			label="Mina Park"
			description="Content strategist"
			selected={assignee === 'Mina Park'}
			onclick={() => selectAssignee('Mina Park')}
		/>
		<ComboBoxItem
			label="Lara Ong"
			description="Lifecycle marketing"
			selected={assignee === 'Lara Ong'}
			onclick={() => selectAssignee('Lara Ong')}
		/>
	</ComboBox>
</div>`,
		examples: [
			{
				title: 'Helper Copy',
				subtitle: 'Use helper text when the choice affects workflow or delivery.',
				markup: `
<div class="mx-auto w-full max-w-md">
	<ComboBox
		bind:value={channel}
		bind:open={channelOpen}
		placeholder="Pick channel"
		helper="Choose the launch surface that should receive this campaign."
	>
		<ComboBoxItem label="Homepage" selected={channel === 'Homepage'} onclick={() => selectChannel('Homepage')} />
		<ComboBoxItem label="Lifecycle" selected={channel === 'Lifecycle'} onclick={() => selectChannel('Lifecycle')} />
		<ComboBoxItem label="Partners" selected={channel === 'Partners'} onclick={() => selectChannel('Partners')} />
	</ComboBox>
</div>`
			}
		]
	},
	{
		slug: 'command',
		title: 'Command',
		subtitle: 'A searchable action surface for fast keyboard-driven workflows.',
		imports: ['Button', 'Command', 'Kbd'],
		setup: `
let commandOpen = $state(false);

const commandItems = [
	{
		value: 'open-launch-brief',
		label: 'Open launch brief',
		description: 'Jump back into the release draft.',
		group: 'Content',
		icon: 'document-text',
		shortcut: ['G', 'B']
	},
	{
		value: 'review-analytics',
		label: 'Review analytics',
		description: 'Inspect the latest campaign performance.',
		group: 'Growth',
		icon: 'chart-bar'
	},
	{
		value: 'notify-team',
		label: 'Notify team',
		description: 'Share the latest rollout note with operators.',
		group: 'Operations',
		icon: 'megaphone'
	}
] satisfies Command.Item[];`,
		snippet: `
<script lang="ts">
	import { Button, Command } from '$lib/components';

	let open = $state(false);

	const items = [
		{ value: 'launch', label: 'Open launch brief', description: 'Return to the current release brief.' }
	];
</script>

<Button onclick={() => (open = true)}>Open command menu</Button>
<Command bind:open={open} items={items} title="Quick actions" />
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button onclick={() => (commandOpen = true)}>Open command menu</Button>
</div>

<Command
	bind:open={commandOpen}
	items={commandItems}
	title="Quick actions"
	description="Search across common launch and workspace actions."
/>`,
		examples: [
			{
				title: 'Footer Shortcut',
				subtitle: 'Keep a small keyboard hint visible in the footer.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button role="secondary" variant="outline" onclick={() => (commandOpen = true)}>
		Reopen palette
	</Button>
</div>

<Command
	bind:open={commandOpen}
	items={commandItems}
	title="Quick actions"
	description="Search across release, growth, and support tasks."
>
	{#snippet footer()}
		<div class="flex items-center justify-between gap-3 text-sm text-app-text-muted">
			<span>Use arrows to move through results.</span>
			<div class="flex items-center gap-2">
				<Kbd>↑</Kbd>
				<Kbd>↓</Kbd>
				<Kbd>↵</Kbd>
			</div>
		</div>
	{/snippet}
</Command>`
			}
		]
	},
	{
		slug: 'date-picker',
		title: 'Date Picker',
		subtitle: 'A calendar input for single dates and date ranges.',
		imports: ['DatePicker'],
		setup: `
let publishDate = $state(['2026-04-12']);
let sprintRange = $state(['2026-04-09', '2026-04-17']);`,
		snippet: `
<script lang="ts">
	import { DatePicker } from '$lib/components';

	let value = $state(['2026-04-12']);
</script>

<DatePicker bind:value={value} placeholder="Choose a publish date" />
`,
		live: `
<div class="mx-auto w-full max-w-md">
	<DatePicker bind:value={publishDate} placeholder="Choose a publish date" />
</div>`,
		examples: [
			{
				title: 'Range Selection',
				subtitle: 'Enable range mode when users need a start and end date together.',
				markup: `
<div class="mx-auto w-full max-w-md">
	<DatePicker
		bind:value={sprintRange}
		range
		placeholder="Choose sprint dates"
		min="2026-04-01"
		max="2026-04-30"
	/>
</div>`
			}
		]
	},
	{
		slug: 'dialog',
		title: 'Dialog',
		subtitle: 'A modal surface for focused tasks and short-form workflows.',
		imports: ['Button', 'Dialog'],
		setup: `
let inviteOpen = $state(false);
let summaryOpen = $state(false);`,
		snippet: `
<script lang="ts">
	import { Button, Dialog } from '$lib/components';

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Invite teammates</Button>

<Dialog bind:open={open} title="Invite teammates" description="Share access with your launch team.">
	<p class="text-sm text-app-text-muted">Send invites by email or paste a workspace link.</p>
</Dialog>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button onclick={() => (inviteOpen = true)}>Invite teammates</Button>
</div>

<Dialog
	bind:open={inviteOpen}
	title="Invite teammates"
	description="Share access with editors, reviewers, and launch operators."
>
	<div class="space-y-3">
		<p class="text-sm text-app-text-muted">
			Send invites by email or share a workspace link with limited permissions.
		</p>
	</div>

	{#snippet footer()}
		<div class="flex justify-end gap-2">
			<Button role="secondary" variant="outline" onclick={() => (inviteOpen = false)}>Cancel</Button>
			<Button onclick={() => (inviteOpen = false)}>Send invite</Button>
		</div>
	{/snippet}
</Dialog>`,
		examples: [
			{
				title: 'Large Dialog',
				subtitle: 'Use larger widths when the task needs more comparison or detail.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button role="secondary" variant="outline" onclick={() => (summaryOpen = true)}>
		Review launch summary
	</Button>
</div>

<Dialog
	bind:open={summaryOpen}
	size="lg"
	title="Launch summary"
	description="Final review before the release goes live."
>
	<div class="grid gap-3 md:grid-cols-2">
		<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
			<p class="font-medium text-app-text">Content</p>
			<p class="text-sm text-app-text-muted">All hero, email, and help center copy is approved.</p>
		</div>
		<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
			<p class="font-medium text-app-text">Operations</p>
			<p class="text-sm text-app-text-muted">Support macros and internal runbooks are ready.</p>
		</div>
	</div>
</Dialog>`
			}
		]
	},
	{
		slug: 'dropdown-menu',
		title: 'Dropdown Menu',
		subtitle: 'A compact action menu anchored to a button.',
		imports: ['Button', 'DropdownMenu'],
		snippet: `
<script lang="ts">
	import { Button, DropdownMenu } from '$lib/components';
</script>

<DropdownMenu role="secondary" variant="outline">
	{#snippet trigger()}Workspace actions{/snippet}

	<div class="flex min-w-56 flex-col gap-1 p-1">
		<Button role="secondary" variant="quiet" class="justify-start">Rename workspace</Button>
		<Button role="secondary" variant="quiet" class="justify-start">Manage members</Button>
	</div>
</DropdownMenu>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<DropdownMenu role="secondary" variant="outline">
		{#snippet trigger()}Workspace actions{/snippet}

		<div class="flex min-w-56 flex-col gap-1 p-1">
			<Button role="secondary" variant="quiet" class="justify-start">Rename workspace</Button>
			<Button role="secondary" variant="quiet" class="justify-start">Manage members</Button>
			<Button role="secondary" variant="quiet" class="justify-start">Share update</Button>
			<Button role="danger" variant="quiet" class="justify-start">Archive workspace</Button>
		</div>
	</DropdownMenu>
</div>`,
		examples: [
			{
				title: 'Aligned End',
				subtitle: 'Shift the menu alignment when it sits near the right edge of the layout.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-end">
	<DropdownMenu placement="bottom-end" role="secondary" variant="quiet" rightIcon="ellipsis-vertical">
		{#snippet trigger()}Actions{/snippet}

		<div class="flex min-w-48 flex-col gap-1 p-1">
			<Button role="secondary" variant="quiet" class="justify-start">Duplicate</Button>
			<Button role="secondary" variant="quiet" class="justify-start">Move</Button>
			<Button role="danger" variant="quiet" class="justify-start">Delete</Button>
		</div>
	</DropdownMenu>
</div>`
			}
		]
	},
	{
		slug: 'empty',
		title: 'Empty',
		subtitle: 'A calm placeholder for blank states and zero-result screens.',
		imports: ['Button', 'Empty'],
		snippet: `
<script lang="ts">
	import { Button, Empty } from '$lib/components';
</script>

<Empty
	title="No drafts yet"
	description="Start a new draft to prepare your next release."
	icon="document-text"
>
	{#snippet action()}
		<Button>Create draft</Button>
	{/snippet}
</Empty>
`,
		live: `
<div class="mx-auto w-full max-w-2xl">
	<Empty
		title="No launch notes yet"
		description="Create a release brief to track messaging, approvals, and go-live tasks."
		icon="document-text"
	>
		{#snippet action()}
			<Button>Create brief</Button>
		{/snippet}
	</Empty>
</div>`,
		examples: [
			{
				title: 'Plain Variant',
				subtitle: 'Use a lighter presentation inside cards, drawers, and compact surfaces.',
				markup: `
<div class="mx-auto w-full max-w-2xl">
	<Empty
		variant="plain"
		align="left"
		title="No reviewers assigned"
		description="Invite a teammate to keep approvals moving before launch day."
		icon="users"
	>
		{#snippet action()}
			<Button role="secondary" variant="outline">Invite reviewer</Button>
		{/snippet}
	</Empty>
</div>`
			}
		]
	},
	{
		slug: 'field',
		title: 'Field',
		subtitle: 'A wrapper that pairs labels, descriptions, and validation around controls.',
		imports: ['Field', 'Input', 'Toggle'],
		setup: `
let projectName = $state('');
let autoPublish = $state(true);`,
		snippet: `
<script lang="ts">
	import { Field, Input } from '$lib/components';

	let value = $state('');
</script>

<Field label="Project name" name="project-name" helper="Visible across your workspace.">
	<Input bind:value={value} placeholder="Spring launch" />
</Field>
`,
		live: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Field
		label="Project name"
		name="project-name"
		description="Use a clear internal title so reviewers can find the right brief."
		helper="Visible across the workspace."
	>
		<Input bind:value={projectName} placeholder="Spring launch" />
	</Field>
</div>`,
		examples: [
			{
				title: 'Horizontal Layout',
				subtitle: 'Switch to a horizontal field for compact preference rows.',
				markup: `
<div class="mx-auto w-full max-w-xl">
	<Field
		label="Auto publish"
		name="auto-publish"
		orientation="horizontal"
		helper="Turn this on to push the release live after approval."
	>
		<Toggle bind:checked={autoPublish} />
	</Field>
</div>`
			}
		]
	},
	{
		slug: 'form',
		title: 'Form',
		subtitle: 'A submission wrapper that distributes validation state to its fields.',
		imports: ['Button', 'Field', 'Form', 'Input'],
		setup: `
let formName = $state('');
let formEmail = $state('');

const formErrors = {
	email: 'Use a work email before inviting teammates.'
};`,
		snippet: `
<script lang="ts">
	import { Button, Field, Form, Input } from '$lib/components';

	let name = $state('');
</script>

<Form class="grid gap-4">
	<Field label="Project name" name="name">
		<Input bind:value={name} placeholder="Spring launch" />
	</Field>

	<Button type="submit">Create project</Button>
</Form>
`,
		live: `
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
</div>`,
		examples: [
			{
				title: 'Validation Errors',
				subtitle: 'Pass form errors once and let each field read the message by name.',
				markup: `
<div class="mx-auto w-full max-w-xl">
	<Form class="grid gap-4" errors={formErrors}>
		<Field label="Invite email" name="email">
			<Input bind:value={formEmail} type="email" placeholder="team@sprix.dev" />
		</Field>

		<div class="flex justify-end">
			<Button role="secondary" variant="outline" type="submit">Send invite</Button>
		</div>
	</Form>
</div>`
			}
		]
	},
	{
		slug: 'hover-card',
		title: 'Hover Card',
		subtitle: 'A lightweight preview that appears on hover or focus.',
		imports: ['Avatar', 'Badge', 'HoverCard'],
		snippet: `
<script lang="ts">
	import { HoverCard } from '$lib/components';
</script>

<HoverCard text="Preview the latest launch summary.">
	<span class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium">
		Hover for details
	</span>
</HoverCard>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<HoverCard placement="bottom">
		<span class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium text-app-text">
			Hover customer preview
		</span>

		{#snippet content()}
			<div class="flex w-72 items-start gap-3">
				<Avatar name="Emma Li" />
				<div class="space-y-2">
					<p class="font-medium text-app-text">Emma Li</p>
					<p class="text-sm text-app-text-muted">Operations lead for launch readiness and approvals.</p>
					<Badge role="success" variant="pill-color">Available</Badge>
				</div>
			</div>
		{/snippet}
	</HoverCard>
</div>`,
		examples: [
			{
				title: 'Text Only',
				subtitle: 'Use the text prop for compact hints without custom markup.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<HoverCard text="Preview the latest release summary before opening the full brief.">
		<span class="inline-flex rounded-full border border-app-border px-3 py-2 text-sm font-medium text-app-text">
			Hover release note
		</span>
	</HoverCard>
</div>`
			}
		]
	},
	{
		slug: 'icon',
		title: 'Icon',
		subtitle: 'An SVG icon primitive for controls, labels, and supporting decoration.',
		imports: ['Icon'],
		snippet: `
<script lang="ts">
	import { Icon } from '$lib/components';
</script>

<Icon name="sparkles" class="size-5 text-app-text" />
`,
		live: `
<div class="mx-auto grid w-full max-w-3xl grid-cols-4 gap-4 text-app-text sm:grid-cols-8">
	<div class="flex flex-col items-center gap-2"><Icon name="sparkles" class="size-6" /><span class="text-xs">sparkles</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="chart-bar" class="size-6" /><span class="text-xs">chart-bar</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="users" class="size-6" /><span class="text-xs">users</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="bell" class="size-6" /><span class="text-xs">bell</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="home" class="size-6" /><span class="text-xs">home</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="arrow-right" class="size-6" /><span class="text-xs">arrow-right</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="document-text" class="size-6" /><span class="text-xs">document-text</span></div>
	<div class="flex flex-col items-center gap-2"><Icon name="rocket-launch" class="size-6" /><span class="text-xs">rocket-launch</span></div>
</div>`,
		examples: [
			{
				title: 'Scale with Utilities',
				subtitle: 'Use standard utility classes to size and color the icon with surrounding text.',
				markup: `
<div class="mx-auto flex w-full max-w-3xl items-end justify-center gap-6 text-app-text">
	<Icon name="sparkles" class="size-4 text-app-text-muted" />
	<Icon name="sparkles" class="size-6 text-app-text" />
	<Icon name="sparkles" class="size-8 text-app-text" />
	<Icon name="sparkles" class="size-10 text-app-text" />
</div>`
			}
		]
	},
	{
		slug: 'input',
		title: 'Input',
		subtitle: 'A text field for short-form values, search, and inline actions.',
		imports: ['Input'],
		setup: `
let search = $state('');
let workspace = $state('');`,
		snippet: `
<script lang="ts">
	import { Input } from '$lib/components';

	let value = $state('');
</script>

<Input bind:value={value} placeholder="Search releases" leftIcon="magnifying-glass" />
`,
		live: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Input bind:value={search} placeholder="Search releases" leftIcon="magnifying-glass" />
	<Input bind:value={workspace} placeholder="Workspace name" rightIcon="check" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle: 'Use helper and error copy to keep the input self-explanatory.',
				markup: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Input placeholder="Project slug" helper="Used for URLs and release references." />
	<Input placeholder="Invite email" error="Use a work email before continuing." />
	<Input placeholder="Read only token" value="sprix-live-947" readonly />
</div>`
			}
		]
	},
	{
		slug: 'kbd',
		title: 'Kbd',
		subtitle: 'A small keycap label for shortcuts and command hints.',
		imports: ['Kbd'],
		snippet: `
<script lang="ts">
	import { Kbd } from '$lib/components';
</script>

<div class="flex items-center gap-2">
	<Kbd>⌘</Kbd>
	<Kbd>K</Kbd>
</div>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
	<Kbd>⌘</Kbd>
	<Kbd>K</Kbd>
	<Kbd>Shift</Kbd>
	<Kbd>Enter</Kbd>
</div>`,
		examples: [
			{
				title: 'Combinations',
				subtitle: 'Group keys together when a shortcut depends on the sequence.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 text-sm text-app-text">
	<div class="flex items-center gap-2"><Kbd>⌘</Kbd><Kbd>B</Kbd><span>Open brief</span></div>
	<div class="flex items-center gap-2"><Kbd>⌘</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd><span>Publish</span></div>
</div>`
			}
		]
	},
	{
		slug: 'link',
		title: 'Link',
		subtitle: 'A navigational text primitive with optional leading and trailing icons.',
		imports: ['Link'],
		snippet: `
<script lang="ts">
	import { Link } from '$lib/components';
</script>

<Link href="/components" rightIcon="arrow-right">Browse components</Link>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4">
	<Link href="/components" rightIcon="arrow-right">Browse components</Link>
	<Link href="/showcase" rightIcon="arrow-top-right-on-square">View showcase</Link>
	<Link href="/" leftIcon="home">Back home</Link>
</div>`,
		examples: [
			{
				title: 'Inline Use',
				subtitle: 'Use links inline when the next step is navigational rather than confirmational.',
				markup: `
<div class="mx-auto max-w-2xl text-center text-sm text-app-text-muted">
	Read the <Link href="/components/button">Button docs</Link> before wiring primary actions into a launch flow.
</div>`
			}
		]
	},
	{
		slug: 'native-select',
		title: 'Native Select',
		subtitle: 'A platform-native select control for dependable lightweight choice lists.',
		imports: ['NativeSelect'],
		setup: `
let country = $state('ph');
let month = $state('april');`,
		snippet: `
<script lang="ts">
	import { NativeSelect } from '$lib/components';

	let value = $state('april');
</script>

<NativeSelect bind:value={value}>
	<option value="april">April</option>
	<option value="may">May</option>
</NativeSelect>
`,
		live: `
<div class="mx-auto grid w-full max-w-md gap-4">
	<NativeSelect bind:value={month}>
		<option value="april">April</option>
		<option value="may">May</option>
		<option value="june">June</option>
	</NativeSelect>
</div>`,
		examples: [
			{
				title: 'Helper Copy',
				subtitle: 'Pair the select with helper copy when the choice has downstream effects.',
				markup: `
<div class="mx-auto w-full max-w-md">
	<NativeSelect bind:value={country} helper="This sets tax formatting for new invoices.">
		<option value="ph">Philippines</option>
		<option value="sg">Singapore</option>
		<option value="us">United States</option>
	</NativeSelect>
</div>`
			}
		]
	},
	{
		slug: 'nav-menu',
		title: 'NavMenu',
		subtitle: 'A responsive top navigation pattern for product surfaces and app headers.',
		imports: [
			'Button',
			'NavMenu',
			'NavMenuContents',
			'NavMenuItem',
			'NavMenuRight',
			'NavMenuTrigger'
		],
		setup: `
const navLinks = [
	{ label: 'Overview', href: '#' },
	{ label: 'Campaigns', href: '#' },
	{ label: 'Team', href: '#' }
];`,
		snippet: `
<script lang="ts">
	import { NavMenu, NavMenuItem, NavMenuTrigger } from '$lib/components';
</script>

<NavMenu ariaLabel="Workspace navigation">
	<NavMenuItem>
		<NavMenuTrigger href="#">Overview</NavMenuTrigger>
	</NavMenuItem>
	<NavMenuItem>
		<NavMenuTrigger href="#">Team</NavMenuTrigger>
	</NavMenuItem>
</NavMenu>
`,
		live: `
<div class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border">
	<NavMenu ariaLabel="Workspace navigation" class="rounded-none border-0 bg-app-surface px-4 py-4">
		{#snippet logo()}
			<div class="flex items-center gap-3">
				<img src="/logo.png" alt="Sprix logo" class="h-7 w-auto" />
			</div>
		{/snippet}

		{#each navLinks as item, index (item.label)}
			<NavMenuItem>
				<NavMenuTrigger href={item.href} current={index === 0}>{item.label}</NavMenuTrigger>
			</NavMenuItem>
		{/each}

		{#snippet right()}
			<NavMenuRight class="gap-2">
				<Button size="sm" role="secondary" variant="quiet" icon="bell" ariaLabel="Notifications" />
				<Button size="sm" role="secondary" variant="outline">Share</Button>
			</NavMenuRight>
		{/snippet}
	</NavMenu>
</div>`,
		examples: [
			{
				title: 'Dropdown Content',
				subtitle: 'Add contextual flyout content for navigation areas with sub-sections.',
				markup: `
<div class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border">
	<NavMenu ariaLabel="Docs navigation" class="rounded-none border-0 bg-app-surface px-4 py-4">
		<NavMenuItem>
			<NavMenuTrigger href="#" current>Overview</NavMenuTrigger>
		</NavMenuItem>

		<NavMenuItem>
			<NavMenuTrigger>Components</NavMenuTrigger>
			<NavMenuContents>
				<div class="grid gap-3 md:grid-cols-2">
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Inputs</p>
						<p class="text-sm text-app-text-muted">Forms, toggles, and selection patterns.</p>
					</div>
					<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
						<p class="font-medium text-app-text">Overlays</p>
						<p class="text-sm text-app-text-muted">Dialogs, popovers, and menus for task flows.</p>
					</div>
				</div>
			</NavMenuContents>
		</NavMenuItem>
	</NavMenu>
</div>`
			}
		]
	},
	{
		slug: 'otp',
		title: 'OTP',
		subtitle: 'A segmented verification input for short confirmation codes.',
		imports: ['Otp'],
		setup: `
let code = $state('');
let backupCode = $state('');`,
		snippet: `
<script lang="ts">
	import { Otp } from '$lib/components';

	let value = $state('');
</script>

<Otp bind:value={value} length={6} ariaLabel="Verification code" />
`,
		live: `
<div class="mx-auto w-full max-w-md">
	<Otp bind:value={code} length={6} ariaLabel="Verification code" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle: 'Use invalid and disabled states to reflect delivery and retry flows.',
				markup: `
<div class="mx-auto grid w-full max-w-md gap-4">
	<Otp bind:value={backupCode} length={4} ariaLabel="Backup verification code" invalid />
	<Otp value="4821" length={4} ariaLabel="Disabled verification code" disabled />
</div>`
			}
		]
	},
	{
		slug: 'pagination',
		title: 'Pagination',
		subtitle: 'A page navigator for lists, tables, and archive views.',
		imports: ['Pagination'],
		setup: `
let currentPage = $state(6);
let compactPage = $state(2);`,
		snippet: `
<script lang="ts">
	import { Pagination } from '$lib/components';

	let page = $state(3);
</script>

<Pagination count={12} page={page} onpagechange={(nextPage) => (page = nextPage)} />
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Pagination count={18} page={currentPage} onpagechange={(nextPage) => (currentPage = nextPage)} />
</div>`,
		examples: [
			{
				title: 'Compact Size',
				subtitle: 'Reduce the control size for dense dashboards and side panels.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Pagination
		count={8}
		page={compactPage}
		size="sm"
		siblingCount={0}
		onpagechange={(nextPage) => (compactPage = nextPage)}
	/>
</div>`
			}
		]
	},
	{
		slug: 'popover',
		title: 'Popover',
		subtitle: 'A click-triggered overlay for compact settings and contextual detail.',
		imports: ['Button', 'Popover'],
		snippet: `
<script lang="ts">
	import { Button, Popover } from '$lib/components';
</script>

<Popover class="inline-flex">
	<Button role="secondary" variant="outline">Open popover</Button>

	{#snippet content()}
		<div class="space-y-2">
			<p class="font-medium text-app-text">Quick settings</p>
			<p class="text-sm text-app-text-muted">Adjust a few preferences without leaving the page.</p>
		</div>
	{/snippet}
</Popover>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Popover class="inline-flex">
		<Button role="secondary" variant="outline">Open quick settings</Button>

		{#snippet content()}
			<div class="w-72 space-y-3">
				<p class="font-medium text-app-text">Quick settings</p>
				<p class="text-sm text-app-text-muted">
					Adjust publish controls, launch reminders, and team visibility without leaving the editor.
				</p>
				<div class="flex justify-end">
					<Button size="sm" role="secondary" variant="outline">Done</Button>
				</div>
			</div>
		{/snippet}
	</Popover>
</div>`,
		examples: [
			{
				title: 'Text Content',
				subtitle: 'Use the text prop for short contextual hints.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Popover text="This release note will be visible to every signed-in customer." class="inline-flex">
		<Button size="sm" role="secondary" variant="quiet" icon="information-circle" ariaLabel="Release note visibility" />
	</Popover>
</div>`
			}
		]
	},
	{
		slug: 'progress',
		title: 'Progress',
		subtitle: 'A visual indicator for completion, rollout, and long-running steps.',
		imports: ['Badge', 'Progress'],
		snippet: `
<script lang="ts">
	import { Progress } from '$lib/components';
</script>

<Progress value={72} ariaLabel="Launch progress" />
`,
		live: `
<div class="mx-auto w-full max-w-xl space-y-3">
	<div class="flex items-center justify-between gap-3">
		<p class="text-sm font-medium text-app-text">Launch readiness</p>
		<Badge role="primary" variant="modern">84%</Badge>
	</div>
	<Progress value={84} ariaLabel="Launch readiness progress" />
</div>`,
		examples: [
			{
				title: 'Milestones',
				subtitle: 'Use multiple progress bars to compare related phases of the same workflow.',
				markup: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<div class="space-y-2">
		<p class="text-sm font-medium text-app-text">Content review</p>
		<Progress value={96} ariaLabel="Content review progress" />
	</div>
	<div class="space-y-2">
		<p class="text-sm font-medium text-app-text">Operations handoff</p>
		<Progress value={62} ariaLabel="Operations handoff progress" />
	</div>
</div>`
			}
		]
	},
	{
		slug: 'radio',
		title: 'Radio',
		subtitle: 'A single-choice control for mutually exclusive options.',
		imports: ['Radio'],
		setup: `
let visibility = $state('team');
let cadence = $state('weekly');`,
		snippet: `
<script lang="ts">
	import { Radio } from '$lib/components';

	let group = $state('team');
</script>

<div class="grid gap-3">
	<Radio bind:group={group} name="visibility" value="team" label="Team only" />
	<Radio bind:group={group} name="visibility" value="public" label="Public" />
</div>
`,
		live: `
<div class="mx-auto grid w-full max-w-xl gap-3">
	<Radio bind:group={visibility} name="visibility" value="team" label="Team only" />
	<Radio bind:group={visibility} name="visibility" value="public" label="Public launch" />
	<Radio bind:group={visibility} name="visibility" value="private" label="Private preview" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle:
					'Use helper and disabled states when the choice depends on access level or setup.',
				markup: `
<div class="mx-auto grid w-full max-w-xl gap-3">
	<Radio bind:group={cadence} name="cadence" value="daily" label="Daily summary" helper="Best for active launch weeks." />
	<Radio bind:group={cadence} name="cadence" value="weekly" label="Weekly summary" />
	<Radio bind:group={cadence} name="cadence" value="monthly" label="Monthly summary" disabled />
</div>`
			}
		]
	},
	{
		slug: 'select',
		title: 'Select',
		subtitle: 'A styled selection menu for well-defined option lists.',
		imports: ['Select'],
		setup: `
let owner = $state('emma');
let region = $state('asia');

const ownerOptions = [
	{ value: 'emma', label: 'Emma Li', description: 'Operations lead' },
	{ value: 'mina', label: 'Mina Park', description: 'Content strategist' },
	{ value: 'lara', label: 'Lara Ong', description: 'Lifecycle marketing' }
];

const regionOptions = [
	{ value: 'americas', label: 'Americas', group: 'Regional' },
	{ value: 'asia', label: 'Asia Pacific', group: 'Regional' },
	{ value: 'emea', label: 'EMEA', group: 'Regional' }
];`,
		snippet: `
<script lang="ts">
	import { Select } from '$lib/components';

	let value = $state('emma');

	const options = [
		{ value: 'emma', label: 'Emma Li' },
		{ value: 'mina', label: 'Mina Park' }
	];
</script>

<Select bind:value={value} options={options} placeholder="Choose owner" />
`,
		live: `
<div class="mx-auto w-full max-w-md">
	<Select bind:value={owner} options={ownerOptions} placeholder="Choose owner" />
</div>`,
		examples: [
			{
				title: 'Grouped Options',
				subtitle: 'Organize longer lists with light grouping when the categories are obvious.',
				markup: `
<div class="mx-auto w-full max-w-md">
	<Select bind:value={region} options={regionOptions} placeholder="Choose region" />
</div>`
			}
		]
	},
	{
		slug: 'separator',
		title: 'Separator',
		subtitle: 'A thin dividing line for grouping related content.',
		imports: ['Separator'],
		snippet: `
<script lang="ts">
	import { Separator } from '$lib/components';
</script>

<div class="space-y-4">
	<p class="text-sm text-app-text-muted">Overview</p>
	<Separator />
	<p class="text-sm text-app-text-muted">Details</p>
</div>
`,
		live: `
<div class="mx-auto w-full max-w-xl space-y-4">
	<div class="space-y-2">
		<p class="text-sm font-medium text-app-text">Launch summary</p>
		<p class="text-sm text-app-text-muted">Approved by growth, legal, and support.</p>
	</div>
	<Separator />
	<div class="space-y-2">
		<p class="text-sm font-medium text-app-text">Next step</p>
		<p class="text-sm text-app-text-muted">Schedule the release and notify operators.</p>
	</div>
</div>`,
		examples: [
			{
				title: 'Vertical',
				subtitle: 'Use a vertical separator between small inline regions.',
				markup: `
<div class="mx-auto flex w-full max-w-xl items-center justify-center gap-4">
	<span class="text-sm text-app-text-muted">Published</span>
	<Separator orientation="vertical" class="h-5" />
	<span class="text-sm text-app-text-muted">Scheduled</span>
	<Separator orientation="vertical" class="h-5" />
	<span class="text-sm text-app-text-muted">Archived</span>
</div>`
			}
		]
	},
	{
		slug: 'sheet',
		title: 'Sheet',
		subtitle: 'A side or edge panel for secondary workflows and supporting detail.',
		imports: ['Button', 'Sheet'],
		setup: `
let rightOpen = $state(false);
let bottomOpen = $state(false);`,
		snippet: `
<script lang="ts">
	import { Button, Sheet } from '$lib/components';

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open settings</Button>

<Sheet bind:open={open} side="right" title="Quick settings" description="Adjust rollout preferences.">
	<p class="text-sm text-app-text-muted">Move secondary setup work out of the main canvas.</p>
</Sheet>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
	<Button onclick={() => (rightOpen = true)}>Open side sheet</Button>
	<Button role="secondary" variant="outline" onclick={() => (bottomOpen = true)}>Open bottom sheet</Button>
</div>

<Sheet
	bind:open={rightOpen}
	side="right"
	title="Quick settings"
	description="Adjust rollout preferences without leaving the current page."
>
	<div class="space-y-3">
		<p class="text-sm text-app-text-muted">Use a side sheet for supporting decisions and short edits.</p>
	</div>
</Sheet>

<Sheet
	bind:open={bottomOpen}
	side="bottom"
	title="Launch note"
	description="Review the final note before go-live."
>
	<div class="space-y-3">
		<p class="text-sm text-app-text-muted">Use a bottom sheet when the content reads like a stacked mobile drawer.</p>
	</div>
</Sheet>`,
		examples: [
			{
				title: 'Large Left Sheet',
				subtitle: 'Open a wider sheet from the left for navigation or historical context.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button role="secondary" variant="outline" onclick={() => (rightOpen = true)}>Reuse current example</Button>
</div>

<Sheet
	bind:open={rightOpen}
	side="left"
	size="lg"
	title="Release timeline"
	description="Review milestones, approvals, and notes from earlier drafts."
>
	<div class="grid gap-3">
		<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
			<p class="font-medium text-app-text">Monday</p>
			<p class="text-sm text-app-text-muted">Kickoff and editorial alignment.</p>
		</div>
		<div class="rounded-2xl border border-app-border bg-app-bg px-4 py-4">
			<p class="font-medium text-app-text">Thursday</p>
			<p class="text-sm text-app-text-muted">Approval and launch readiness review.</p>
		</div>
	</div>
</Sheet>`
			}
		]
	},
	{
		slug: 'sidebar',
		title: 'Sidebar',
		subtitle: 'A navigational rail for app sections, nested entries, and persistent context.',
		imports: ['Sidebar'],
		setup: `
const sidebarItems = [
	{ id: 'overview', label: 'Overview', icon: 'home' },
	{
		id: 'campaigns',
		label: 'Campaigns',
		icon: 'megaphone',
		surface: 'multipanel',
		entries: [
			{ id: 'homepage', label: 'Homepage', description: 'Primary launch placement' },
			{ id: 'lifecycle', label: 'Lifecycle', description: 'Email and retention' }
		]
	},
	{ id: 'analytics', label: 'Analytics', icon: 'chart-bar' },
	{ id: 'settings', label: 'Settings', icon: 'cog-6-tooth' }
] satisfies Sidebar.Item[];

let sidebarValue = $state('overview');
let openItem = $state('campaigns');`,
		snippet: `
<script lang="ts">
	import { Sidebar } from '$lib/components';

	const items = [
		{ id: 'overview', label: 'Overview', icon: 'home' },
		{ id: 'settings', label: 'Settings', icon: 'cog-6-tooth' }
	];
</script>

<Sidebar items={items} value="overview" ariaLabel="Workspace navigation" />
`,
		live: `
<div class="mx-auto h-96 w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border bg-app-surface">
	<Sidebar
		items={sidebarItems}
		bind:value={sidebarValue}
		bind:openItem={openItem}
		scrollable
		ariaLabel="Workspace navigation"
		class="h-full rounded-none border-0 bg-transparent"
	>
		{#snippet header()}
			<div class="grid gap-1">
				<p class="text-sm font-medium text-app-text">Workspace</p>
				<p class="text-xs text-app-text-muted">Spring launch</p>
			</div>
		{/snippet}
	</Sidebar>
</div>`,
		examples: [
			{
				title: 'Rail Only',
				subtitle: 'Collapse the surface into an icon rail when horizontal space is tight.',
				markup: `
<div class="mx-auto h-80 w-full max-w-sm overflow-hidden rounded-3xl border border-app-border bg-app-surface">
	<Sidebar
		items={sidebarItems}
		value="overview"
		railOnly
		collapsed
		showCollapseToggle={false}
		ariaLabel="Compact workspace navigation"
		class="h-full rounded-none border-0 bg-transparent"
	/>
</div>`
			}
		]
	},
	{
		slug: 'slider',
		title: 'Slider',
		subtitle: 'A draggable range control for bounded numeric values.',
		imports: ['Slider'],
		setup: `
let emphasis = $state([60]);
let range = $state([20, 80]);`,
		snippet: `
<script lang="ts">
	import { Slider } from '$lib/components';

	let value = $state([60]);
</script>

<Slider bind:value={value} ariaLabel="Hero emphasis" />
`,
		live: `
<div class="mx-auto w-full max-w-xl space-y-4">
	<p class="text-sm text-app-text-muted">Adjust hero emphasis for the launch homepage.</p>
	<Slider bind:value={emphasis} ariaLabel="Hero emphasis" />
</div>`,
		examples: [
			{
				title: 'Range',
				subtitle: 'Use multiple thumbs when the workflow needs a lower and upper bound.',
				markup: `
<div class="mx-auto w-full max-w-xl space-y-4">
	<p class="text-sm text-app-text-muted">Set a safe rollout window for the release notification.</p>
	<Slider bind:value={range} minStepsBetweenThumbs={10} ariaLabel="Safe rollout window" />
</div>`
			}
		]
	},
	{
		slug: 'spinner',
		title: 'Spinner',
		subtitle: 'A loading indicator for short waits and background work.',
		imports: ['Spinner'],
		snippet: `
<script lang="ts">
	import { Spinner } from '$lib/components';
</script>

<Spinner ariaLabel="Loading" />
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl items-center justify-center gap-6">
	<Spinner size="sm" ariaLabel="Loading small" />
	<Spinner size="md" ariaLabel="Loading medium" />
	<Spinner size="lg" ariaLabel="Loading large" />
</div>`,
		examples: [
			{
				title: 'Roles',
				subtitle: 'Match the spinner tone to the surrounding action or surface.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl items-center justify-center gap-6">
	<Spinner role="primary" ariaLabel="Primary loading" />
	<Spinner role="success" ariaLabel="Success loading" />
	<Spinner role="warning" ariaLabel="Warning loading" />
	<Spinner role="danger" ariaLabel="Danger loading" />
</div>`
			}
		]
	},
	{
		slug: 'table',
		title: 'Table',
		subtitle: 'A semantic table primitive for structured row and column data.',
		imports: ['Badge', 'Table', 'TBody', 'TColumn', 'THeader', 'TRow'],
		setup: `
const rows = [
	{ campaign: 'Homepage banner', owner: 'Emma Li', status: 'Ready' },
	{ campaign: 'Lifecycle email', owner: 'Lara Ong', status: 'Reviewing' },
	{ campaign: 'Help center update', owner: 'Mina Park', status: 'Drafting' }
];`,
		snippet: `
<script lang="ts">
	import { Table, TBody, TColumn, THeader, TRow } from '$lib/components';
</script>

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
</Table>
`,
		live: `
<div class="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-app-border bg-app-surface">
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
</div>`,
		examples: [
			{
				title: 'Compact Summary',
				subtitle: 'Use a minimal table for dense operational lists.',
				markup: `
<div class="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-app-border bg-app-surface">
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
</div>`
			}
		]
	},
	{
		slug: 'tabs',
		title: 'Tabs',
		subtitle: 'A segmented control for switching between peer views.',
		imports: ['Badge', 'Tabs'],
		setup: `
let activeTab = $state('overview');

const tabItems = [
	{ value: 'overview', label: 'Overview' },
	{ value: 'activity', label: 'Activity' },
	{ value: 'team', label: 'Team' }
];`,
		snippet: `
<script lang="ts">
	import { Tabs } from '$lib/components';

	let value = $state('overview');

	const items = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'activity', label: 'Activity' }
	];
</script>

<Tabs bind:value={value} items={items} ariaLabel="Workspace sections" />
`,
		live: `
<div class="mx-auto w-full max-w-3xl space-y-6">
	<Tabs bind:value={activeTab} items={tabItems} ariaLabel="Workspace sections" />

	<div class="rounded-3xl border border-app-border bg-app-surface px-5 py-5">
		{#if activeTab === 'overview'}
			<div class="space-y-2">
				<Badge role="primary" variant="modern">Overview</Badge>
				<p class="text-sm text-app-text-muted">Track launch readiness, approvals, and remaining blockers.</p>
			</div>
		{:else if activeTab === 'activity'}
			<div class="space-y-2">
				<Badge role="secondary" variant="modern">Activity</Badge>
				<p class="text-sm text-app-text-muted">Review recent edits, comments, and publish events.</p>
			</div>
		{:else}
			<div class="space-y-2">
				<Badge role="success" variant="modern">Team</Badge>
				<p class="text-sm text-app-text-muted">Coordinate owners, reviewers, and supporting operators.</p>
			</div>
		{/if}
	</div>
</div>`,
		examples: [
			{
				title: 'Underline',
				subtitle: 'Switch to the underline variant for header-level navigation patterns.',
				markup: `
<div class="mx-auto w-full max-w-3xl">
	<Tabs bind:value={activeTab} items={tabItems} variant="underline" ariaLabel="Workspace sections underline" />
</div>`
			}
		]
	},
	{
		slug: 'textarea',
		title: 'Textarea',
		subtitle: 'A multi-line input for notes, summaries, and message drafts.',
		imports: ['Textarea'],
		setup: `
let summary = $state('');
let notes = $state('');`,
		snippet: `
<script lang="ts">
	import { Textarea } from '$lib/components';

	let value = $state('');
</script>

<Textarea bind:value={value} rows={5} placeholder="Write a short summary" />
`,
		live: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Textarea bind:value={summary} rows={5} placeholder="Write the launch summary" resize="vertical" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle: 'Use helper and error copy when the text needs stronger guidance.',
				markup: `
<div class="mx-auto grid w-full max-w-xl gap-4">
	<Textarea bind:value={notes} rows={4} helper="Keep this concise for the launch channel." />
	<Textarea rows={4} error="Add at least one key customer-facing change before publishing." />
</div>`
			}
		]
	},
	{
		slug: 'toast',
		title: 'Toast',
		subtitle: 'A transient notification system for updates, actions, and async work.',
		imports: ['Button', 'Toast', 'toast'],
		setup: `
const showSuccessToast = () => {
	toast.success({
		title: 'Campaign scheduled',
		description: 'The launch email is queued for April 12 at 9:00 AM.'
	});
};

const showInfoToast = () => {
	toast.info({
		title: 'Preview ready',
		description: 'The release note preview has been refreshed for your team.'
	});
};

const showPromiseToast = () => {
	void toast.promise(
		new Promise((resolve) => {
			setTimeout(() => resolve('Launch summary exported.'), 800);
		}),
		{
			loading: { title: 'Exporting summary', description: 'Building the latest launch handoff.' },
			success: (message) => ({ title: 'Export complete', description: String(message) }),
			error: { title: 'Export failed', description: 'Try the export again in a few seconds.' }
		}
	);
};`,
		snippet: `
<script lang="ts">
	import { Button, Toast, toast } from '$lib/components';

	const notify = () => {
		toast.success({
			title: 'Campaign scheduled',
			description: 'The launch email is queued for tomorrow morning.'
		});
	};
</script>

<Toast />
<Button onclick={notify}>Show toast</Button>
`,
		live: `
<Toast />

<div class="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-3">
	<Button onclick={showSuccessToast}>Show success toast</Button>
	<Button role="secondary" variant="outline" onclick={showInfoToast}>Show info toast</Button>
</div>`,
		examples: [
			{
				title: 'Promise Updates',
				subtitle: 'Use the toast API to reflect loading, success, and failure across async work.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Button role="secondary" variant="outline" onclick={showPromiseToast}>Run async toast</Button>
</div>`
			}
		]
	},
	{
		slug: 'toggle',
		title: 'Toggle',
		subtitle: 'A binary switch for preferences and persistent on-off settings.',
		imports: ['Toggle'],
		setup: `
let darkMode = $state(true);
let autoPublish = $state(false);`,
		snippet: `
<script lang="ts">
	import { Toggle } from '$lib/components';

	let checked = $state(false);
</script>

<Toggle bind:checked={checked} ariaLabel="Enable dark mode" />
`,
		live: `
<div class="mx-auto flex w-full max-w-md items-center justify-center gap-6">
	<Toggle bind:checked={darkMode} ariaLabel="Enable dark mode" />
	<Toggle bind:checked={autoPublish} size="lg" ariaLabel="Enable auto publish" />
</div>`,
		examples: [
			{
				title: 'States',
				subtitle: 'Use size and disabled states to adapt the switch to the surrounding surface.',
				markup: `
<div class="mx-auto flex w-full max-w-md items-center justify-center gap-6">
	<Toggle size="sm" checked ariaLabel="Small toggle" />
	<Toggle size="md" ariaLabel="Medium toggle" />
	<Toggle size="lg" disabled ariaLabel="Disabled toggle" />
</div>`
			}
		]
	},
	{
		slug: 'toggle-group',
		title: 'Toggle Group',
		subtitle: 'A grouped set of toggleable options for single or multiple selection.',
		imports: ['ToggleGroup'],
		setup: `
let singleValue = $state('week');
let multiValue = $state(['email', 'push']);

const cadenceItems = [
	{ value: 'day', label: 'Day' },
	{ value: 'week', label: 'Week' },
	{ value: 'month', label: 'Month' }
];

const channelItems = [
	{ value: 'email', label: 'Email' },
	{ value: 'push', label: 'Push' },
	{ value: 'slack', label: 'Slack' }
];`,
		snippet: `
<script lang="ts">
	import { ToggleGroup } from '$lib/components';

	let value = $state('week');

	const items = [
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' }
	];
</script>

<ToggleGroup bind:value={value} items={items} type="radio" ariaLabel="Reporting cadence" />
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<ToggleGroup
		bind:value={singleValue}
		items={cadenceItems}
		type="radio"
		indicator
		ariaLabel="Reporting cadence"
	/>
</div>`,
		examples: [
			{
				title: 'Multiple Selection',
				subtitle: 'Switch to check mode when users can combine channels or filters.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<ToggleGroup
		bind:values={multiValue}
		items={channelItems}
		type="check"
		variant="ghost"
		ariaLabel="Delivery channels"
	/>
</div>`
			}
		]
	},
	{
		slug: 'tooltip',
		title: 'Tooltip',
		subtitle: 'A concise label or hint shown on hover or focus.',
		imports: ['Button', 'Tooltip'],
		snippet: `
<script lang="ts">
	import { Button, Tooltip } from '$lib/components';
</script>

<Tooltip text="Copy launch link" class="inline-flex">
	<Button role="secondary" variant="outline" icon="link" ariaLabel="Copy launch link" />
</Tooltip>
`,
		live: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Tooltip text="Copy launch link" class="inline-flex">
		<Button role="secondary" variant="outline" icon="link" ariaLabel="Copy launch link" />
	</Tooltip>
</div>`,
		examples: [
			{
				title: 'Custom Content',
				subtitle: 'Use a small content block when the hint needs more than a single line.',
				markup: `
<div class="mx-auto flex w-full max-w-4xl justify-center">
	<Tooltip class="inline-flex">
		<Button role="secondary" variant="outline">Rollout detail</Button>

		{#snippet content()}
			<div class="space-y-1">
				<p class="font-medium text-app-text">Staged rollout</p>
				<p class="text-sm text-app-text-muted">Publish to 10% of customers before the full release.</p>
			</div>
		{/snippet}
	</Tooltip>
</div>`
			}
		]
	}
];

for (const doc of docs) {
	const outputDir = path.join(routesRoot, doc.slug);
	fs.mkdirSync(outputDir, { recursive: true });
	fs.writeFileSync(path.join(outputDir, '+page.svelte'), renderPage(doc));
}
