---
name: sprix-ui
description: Build or refine user-facing Svelte pages, sections, showcase screens, and documentation surfaces in this workspace using the existing Sprix component library, Tailwind CSS 4.2 utility patterns, and the theme tokens already defined in `src/routes/layout.css`. Use when Codex needs to compose UI from existing Sprix components, present the design system, or create calm product-facing layouts with dark mode and mobile responsiveness. Strongly favor reusing exported Sprix components and app-level wrappers over bespoke component creation. Prefer this skill for repo-specific frontend work that should feel consistent with Sprix. Do not use for backend work, dependency changes, or generic styling that ignores the established component system and theme.
---

# Sprix UI

## Overview

Build calm, precise Svelte UI that proves the existing Sprix component system can carry real screens, sections, and product-facing layouts. Reuse the established components, theme tokens, spacing rhythm, and dark-mode behavior before inventing new patterns.

Tailwind CSS 4.2 utilities are the default and required styling layer for Sprix UI work. Do not introduce plain CSS for route or section styling. Do not add arbitrary-value utility classes when a tokenized utility already exists.

## Read First

- Read `src/routes/layout.css` before choosing colors, surfaces, borders, overlays, or dark-mode treatment.
- Read `src/app.d.ts` before adding shared app-level props or object-shaped type definitions.
- Read `src/lib/components/index.ts` first. Treat it as the source of truth for the reusable Sprix component inventory.
- Read `src/app/components/index.ts` and inspect `src/app/components/` for app-specific chrome, examples, and site-shell wrappers.
- Map the request to the existing component inventory before writing raw markup.
- Inspect the target route before editing so new work matches the current content density, spacing, and hierarchy.
- Reach for `$create-components` at `.agents/skills/create-components/SKILL.md` only after the existing Sprix inventory and app wrappers clearly do not solve the problem.
- Prefer existing Tailwind utilities and theme-backed utility classes over custom selectors or plain CSS files.

## Available Components

Treat `src/lib/components/index.ts` as the public Sprix component inventory and keep this list aligned with it.

### Library Primitives

- Actions and feedback: `Button`, `ButtonGroup`, `Badge`, `Spinner`, `Progress`, `Toast`, `Tooltip`, `HoverCard`
- Overlays and disclosure: `AlertDialog`, `Dialog`, `Popover`, `DropdownMenu`, `Sheet`, `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- Forms and input: `Field`, `Form`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Select`, `NativeSelect`, `ComboBox`, `ComboBoxItem`, `DatePicker`, `Slider`, `Otp`, `Toggle`, `ToggleGroup`
- Navigation and structure: `Breadcrumb`, `NavMenu`, `NavMenuItem`, `NavMenuTrigger`, `NavMenuContents`, `NavMenuRight`, `Pagination`, `Tabs`, `Separator`, `Sidebar`
- Data and content: `Card`, `Table`, `THeader`, `TBody`, `TRow`, `TColumn`, `TFooter`, `Avatar`, `Empty`, `CodeSnippet`, `Carousel`, `Link`, `Kbd`, `Icon`, `Command`
- Utilities: `toast` API for programmatic notifications

### App-Level Components

Treat `src/app/components/` as the source of truth for site-specific wrappers, examples, and shell pieces that are worth reusing when the task matches them.

## Component-First Policy

1. Match the request against the available library primitives first.
2. Compose the UI from Sprix primitives before considering custom wrappers.
3. Reuse an existing app-level component when the task is site-specific and the wrapper already fits.
4. Create bespoke route markup only when composition is sufficient and a new abstraction would not meaningfully improve reuse.
5. Create a new reusable primitive only when the inventory is genuinely missing a repeated pattern.
6. Use `$create-components` only as the last resort after exhausting the current Sprix inventory.

## Workflow

1. Identify whether the task is a landing section, documentation section, showcase surface, or app-like screen.
2. Inventory the existing components that already solve most of the problem by checking `src/lib/components/index.ts` and `src/app/components/`.
3. Compose the layout from existing Sprix components before creating custom wrappers or bespoke markup.
4. Build the light theme and dark theme in the same pass.
5. Build the mobile layout and larger breakpoints in the same pass.
6. Express layout and styling with Tailwind CSS 4.2 utilities, not plain CSS.
7. Run the relevant check command when practical.

## Explicit Requirements From Jawe

1. Build the site around the components that already exist. Treat the current component library as the default building block set.
2. Keep Sprix UI clean, precise, and easy on the eyes.
3. Avoid gradients unless Jawe explicitly asks for them.
4. Limit shadows. Prefer flat surfaces, borders, contrast, spacing, and typography over elevation.
5. Add dark mode and mobile responsiveness whenever creating a section, code block, or full Svelte page.
6. Draw inspiration from TailwindPlus, shadcn, and Skeleton while keeping the result recognizably Sprix and centered on the design system itself.
7. Do not use plain CSS for new UI work. Jawe discourages plain CSS for route-level work and prefers Tailwind utilities instead. If Jawe explicitly asks for plain CSS, keep it minimal and focused on the specific need rather than a wholesale stylesheet.
8. Prefer tokenized Tailwind utilities over arbitrary values, for example `max-w-7xl` instead of `max-w-[1280px]`.
9. Do not narrate the UI. Avoid explainer paragraphs, self-referential labels, "why this works" notes, and helper text unless the product genuinely needs them.
10. Prefer real product copy over documentation copy. Labels should orient the user, not explain the layout or the component choices.
11. Give each major section a clear heading and a concise subtitle. Add a CTA when the section materially benefits from one.
12. Treat section headers as structural UI, not as narration. Keep them short and product-facing.

