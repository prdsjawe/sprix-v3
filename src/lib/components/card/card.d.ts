declare global {
	namespace Card {
		interface Props {
			id?: string;
			title?: string;
			description?: string;
			class?: string;
			header?: Utils.Snippet;
			action?: Utils.Snippet;
			footer?: Utils.Snippet;
			children?: Utils.Snippet;
		}
	}
}

export {};
