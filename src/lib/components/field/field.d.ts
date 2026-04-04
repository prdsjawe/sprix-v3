declare global {
	namespace Field {
		type Orientation = 'vertical' | 'horizontal';

		interface Props {
			id?: string;
			name?: string;
			controlId?: string;
			label?: string;
			labelClass?: string;
			description?: string;
			helper?: string;
			error?: Form.ErrorValue;
			required?: boolean;
			orientation?: Orientation;
			class?: string;
			children?: Utils.Snippet;
		}

		type OrientationClass = Record<Orientation, string>;
	}
}

export {};
