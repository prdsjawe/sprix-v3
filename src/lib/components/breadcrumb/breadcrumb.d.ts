declare global {
	namespace Breadcrumb {
		interface Item {
			label: string;
			href?: string;
			target?: Utils.AnchorTarget;
			rel?: string;
			current?: boolean;
			icon?: Icon.Name;
		}

		interface Props {
			id?: string;
			class?: string;
			ariaLabel?: string;
			items?: readonly Item[];
		}
	}
}

export {};
