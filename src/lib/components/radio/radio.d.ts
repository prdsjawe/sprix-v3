declare global {
	namespace Radio {
		type Size = 'sm' | 'md' | 'lg';
		type Value = string | number;

		interface Props {
			id?: string;
			name?: string;
			value?: Value;
			group?: Value;
			label?: string;
			size?: Size;
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