## Visual Direction

- Keep interfaces calm, sharp, and restrained.
- Let spacing, border contrast, typography, and layout rhythm create hierarchy.
- Keep backgrounds mostly solid and neutral unless the prompt explicitly asks for something more expressive.
- Keep motion subtle and purposeful.
- Keep sections easy to scan and avoid stacking multiple loud visual ideas in one place.
- Treat showcase pages as believable product examples, not generic marketing templates.
- Let the interface carry the page. Keep surrounding copy sparse.
- Remove commentary about the layout, the example, or the design system unless the user explicitly asks for instructional content.
- Use short section headers to orient the page and let the body content do the rest.

## Theme Rules

- Use the color system already defined in `src/routes/layout.css`.
- Prefer the existing app tokens and their Tailwind-exposed utilities for backgrounds, surfaces, borders, text, and overlays.
- Match the current dark-mode implementation instead of inventing a parallel theme system.
- Avoid introducing one-off brand colors unless the task has a strong semantic reason and still fits the Sprix palette.

## Tailwind Rules

- Style new Sprix UI work with Tailwind CSS 4.2 utility classes directly in Svelte markup.
- Do not create or extend plain CSS files for route sections, showcases, or one-off page layouts unless Jawe explicitly asks for plain CSS.
- Do not introduce arbitrary-value utilities when a standard Tailwind utility already solves the problem.
- Prefer scale utilities such as `max-w-7xl`, `rounded-2xl`, `px-6`, `py-16`, `gap-6`, and `text-sm` over custom numeric values.
- Prefer computed class strings and component props over ad hoc custom class names when stateful styling is needed.
- If a styling need repeats enough to justify abstraction, move it into a reusable component rather than a plain CSS selector.

## Layout Rules

- Start with a narrow-screen layout, then scale upward with `sm`, `lg`, and `xl` breakpoints as needed.
- Keep width, spacing, and section padding intentional rather than oversized.
- Preserve readable text measure for long copy and documentation blocks.
- Keep touch targets and interactive spacing clear on mobile.
- Use grids, stacks, and split layouts that stay stable when content wraps.

## Component Rules

- Reuse existing Sprix components before writing custom route-level markup.
- Treat the inventory in `src/lib/components/index.ts` as the default building block set for all new UI work.
- Prefer composing multiple existing primitives over inventing a bespoke component that duplicates them.
- Keep route-specific wrappers under `src/app/components/` when they are not reusable primitives.
- Put shared app-component interfaces in `src/app.d.ts` under `namespace App`.
- Prefer `interface` over `type` for props and object-shaped definitions; use `type` only when an interface is a bad fit.
- Move reusable patterns into `src/lib/components/` instead of duplicating them across routes.
- Avoid raw buttons, badges, links, toggles, cards, menus, dialogs, inputs, tabs, tables, or sidebars when an internal component already exists.
- Do not create a bespoke component only to restyle or slightly rearrange an existing Sprix primitive.
- Showcase components in realistic combinations so users can understand how the system works in context.
- Keep wrapper components utility-first. Avoid adding custom CSS classes whose main purpose is to replace available Tailwind utilities.
- Major sections should usually open with a heading and subtitle block; add a CTA only when it meaningfully moves the user forward.

## Section Checklist

- Include dark mode.
- Include mobile responsiveness.
- Reuse existing components where possible.
- Respect the existing theme tokens.
- Include a section heading and subtitle.
- Use Tailwind CSS 4.2 utilities for layout and styling.
- Avoid plain CSS and arbitrary-value utilities by default.
- Avoid unnecessary gradients.
- Avoid heavy shadows.
- Keep spacing and typography calm and precise.
- Make the result feel like Sprix instead of a generic template.

## Inputs, Recommendations, and Suggestions

### Inputs

- Use the current Sprix direction: a Svelte design-system site centered on internally built components.
- Use the theme tokens and dark-mode setup already present in `src/routes/layout.css`.
- Use the existing component library under `src/lib/components/` and the app-level wrappers under `src/app/components/`.

### Recommendations

- Start page work by auditing `src/lib/components/index.ts` and `src/app/components/` for components that already solve the problem.
- Use sections to demonstrate real composition, not isolated decoration.
- Keep copy sparse and functional so the components and layout carry the main weight.
- Extract a pattern once it starts repeating instead of duplicating route markup.

### Suggestions

- Add more full-screen examples that combine components into believable product flows such as settings panels, onboarding steps, tables, pricing layouts, and dashboards.
- Keep future component work aligned with the same flat, restrained visual language so the library stays coherent.
- Add lightweight section recipes or page references later if the site grows enough to justify them.
