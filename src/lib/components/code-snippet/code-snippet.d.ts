declare global {
	namespace CodeSnippet {
		interface Props {
			id?: string;
			code?: string;
			filename?: string;
			language?: string;
			showLineNumbers?: boolean;
			wrap?: boolean;
			ariaLabel?: string;
			class?: string;
		}
	}
}

export {};
