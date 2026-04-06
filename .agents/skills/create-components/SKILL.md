---
name: create-components
description: Create or refactor reusable Svelte 5 UI components in this workspace, especially when extracting repeated markup, building primitives under `src/lib/components`, defining local Tailwind CSS v4 component styles, or shaping a reusable internal component system for future projects. Use for Svelte component-library work inspired by Tailwind Labs, Untitled UI, and shadcn-style patterns. Do not use for backend work, dependency changes, config-only edits, or one-off route markup that should stay local.
---

# Create Components

## Overview

Build reusable internal Svelte components that can be reused across future projects. Treat this workspace as a utility application for building and refining a personal component system, not a package for public distribution. Use Tailwind Labs, Untitled UI, and especially shadcn/ui as strong quality and design references. It is acceptable to be heavily inspired by shadcn/ui component anatomy, API posture, and utility-first styling patterns, but adapt the implementation to Svelte, this codebase's standards, and the user's design language rather than copying another system verbatim.

Assume SvelteKit uses Svelte 5 in runes mode and Tailwind CSS 4. Use modern Svelte 5 patterns such as `$props()`, `$derived()`, `$derived.by()`, `$effect()`, `$bindable()`, and `{@render ...}` when appropriate. Keep component APIs general by default, but preserve the user's opinionated standards when naming props, shaping variants, defining reusable styling hooks, and structuring component folders.

## References

Read reference files only when they are relevant to the task:

- Read `references/design-standard.md` when choosing visual direction, spacing, typography, surfaces, motion, color behavior, or accessibility expectations for a component.
- Read `references/component-patterns.md` when building a known component family or deciding states, anatomy, naming, composition, or expected variants for reusable UI primitives.

## Build Workflow

0. Inspect the target route, layout, or existing component before extracting anything.
1. Create `src/lib/components/index.ts` if it does not exist yet.
2. Create each reusable UI component under `src/lib/components/` in its own lowercase kebab-case folder, for example `button`, `accordion`, or `badge-group`.
3. Name the main component file after the folder, for example `src/lib/components/badge-group/badge-group.svelte`.
4. Export the component from `src/lib/components/index.ts` using PascalCase, for example `export { default as BadgeGroup } from "./badge-group/badge-group.svelte";`.
5. If the task also needs non-library route chrome such as documentation headers, sidebars, or app-shell helpers that should not become reusable primitives, place those files under `src/app/components/` as standalone PascalCase files such as `src/app/components/Header.svelte`, then export them from `src/app/components/index.ts`.
6. Do not create extra folders under `src/app/components/` unless the user explicitly asks for them.
7. Create a sibling declaration file named `[component].d.ts` inside the component folder with this template:

```ts
declare global {
	namespace ComponentName {
		interface Props {}
	}
}

export {};
```

8. Replace `ComponentName` with the exported PascalCase component name, for example `BadgeGroup`.
9. For component families with multiple sibling `.svelte` files in one folder, keep exactly one shared declaration file, one shared stylesheet, and one shared record file for the whole folder. Name those shared files after the main component, for example `accordion.d.ts`, `accordion.css`, and `accordion.record.ts`, then declare every related namespace inside that single declaration file.
10. Use shared utility types from `src/app.d.ts` inside component declaration files whenever they fit, especially `Utils.Snippet`, `Utils.AnchorTarget`, and `Utils.*Event<...>` types. If a needed shared type does not exist yet, add it to `src/app.d.ts` instead of re-importing or re-defining it inside the component namespace.
11. Create a sibling `[component].css` file inside the component folder with this template:

```css
@import 'tailwindcss';

@layer components {
	/* component classes */
}
```

12. Import the component-specific CSS inside each component file that consumes those shared classes. Do not register component CSS in a global root stylesheet.
13. If the component needs class maps, variant records, or other reusable constants, create a sibling `[component].record.ts` file and keep those mappings aligned with the classes defined in `[component].css`.
14. Integrate the new component at the call site only after the extracted API is stable enough to replace the inline markup cleanly.
15. Run `npm run check` after edits when practical.

## Component Conventions

