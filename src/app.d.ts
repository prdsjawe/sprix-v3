declare global {
	namespace Utils {
		type Snippet<Args extends unknown[] = []> = import('svelte').Snippet<Args>;
		type AnchorAttrs = import('svelte/elements').HTMLAnchorAttributes;
		type AnchorTarget = import('svelte/elements').HTMLAttributeAnchorTarget;
		type AriaCurrent = import('svelte/elements').AriaAttributes['aria-current'];
		type AriaHasPopup = import('svelte/elements').AriaAttributes['aria-haspopup'];
		type ButtonAttrs = import('svelte/elements').HTMLButtonAttributes;
		type InputType = import('svelte/elements').HTMLInputTypeAttribute;
		type InputAutocomplete = import('svelte/elements').HTMLInputAttributes['autocomplete'];
		type InputMode = import('svelte/elements').HTMLInputAttributes['inputmode'];
		type DOMEvent<T extends EventTarget = EventTarget, E extends Event = Event> = E & {
			currentTarget: EventTarget & T;
		};
		type ClipboardEvent<T extends EventTarget = HTMLElement> = DOMEvent<
			T,
			globalThis.ClipboardEvent
		>;
		type CustomEvent<
			T = unknown,
			U extends EventTarget = EventTarget
		> = globalThis.CustomEvent<T> & {
			currentTarget: EventTarget & U;
		};
		type DragEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.DragEvent>;
		type FocusEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.FocusEvent>;
		type FormEvent<T extends EventTarget = HTMLFormElement> = DOMEvent<T, globalThis.Event>;
		type InputEvent<T extends EventTarget = HTMLInputElement> = DOMEvent<T, globalThis.InputEvent>;
		type KeyboardEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.KeyboardEvent>;
		type MouseEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.MouseEvent>;
		type PointerEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.PointerEvent>;
		type SubmitEvent<T extends EventTarget = HTMLFormElement> = DOMEvent<T, globalThis.SubmitEvent>;
		type TouchEvent<T extends EventTarget = HTMLElement> = DOMEvent<T, globalThis.TouchEvent>;
	}
}

export {};
