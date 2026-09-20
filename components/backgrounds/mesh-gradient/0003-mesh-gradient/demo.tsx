import { MeshGradient } from "./index";

export default function Demo() {
  return (
    <div className="w-full">
      {/* One atmospheric background per page — here it sits behind the hero only. */}
      <section
        className="relative flex min-h-[520px] items-end overflow-hidden p-12"
        style={{
          background: "var(--ui-bg, transparent)",
          color: "var(--ui-fg, currentColor)",
        }}
      >
        <MeshGradient />

        <div className="relative max-w-xl">
          <p
            className="mb-4 font-mono text-xs"
            style={{ color: "var(--ui-fg-muted, currentColor)" }}
          >
            Northwind Analytics
          </p>
          <h2 className="text-5xl font-medium tracking-tight">
            Every number in one place, finally
          </h2>
          <p
            className="mt-5 text-lg"
            style={{ color: "var(--ui-fg-muted, currentColor)" }}
          >
            Eleven years of reporting, one surface, no spreadsheets in the
            middle.
          </p>
        </div>
      </section>

      <section className="relative grid gap-6 p-12 sm:grid-cols-2">
        <div
          className="relative h-56 overflow-hidden rounded-2xl"
          style={{ borderRadius: "var(--ui-radius, 1rem)" }}
        >
          <MeshGradient points={3} speed={0} grain={0} seed={22} />
          <span className="absolute bottom-4 left-4 font-mono text-xs">
            speed 0 — a single static frame, no loop
          </span>
        </div>
        <div
          className="relative h-56 overflow-hidden rounded-2xl"
          style={{ borderRadius: "var(--ui-radius, 1rem)" }}
        >
          <MeshGradient
            points={6}
            speed={1.4}
            blur={0.26}
            grain={0.08}
            seed={91}
          />
          <span className="absolute bottom-4 left-4 font-mono text-xs">
            six points, heavier blur and grain
          </span>
        </div>
      </section>
    </div>
  );
}
