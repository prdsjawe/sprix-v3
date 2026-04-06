declare global {
	namespace Spinner {
		type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
		type Role = 'current' | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning';

		interface Props {
			id?: string;
			size?: Size;
			role?: Role;
			class?: string;
			ariaLabel?: string;
			children?: Utils.Snippet;
		}

		type SizeClass = Record<Size, string>;
		type RoleClass = Record<Role, string>;
	}
}

export {};
