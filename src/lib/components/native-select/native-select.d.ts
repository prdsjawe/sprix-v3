declare global {
	namespace NativeSelect {
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			name?: string;
			size?: Size;
			value?: string;
			placeholder?: string;
			disabled?: boolean;
			required?: boolean;
			helper?: string;
			error?: string;
			class?: string;
			ariaLabel?: string;
			children?: Utils.Snippet;
			oninput?: (event: Utils.DOMEvent<HTMLSelectElement>) => void;
			onchange?: (event: Utils.DOMEvent<HTMLSelectElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLSelectElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLSelectElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLSelectElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
