declare global {
	namespace Badge {
		type Size = 'xs' | 'sm' | 'md';
		type Role = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning';
		type Variant = 'badge' | 'pill' | 'badge-color' | 'pill-color' | 'modern';

		interface Props {
			id?: string;
			size?: Size;
			role?: Role;
			variant?: Variant;
			loading?: boolean;
			class?: string;
			link?: string;
			target?: Utils.AnchorTarget;
			rel?: string;
			ariaLabel?: string;
			leftIcon?: Icon.Name;
			rightIcon?: Icon.Name;
			children?: Utils.Snippet;
		}

		type SizeClass = Record<Size, string>;
		type RoleClass = Record<Role, string>;
		type VariantClass = Record<Variant, string>;
	}
}

export {};
