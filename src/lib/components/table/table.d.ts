declare global {
	namespace Table {
		interface Props {
			id?: string;
			class?: string;
			ariaLabel?: string;
			children?: Utils.Snippet;
		}
	}

	namespace THeader {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace TBody {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace TFooter {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace TRow {
		interface Props {
			class?: string;
			children?: Utils.Snippet;
		}
	}

	namespace TColumn {
		type As = 'td' | 'th';
		type Scope = 'col' | 'row' | 'colgroup' | 'rowgroup';

		interface Props {
			id?: string;
			as?: As;
			scope?: Scope;
			colspan?: number;
			rowspan?: number;
			class?: string;
			children?: Utils.Snippet;
		}
	}
}

export {};
