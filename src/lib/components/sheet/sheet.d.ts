declare global {
	namespace Sheet {
		type Side = 'right' | 'left' | 'top' | 'bottom';
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			open?: boolean;
			title?: string;
			description?: string;
			ariaLabel?: string;
			side?: Side;
			size?: Size;
			dismissible?: boolean;
			showClose?: boolean;
			closeLabel?: string;
			class?: string;
			children?: Utils.Snippet;
			onclose?: () => void;
		}

		type SideClass = Record<Side, string>;
		type SizeClass = Record<Size, string>;
	}
}

export {};
