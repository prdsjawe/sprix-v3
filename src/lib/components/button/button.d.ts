declare global {
	namespace Button {
		type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		type Role = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning';
		type Variant = 'default' | 'flat' | 'quiet' | 'outline' | 'soft' | 'disabled';
		type IconName = Exclude<Icon.Name, ''>;

		interface BaseProps {
			id?: string;
			type?: Utils.ButtonAttrs['type'];
			size?: Size;
			role?: Role;
			variant?: Variant;
			disabled?: boolean;
			loading?: boolean;
			class?: string;
			name?: string;
			value?: string | number;
			ariaCurrent?: Utils.AriaCurrent;
			ariaControls?: string;
			ariaExpanded?: boolean;
			ariaHaspopup?: Utils.AriaHasPopup;
			onclick?: (event: Utils.MouseEvent<HTMLButtonElement>) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLButtonElement>) => void;
		}

		interface ContentProps {
			ariaLabel?: string;
			children?: Utils.Snippet;
			icon?: never;
			leftIcon?: IconName;
			rightIcon?: IconName;
			leftSlot?: Utils.Snippet;
			rightSlot?: Utils.Snippet;
		}

		interface IconOnlyProps {
			ariaLabel: string;
			children?: never;
			icon: IconName;
			leftIcon?: never;
			rightIcon?: never;
			leftSlot?: never;
			rightSlot?: never;
		}

		type Props = BaseProps & (ContentProps | IconOnlyProps);

		interface ResolvedProps extends BaseProps {
			ariaLabel?: string;
			children?: Utils.Snippet;
			icon?: IconName;
			leftIcon?: IconName;
			rightIcon?: IconName;
			leftSlot?: Utils.Snippet;
			rightSlot?: Utils.Snippet;
		}

		type SizeClass = Record<Size, string>;
		type RoleClass = Record<Role, string>;
		type VariantClass = Record<Variant, string>;
	}

	namespace ButtonGroup {
		type Orientation = 'horizontal' | 'vertical';

		interface Props {
			id?: string;
			class?: string;
			orientation?: Orientation;
			ariaLabel?: string;
			children?: Utils.Snippet;
		}

		type OrientationClass = Record<Orientation, string>;
	}
}

export {};
