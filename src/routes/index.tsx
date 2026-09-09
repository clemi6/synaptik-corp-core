import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { BodyScroll } from "@/components/site/BodyScroll";
import { Catalogue } from "@/components/site/Catalogue";
import { Simulator } from "@/components/site/Simulator";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";
import { products } from "@/data/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catalogue d'implants cybernétiques SYNAPTIK CORP",
  itemListElement: products.slice(0, 10).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": ["Product", "MedicalDevice"],
      name: p.name,
      category: p.category,
      description: p.short,
      brand: { "@type": "Brand", name: "Synaptik Corp" },
      offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Synaptik Corp — Implants cybernétiques certifiés" },
      {
        name: "description",
        content:
          "Synaptik Corp conçoit des implants cybernétiques de grade chirurgical : neural, optique, musculo-squelettique et organique. Transcendez la condition humaine.",
      },
      { property: "og:title", content: "Synaptik Corp — Implants cybernétiques certifiés" },
      {
        property: "og:description",
        content:
          "Catalogue d'augmentations bio-mécatroniques, simulateur de compatibilité neuro-synaptique et assistance clinique V.E.R.A.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BodyScroll />
      <Catalogue />
      <Simulator />
      <Footer />
      <VeraChat />
    </main>
  );
}
