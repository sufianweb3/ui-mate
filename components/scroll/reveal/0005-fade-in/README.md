# Fade In

The generic in-view wrapper: fades and rises its content once on entering the viewport, adding no markup of its own, and with stagger set it sequences direct children by merging style onto them rather than wrapping them.

`scroll/reveal` · component `#0005`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/5.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `"div"` | Root element. Use ul or ol when the children are list items. |
| `duration` | `number` | `0.6` | Seconds of the fade and rise. |
| `delay` | `number` | `0` | Seconds before it starts. |
| `distance` | `number` | `16` | Rise distance in pixels; negative values drop in from above instead. |
| `threshold` | `number` | `0.15` | Fraction of the element that must be visible before it fires. |
| `rootMargin` | `string` | `"0px"` | Shifts the trigger line; a negative bottom margin fires later. |
| `stagger` | `number` | `0` | Seconds between direct children. 0 animates the wrapper as one block. |
| `repeat` | `boolean` | `false` | Replay on every re-entry instead of latching after the first. |

## Customization

- distance is the rise; 12 to 24 reads as arrival, and above about 40 it reads as a slide
- distance negative drops the content in from above instead of up from below
- stagger above 0 switches from animating the wrapper to sequencing its direct children
- threshold decides how much must be on screen — raise it for tall blocks that would otherwise fire while still below the fold
- rootMargin shifts the trigger line without changing the threshold
- repeat true makes it replay every time it re-enters rather than once
- as sets the root element so list and grid semantics survive the wrapper

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:



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
