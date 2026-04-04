declare global {
	namespace Avatar {
		type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

		interface Props {
			id?: string;
			src?: string;
			name?: string;
			alt?: string;
			size?: Size;
			class?: string;
			onload?: (event: Utils.DOMEvent<HTMLImageElement>) => void;
			onerror?: (event: Utils.DOMEvent<HTMLImageElement>) => void;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
