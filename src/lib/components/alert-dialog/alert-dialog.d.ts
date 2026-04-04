declare global {
	namespace AlertDialog {
		type Type = 'info' | 'destructive';

		interface Props {
			id?: string;
			open?: boolean;
			type?: Type;
			title?: string;
			description?: string;
			confirmLabel?: string;
			cancelLabel?: string;
			confirmPrompt?: string;
			dismissible?: boolean;
			closeOnConfirm?: boolean;
			class?: string;
			children?: Utils.Snippet;
			onconfirm?: () => void | boolean | Promise<void | boolean>;
			oncancel?: () => void;
		}

		type TypeClass = Record<Type, string>;
		type TypeIcon = Record<Type, Icon.Name>;
	}
}

export {};
