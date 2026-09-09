import { useEffect, useRef, useState } from "react";
import body from "@/assets/body.png";

type Stage = {
  id: string;
  label: string;
  title: string;
  desc: string;
  specs: string[];
  /** hotspot position in % of the figure box */
  x: number;
  y: number;
};

const stages: Stage[] = [
  {
    id: "cortex",
    label: "01 / NEURAL & CORTEX",
    title: "Synapse Overclock v4",
    desc: "Co-processeur synaptique greffé sur le cortex préfrontal. Réduit la latence neuronale et augmente la vitesse de traitement cognitif de 40%.",
    specs: ["Bande passante 128 TB/s", "Conso 15 W", "Rejet < 0.02%"],
    x: 50,
    y: 7,
  },
  {
    id: "optique",
    label: "02 / OPTIQUE & SENSORIEL",
    title: "Iris HUD Tactique Kiroshi-X",
    desc: "Remplacement oculaire complet avec surcouche AR. Télémétrie, thermographie et identification de cibles projetées sur la rétine.",
    specs: ["16K par œil", "Zoom x20", "Thermique intégré"],
    x: 43,
    y: 10,
  },
  {
    id: "musculo",
    label: "03 / MUSCULO-SQUELETTIQUE",
    title: "Bras Bionique Titan Grip",
    desc: "Prothèse intégrale à servomoteurs tungstène et coque fibre de carbone. Ancrage vertébral requis au-delà de 400 kg de charge.",
    specs: ["Levage 800 kg", "Alliage W-C", "Rejet 0.1%"],
    x: 24,
    y: 42,
  },
  {
    id: "systemique",
    label: "04 / SYSTÉMIQUE & ORGANIQUE",
    title: "Pompe à Adrénaline Régulée",
    desc: "Glande surrénale synthétique déclenchable par commande mentale. Coagulants intégrés, sécurité matérielle à 5 doses par cycle.",
    specs: ["5 doses / jour", "Activation neurale", "Rejet 0.05%"],
    x: 57,
    y: 27,
  },
];

export function BodyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(stages.length - 1, Math.floor(progress * stages.length * 0.999));
  const stage = stages[active]!;

  return (
    <section id="anatomie" ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
        <div
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-5 pt-20 lg:grid-cols-[280px_1fr_340px]">
          {/* index */}
          <ol className="order-2 hidden flex-col justify-center gap-3 lg:order-1 lg:flex">
            {stages.map((s, i) => (
              <li
                key={s.id}
                className={`bevel-sm border-l-2 px-4 py-3 transition-all duration-500 ${
                  i === active
                    ? "border-l-primary bg-card text-foreground"
                    : "border-l-border bg-transparent text-muted-foreground"
                }`}
              >
                <p className="mono-label">{s.label}</p>
                <p className="mt-1 font-display text-xs font-bold">{s.title}</p>
              </li>
            ))}
          </ol>

          {/* figure */}
          <div className="relative order-1 mx-auto flex h-[52vh] w-full max-w-[24rem] items-center justify-center lg:order-2 lg:h-[74vh]">
            <div
              className="relative h-full w-full transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${(progress - 0.5) * 34}deg) scale(${1 + progress * 0.12})`,
              }}
            >
              <img
                src={body}
                alt="Modèle anatomique cybernétique Synaptik"
                width={1024}
                height={1536}
                className="h-full w-full object-contain drop-shadow-[0_0_45px_oklch(0.855_0.145_200/0.35)]"
              />
              {stages.map((s, i) => {
                const on = i <= active;
                return (
                  <span
                    key={s.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      opacity: on ? 1 : 0,
                      transform: `translate(-50%,-50%) scale(${on ? 1 : 0.4})`,
                    }}
                  >
                    <span className="relative block h-3 w-3">
                      <span
                        className="absolute inset-0 rounded-full bg-primary"
                        style={{ animation: "pulse-node 1.8s ease-in-out infinite" }}
                      />
                      <span className="absolute -inset-3 rounded-full border border-primary/40" />
                    </span>
                  </span>
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 h-24 opacity-40"
              style={{
                top: `${progress * 100}%`,
                background:
                  "linear-gradient(to bottom, transparent, oklch(0.855 0.145 200 / 0.25), transparent)",
              }}
              aria-hidden
            />
          </div>

          {/* annotation */}
          <div className="order-3 flex items-center">
            <div key={stage.id} className="bevel w-full border border-border bg-card/90 p-6 backdrop-blur">
              <p className="mono-label text-primary">{stage.label}</p>
              <h3 className="mt-3 font-display text-xl font-bold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
              <ul className="mt-5 space-y-2">
                {stage.specs.map((sp) => (
                  <li
                    key={sp}
                    className="flex items-center justify-between border-b border-border/70 pb-2 font-mono text-xs text-foreground"
                  >
                    <span>{sp}</span>
                    <span className="text-primary">OK</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="mono-label mb-2">Intégration du châssis</div>
                <div className="h-1 w-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {Math.round(progress * 100)}% · {active + 1}/{stages.length} modules montés
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mono-label absolute bottom-5 left-1/2 -translate-x-1/2">
          Défilez pour assembler le châssis
        </p>
      </div>
    </section>
  );
}
