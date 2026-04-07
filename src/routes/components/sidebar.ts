export const sidebarLabels = [
	'Getting Started',
	'Accordion',
	'Alert Dialog',
	'Avatar',
	'Badge',
	'Breadcrumb',
	'Button',
	'Button Group',
	'Card',
	'Carousel',
	'Checkbox',
	'Code Snippet',
	'ComboBox',
	'Command',
	'Date Picker',
	'Dialog',
	'Dropdown Menu',
	'Empty',
	'Field',
	'Form',
	'Hover Card',
	'Icon',
	'Input',
	'Kbd',
	'Link',
	'Native Select',
	'NavMenu',
	'OTP',
	'Pagination',
	'Popover',
	'Progress',
	'Radio',
	'Select',
	'Separator',
	'Sheet',
	'Sidebar',
	'Slider',
	'Spinner',
	'Table',
	'Tabs',
	'Textarea',
	'Toast',
	'Toggle',
	'Toggle Group',
	'Tooltip'
] as const;

export const toKebabCase = (label: string) =>
	label
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase();

export const toComponentHref = (slug: string) =>
	slug === 'getting-started' ? '/components' : `/components/${slug}`;
