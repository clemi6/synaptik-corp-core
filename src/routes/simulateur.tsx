import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Simulator } from "@/components/site/Simulator";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";

export const Route = createFileRoute("/simulateur")({
  head: () => ({
    meta: [
      { title: "Simulateur de compatibilité — Synaptik Corp" },
      {
        name: "description",
        content:
          "Calculez votre indice de cyberpsychose et votre compatibilité neuro-synaptique avant toute chirurgie d'augmentation Synaptik.",
      },
      { property: "og:title", content: "Simulateur de compatibilité — Synaptik Corp" },
      {
        property: "og:description",
        content:
          "Sélectionnez vos modules, ajustez votre humanité résiduelle et obtenez un rapport clinique instantané.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulateurPage,
});

function SimulateurPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="h-24" />
      <Simulator />
      <Footer />
      <VeraChat />
    </main>
  );
}
