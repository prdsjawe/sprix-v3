declare global {
	namespace Dialog {
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			open?: boolean;
			title?: string;
			description?: string;
			ariaLabel?: string;
			size?: Size;
			dismissible?: boolean;
			showClose?: boolean;
			closeLabel?: string;
			class?: string;
			children?: Utils.Snippet;
			footer?: Utils.Snippet;
			onclose?: () => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
