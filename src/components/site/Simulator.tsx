import { useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

const modules = [
  { id: "cortex", label: "Synapse Overclock v4", load: 22 },
  { id: "oracle", label: "Co-processeur Oracle", load: 28 },
  { id: "iris", label: "Iris HUD Kiroshi-X", load: 16 },
  { id: "titan", label: "Bras Titan Grip", load: 24 },
  { id: "spine", label: "Renfort vertébral", load: 12 },
  { id: "adrena", label: "Pompe à adrénaline", load: 18 },
];

export function Simulator() {
  const [picked, setPicked] = useState<string[]>(["cortex", "iris"]);
  const [humanity, setHumanity] = useState(70);

  const load = useMemo(
    () => modules.filter((m) => picked.includes(m.id)).reduce((a, m) => a + m.load, 0),
    [picked],
  );
  const psychose = Math.min(100, Math.round(load * (1 + (100 - humanity) / 120)));
  const status =
    psychose < 40
      ? { label: "STABLE", tone: "text-primary" }
      : psychose < 70
        ? { label: "SURVEILLANCE REQUISE", tone: "text-warning" }
        : { label: "RISQUE DE CYBERPSYCHOSE", tone: "text-destructive" };

  return (
    <section id="simulateur" className="relative border-t border-border py-24">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5">
        <p className="mono-label flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          Section 04 — Simulateur de compatibilité
        </p>
        <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">
          CALIBRAGE NEURO-SYNAPTIQUE
        </h2>

        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-6">
            <p className="mono-label">Modules envisagés</p>
            <div className="mt-4 space-y-2">
              {modules.map((m) => {
                const on = picked.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() =>
                      setPicked((p) => (on ? p.filter((x) => x !== m.id) : [...p, m.id]))
                    }
                    className={`bevel-sm flex w-full items-center justify-between border px-4 py-3 text-left transition-colors ${
                      on
                        ? "border-primary/60 bg-primary/10 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm">{m.label}</span>
                    <span className="font-mono text-[11px] text-primary">+{m.load}%</span>
                  </button>
                );
              })}
            </div>

            <label className="mono-label mt-6 block">Indice d'humanité résiduelle</label>
            <input
              type="range"
              min={20}
              max={100}
              value={humanity}
              onChange={(e) => setHumanity(Number(e.target.value))}
              className="mt-3 w-full accent-[oklch(0.855_0.145_200)]"
            />
            <p className="mt-1 font-mono text-xs text-muted-foreground">{humanity} / 100</p>
          </div>

          <div className="bg-card p-6">
            <p className="mono-label">Rapport de télémétrie</p>
            <p className={`mt-4 font-display text-4xl font-black ${status.tone}`}>{psychose}%</p>
            <p className={`mono-label mt-2 ${status.tone}`}>{status.label}</p>

            <div className="mt-6 h-2 w-full bg-secondary">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${psychose}%`,
                  background:
                    psychose < 40
                      ? "var(--color-primary)"
                      : psychose < 70
                        ? "var(--color-warning)"
                        : "var(--color-destructive)",
                }}
              />
            </div>

            <dl className="mt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Charge synaptique</dt>
                <dd>{load}%</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Modules montés</dt>
                <dd>{picked.length}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Chirurgies requises</dt>
                <dd>{Math.ceil(picked.length / 2)}</dd>
              </div>
            </dl>

            <div className="bevel-sm mt-6 flex gap-3 border border-border bg-background p-4">
              {psychose < 70 ? (
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              ) : (
                <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
              )}
              <p className="text-xs leading-relaxed text-muted-foreground">
                {psychose < 70
                  ? "Configuration validée par le protocole clinique SYNAPTIK. Un suivi trimestriel en clinique agréée reste obligatoire."
                  : "Configuration au-delà du seuil réglementaire. Un régulateur métabolique et un accompagnement psychiatrique corp sont exigés avant toute pose."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
