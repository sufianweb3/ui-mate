# ui-mate

React components with permanent numbers. Copy the source, or install one with a
single command.

**[Browse the library](https://ui-mate.pages.dev)**

## Install

Every component installs through the shadcn CLI. No configuration, no wrapper
package:

```bash
npx shadcn@latest add https://ui-mate.pages.dev/r/1.json
```

The number is the component. `#0001` is always the magnetic button, at that URL,
forever.

## What is in here

- **Numbered permanently.** A component keeps its number across renames and
  recategorisation. A reference to `#0042` never goes stale.
- **Token-driven.** Colour, radius, ring and shadow come from `--ui-*` custom
  properties with fallbacks. Dark mode works through the tokens, not a second set
  of classes.
- **Typed.** Every component exports its `Props` interface. TypeScript strict.
- **Tunable.** Durations, distances, thresholds and spring constants are props
  with sensible defaults, not constants buried in the source.
- **Motion-aware.** Anything animated branches on `prefers-reduced-motion`.
- **Portable.** No framework imports, no router, no data fetching. Content arrives
  through props and children.

## Components

- **backgrounds** (1)
  - [#0003 Mesh Gradient](https://ui-mate.pages.dev/0003)
- **buttons** (1)
  - [#0001 Magnetic Button](https://ui-mate.pages.dev/0001)
- **cards** (1)
  - [#0004 Spotlight Card](https://ui-mate.pages.dev/0004)
- **scroll** (1)
  - [#0005 Fade In](https://ui-mate.pages.dev/0005)
- **typography** (1)
  - [#0002 Split Reveal](https://ui-mate.pages.dev/0002)
- **utilities** (1)
  - [#0006 Use In View](https://ui-mate.pages.dev/0006)

## Machine-readable index

- `https://ui-mate.pages.dev/r/index.json` — every component with its props and metadata
- `https://ui-mate.pages.dev/r/<number>.json` — one component, shadcn registry-item schema
- `https://ui-mate.pages.dev/llms.txt` — one line per component

## License

MIT. See [LICENSE](LICENSE).

---

This repository is generated. Source lives in a separate development repository
and is exported here by a single script. Pull requests against these files will be
overwritten by the next export.
