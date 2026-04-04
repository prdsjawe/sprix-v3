# Design Standard

## Contents

- Purpose
- Source influences
- Design posture
- Accessibility baseline
- Semantics and ARIA
- Layout and spacing
- Typography
- Color and contrast
- Surfaces, borders, and elevation
- Radius and shape
- Motion
- Icons and visual accessories
- Interaction states
- Responsive behavior
- Tailwind implementation standard
- Anti-patterns

## Purpose

Use this reference when a component task needs visual direction, not just implementation structure. The goal is to build a personal SvelteKit component library with a coherent design language that can be reused across future projects.

This system is internal and opinionated. It is not a public design system, but it should still feel deliberate, consistent, and scalable.

## Source influences

Use these sources as quality references, not as templates to clone:

- Untitled UI for clarity, hierarchy, polished product surfaces, and form ergonomics.
- Material Design for component completeness, state logic, feedback, and layout discipline.
- iOS interface patterns for breathing room, calm hierarchy, tactile spacing, and restrained chrome.
- shadcn/ui as a primary reference for pragmatic component composition and utility-first implementation.
- Tailwind UI for utility-class discipline, production-minded layouts, and composable primitives.

The output may be heavily inspired by shadcn/ui when that produces a stronger primitive or API, but it should still be adapted into a distinct house style rather than copied verbatim.

## Design posture

Default posture:

- Clean, modern, product-oriented.
- Calm before decorative.
- Dense enough for real apps, never cramped.
- Sharp enough for dashboards, soft enough for forms.
- Utility-first in implementation, system-first in outcome.

Design for repeatability:

- A component should look like it belongs with the rest of the library without bespoke re-tuning.
- Variants should feel related, not reinvented.
- States should be predictable across components.

## Accessibility baseline

Accessibility is a default requirement, not a cleanup step.

Target:

- Meet WCAG AA at minimum.
- Reach AAA where practical without distorting the product.

Apply these rules:

- Preserve visible focus states.
- Maintain sufficient contrast for text, icons, borders, and state indicators.
- Keep hit targets comfortable on touch and pointer devices.
- Do not rely on color alone to communicate meaning.
- Preserve keyboard navigation and logical tab flow.
- Keep motion subtle and avoid essential meaning that depends on animation.

## Semantics and ARIA

Use semantic HTML first. Add ARIA only when semantic HTML is not enough.

Apply these rules:

- Prefer native elements such as `button`, `a`, `input`, `label`, `select`, `textarea`, `dialog`, and lists when they fit the job.
- Pair labels and controls through `for` and `id`.
- Use `aria-label`, `aria-describedby`, `aria-expanded`, `aria-controls`, `aria-selected`, and related attributes only when the interaction pattern requires them.
- Avoid redundant ARIA that duplicates native semantics.
- Reflect state truthfully in attributes.

## Layout and spacing

Prefer consistent spacing rhythm over one-off adjustments.

Design expectations:

- Use clear internal padding so components feel touchable and legible.
- Keep gaps intentional and aligned to a repeatable scale.
- Favor generous vertical rhythm in forms and stacked layouts.
- Keep horizontal density tighter than vertical density in data-heavy interfaces.

Component spacing posture:

- Buttons and inputs should feel aligned when placed in the same row.
- Labels, helper text, and errors should have stable vertical spacing rules.
- Cards, panels, and menus should use structured padding tiers instead of arbitrary values.
- Avoid over-padding the left and right edges of controls. Horizontal spacing should feel deliberate and compact before it feels generous.

## Typography

Typography should communicate structure before style.

Apply these rules:

- Keep text sizes conservative and product-oriented.
- Use weight and color to create hierarchy before increasing size.
- Favor readable body sizes and medium-weight interactive labels.
- Keep helper text smaller and quieter than primary content.
- Keep destructive or warning styling emphatic but still legible.

## Color and contrast

Color should encode meaning, hierarchy, and emphasis without becoming noisy.

Apply these rules:

- Use neutral surfaces as the default foundation.
- Use accent color for emphasis, actions, and meaningful status.
- Keep semantic tones clearly separated: primary, secondary, success, warning, danger, info when needed.
- Prefer tinted semantic surfaces for soft variants and high-contrast fills for strong variants.
- Ensure hover, focus, active, disabled, and selected states are distinguishable without relying on a single visual cue.

## Surfaces, borders, and elevation

Default surface model:

- Light surfaces with restrained borders.
- Soft elevation for interactive controls and floating layers.

Apply these rules:

- Use borders to define components.
- Prefer one clear elevation language across the library.

## Radius and shape

Radius should feel consistent across the system.

Apply these rules:

- Use soft radii, not pill shapes by default.
- Match radius scale to component size.
- Keep form controls, buttons, cards, and menus visually related.
- Use larger radius only when a component is intentionally more tactile or container-like.

## Motion

Motion should confirm interaction, not perform for attention.

Apply these rules:

- Keep transitions short and purposeful.
- Prefer opacity, color, and slight transform changes over elaborate choreography.
- Use motion to clarify hover, focus, expand, collapse, entry, and dismissal.
- Respect reduced-motion expectations where relevant.

## Icons and visual accessories

Icons should support recognition, not compete with labels.

Apply these rules:

- Keep icon sizes aligned with component size tiers.
- Use icons to reinforce action, not replace text unless the control is intentionally icon-only.
- Ensure icon-only controls always have accessible labels.
- Keep adornments visually subordinate to primary content.
- Keep icon wrappers tight. Decorative icons inside a larger control should not introduce a second layer of obvious inner padding unless that treatment is part of the intended hierarchy.

## Interaction states

Every interactive component should have a complete state model.

At minimum, consider:

- default
- hover
- focus-visible
- active or pressed
- selected when applicable
- disabled
- loading when applicable
- error, success, and warning when applicable

Apply these rules:

- States should be visually related, not independently invented.
- Disabled states should still preserve legibility.
- Loading states should not cause layout shift when avoidable.
- Error states should communicate both through color and structure.

## Responsive behavior

Components should scale down cleanly before they break.

Apply these rules:

- Preserve touchability on small screens.
- Let stacked mobile layouts breathe.
- Avoid decorative density that collapses badly in narrower containers.
- Keep component APIs flexible enough to support icon-only, compact, default, and expanded contexts when appropriate.

## Tailwind implementation standard

Implement the visual system through Tailwind CSS utilities and local component classes.

Apply these rules:

- Prefer stable component classes backed by Tailwind utilities in local `.css` files.
- Use utility classes for composition in markup, not for re-encoding the entire component design every time.
- Keep design decisions aligned with reusable classes and records.
- Use local `@theme` or plugin hooks only when they support the component system directly.
- Keep the design language consistent across component folders rather than centralizing every style in one global stylesheet.

## Anti-patterns

Avoid these patterns:

- Random radii and padding values per component.
- Inconsistent focus treatments.
- Excessive decorative gradients or shadows in core product components.
- Over-reliance on ARIA when native semantics already solve the problem.
- Utility-string duplication across components when the rule belongs in a base class or modifier class.
- Color palettes that communicate brand mood but weaken readability or state clarity.
- Motion that delays interaction or makes the interface feel theatrical instead of usable.
