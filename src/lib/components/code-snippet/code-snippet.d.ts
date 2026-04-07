declare global {
	namespace CodeSnippet {
		type Size = 'xs' | 'sm' | 'md' | 'lg';

		interface Props {
			id?: string;
			code?: string;
			filename?: string;
			language?: string;
			size?: Size;
			showLineNumbers?: boolean;
			wrap?: boolean;
			ariaLabel?: string;
			class?: string;
		}

		type SizeClass = Record<Size, string>;
	}
}

export {};
