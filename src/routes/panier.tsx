import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier chirurgical — Synaptik Corp" },
      {
        name: "description",
        content:
          "Vérifiez vos modules sélectionnés, la charge neuronale totale et le coût d'installation avant validation du dossier chirurgical.",
      },
      { property: "og:title", content: "Panier chirurgical — Synaptik Corp" },
      {
        property: "og:description",
        content: "Récapitulatif des implants sélectionnés avant transmission au bloc opératoire.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  const { detailed, setQty, remove, total, count } = useCart();
  const install = detailed.length ? 890 : 0;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="grid-bg border-b border-border px-5 pb-12 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="mono-label">Dossier d'acquisition</p>
          <h1 className="mt-3 font-display text-3xl font-black sm:text-4xl">
            PANIER <span className="text-primary text-glow">CHIRURGICAL</span>
          </h1>
          <p className="mono-label mt-3">{count} module(s) en attente d'accréditation</p>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {detailed.length === 0 && (
              <div className="bevel border border-border bg-card p-10 text-center">
                <p className="font-display text-lg font-bold">Aucun module chargé</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Votre châssis est encore 100% organique.
                </p>
                <Link
                  to="/catalogue"
                  className="bevel-sm mt-6 inline-block bg-primary px-5 py-3 font-mono text-xs tracking-widest text-primary-foreground"
                >
                  EXPLORER LE CATALOGUE
                </Link>
              </div>
            )}

            {detailed.map((l) => (
              <article
                key={l.slug}
                className="bevel flex flex-wrap items-center gap-4 border border-border bg-card p-4"
              >
                <div className="min-w-[200px] flex-1">
                  <p className="mono-label">{l.category}</p>
                  <h2 className="mt-1 font-display text-sm font-bold">{l.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Retirer une unité"
                    onClick={() => setQty(l.slug, l.qty - 1)}
                    className="border border-border p-2 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm">{l.qty}</span>
                  <button
                    aria-label="Ajouter une unité"
                    onClick={() => setQty(l.slug, l.qty + 1)}
                    className="border border-border p-2 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="w-28 text-right font-mono text-primary">
                  {(l.price * l.qty).toLocaleString("fr-FR")} €
                </span>
                <button
                  aria-label="Supprimer le module"
                  onClick={() => remove(l.slug)}
                  className="p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          <aside className="bevel h-fit border border-border bg-card p-6">
            <p className="mono-label">Récapitulatif télémétrique</p>
            <dl className="mt-5 space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Modules</dt>
                <dd>{total.toLocaleString("fr-FR")} €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Chirurgie & calibrage</dt>
                <dd>{install.toLocaleString("fr-FR")} €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Livraison stérile 48h</dt>
                <dd>Offerte</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="mono-label">Total TTC</span>
              <span className="font-display text-xl font-bold text-primary">
                {(total + install).toLocaleString("fr-FR")} €
              </span>
            </div>
            <Link
              to="/paiement"
              disabled={detailed.length === 0}
              className={`bevel-sm mt-6 block px-5 py-3 text-center font-mono text-xs tracking-widest ${
                detailed.length === 0
                  ? "pointer-events-none bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              PASSER AU PAIEMENT
            </Link>
            <p className="mono-label mt-3">Maquette — aucun paiement réel.</p>
          </aside>
        </div>
      </section>

      <Footer />
      <VeraChat />
    </main>
  );
}
