import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";

const stats = [
  ["2088", "Année de fondation"],
  ["0.03%", "Indice de rejet moyen"],
  ["48H", "Délai chirurgical"],
  ["14", "Cliniques agréées"],
];

const values = [
  {
    title: "Rigueur clinique",
    text: "Chaque implant est validé par un comité bio-éthique interne et tracé de la fonderie au bloc opératoire.",
  },
  {
    title: "Exclusivité",
    text: "Séries limitées, finitions carbone et titane, calibrage personnalisé sur votre empreinte synaptique.",
  },
  {
    title: "Maintenance à vie",
    text: "Télémétrie continue, mises à jour firmware chiffrées et remplacement prioritaire des servomoteurs.",
  },
];

export const Route = createFileRoute("/corp")({
  head: () => ({
    meta: [
      { title: "La corporation — Synaptik Corp" },
      {
        name: "description",
        content:
          "Synaptik Corp, mégacorporation de bio-mécatronique fondée en 2088 : mission, cliniques agréées, garanties et contact accréditation.",
      },
      { property: "og:title", content: "La corporation — Synaptik Corp" },
      {
        property: "og:description",
        content:
          "Notre mission, nos cliniques agréées et nos protocoles de garantie neuro-synaptique.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CorpPage,
});

function CorpPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="grid-bg border-b border-border px-5 pb-16 pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="mono-label">Dossier corporate</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Synaptik <span className="text-primary text-glow">Corp</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Upgrading Human Potential Since 2088. Nous concevons, fabriquons et implantons des
            augmentations bio-mécatroniques de grade chirurgical pour une clientèle exigeante.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(([v, l]) => (
              <div key={l} className="bevel-sm border border-border bg-card p-4">
                <p className="font-display text-2xl font-bold text-primary">{v}</p>
                <p className="mono-label mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="bevel border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">{v.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mono-label">Accréditation</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Prendre rendez-vous</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Toute implantation est précédée d'un bilan neuro-synaptique de 90 minutes en clinique
              agréée. Les dossiers présentant des antécédents de cyberpsychose sont examinés par un
              comité médical.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted-foreground">
              <li>› Tour Synaptik, District 9 — Néo-Lyon</li>
              <li>› accreditation@synaptik.corp</li>
              <li>› Ligne prioritaire : +33 (0)8 88 20 88</li>
            </ul>
          </div>
          <form
            className="bevel border border-border bg-card p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="mono-label">Formulaire de pré-diagnostic</p>
            <input
              className="mt-4 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Identité"
            />
            <input
              className="mt-3 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Canal de contact sécurisé"
            />
            <textarea
              className="mt-3 h-28 w-full resize-none border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Modules envisagés / antécédents"
            />
            <button
              type="submit"
              className="bevel-sm mt-4 w-full bg-primary px-4 py-3 font-mono text-xs tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              TRANSMETTRE LE DOSSIER
            </button>
            <p className="mono-label mt-3">Maquette — aucune donnée n'est transmise.</p>
          </form>
        </div>
      </section>

      <Footer />
      <VeraChat />
    </main>
  );
}
