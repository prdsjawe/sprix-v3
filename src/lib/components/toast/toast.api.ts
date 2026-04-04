import { get, writable } from 'svelte/store';

const DEFAULT_GROUP = 'default';
const DEFAULT_DURATION = 4500;

const TOAST_TITLES: Record<Toast.Type, string> = {
	default: 'Update ready',
	success: 'Success',
	info: 'Heads up',
	warning: 'Check this',
	error: 'Something went wrong',
	promise: 'Working on it'
};

const toastStore = writable<Toast.Item[]>([]);
const viewportConfigs = new Map<string, Toast.ViewportConfig>();
const lifecycleMap = new Map<
	string,
	{
		remaining: number;
		timeout: ReturnType<typeof setTimeout> | null;
		endTime: number | null;
	}
>();

const createToastId = () => `toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const resolveGroup = (group?: string) => group || DEFAULT_GROUP;

const resolveDuration = (group: string, duration: number | undefined, type: Toast.Type) => {
	if (typeof duration === 'number') return duration;
	if (type === 'promise') return Number.POSITIVE_INFINITY;

	return viewportConfigs.get(group)?.duration ?? DEFAULT_DURATION;
};

const normalizeInput = (
	input: Toast.Input,
	options: Partial<Toast.Options> = {},
	forcedType: Toast.Type = 'default'
) => {
	const base = typeof input === 'string' ? { title: input } : input;
	const group = resolveGroup(options.group ?? base.group);
	const type = options.type ?? base.type ?? forcedType;
	const title = (options.title ?? base.title ?? '').trim() || TOAST_TITLES[type];

	return {
		id: options.id ?? base.id ?? createToastId(),
		title,
		description: options.description ?? base.description ?? '',
		type,
		duration: resolveDuration(group, options.duration ?? base.duration, type),
		dismissible: options.dismissible ?? base.dismissible ?? true,
		group,
		actionLabel: options.actionLabel ?? base.actionLabel ?? '',
		onaction: options.onaction ?? base.onaction
	};
};

const clearLifecycle = (id: string) => {
	const entry = lifecycleMap.get(id);

	if (entry?.timeout) {
		clearTimeout(entry.timeout);
	}

	lifecycleMap.delete(id);
};

const scheduleDismiss = (item: Toast.Item) => {
	clearLifecycle(item.id);

	if (!Number.isFinite(item.duration) || item.duration <= 0) {
		return;
	}

	const timeout = setTimeout(() => {
		dismissToast(item.id);
	}, item.duration);

	lifecycleMap.set(item.id, {
		remaining: item.duration,
		timeout,
		endTime: Date.now() + item.duration
	});
};

const upsertToast = (item: Toast.Item) => {
	toastStore.update((items) => [item, ...items.filter((entry) => entry.id !== item.id)]);
	scheduleDismiss(item);
	return item.id;
};

const createToast = (
	type: Toast.Type,
	input: Toast.Input,
	options: Partial<Toast.Options> = {}
) =>
	upsertToast({
		...normalizeInput(input, { ...options, type }, type),
		createdAt: Date.now()
	});

const updateToast = (id: string, update: Toast.Update) => {
	let nextItem: Toast.Item | undefined;

	toastStore.update((items) =>
		items.map((item) => {
			if (item.id !== id) return item;

			const group = resolveGroup(update.group ?? item.group);
			const type = update.type ?? item.type;

			nextItem = {
				...item,
				title: (update.title ?? item.title).trim() || item.title,
				description: update.description ?? item.description,
				type,
				duration: resolveDuration(group, update.duration ?? item.duration, type),
				dismissible: update.dismissible ?? item.dismissible,
				group,
				actionLabel: update.actionLabel ?? item.actionLabel,
				onaction: update.onaction ?? item.onaction
			};

			return nextItem;
		})
	);

	if (!nextItem) return;

	scheduleDismiss(nextItem);
};

const dismissToast = (id?: string) => {
	const ids = new Set(id ? [id] : get(toastStore).map((item) => item.id));

	for (const toastId of ids) {
		clearLifecycle(toastId);
	}

	toastStore.update((items) => items.filter((item) => !ids.has(item.id)));
};

const pauseToast = (id: string) => {
	const entry = lifecycleMap.get(id);

	if (!entry?.timeout || !entry.endTime) return;

	clearTimeout(entry.timeout);
	entry.remaining = Math.max(entry.endTime - Date.now(), 0);
	entry.timeout = null;
	entry.endTime = null;
	lifecycleMap.set(id, entry);
};

const resumeToast = (id: string) => {
	const item = get(toastStore).find((entry) => entry.id === id);
	const entry = lifecycleMap.get(id);

	if (!item || !entry || entry.timeout || !Number.isFinite(item.duration) || item.duration <= 0) {
		return;
	}

	const remaining = entry.remaining || item.duration;
	const timeout = setTimeout(() => {
		dismissToast(id);
	}, remaining);

	lifecycleMap.set(id, {
		remaining,
		timeout,
		endTime: Date.now() + remaining
	});
};

const pauseToastGroup = (group: string) => {
	for (const item of get(toastStore)) {
		if (item.group === group) {
			pauseToast(item.id);
		}
	}
};

const resumeToastGroup = (group: string) => {
	for (const item of get(toastStore)) {
		if (item.group === group) {
			resumeToast(item.id);
		}
	}
};

const registerToastViewport = (group: string, config: Toast.ViewportConfig) => {
	const resolvedGroup = resolveGroup(group);
	const nextConfig = {
		duration: config.duration ?? DEFAULT_DURATION
	};

	viewportConfigs.set(resolvedGroup, nextConfig);

	return () => {
		if (viewportConfigs.get(resolvedGroup) === nextConfig) {
			viewportConfigs.delete(resolvedGroup);
		}
	};
};

const resolvePromisePhase = <T>(
	phase: Toast.PromisePhase<T> | undefined,
	value: T,
	fallbackType: Toast.Type,
	group: string
): Toast.Update => {
	if (!phase) {
		return {
			title: TOAST_TITLES[fallbackType],
			type: fallbackType,
			group
		};
	}

	const nextValue = typeof phase === 'function' ? phase(value) : phase;

	if (typeof nextValue === 'string') {
		return {
			title: nextValue,
			type: fallbackType,
			group
		};
	}

	return {
		...nextValue,
		type: nextValue.type ?? fallbackType,
		group: nextValue.group ?? group
	};
};

const promiseToast = async <T>(
	input: PromiseLike<T> | (() => PromiseLike<T>),
	options: Toast.PromiseOptions<T>
) => {
	const loadingGroup =
		options.group ||
		(typeof options.loading === 'string' ? undefined : options.loading.group) ||
		DEFAULT_GROUP;
	const id = createToast('promise', options.loading, {
		group: loadingGroup,
		duration: Number.POSITIVE_INFINITY
	});

	try {
		const value = await (typeof input === 'function' ? input() : input);
		updateToast(id, resolvePromisePhase(options.success, value, 'success', loadingGroup));
		return value;
	} catch (error) {
		updateToast(id, resolvePromisePhase(options.error, error, 'error', loadingGroup));
		throw error;
	}
};

type ToastInvoker = {
	(input: Toast.Input, options?: Partial<Toast.Options>): string;
	default: (input: Toast.Input, options?: Partial<Toast.Options>) => string;
	success: (input: Toast.Input, options?: Partial<Toast.Options>) => string;
	info: (input: Toast.Input, options?: Partial<Toast.Options>) => string;
	warning: (input: Toast.Input, options?: Partial<Toast.Options>) => string;
	error: (input: Toast.Input, options?: Partial<Toast.Options>) => string;
	promise: <T>(
		input: PromiseLike<T> | (() => PromiseLike<T>),
		options: Toast.PromiseOptions<T>
	) => Promise<T>;
	dismiss: (id?: string) => void;
	update: (id: string, update: Toast.Update) => void;
};

const baseToast = ((input: Toast.Input, options?: Partial<Toast.Options>) =>
	createToast('default', input, options)) as ToastInvoker;

baseToast.default = (input, options) => createToast('default', input, options);
baseToast.success = (input, options) => createToast('success', input, options);
baseToast.info = (input, options) => createToast('info', input, options);
baseToast.warning = (input, options) => createToast('warning', input, options);
baseToast.error = (input, options) => createToast('error', input, options);
baseToast.promise = promiseToast;
baseToast.dismiss = dismissToast;
baseToast.update = updateToast;

export {
	baseToast as toast,
	dismissToast,
	pauseToastGroup,
	registerToastViewport,
	resumeToastGroup,
	toastStore,
	updateToast
};
