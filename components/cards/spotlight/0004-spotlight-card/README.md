# Spotlight Card

Pointer-tracked radial highlight inside the card with a masked border glow sharing the same origin, driven entirely through CSS custom properties so moving the pointer never re-renders.

`cards/spotlight` · component `#0004`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/4.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `320` | Radius of the highlight in pixels; scale it with the card, not the page. |
| `intensity` | `number` | `0.1` | Peak opacity of the interior light. Above 0.2 it starts fighting body text. |
| `borderIntensity` | `number` | `0.55` | Peak opacity of the border glow. Set 0 for an interior-only light. |
| `color` | `string` | `"--ui-accent"` | Token the light is made from. |
| `fade` | `number` | `0.3` | Seconds to fade in on enter and out on leave; forced to 0 under reduced motion. |

## Customization

- size is the light's radius — match it to the card, roughly its width, not a fixed page value
- intensity is the interior light and should stay under 0.2 wherever there is body copy over it
- borderIntensity 0 gives an interior-only light; intensity 0 gives an edge-only light
- color takes any token name, so a warning card can be lit in its own hue
- fade slows the appearance; it is pinned to 0 automatically under reduced motion

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:

`--ui-accent` · `--ui-bg-elevated` · `--ui-fg` · `--ui-border` · `--ui-radius`

## Behaviour

- Responsive.
- Follows the token layer in light and dark.
- Respects `prefers-reduced-motion`.
- Client component.

## Dependencies

- npm: `motion`
- peer: `react`

---

Part of [ui-mate](https://github.com/sufianweb3/ui-mate). Generated file, do not edit by hand.
