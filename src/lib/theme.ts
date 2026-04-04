export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'sprix-theme';

export const isTheme = (value: string | null): value is Theme =>
	value === 'light' || value === 'dark';

export const readTheme = (): Theme => {
	if (typeof window === 'undefined') {
		return 'light';
	}

	try {
		const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

		return isTheme(storedTheme) ? storedTheme : 'light';
	} catch {
		return 'light';
	}
};

export const applyTheme = (theme: Theme) => {
	if (typeof document === 'undefined') {
		return;
	}

	const root = document.documentElement;
	root.dataset.theme = theme;
	root.classList.toggle('dark', theme === 'dark');
	root.style.colorScheme = theme;
};

export const setTheme = (theme: Theme) => {
	applyTheme(theme);

	if (typeof window === 'undefined') {
		return;
	}

	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		// Ignore storage failures and keep the in-memory theme.
	}
};
