import { MagneticButton } from "./index";

export default function Demo() {
  return (
    <div
      className="flex min-h-[420px] w-full flex-col items-center justify-center gap-12 p-12"
      style={{
        background: "var(--ui-bg, transparent)",
        color: "var(--ui-fg, currentColor)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-6">
        <MagneticButton size="lg">Start a project</MagneticButton>
        <MagneticButton variant="outline" size="lg">
          See the work
        </MagneticButton>
        <MagneticButton variant="ghost" size="lg">
          Read the brief
        </MagneticButton>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {/* A wider radius and a longer throw: the difference is worth feeling side by side. */}
        <MagneticButton strength={34} radius={160} labelFactor={0.5}>
          Heavier pull
        </MagneticButton>
        <MagneticButton
          strength={8}
          radius={60}
          labelFactor={0.15}
          damping={28}
        >
          Barely there
        </MagneticButton>
        <MagneticButton disabled>Unavailable</MagneticButton>
      </div>

      <p
        className="max-w-sm text-center text-sm"
        style={{ color: "var(--ui-fg-muted, currentColor)" }}
      >
        Tab to a button and the focus ring appears without any movement. Blur
        returns it to centre.
      </p>
    </div>
  );
}
