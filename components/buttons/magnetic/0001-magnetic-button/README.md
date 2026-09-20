# Magnetic Button

A button that leans toward the cursor with a distance-falloff pull, its label travelling a further fraction so the two arrive at different rates.

`buttons/magnetic` · component `#0001`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/1.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `strength` | `number` | `18` | Maximum travel toward the cursor in pixels, reached only at dead centre. |
| `radius` | `number` | `90` | Capture distance in pixels; outside it the button does not react at all. |
| `labelFactor` | `number` | `0.35` | Extra travel applied to the label on top of the button's own, as a fraction. |
| `stiffness` | `number` | `300` | Spring stiffness for both the follow and the release. |
| `damping` | `number` | `40` | Spring damping; below about 25 the release visibly overshoots. |
| `mass` | `number` | `0.4` | Spring mass. Higher values feel heavier and arrive later. |
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | Visual weight, from filled accent down to type only. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height, horizontal padding and type size together. |

## Customization

- strength sets how far it travels; above about 30 it starts to feel detached from the cursor
- radius sets the capture distance, and a large radius with a small strength gives the softest pull
- labelFactor is the lag between label and body — set it to 0 and it becomes an ordinary translate
- damping below 25 makes the release overshoot; 40 settles without a bounce
- variant switches between solid accent, outline and ghost
- size controls height, padding and type size in one step
- mass changes perceived weight; above 1 the button noticeably trails the cursor

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:

`--ui-accent` · `--ui-accent-fg` · `--ui-fg` · `--ui-border` · `--ui-radius` · `--ui-ring`

## Behaviour

- Responsive.
- Follows the token layer in light and dark.
- Respects `prefers-reduced-motion`.
- Client component.

## Dependencies

- npm: `motion`
- peer: `react`
- registry: [#0008](https://ui-mate.pages.dev/0008)

---

Part of [ui-mate](https://github.com/sufianweb3/ui-mate). Generated file, do not edit by hand.
