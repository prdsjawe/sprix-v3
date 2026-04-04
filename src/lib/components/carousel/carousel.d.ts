declare global {
	namespace Carousel {
		interface Item {
			id?: string;
			title?: string;
			description?: string;
			eyebrow?: string;
			meta?: string;
			href?: string;
			target?: Utils.AnchorTarget;
			rel?: string;
			[key: string]: unknown;
		}

		interface Props {
			id?: string;
			items?: Item[];
			page?: number;
			maxColumns?: number;
			minItemWidth?: number;
			gap?: number;
			class?: string;
			ariaLabel?: string;
			showControls?: boolean;
			showDots?: boolean;
			slide?: Utils.Snippet<[Carousel.Item, number]>;
			empty?: Utils.Snippet;
			onpagechange?: (page: number) => void;
		}
	}
}

export {};
