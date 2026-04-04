declare global {
	namespace Otp {
		interface Props {
			id?: string;
			name?: string;
			value?: string;
			length?: number;
			placeholder?: string;
			autocomplete?: Utils.InputAutocomplete;
			inputmode?: Utils.InputMode;
			disabled?: boolean;
			readonly?: boolean;
			required?: boolean;
			invalid?: boolean;
			class?: string;
			ariaLabel?: string;
			oninput?: (event: Utils.InputEvent<HTMLInputElement>) => void;
			onchange?: (event: Utils.DOMEvent<HTMLInputElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLInputElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLInputElement>) => void;
			onpaste?: (event: Utils.ClipboardEvent<HTMLInputElement>) => void;
		}
	}
}

export {};
