declare global {
	namespace Pagination {
		type Size = 'xs' | 'sm' | 'md';

		interface Props {
			id?: string;
			count?: number;
			page?: number;
			siblingCount?: number;
			boundaryCount?: number;
			size?: Size;
			disabled?: boolean;
			showPrevNext?: boolean;
			class?: string;
			ariaLabel?: string;
			previousLabel?: string;
			nextLabel?: string;
			onpagechange?: (page: number) => void;
		}

		interface PageToken {
			type: 'page';
			key: string;
			value: number;
			current: boolean;
		}

		interface EllipsisToken {
			type: 'ellipsis';
			key: string;
		}

		type Token = PageToken | EllipsisToken;
		type SizeClass = Record<Size, string>;
	}
}

export {};
