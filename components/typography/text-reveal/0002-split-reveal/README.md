# Split Reveal

Text wiped into place from behind a per-piece mask on entering view, at character, word or authored-line granularity, with the full string kept as a single accessible label.

`typography/text-reveal` · component `#0002`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/2.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The string to reveal. Plain text, so it can be split without walking children. |
| `split` | `"character" \| "word" \| "line"` | `"character"` | What gets its own mask. Lines split on authored newlines, not measured wraps. |
| `as` | `ElementType` | `"span"` | Root element, so the heading level matches the document outline. |
| `duration` | `number` | `0.8` | Seconds each piece takes to clear its mask. |
| `stagger` | `number` | `0.03` | Seconds between consecutive pieces starting. |
| `delay` | `number` | `0` | Seconds before the first piece moves. |
| `distance` | `number` | `110` | How far below the mask each piece starts, as a percentage of its own height. |
| `threshold` | `number` | `0.4` | Fraction of the element that must be visible before it starts. |
| `repeat` | `boolean` | `false` | Replay on every re-entry instead of only the first. |

## Customization

- split switches between character, word and authored-line granularity
- stagger is the interval between pieces — at character granularity keep it under 0.04 or long headings crawl
- duration is per piece, so total time is duration plus stagger times the piece count
- distance above 100 starts each piece fully below its mask; below 100 the top of the glyph is visible at rest
- threshold sets how much must be on screen before it fires
- repeat true replays on every re-entry rather than latching after the first
- as sets the rendered element so the heading level is correct

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:

`--ui-fg`

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
