declare global {
	namespace Popover {
		type As = 'span' | 'div';
		type Placement =
			| 'top-start'
			| 'top'
			| 'top-end'
			| 'right-start'
			| 'right'
			| 'right-end'
			| 'bottom-start'
			| 'bottom'
			| 'bottom-end'
			| 'left-start'
			| 'left'
			| 'left-end';
		type MaxWidth = number | 'none';

		interface Props {
			id?: string;
			as?: As;
			class?: string;
			contentClass?: string;
			text?: string;
			open?: boolean;
			placement?: Placement;
			disabled?: boolean;
			tabindex?: number;
			ariaLabel?: string;
			ariaHaspopup?: Utils.AriaHasPopup;
			closeOnOutside?: boolean;
			closeOnEscape?: boolean;
			offset?: number;
			maxWidth?: MaxWidth;
			children?: Utils.Snippet;
			content?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<HTMLElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLElement>) => void;
		}
	}
}

export {};
