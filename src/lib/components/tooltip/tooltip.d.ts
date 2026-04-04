declare global {
	namespace Tooltip {
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
		type Delay = number | [number, number];
		type MaxWidth = number | 'none';

		interface Props {
			id?: string;
			as?: As;
			class?: string;
			contentClass?: string;
			text?: string;
			placement?: Placement;
			disabled?: boolean;
			interactive?: boolean;
			delay?: Delay;
			offset?: number;
			maxWidth?: MaxWidth;
			children?: Utils.Snippet;
			content?: Utils.Snippet;
		}
	}
}

export {};
