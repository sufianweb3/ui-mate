"use client";

import { useInView } from "./index";

function Watched({ label, threshold }: { label: string; threshold: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, once: false });

  return (
    <div
      ref={ref}
      className="flex h-40 items-center justify-between rounded-xl border px-5"
      style={{
        borderColor: "var(--ui-border, currentColor)",
        background: "var(--ui-bg-subtle, transparent)",
        color: "var(--ui-fg, currentColor)",
      }}
    >
      <span className="text-sm">{label}</span>
      <span
        className="rounded-full px-3 py-1 font-mono text-xs"
        style={{
          background: inView
            ? "var(--ui-accent, currentColor)"
            : "var(--ui-muted, transparent)",
          color: inView
            ? "var(--ui-accent-fg, inherit)"
            : "var(--ui-fg-muted, inherit)",
        }}
      >
        {inView ? "in view" : "out of view"}
      </span>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-8">
      <p
        className="text-sm"
        style={{ color: "var(--ui-fg-muted, currentColor)" }}
      >
        Scroll the panel. Each box reports its own visibility; `once: false` is
        set here so the state flips both ways.
      </p>
      <div className="h-[420px] space-y-6 overflow-y-auto pr-2">
        <div className="h-48" />
        <Watched label="threshold 0.2 — fires early" threshold={0.2} />
        <Watched
          label="threshold 0.9 — needs to be almost fully visible"
          threshold={0.9}
        />
        <div className="h-48" />
      </div>
    </div>
  );
}
