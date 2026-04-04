declare global {
	namespace Accordion {
		type Type = 'single' | 'multiple';
		type Size = 'sm' | 'md' | 'lg';
		type Variant = 'default' | 'card';
		type Value = string | string[];

		interface Props {
			id?: string;
			type?: Type;
			size?: Size;
			variant?: Variant;
			value?: Value;
			collapsible?: boolean;
			class?: string;
			children?: Utils.Snippet;
		}

		type SizeClass = Record<Size, string>;
		type VariantClass = Record<Variant, string>;
	}

	namespace AccordionItem {
		interface Props {
			id?: string;
			value?: string;
			disabled?: boolean;
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace AccordionTrigger {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<HTMLButtonElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLButtonElement>) => void;
		}
	}

	namespace AccordionContent {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}
}

export {};
