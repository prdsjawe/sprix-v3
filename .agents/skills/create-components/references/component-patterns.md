# Component Patterns

## Contents

- Purpose
- Pattern rules for every component
- API posture
- State posture
- Composition posture
- Form control pattern
- Action control pattern
- Navigation pattern
- Disclosure and overlay pattern
- Feedback pattern
- Data display pattern
- Layout primitive pattern
- Naming conventions
- Validation checklist

## Purpose

Use this reference when building or refactoring a known component family and the task needs guidance on anatomy, states, slots, variants, or API shape.

Use these patterns as defaults. Deviate only when the component’s job clearly requires it.

## Pattern rules for every component

Every reusable component should answer these questions:

1. What is the semantic root element?
2. What is the base class?
3. Which modifiers are records versus one-off conditional classes?
4. Which props control structure versus style versus state?
5. Which states are required?
6. Which snippet props are actually useful?
7. Which listeners should be exposed?

Default assumptions:

- One clear root element.
- One stable base class.
- Modifier classes for reusable variation.
- Narrow props.
- Semantic markup first.
- Typed listener props only where relevant.

## API posture

Prefer small, explicit APIs.

Apply these rules:

- Expose only meaningful variation.
- Prefer `size`, `variant`, `role`, `tone`, `disabled`, `loading`, `selected`, `open`, `value`, and similar predictable prop names.
- Avoid sprawling configuration props that create visually invalid combinations.
- Keep presentational overrides narrow. `class` is allowed, but it should layer on top of a stable system rather than replace it.

## State posture

Each component family should have an intentional state model.

Typical state buckets:

- visual variants
- semantic tones
- interaction states
- structural modes

Examples:

- Button: `size`, `role`, `variant`, `disabled`, `loading`, `icon`.
- Input: `size`, `disabled`, `required`, `error`, `helper`.
- Tabs: `selected`, `disabled`, `orientation`.
- Dialog: `open`, `size`, `dismissible`.

## Composition posture

Use snippet props when composition adds real value.

Prefer:

- `children` for primary content
- `leftSlot` and `rightSlot` for inline adornments
- `outerRightSlot` for attached external actions
- purpose-specific snippets when the role is clearer than generic slots

Avoid:

- adding snippets just because a component could theoretically support them
- ambiguous slot names that hide intent

## Form control pattern

Default anatomy:

- wrapper or group
- label
- control shell
- native control
- helper or error region

Apply these rules:

- Associate `label` with `id`.
- Surface required state clearly.
- Keep helper and error messaging in a consistent location.
- Let the control shell own border, padding, and state styling.
- Let the native input stay visually simple inside the shell.
- Support leading and trailing adornments only when they improve real form flows.

Common families:

- text input
- textarea
- select
- combobox
- checkbox
- radio
- switch
- segmented control

## Action control pattern

Default anatomy:

- semantic interactive root
- optional leading icon
- primary label
- optional trailing icon

Apply these rules:

- Support icon-only mode only when it is accessible.
- Keep label text stable and legible across sizes.
- Prevent layout shift between idle and loading states when possible.
- Expose only the events the primitive actually needs.

Common families:

- button
- icon button
- split button
- button group
- link button

## Navigation pattern

Default anatomy depends on the component, but common expectations remain:

- semantic navigation root when appropriate
- active state
- hover and focus state
- optional icon and badge support

Common families:

- tabs
- breadcrumb
- sidebar item
- pagination
- stepper
- command item

Apply these rules:

- Make current state visually obvious.
- Keep navigation density deliberate.
- Prefer semantic anchors when the action is navigation rather than mutation.

## Disclosure and overlay pattern

Common families:

- accordion
- dropdown menu
- popover
- tooltip
- drawer
- dialog
- sheet

Apply these rules:

- Keep trigger and content relationships explicit.
- Use `aria-expanded`, `aria-controls`, focus management, and dismissal logic where the pattern requires them.
- Keep elevated surfaces visually related across overlays.
- Distinguish transient overlays from blocking dialogs.

## Feedback pattern

Common families:

- badge
- status pill
- alert
- callout
- toast
- progress
- skeleton
- empty state

Apply these rules:

- Semantic tones should stay consistent across feedback components.
- Strong feedback should be visually clear without feeling alarmist by default.
- Skeleton and loading states should preserve layout expectations.
- Empty states should be structured, not decorative filler.

## Data display pattern

Common families:

- card
- stat block
- list item
- data row
- table cell wrappers
- avatar
- key-value display

Apply these rules:

- Preserve clear hierarchy.
- Use spacing and typography to communicate structure before adding decoration.
- Keep data-heavy components denser than form or marketing surfaces, but not cramped.

## Layout primitive pattern

Common families:

- section
- container
- stack
- cluster
- split layout
- surface wrapper
- form row

Apply these rules:

- Keep layout primitives opinionated enough to reduce repetition.
- Do not overload them with business logic.
- Make spacing and alignment predictable.
- Prefer structural utility over decorative cleverness.

## Naming conventions

Favor names that describe the role, not the current screen:

- `Button`
- `Input`
- `Textarea`
- `BadgeGroup`
- `FormField`
- `Dialog`
- `Card`

Avoid names that lock the component to one feature unless that is truly its purpose.

For props:

- prefer `children` over generic content props when snippet content is the right fit
- prefer `leftSlot` and `rightSlot` over ambiguous names
- prefer `role` or `tone` only when they mean something distinct in the visual system

## Validation checklist

Before considering a component complete, verify:

- the root element is semantic
- the base class and modifier classes are coherent
- the record mappings match the CSS
- the props are narrow and typed
- the snippet props are justified
- the interaction surface is explicit
- keyboard and focus behavior make sense
- helper, error, disabled, loading, and selected states are handled where relevant
- the component looks related to the rest of the library
