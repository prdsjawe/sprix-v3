export const FORM_CONTEXT_KEY = Symbol('sprix-form');

export type FormContextValue = {
	getErrors: () => Form.Errors;
};

export const normalizeFormError = (value: Form.ErrorValue): string => {
	if (!value) {
		return '';
	}

	if (typeof value === 'string') {
		return value;
	}

	if (Array.isArray(value)) {
		return value.filter(Boolean).join(' ');
	}

	if ('_errors' in value && Array.isArray(value._errors)) {
		return value._errors.filter(Boolean).join(' ');
	}

	return '';
};
