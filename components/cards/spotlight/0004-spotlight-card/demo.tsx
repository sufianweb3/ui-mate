import { SpotlightCard } from "./index";

const plans = [
  {
    name: "Survey",
    price: "£4,800",
    note: "Two weeks",
    lines: [
      "Audit of the current stack",
      "Findings deck",
      "Costed recommendation",
    ],
  },
  {
    name: "Rebuild",
    price: "£26,000",
    note: "Six to eight weeks",
    lines: [
      "Design system",
      "Reporting surface",
      "Migration of live data",
      "Team handover",
    ],
  },
  {
    name: "Retainer",
    price: "£3,200/mo",
    note: "Rolling, 30 days notice",
    lines: ["Ongoing changes", "Same-day triage", "Quarterly review"],
  },
];

export default function Demo() {
  return (
    <div
      className="w-full p-10"
      style={{
        background: "var(--ui-bg, transparent)",
        color: "var(--ui-fg, currentColor)",
      }}
    >
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        {plans.map((plan) => (
          <SpotlightCard key={plan.name} className="p-7">
            <p
              className="font-mono text-xs"
              style={{ color: "var(--ui-fg-muted, currentColor)" }}
            >
              {plan.name}
            </p>
            <p className="mt-5 text-3xl font-medium tracking-tight">
              {plan.price}
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--ui-fg-muted, currentColor)" }}
            >
              {plan.note}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {plan.lines.map((line) => (
                <li key={line} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    style={{ color: "var(--ui-accent, currentColor)" }}
                  >
                    —
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>

      <div className="mx-auto mt-5 grid max-w-5xl gap-5 sm:grid-cols-2">
        {/* Border only: the interior stays flat, which suits a card with an image in it. */}
        <SpotlightCard
          intensity={0}
          borderIntensity={0.9}
          size={220}
          className="p-7"
        >
          <p className="text-sm">Edge light only — interior left flat.</p>
        </SpotlightCard>
        {/* A wide, soft, slow light for a single large feature panel. */}
        <SpotlightCard
          size={620}
          intensity={0.16}
          borderIntensity={0.3}
          fade={0.7}
          className="p-7"
        >
          <p className="text-sm">Wide soft light, slower fade.</p>
        </SpotlightCard>
      </div>
    </div>
  );
}