- Keep props narrow, explicit, and typed through the component namespace in `[component].d.ts`.
- For component families, treat the main `[component].d.ts` file as the only type authority for the whole folder. Do not generate extra per-subcomponent `.d.ts` files unless the user explicitly asks for them.
- Do not keep component-owned object shape types inside `.svelte` files when they belong to the component namespace. Move them into `[component].d.ts` and consume them from there.
- Write component scripts with `lang="ts"` and import the local `[component].css` file first.
- Destructure props from `$props()` into local variables with defaults and type them as `Partial<ComponentName.Props>`.
- Prefer general-purpose building blocks by default, but encode the user's standards in variant names, spacing decisions, semantic structure, and interaction patterns.
- Alias the `class` prop as `className` when needed, for example `class: className = ""`.
- Compute composed class names with `classnames(...)` plus `$derived(...)` or `$derived.by(...)` instead of building long inline `class={...}` expressions in the markup.
- Use concise base classes such as `btn` or `ipt`, then layer size, role, variant, state, and consumer overrides through records and conditional classes.
- For action primitives, prefer separating semantic `role` from presentational `variant`. Treat `role` as the tone or intent, and `variant` as the surface treatment layered on top.
- Keep state ownership in the route or parent unless the component genuinely owns the behavior.
- Prefer presentational and composable primitives for buttons, cards, badges, sections, form controls, and layout blocks.
- Use snippet props and `{@render ...}` for composition, for example `children`, `leftSlot`, `rightSlot`, or `outerRightSlot`. Do not introduce legacy slot APIs or overly flexible composition by reflex.
- Use `$bindable()` only when a component genuinely needs to expose an element reference or similar controlled binding surface.
- Preserve accessibility with semantic elements, labels, button types, keyboard-safe interactions, and predictable focus states.
- Be strict about horizontal economy in controls: do not over-pad the left and right edges, and do not let adornment/icon wrappers consume more inner padding than the content needs.

## Script Standard

Default to this structure inside `[component].svelte`:

```svelte
<script lang="ts">
	import './component.css';
	import classnames from '$lib/utils/classnames';
	import { COMPONENT_RECORD } from './component.record';

	let { id = '', class: className = '', children }: Partial<ComponentName.Props> = $props();

	let componentClass = $derived(classnames('component-base', COMPONENT_RECORD.variant, className));
</script>
```

Apply these rules:

- Import local CSS first.
- Import helper components, utilities, and records after the CSS import.
- Prefer one destructured `$props()` block with clear defaults over scattered prop declarations.
- Keep derived classes in script scope with names such as `buttonClass` or `inputClass`.
- Pass the stable base class first in `classnames(...)`, then mapped modifier classes, then conditional state classes, then consumer overrides.
- Prefer arrow functions for local helpers, derived callbacks, and event handlers.
- Prefer `$derived.by()` when the class computation reads more clearly as a multi-line function.
- Keep markup clean by moving class decisions into the derived variable instead of nesting conditionals inside the template.

## Type Standard

Use `[component].d.ts` as the type authority for the component namespace. Extend it beyond `Props` whenever the component has typed variants, sizes, roles, records, or snippet props. Treat `src/app.d.ts` as the shared utility type surface for reusable framework types and DOM-event types.

For component families with multiple `.svelte` files in one folder, declare every related namespace in the same main `[component].d.ts` file instead of creating separate declaration files for child pieces.

Example:

```ts
declare global {
	namespace Button {
		type Size = 'sm' | 'md' | 'lg' | 'xl';
		type Role = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning';
		type Variant = 'default' | 'flat' | 'quiet' | 'outline' | 'soft' | 'disabled';

		interface Props {
			id?: string;
			size?: Size;
			role?: Role;
			variant?: Variant;
			class?: string;
			children?: Utils.Snippet;
			onclick?: (event: Utils.MouseEvent<HTMLButtonElement>) => void;
		}

		type SizeClass = Record<Size, string>;
		type RoleClass = Record<Role, string>;
		type VariantClass = Record<Variant, string>;
	}
}

export {};
```

Apply these rules:

- Reuse shared `Utils` types from `src/app.d.ts` before introducing new imports or local aliases.
- Use `Utils.Snippet` for snippet props.
- Use shared utility types such as `Utils.AnchorTarget`, `Utils.ButtonAttrs`, or `Utils.InputType` when those match the component contract.
- Define unions and record types in the namespace when the component uses mapped classes or constrained prop values.
- Type snippet props explicitly when composition is part of the API.
- Type event listener props explicitly in `Props` with `Utils.*Event<...>` helpers, for example `onclick`, `oninput`, `onchange`, `onfocus`, or `onblur`, when the component exposes those interactions.
- If a needed shared utility type does not exist in `Utils`, add it to `src/app.d.ts` as part of the task.
- Keep implementation files consuming `Partial<ComponentName.Props>` unless the component has a strong reason to require every prop.
- Prefer arrow-function callback types in props, for example `onclick?: (event: Utils.MouseEvent<HTMLButtonElement>) => void`.
- Prefer `interface` for object-shaped component types declared in `[component].d.ts`. Use `type` aliases for unions, literals, and record helpers.

