declare global {
	namespace Textarea {
		type Size = 'sm' | 'md' | 'lg';
		type Resize = 'none' | 'vertical' | 'both';

		interface Props {
			id?: string;
			name?: string;
			label?: string;
			size?: Size;
			value?: string;
			placeholder?: string;
			rows?: number;
			minlength?: number;
			maxlength?: number;
			disabled?: boolean;
			required?: boolean;
			readonly?: boolean;
			spellcheck?: boolean;
			helper?: string;
			error?: string;
			resize?: Resize;
			class?: string;
			ariaLabel?: string;
			oninput?: (event: Utils.DOMEvent<HTMLTextAreaElement>) => void;
			onchange?: (event: Utils.DOMEvent<HTMLTextAreaElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLTextAreaElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLTextAreaElement>) => void;
		}

		type SizeClass = Record<Size, string>;
		type ResizeClass = Record<Resize, string>;
	}
}

export {};
