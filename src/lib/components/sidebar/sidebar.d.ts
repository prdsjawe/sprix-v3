declare global {
	namespace Sidebar {
		type Surface = 'dropdown' | 'multipanel';

		interface Entry {
			id: string;
			label: string;
			description?: string;
			icon?: Icon.Name;
			badge?: string;
			meta?: string;
			disabled?: boolean;
		}

		interface Item {
			id: string;
			label: string;
			icon?: Icon.Name;
			badge?: string;
			hint?: string;
			link?: string;
			href?: string;
			target?: Utils.AnchorTarget;
			rel?: string;
			disabled?: boolean;
			surface?: Surface;
			entries?: Entry[];
		}

		interface Props {
			id?: string;
			items?: Item[];
			value?: string;
			openItem?: string;
			entryValue?: string;
			collapsed?: boolean;
			showCollapseToggle?: boolean;
			class?: string;
			ariaLabel?: string;
			header?: Utils.Snippet;
			footer?: Utils.Snippet;
			onselect?: (item: Item) => void;
			onentryselect?: (entry: Entry, item: Item) => void;
		}
	}
}

export {};
