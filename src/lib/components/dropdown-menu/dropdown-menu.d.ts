declare global {
	namespace DropdownMenu {
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

		interface Props extends Omit<Button.Props, 'children'> {
			open?: boolean;
			placement?: Placement;
			contentClass?: string;
			trigger?: Utils.Snippet;
			children?: Utils.Snippet;
		}
	}
}

export {};
