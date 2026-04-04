declare global {
	namespace ComboBox {
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			name?: string;
			label?: string;
			size?: Size;
			value?: string;
			open?: boolean;
			placeholder?: string;
			autocomplete?: Utils.InputAutocomplete;
			inputmode?: Utils.InputMode;
			disabled?: boolean;
			required?: boolean;
			readonly?: boolean;
			helper?: string;
			error?: string;
			class?: string;
			ariaLabel?: string;
			children?: Utils.Snippet;
			oninput?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onchange?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLInputElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
