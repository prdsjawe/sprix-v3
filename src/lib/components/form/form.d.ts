declare global {
	namespace Form {
		type ErrorValue = string | string[] | { _errors?: string[] } | null | undefined;
		type Errors = Record<string, ErrorValue>;

		interface Props {
			id?: string;
			class?: string;
			novalidate?: boolean;
			errors?: Errors;
			children?: Utils.Snippet;
			onsubmit?: (event: Utils.SubmitEvent<HTMLFormElement>) => void;
			onreset?: (event: Utils.FormEvent<HTMLFormElement>) => void;
		}
	}
}

export {};
