# Mesh Gradient

Multi-point blended color field on canvas where each point orbits its own anchor on its own period, so the drift has no visible loop length and no discrete shape edges.

`backgrounds/mesh-gradient` · component `#0003`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/3.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `colors` | `string[]` | `["--ui-accent","--ui-bg-subtle","--ui-muted"]` | Token names sampled for the blend points; three to five reads best. |
| `points` | `number` | `5` | Number of blend points. Above six the field turns to mud at any size. |
| `speed` | `number` | `0.4` | Drift rate. 0 draws one static frame and never schedules a loop. |
| `blur` | `number` | `0.18` | Blur radius as a fraction of 100px; this is what removes the circle edges. |
| `grain` | `number` | `0.035` | Opacity of the noise overlay that stops the blend banding. 0 removes it. |
| `seed` | `number` | `7` | Deterministic layout — the same seed always gives the same arrangement. |
| `resolution` | `number` | `0.6` | Backing store scale. 1 is sharp and costly; 0.6 is invisible behind the blur. |

## Customization

- colors takes 3 to 5 token names and is how the background picks up a project's brand
- points sets how many blend centres exist; 3 is calm, 6 is busy, above 6 is mud
- speed 0 makes it static and skips the animation frame entirely
- blur is what hides the circle edges — below about 0.1 the individual blobs become visible
- grain removes the banding on wide gradients; set 0 on small surfaces where it reads as dirt
- seed changes the composition without touching any other value
- resolution trades sharpness for fill rate, and 0.6 is invisible once blurred

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:

`--ui-accent` · `--ui-bg` · `--ui-bg-subtle` · `--ui-muted`

## Behaviour

- Responsive.
- Follows the token layer in light and dark.
- Respects `prefers-reduced-motion`.
- Client component.

## Dependencies

- npm: `motion`
- peer: `react`
- registry: [#0006](https://ui-mate.pages.dev/0006)

---

Part of [ui-mate](https://github.com/sufianweb3/ui-mate). Generated file, do not edit by hand.
