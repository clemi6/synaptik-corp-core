import { useEffect, useState } from "react";
import { Activity, ShoppingCart, User } from "lucide-react";

export function Header() {
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const id = setInterval(() => setPing(8 + Math.floor(Math.random() * 14)), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3">
          <span className="bevel-sm inline-flex h-8 w-8 items-center justify-center bg-primary font-display text-sm font-bold text-primary-foreground">
            S
          </span>
          <span className="font-display text-sm font-bold tracking-[0.28em] text-foreground">
            SYNAPTIK
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Anatomie", "#anatomie"],
            ["Catalogue", "#catalogue"],
            ["Compatibilité", "#simulateur"],
            ["Corp", "#corp"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="mono-label transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 md:flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ animation: "pulse-node 1.6s ease-in-out infinite" }}
            />
            <span className="mono-label">SRV ONLINE · {ping}ms</span>
          </span>
          <button className="mono-label flex items-center gap-2 transition-colors hover:text-primary">
            <User className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Profil</span>
          </button>
          <button className="bevel-sm flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-[11px] tracking-widest text-primary transition-colors hover:bg-primary/20">
            <ShoppingCart className="h-4 w-4" aria-hidden />
            0
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-border/60 bg-card/40 px-5 py-1">
        <Activity className="h-3 w-3 text-primary" aria-hidden />
        <p className="mono-label truncate">
          Bulletin corp — Nouvelle norme neuro-synaptique NS-88 déployée · Livraison chirurgicale
          sous 48h · Indice de rejet moyen du réseau : 0.03%
        </p>
      </div>
    </header>
  );
}
