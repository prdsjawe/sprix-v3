declare global {
	namespace Tabs {
		type Variant = 'button' | 'underline';

		interface Item {
			value: string;
			label: string;
			disabled?: boolean;
			id?: string;
			panelId?: string;
		}

		interface Props {
			id?: string;
			items?: Item[];
			value?: string;
			variant?: Variant;
			class?: string;
			ariaLabel?: string;
		}

		type VariantClass = Record<Variant, string>;
	}
}

export {};