## Interaction Standard

Model interactions as part of the component API, not as an afterthought.

Apply these rules:

- Prefer native DOM callback props such as `onclick`, `oninput`, `onchange`, `onfocus`, `onblur`, `onkeydown`, and `onsubmit` when the component wraps a native interactive element.
- Destructure listener props from `$props()` alongside the rest of the API and pass them through to the native element explicitly.
- Keep event prop names lowercase and aligned with the DOM property form used in Svelte 5, for example `onclick` instead of legacy `on:click`.
- Prefer passing native event handlers through the component over inventing custom event names.
- If the component owns internal interaction logic, wrap it in a local handler and call the consumer-provided callback inside that handler instead of burying the behavior inline in the markup.
- Use custom callback props only when the component is exposing a higher-level semantic action that is not just a pass-through DOM event.
- Do not use legacy event dispatcher patterns unless there is a clear boundary that truly requires them.
- Keep event surfaces narrow. Expose only the listeners the component contract actually needs.
- Prefer `Utils.*Event<CurrentTarget>` types for listener signatures so `currentTarget` stays correctly typed.
- Prefer arrow functions for local handlers unless a named function declaration is required for a specific reason.

Example pattern:

```svelte
<script lang="ts">
	let { onclick, onkeydown }: Partial<Button.Props> = $props();

	const handleKeydown = (event: Utils.KeyboardEvent<HTMLButtonElement>) => {
		onkeydown?.(event);
	};
</script>

<button {onclick} onkeydown={handleKeydown}>
	{@render children?.()}
</button>
```

## Styling Conventions

- Use Tailwind CSS 4 utility classes and component-layer classes in the local `[component].css` file.
- For component families, keep exactly one shared `[component].css` file for the whole folder unless the user explicitly asks to split styling further.
- Start each component stylesheet with one stable base class, for example `.btn`, `.ipt`, `.card`, or `.badge`.
- Define size, role, variant, state, and structural modifiers as classes that layer on top of the base class, for example `.btn-sm`, `.btn-primary`, `.btn-outline`, `.btn-icon`, or `.ipt-error`.
- For buttons specifically, prefer private sub-element selectors such as `span.label`, `span.left-icon`, and `span.right-icon` when icon and label anatomy are part of the implementation.
- Default to a flatter visual language. Do not use shadows on components unless the user explicitly asks for elevation or shadow.
- Ghost or quiet buttons should read as interactive through layout, border, color, and hover treatment, never through shadow.
- Default to no gradients unless the user explicitly asks for them.
- Let class mappings in `[component].record.ts` point directly to the component classes defined in `[component].css`.
- Keep each component self-styled through its own imported stylesheet rather than a shared root component stylesheet.
- Use nested selectors in the component layer to keep related rules grouped under the base class when that improves readability.
- Use local `@theme` tokens or `@plugin` declarations only when the component genuinely needs them and they directly support the component stylesheet.
- Keep the styling approach aligned with Tailwind Labs, Untitled UI, and shadcn/ui clarity. Heavy inspiration is acceptable when it improves quality or consistency, but adapt the result to Svelte and the user's system instead of reproducing another library verbatim.
- Avoid third-party UI libraries unless the user explicitly asks for them.
- Extract a component because the markup or behavior is reusable, not merely because a class list is long.
- Keep icon containers optically tight. If an icon is decorative inside a larger control, its wrapper should not read like a second padded control unless that extra chrome is intentional.

## CSS Standard

Treat `[component].css` as a layered class system:

1. Define the base class first.
2. Define modifier classes that extend the base class.
3. Map those modifier classes from `[component].record.ts`.
4. Compose the final class string in `[component].svelte` with `classnames(...)`.

Example pattern:

```css
@import 'tailwindcss';

@layer components {
	.btn {
		@apply relative flex items-center justify-center;
		@apply cursor-pointer transition-all;

		&.btn-sm {
			@apply gap-1 rounded-lg px-3 py-1.5 text-sm;
		}

		&.btn-md {
			@apply gap-1.5 rounded-lg px-3.5 py-2.5 text-sm;
		}

		&.btn-primary {
			@apply border border-blue-600 bg-blue-500 text-white;
		}

		&.btn-quiet {
			@apply border-transparent bg-transparent;
		}
	}
}
```

