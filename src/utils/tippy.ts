import type { Instance, Props } from 'tippy.js';
import tippy from 'tippy.js';

const createTippy = (
	trigger: HTMLElement,
	content: HTMLElement,
	customProps: Partial<Props> = {}
): Instance => {
	const defaultProps: Partial<Props> = {
		content,
		allowHTML: true,
		interactive: true,
		appendTo: document.body,
		animateFill: true,
		animation: 'shift-away'
	};

	return tippy(trigger, {
		...defaultProps,
		...customProps
	});
};

export default createTippy;
