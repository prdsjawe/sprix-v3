declare global {
	namespace Toast {
		type Type = 'default' | 'success' | 'info' | 'warning' | 'error' | 'promise';
		type Prompt = 'mono' | 'color';
		type Group = string;

		interface Props {
			group?: Group;
			prompt?: Prompt;
			visibleToasts?: number;
			duration?: number;
			closeButton?: boolean;
			class?: string;
		}

		interface Options {
			id?: string;
			title?: string;
			description?: string;
			type?: Type;
			duration?: number;
			dismissible?: boolean;
			group?: Group;
			actionLabel?: string;
			onaction?: () => void;
		}

		interface Item {
			id: string;
			title: string;
			description: string;
			type: Type;
			duration: number;
			dismissible: boolean;
			group: Group;
			actionLabel: string;
			onaction?: () => void;
			createdAt: number;
		}

		interface ViewportConfig {
			duration?: number;
		}

		interface Update {
			title?: string;
			description?: string;
			type?: Type;
			duration?: number;
			dismissible?: boolean;
			group?: Group;
			actionLabel?: string;
			onaction?: () => void;
		}

		type Input = string | Options;
		type TypeClass = Record<Type, string>;
		type PromptClass = Record<Prompt, string>;
		type IconName = Record<Type, Icon.Name>;
		type PromisePhase<T = unknown> = Input | ((value: T) => Input);

		interface PromiseOptions<T = unknown> {
			loading: Input;
			success?: PromisePhase<T>;
			error?: PromisePhase<unknown>;
			group?: Group;
		}
	}

	namespace ToastItem {
		interface Props {
			item: Toast.Item;
			prompt?: Toast.Prompt;
			expanded?: boolean;
			index?: number;
			total?: number;
			closeButton?: boolean;
			ondismiss?: (id: string) => void;
		}
	}
}

export {};
