declare global {
	namespace Slider {
		interface Props {
			id?: string;
			name?: string;
			value?: number[];
			defaultValue?: number[];
			min?: number;
			max?: number;
			step?: number;
			minStepsBetweenThumbs?: number;
			disabled?: boolean;
			class?: string;
			ariaLabel?: string;
			ariaLabelledby?: string;
			ariaDescribedby?: string;
			onvaluechange?: (value: number[]) => void;
			onvaluecommit?: (value: number[]) => void;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
		}
	}
}

export {};
