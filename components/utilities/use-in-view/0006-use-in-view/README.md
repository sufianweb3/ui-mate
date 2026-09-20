# Use In View

IntersectionObserver as a hook returning a ref and a boolean, defaulting to fire once and reporting true when the observer is unavailable so content is never stranded.

`utilities/use-in-view` · component `#0006`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/6.json
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `threshold` | `number` | `0.2` | Fraction of the element that must be visible before it counts as in view. |
| `rootMargin` | `string` | `"0px"` | CSS margin grown around the root bounds; negative values delay the trigger. |
| `once` | `boolean` | `true` | Disconnect after the first entry. Set false to have the boolean flip both ways. |
| `disabled` | `boolean` | `false` | Skip observing and report true at once — what reduced-motion branches pass in. |

## Customization

- threshold sets how much of the element must be visible before it fires
- rootMargin shifts the trigger line, so a negative bottom margin fires later
- once false turns the boolean into a live in-view state instead of a latch
- disabled true reports in view immediately, which is how reveals honour reduced motion

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:



## Behaviour

- Responsive.
- Follows the token layer in light and dark.
- Respects `prefers-reduced-motion`.
- Client component.

## Dependencies

- peer: `react`

---

Part of [ui-mate](https://github.com/sufianweb3/ui-mate). Generated file, do not edit by hand.
