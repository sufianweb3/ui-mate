import { FadeIn } from "./index";

const milestones = [
  ["2019", "Two people and one client in a borrowed office"],
  ["2021", "First platform build, eleven people"],
  ["2023", "Opened the Lisbon studio"],
  ["2026", "Thirty-one people across three cities"],
];

export default function Demo() {
  return (
    <div
      className="mx-auto w-full max-w-2xl p-12"
      style={{
        background: "var(--ui-bg, transparent)",
        color: "var(--ui-fg, currentColor)",
      }}
    >
      <p
        className="mb-8 text-sm"
        style={{ color: "var(--ui-fg-muted, currentColor)" }}
      >
        Scroll the panel below.
      </p>

      <div className="h-[460px] space-y-24 overflow-y-auto pr-3">
        <div className="h-24" />

        <FadeIn>
          <h2 className="text-4xl font-medium tracking-tight">
            One block, one fade
          </h2>
          <p
            className="mt-3"
            style={{ color: "var(--ui-fg-muted, currentColor)" }}
          >
            The wrapper animates as a single unit. This is the default and
            covers most uses.
          </p>
        </FadeIn>

        {/* stagger with as="ul": the style lands on each li, so the list stays a list. */}
        <FadeIn as="ul" stagger={0.09} distance={22} className="space-y-4">
          {milestones.map(([year, text]) => (
            <li
              key={year}
              className="flex gap-6 border-t pt-4"
              style={{ borderColor: "var(--ui-border, currentColor)" }}
            >
              <span
                className="font-mono text-sm"
                style={{ color: "var(--ui-accent, currentColor)" }}
              >
                {year}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </FadeIn>

        <FadeIn distance={-28} duration={1} threshold={0.6}>
          <p className="text-2xl leading-snug">
            Dropping in from above, slower, and waiting until it is properly on
            screen.
          </p>
        </FadeIn>

        <div className="h-48" />
      </div>
    </div>
  );
}
