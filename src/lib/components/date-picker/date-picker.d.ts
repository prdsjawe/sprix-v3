declare global {
	namespace DatePicker {
		type Size = 'sm' | 'md' | 'lg';
		type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

		interface Props {
			id?: string;
			name?: string;
			size?: Size;
			value?: string[];
			open?: boolean;
			placeholder?: string;
			range?: boolean;
			disabled?: boolean;
			required?: boolean;
			helper?: string;
			error?: string;
			class?: string;
			ariaLabel?: string;
			min?: string;
			max?: string;
			weekStartsOn?: WeekStartsOn;
			onfocus?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onblur?: (event: Utils.FocusEvent<HTMLButtonElement>) => void;
			onkeydown?: (event: Utils.KeyboardEvent<HTMLButtonElement>) => void;
			onselect?: (value: string[]) => void;
		}

		interface CalendarDay {
			key: string;
			label: string;
			disabled: boolean;
			isCurrentMonth: boolean;
			isToday: boolean;
			isSingleSelected: boolean;
			isRangeStart: boolean;
			isRangeEnd: boolean;
			isInRange: boolean;
			isPreviewed: boolean;
		}

		interface CalendarMonth {
			key: string;
			label: string;
			weeks: CalendarDay[][];
		}

		type SizeClass = Record<Size, string>;
		type DaySizeClass = Record<Size, string>;
	}
}

export {};
