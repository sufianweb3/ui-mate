import { cn } from "./index";

/** The class list a component would carry by default. */
const BASE = "rounded-lg border px-6 py-3 text-sm";

const CASES: { label: string; override: string; note: string }[] = [
  {
    label: "No override",
    override: "",
    note: "the component's own classes, untouched",
  },
  {
    label: "Conflicting padding",
    override: "px-12",
    note: "px-12 replaces px-6 instead of sitting beside it",
  },
  {
    label: "Conflicting radius",
    override: "rounded-none",
    note: "rounded-none wins over rounded-lg",
  },
  {
    label: "Additive only",
    override: "font-semibold tracking-wide",
    note: "nothing conflicts, so both survive",
  },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      {CASES.map(({ label, override, note }) => {
        const merged = cn(BASE, override);
        return (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--ui-fg, currentColor)" }}
              >
                {label}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--ui-muted, currentColor)" }}
              >
                {override || "—"}
              </span>
            </div>

            <div
              className={merged}
              style={{
                borderColor: "var(--ui-border, currentColor)",
                background: "var(--ui-bg-subtle, transparent)",
                color: "var(--ui-fg, currentColor)",
              }}
            >
              {note}
            </div>

            <code
              className="font-mono text-[0.7rem] leading-relaxed"
              style={{ color: "var(--ui-muted, currentColor)" }}
            >
              {merged}
            </code>
          </div>
        );
      })}
    </div>
  );
}
