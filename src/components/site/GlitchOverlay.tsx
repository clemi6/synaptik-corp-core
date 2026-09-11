import { AlertTriangle } from "lucide-react";

/**
 * Overlay de psycho-glitch. L'intensité (0 -> 1) module l'opacité,
 * la vitesse et l'amplitude des artefacts visuels.
 */
export function GlitchOverlay({ level, psychose }: { level: number; psychose: number }) {
  if (level <= 0) return null;
  const i = Math.min(1, Math.max(0, level));

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden
      style={
        {
          "--glitch-i": i,
          animation: `psycho-shake ${(0.5 - i * 0.32).toFixed(2)}s steps(2, end) infinite`,
        } as React.CSSProperties
      }
    >
      <div className="scanlines absolute inset-0" style={{ opacity: 0.25 + i * 0.55 }} />
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: i * 0.5,
          background:
            "repeating-linear-gradient(to bottom, var(--color-primary) 0 2px, transparent 2px 7px)",
          animation: `psycho-slice ${(1.4 - i).toFixed(2)}s linear infinite`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: i * 0.35,
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--color-primary) 160%)",
          animation: `psycho-flash ${(1.1 - i * 0.7).toFixed(2)}s ease-in-out infinite`,
        }}
      />

      {psychose >= 70 && (
        <div className="absolute inset-x-0 top-1/3 flex justify-center px-4">
          <div
            className="bevel border-2 border-destructive bg-background/90 px-6 py-5 text-center shadow-2xl"
            style={{ animation: `psycho-warn ${(0.9 - i * 0.55).toFixed(2)}s steps(3) infinite` }}
          >
            <AlertTriangle className="mx-auto h-9 w-9 text-destructive" />
            <p className="mono-label mt-3 !text-destructive">Alerte protocole SYNAPTIK</p>
            <p className="mt-2 font-display text-2xl font-black text-destructive sm:text-3xl">
              RISQUE DE CYBERPSYCHOSE
            </p>
            <p className="mt-2 max-w-md font-mono text-[11px] leading-relaxed text-muted-foreground">
              Saturation neuro-synaptique {psychose}% — dissociation sensorielle imminente.
              Régulateur métabolique et suivi psychiatrique corp obligatoires.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
