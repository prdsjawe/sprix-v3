declare global {
	namespace Progress {
		interface Props {
			id?: string;
			value?: number;
			max?: number;
			class?: string;
			indicatorClass?: string;
			ariaLabel?: string;
			ariaLabelledby?: string;
			ariaDescribedby?: string;
			getValueLabel?: (value: number, max: number, percent: number) => string;
		}
	}
}

export {};
