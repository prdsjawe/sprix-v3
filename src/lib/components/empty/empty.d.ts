declare global {
	namespace Empty {
		type Size = 'sm' | 'md' | 'lg';
		type Align = 'left' | 'center';
		type Variant = 'panel' | 'plain';

		interface Props {
			id?: string;
			size?: Size;
			align?: Align;
			variant?: Variant;
			class?: string;
			eyebrow?: string;
			title?: string;
			description?: string;
			icon?: Icon.Name;
			media?: Utils.Snippet;
			action?: Utils.Snippet;
			children?: Utils.Snippet;
		}

		type SizeClass = Record<Size, string>;
		type AlignClass = Record<Align, string>;
		type VariantClass = Record<Variant, string>;
	}
}

export {};
