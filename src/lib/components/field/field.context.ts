export const FIELD_CONTEXT_KEY = Symbol('sprix-field');

export type FieldContextValue = {
	getControlId: () => string;
	getName: () => string;
	getRequired: () => boolean;
	getInvalid: () => boolean;
	getDescribedBy: () => string | undefined;
};
