import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { products, categories } from "@/data/products";
import chip from "@/assets/chip.jpg";
import eye from "@/assets/eye.jpg";
import arm from "@/assets/arm.jpg";
import organ from "@/assets/organ.jpg";

const imageByCategory: Record<string, string> = {
  "Neural & Cortex": chip,
  "Optique & Sensoriel": eye,
  "Musculo-Squelettique": arm,
  "Systémique & Organique": organ,
  "Packs Promotionnels": chip,
};

const personas = [
  { id: "all", label: "Tous profils", cats: categories },
  { id: "netrunner", label: "Netrunner", cats: ["Neural & Cortex", "Packs Promotionnels"] },
  { id: "securite", label: "Opérateur sécurité", cats: ["Optique & Sensoriel", "Musculo-Squelettique"] },
  { id: "physique", label: "Travailleur physique", cats: ["Musculo-Squelettique"] },
  { id: "survivaliste", label: "Survivaliste urbain", cats: ["Systémique & Organique"] },
];

export function Catalogue() {
  const { add } = useCart();
  const [cat, setCat] = useState<string>("Tout");
  const [persona, setPersona] = useState("all");

  const list = useMemo(() => {
    const p = personas.find((x) => x.id === persona)!;
    return products
      .filter((x) => (cat === "Tout" ? true : x.category === cat))
      .map((x) => ({ ...x, score: p.cats.includes(x.category) ? 1 : 0 }))
      .sort((a, b) => b.score - a.score || a.price - b.price);
  }, [cat, persona]);

  return (
    <section id="catalogue" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-5">
        <p className="mono-label flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          Section 03 — Recommandation dynamique
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-black sm:text-4xl">CATALOGUE D'AUGMENTATIONS</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            L'ordonnancement est recalculé selon la télémétrie du profil client sélectionné.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              className={`bevel-sm border px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                persona === p.id
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {["Tout", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                cat === c ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === c ? "▸ " : ""}
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article
              key={p.slug}
              className="bevel group flex flex-col border border-border bg-card transition-colors hover:border-primary/60"
            >
              <div className="relative overflow-hidden">
                <img
                  src={imageByCategory[p.category] ?? chip}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="tint-red h-44 w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                {p.score === 1 && (
                  <span className="bevel-sm absolute left-3 top-3 bg-primary px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-primary-foreground">
                    RECOMMANDÉ
                  </span>
                )}
                {p.category === "Packs Promotionnels" && (
                  <span className="bevel-sm absolute right-3 top-3 bg-warning px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-warning-foreground">
                    PACK -15%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="mono-label">{p.category}</p>
                <h3 className="mt-2 font-display text-sm leading-snug font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
                <ul className="mt-4 space-y-1">
                  {p.specs.slice(0, 3).map((s) => (
                    <li key={s} className="font-mono text-[11px] text-muted-foreground">
                      › {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-lg text-primary">
                    {p.price.toLocaleString("fr-FR")} €
                  </span>
                  <button
                    onClick={() => add(p.slug)}
                    className="bevel-sm border border-primary/50 bg-primary/10 px-3 py-2 font-mono text-[11px] tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    AJOUTER
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
