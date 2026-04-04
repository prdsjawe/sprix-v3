declare global {
	namespace Command {
		type Size = 'sm' | 'md' | 'lg';
		type ItemShortcut = string | string[];
		type SelectResult = void | boolean | Promise<void | boolean>;

		interface Item {
			value: string;
			label: string;
			description?: string;
			group?: string;
			icon?: Icon.Name;
			shortcut?: ItemShortcut;
			keywords?: string[];
			badge?: string;
			disabled?: boolean;
		}

		interface Props {
			id?: string;
			open?: boolean;
			value?: string;
			search?: string;
			size?: Size;
			title?: string;
			description?: string;
			ariaLabel?: string;
			placeholder?: string;
			emptyTitle?: string;
			emptyDescription?: string;
			dismissible?: boolean;
			showClose?: boolean;
			closeLabel?: string;
			closeOnSelect?: boolean;
			loading?: boolean;
			class?: string;
			items?: Item[];
			footer?: Utils.Snippet;
			onclose?: () => void;
			onselect?: (item: Item) => SelectResult;
			oninput?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLInputElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
