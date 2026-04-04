declare global {
	namespace Select {
		type Size = 'sm' | 'md' | 'lg';

		interface Option {
			value: string;
			label: string;
			description?: string;
			group?: string;
			disabled?: boolean;
		}

		interface RenderOption extends Option {
			index: number;
		}

		interface RenderGroup {
			label: string;
			options: RenderOption[];
		}

		interface Props {
			id?: string;
			name?: string;
			size?: Size;
			value?: string;
			open?: boolean;
			placeholder?: string;
			options?: Option[];
			disabled?: boolean;
			required?: boolean;
			helper?: string;
			error?: string;
			class?: string;
			ariaLabel?: string;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLButtonElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