Apply these rules:

- Keep the base class responsible for shared structure, layout, and interaction behavior.
- Keep modifier classes responsible for controlled variation such as size, tone, role, state, or adornment mode.
- Prefer modifier classes over duplicating full utility stacks in record files.
- Let records return class names, not utility strings.
- Keep nested sub-element styling, such as icon or label selectors, under the base class when those elements are private to the component.
- Keep independent route-level buttons and linked button rows optically tight: prefer slightly tighter padding, avoid adding borders only on hover, and use simple neutral hover fills such as `bg-gray-50` or `bg-gray-100` before adding extra chrome.

## Records

Use `[component].record.ts` when a component needs stable mappings for variants, roles, sizes, tones, or other reusable constants. Keep record values tied directly to CSS classes declared in the local stylesheet.

For component families with multiple `.svelte` files in one folder, keep exactly one shared `[component].record.ts` file for the whole folder unless the user explicitly asks to split it further.

Example:

```ts
export const BRC: Button.RoleClass = {
	primary: 'btn-primary',
	secondary: 'btn-secondary',
	tertiary: 'btn-tertiary',
	danger: 'btn-danger',
	success: 'btn-success',
	warning: 'btn-warning'
};
```

Apply these rules:

- Use short, component-scoped constant names when they improve scanability, for example `BSC`, `BRC`, `BVC`, or `ISC`.
- Keep record names and record types aligned, for example `Button.RoleClass` with `BRC`.
- Make records map to modifier class names that layer onto the component base class.
- Prefer separate records for size, role, and variant when the component distinguishes semantic intent from surface treatment.
- Put reusable class maps and other static constants in the record file instead of embedding them in the component.

## Markup Standard

- Keep markup semantic and minimal.
- Prefer wrapper elements only when they support layout, accessibility, helper text, validation, or composition.
- Render snippet props with `{@render ...}` and guard them with simple truthy checks.
- Prefer explicit elements for icons, labels, helper text, and error text instead of ambiguous generic wrappers.
- For interactive elements, pass through native attributes such as `type`, `disabled`, `tabindex`, `aria-label`, and event handlers when they are relevant to the component contract.
- For form controls, pair `label` and `input` through `for` and `id`, surface required state clearly, and reserve helper and error regions below the field.
- Keep listener bindings visible on the native interactive element so the interaction surface is easy to audit.

## Canonical Patterns

Use these recurring patterns across components when they fit:

- Follow the `button` pattern for interactive primitives: one base class such as `btn`, then size, role, and variant modifier classes from records; semantic `role` values such as `primary`, `secondary`, `tertiary`, `danger`, `success`, and `warning`; surface `variant` values such as `default`, `flat`, `quiet`, `outline`, `soft`, and `disabled`; optional icon-only mode; optional left and right icons rendered through `leftSlot` and `rightSlot`; snippet-based label content under a private `label` element; semantic native element; pass-through listeners such as `onclick`.
- Follow the `input` pattern for form primitives: one base class such as `ipt`, then size and state modifier classes from records or conditional classnames; label, required marker, helper or error messaging, inner adornment snippets, optional outer action snippets, a derived root class that reflects size, error, and disabled states, and pass-through listeners such as `oninput`.
- Prefer names like `children`, `leftSlot`, `rightSlot`, and `outerRightSlot` for snippet props when they make the API clearer than generic slots.

## Integration Rules

- Keep page-level data loading, SEO, and route concerns in route files.
- If component work also needs a documentation or demo page, keep the reusable primitive in `src/lib/components/` and keep documentation-only scaffolding in routes or `src/app/components/`.
- Update imports after extraction and remove duplicated markup only after the new component is wired correctly.
- Avoid editing `src/lib/index.ts` unless the repo deliberately uses it as a public export surface.
- Keep file names lowercase kebab-case and exported component names PascalCase.
- Keep the component folder self-contained when it has enough logic or styling to justify its own records, declarations, and stylesheet.

## Validation

- Verify imports, namespace types, CSS imports, and component exports after extraction.
- Verify component families use one shared `[component].d.ts`, one shared `[component].css`, and one shared `[component].record.ts` file named after the main component.
- Verify prop defaults, record mappings, and derived classes stay consistent with the local stylesheet.
- Verify snippet props render correctly and that optional branches do not leave broken wrappers.
- Verify event listener props are typed, destructured, and attached to the correct native element.
- Confirm `src/lib/components/index.ts` exports the component correctly.
- Run `npm run check` to catch Svelte or TypeScript issues when practical.
