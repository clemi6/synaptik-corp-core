import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title: "Paiement sécurisé — Synaptik Corp" },
      {
        name: "description",
        content:
          "Transmission chiffrée du dossier d'implantation : crédits corporatifs, carte neuronale ou financement en 4 cycles.",
      },
      { property: "og:title", content: "Paiement sécurisé — Synaptik Corp" },
      {
        property: "og:description",
        content: "Validation du dossier chirurgical et planification de l'intervention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaiementPage,
});

const methods = [
  { id: "credits", label: "Crédits corporatifs", hint: "Débit instantané · 0% frais" },
  { id: "carte", label: "Carte neuronale", hint: "Tokenisation biométrique" },
  { id: "financement", label: "Financement 4 cycles", hint: "+4.9% · Sous conditions" },
];

function PaiementPage() {
  const { detailed, total, clear } = useCart();
  const [method, setMethod] = useState("credits");
  const [done, setDone] = useState(false);
  const install = detailed.length ? 890 : 0;
  const grand = total + install;
  const ref = "SYN-" + String(Math.abs(grand * 7919) % 999983).padStart(6, "0");

  if (done) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="grid-bg flex min-h-[70vh] items-center px-5 pt-28">
          <div className="bevel mx-auto max-w-xl border border-border bg-card p-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-5 font-display text-2xl font-black">DOSSIER ACCRÉDITÉ</h1>
            <p className="mono-label mt-2">Référence {ref}</p>
            <p className="mt-5 text-sm text-muted-foreground">
              Votre rapport de télémétrie post-commande a été transmis. Un chirurgien agréé vous
              contactera sous 24h pour planifier l'implantation.
            </p>
            <Link
              to="/catalogue"
              className="bevel-sm mt-7 inline-block bg-primary px-5 py-3 font-mono text-xs tracking-widest text-primary-foreground"
            >
              RETOUR AU CATALOGUE
            </Link>
          </div>
        </section>
        <Footer />
        <VeraChat />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="grid-bg border-b border-border px-5 pb-12 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="mono-label flex items-center gap-2">
            <Lock className="h-3 w-3 text-primary" /> Canal chiffré NS-88 · TLS neuronal
          </p>
          <h1 className="mt-3 font-display text-3xl font-black sm:text-4xl">
            PAIEMENT <span className="text-primary text-glow">SÉCURISÉ</span>
          </h1>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              clear();
              setDone(true);
            }}
          >
            <div className="bevel border border-border bg-card p-6">
              <p className="mono-label">01 — Identité du receveur</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input required placeholder="Nom" className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input required placeholder="Identifiant citoyen" className="border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input required type="email" placeholder="Canal sécurisé (email)" className="sm:col-span-2 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                <input required placeholder="Clinique de destination" className="sm:col-span-2 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            <div className="bevel border border-border bg-card p-6">
              <p className="mono-label">02 — Mode de règlement</p>
              <div className="mt-4 space-y-2">
                {methods.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`bevel-sm flex w-full items-center justify-between border px-4 py-3 text-left transition-colors ${
                      method === m.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-display text-sm font-bold">{m.label}</span>
                    <span className="mono-label">{m.hint}</span>
                  </button>
                ))}
              </div>
              {method === "carte" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input placeholder="0000 0000 0000 0000" className="sm:col-span-3 border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
                  <input placeholder="MM/AA" className="border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
                  <input placeholder="CVC" className="border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
                  <input placeholder="Empreinte rétinienne" className="border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
                </div>
              )}
            </div>

            <div className="bevel border border-border bg-card p-6">
              <p className="mono-label">03 — Consentement clinique</p>
              <label className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
                <input required type="checkbox" className="mt-1 accent-[oklch(0.635_0.235_26)]" />
                Je reconnais avoir été informé des risques de rejet immunitaire et de cyberpsychose,
                et j'autorise Synaptik Corp à procéder à l'implantation.
              </label>
            </div>

            <button
              type="submit"
              disabled={detailed.length === 0}
              className={`bevel-sm w-full px-5 py-4 font-mono text-xs tracking-widest ${
                detailed.length === 0
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              VALIDER ET TRANSMETTRE LE DOSSIER
            </button>
            <p className="mono-label">Maquette — aucun paiement réel n'est effectué.</p>
          </form>

          <aside className="bevel h-fit border border-border bg-card p-6">
            <p className="mono-label">Commande</p>
            <ul className="mt-4 space-y-2">
              {detailed.map((l) => (
                <li key={l.slug} className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {l.name} ×{l.qty}
                  </span>
                  <span className="font-mono">{(l.price * l.qty).toLocaleString("fr-FR")} €</span>
                </li>
              ))}
              {detailed.length === 0 && (
                <li className="text-sm text-muted-foreground">Panier vide.</li>
              )}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="mono-label">Total TTC</span>
              <span className="font-display text-xl font-bold text-primary">
                {grand.toLocaleString("fr-FR")} €
              </span>
            </div>
            <Link to="/panier" className="mono-label mt-4 block hover:text-primary">
              ‹ Modifier le panier
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
      <VeraChat />
    </main>
  );
}
