declare global {
	namespace NavMenu {
		interface Props {
			id?: string;
			class?: string;
			ariaLabel?: string;
			fixedOnScroll?: boolean;
			logo?: Utils.Snippet;
			right?: Utils.Snippet;
			children?: Utils.Snippet;
		}
	}

	namespace NavMenuItem {
		type Placement = 'bottom-start' | 'bottom' | 'bottom-end';

		interface Props {
			id?: string;
			open?: boolean;
			disabled?: boolean;
			placement?: Placement;
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace NavMenuTrigger {
		type Element = HTMLButtonElement | HTMLAnchorElement;

		interface Props {
			id?: string;
			href?: string;
			target?: Utils.AnchorTarget;
			rel?: string;
			current?: boolean;
			ariaLabel?: string;
			class?: string;
			children?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<Element>) => void;
			onfocus?: (event: Utils.FocusEvent<Element>) => void;
			onblur?: (event: Utils.FocusEvent<Element>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<Element>) => void;
		}
	}

	namespace NavMenuContents {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace NavMenuRight {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}
}

export {};
