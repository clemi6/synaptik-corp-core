import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { BodyScroll } from "@/components/site/BodyScroll";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";

const zones = [
  {
    code: "Z-01",
    title: "Cortex",
    text: "Implantation sous-durale par micro-craniotomie. Couplage synaptique en 6 heures, calibrage logiciel sur 14 jours.",
  },
  {
    code: "Z-02",
    title: "Bloc optique",
    text: "Remplacement du globe par capteur multispectral. Nerf optique conservé, interface HUD pilotée par clignement.",
  },
  {
    code: "Z-03",
    title: "Chaîne musculo-squelettique",
    text: "Ancrage titane sur l'os porteur. Charge de service certifiée jusqu'à 800 kg avec renfort vertébral.",
  },
  {
    code: "Z-04",
    title: "Systémique",
    text: "Greffes organiques régulées, bio-filtres et pompes hormonales sous surveillance télémétrique continue.",
  },
];

export const Route = createFileRoute("/anatomie")({
  head: () => ({
    meta: [
      { title: "Anatomie augmentée — Synaptik Corp" },
      {
        name: "description",
        content:
          "Exploration zone par zone du châssis humain augmenté : cortex, optique, musculo-squelettique et systémique, avec protocoles chirurgicaux.",
      },
      { property: "og:title", content: "Anatomie augmentée — Synaptik Corp" },
      {
        property: "og:description",
        content:
          "Assemblez le châssis module par module et découvrez les protocoles d'implantation Synaptik.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnatomiePage,
});

function AnatomiePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="grid-bg border-b border-border px-5 pb-16 pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="mono-label">Dossier technique — Chapitre 01</p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Anatomie <span className="text-primary text-glow">augmentée</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Chaque châssis biologique est cartographié avant intervention. Nos chirurgiens
            travaillent sur quatre zones d'implantation homologuées par la norme NS-88.
          </p>
        </div>
      </section>

      <BodyScroll />

      <section className="border-t border-border px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {zones.map((z) => (
            <article key={z.code} className="bevel border border-border bg-card p-6">
              <p className="mono-label text-primary">{z.code}</p>
              <h2 className="mt-2 font-display text-xl font-bold">{z.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{z.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <VeraChat />
    </main>
  );
}
