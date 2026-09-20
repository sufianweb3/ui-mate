import { SplitReveal } from "./index";

export default function Demo() {
  return (
    <div
      className="mx-auto flex min-h-[560px] w-full max-w-3xl flex-col justify-center gap-16 p-12"
      style={{
        background: "var(--ui-bg, transparent)",
        color: "var(--ui-fg, currentColor)",
      }}
    >
      <SplitReveal
        as="h2"
        text="Built for the work that matters"
        className="text-5xl font-medium tracking-tight sm:text-6xl"
      />

      <SplitReveal
        as="p"
        split="word"
        text="Northwind Analytics moved eleven years of reporting onto one surface in a single quarter."
        stagger={0.05}
        duration={0.65}
        className="max-w-xl text-xl"
      />

      <SplitReveal
        as="p"
        split="line"
        text={"Three studios.\nOne shared language.\nNo handover documents."}
        stagger={0.12}
        distance={130}
        className="text-2xl leading-snug"
        style={{ color: "var(--ui-fg-muted, currentColor)" }}
      />
    </div>
  );
}
