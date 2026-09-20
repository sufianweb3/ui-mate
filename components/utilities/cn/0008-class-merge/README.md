# Class Merge

The class merge every component root uses: clsx flattens conditionals, then tailwind-merge resolves Tailwind conflicts per utility group so a caller className genuinely overrides rather than races.

`utilities/cn` · component `#0008`

## Install

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/8.json
```

## Props

_No props._

## Customization

- BASE classes come first and the caller override last; order is the whole contract
- cn accepts anything clsx does: strings, arrays, objects and conditionals
- conflicting Tailwind utilities resolve last-one-wins per group, so px-12 replaces px-6
- non-conflicting classes are all kept, so additive overrides need no special handling

## Tokens

This component reads the following CSS custom properties, each with a fallback, so
it renders correctly before any theme is applied:



## Behaviour

- Responsive.
- Follows the token layer in light and dark.
- Respects `prefers-reduced-motion`.
- Server component safe.

## Dependencies

- npm: `clsx`, `tailwind-merge`

---

Part of [ui-mate](https://github.com/sufianweb3/ui-mate). Generated file, do not edit by hand.
