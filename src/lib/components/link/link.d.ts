declare global {
	namespace Link {
		interface Props {
			id?: string;
			href?: Utils.AnchorAttrs['href'];
			target?: Utils.AnchorTarget;
			rel?: Utils.AnchorAttrs['rel'];
			download?: Utils.AnchorAttrs['download'];
			hreflang?: Utils.AnchorAttrs['hreflang'];
			referrerpolicy?: Utils.AnchorAttrs['referrerpolicy'];
			ping?: Utils.AnchorAttrs['ping'];
			class?: string;
			ariaLabel?: string;
			ariaCurrent?: Utils.AriaCurrent;
			children?: Utils.Snippet;
			leftIcon?: Icon.Name;
			rightIcon?: Icon.Name;
			leftSlot?: Utils.Snippet;
			rightSlot?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<HTMLAnchorElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLAnchorElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLAnchorElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLAnchorElement>) => void;
		}
	}
}

export {};
