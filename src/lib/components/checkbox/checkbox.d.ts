declare global {
	namespace Checkbox {
		type Size = 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			name?: string;
			value?: string;
			label?: string;
			size?: Size;
			checked?: boolean;
			disabled?: boolean;
			required?: boolean;
			helper?: string;
			error?: string;
			class?: string;
			ariaLabel?: string;
			oninput?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onchange?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
