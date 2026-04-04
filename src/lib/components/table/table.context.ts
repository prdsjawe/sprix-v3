import { getContext, setContext } from 'svelte';

const TABLE_SECTION_CONTEXT = Symbol('table-section-context');

export type TableSection = 'header' | 'body' | 'footer';

export const setTableSectionContext = (section: TableSection) =>
	setContext(TABLE_SECTION_CONTEXT, section);

export const getTableSectionContext = () =>
	getContext<TableSection | undefined>(TABLE_SECTION_CONTEXT);
