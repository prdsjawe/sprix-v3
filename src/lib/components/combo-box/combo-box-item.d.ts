declare global {
	namespace ComboBoxItem {
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			type?: Utils.ButtonAttrs['type'];
			value?: string;
			label?: string;
			description?: string;
			size?: Size;
			selected?: boolean;
			active?: boolean;
			disabled?: boolean;
			class?: string;
			children?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<HTMLButtonElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onmouseenter?: (event: Utils.MouseEvent<HTMLButtonElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
