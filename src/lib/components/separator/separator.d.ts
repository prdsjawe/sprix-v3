declare global {
	namespace Separator {
		type Orientation = 'horizontal' | 'vertical';

		interface Props {
			id?: string;
			orientation?: Orientation;
			decorative?: boolean;
			class?: string;
		}

		type OrientationClass = Record<Orientation, string>;
	}
}

export {};
