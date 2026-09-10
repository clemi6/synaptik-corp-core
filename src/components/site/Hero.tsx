import { ChevronDown } from "lucide-react";
import chip from "@/assets/chip.jpg";

const stats = [
  ["Implants posés", "4 812 007"],
  ["Rejet immunitaire", "< 0.02%"],
  ["Bande passante", "128 TB/s"],
  ["Cliniques agréées", "212"],
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 65%)" }}
        aria-hidden
      />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mono-label mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            Bio-augmentations certifiées · Depuis 2088
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-black sm:text-6xl lg:text-7xl">
            TRANSCENDEZ
            <br />
            <span className="text-primary text-glow">LA CONDITION</span>
            <br />
            HUMAINE.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            SYNAPTIK CORP conçoit, calibre et implante des augmentations cybernétiques de grade
            militaire et chirurgical. Chaque module est apparié à votre télémétrie neuronale avant
            expédition.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#catalogue"
              className="bevel bg-primary px-7 py-4 font-display text-xs font-bold tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85"
            >
              EXPLORER LE CATALOGUE
            </a>
            <a
              href="#simulateur"
              className="bevel border border-border bg-card px-7 py-4 font-display text-xs font-bold tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              TEST DE COMPATIBILITÉ
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {stats.map(([k, v]) => (
              <div key={k} className="bg-card px-4 py-4">
                <dt className="mono-label">{k}</dt>
                <dd className="mt-1 font-mono text-lg text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="bevel relative border border-border bg-card p-3">
            <img
              src={chip}
              alt="Puce cognitive Synapse Overclock v4 en gros plan"
              width={1024}
              height={1024}
              className="tint-red bevel-sm w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-3 border border-primary/20" />
          </div>
          <div className="bevel-sm absolute -bottom-6 -left-6 hidden border border-primary/40 bg-background/95 px-5 py-4 sm:block">
            <p className="mono-label">Module en vedette</p>
            <p className="font-display text-sm font-bold">SYNAPSE OVERCLOCK V4</p>
            <p className="font-mono text-xs text-primary">2 499 € · Rejet 0.02%</p>
          </div>
        </div>
      </div>

      <ChevronDown
        className="absolute bottom-6 left-1/2 h-5 w-5 -translate-x-1/2 animate-bounce text-primary"
        aria-hidden
      />
    </section>
  );
}
