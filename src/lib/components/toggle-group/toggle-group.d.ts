declare global {
	namespace ToggleGroup {
		type Type = 'check' | 'radio';
		type Variant = 'bordered' | 'ghost';
		type Value = string | number;

		interface Item {
			value: Value;
			label: string;
			disabled?: boolean;
			ariaLabel?: string;
		}

		interface Props {
			id?: string;
			items?: Item[];
			type?: Type;
			variant?: Variant;
			indicator?: boolean;
			value?: Value;
			values?: Value[];
			disabled?: boolean;
			class?: string;
			ariaLabel?: string;
		}

		type TypeClass = Record<Type, string>;
		type VariantClass = Record<Variant, string>;
	}
}

export {};
