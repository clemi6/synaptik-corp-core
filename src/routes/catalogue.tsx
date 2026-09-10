import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Catalogue } from "@/components/site/Catalogue";
import { Footer } from "@/components/site/Footer";
import { VeraChat } from "@/components/site/VeraChat";
import { products } from "@/data/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Catalogue complet Synaptik Corp",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": ["Product", "MedicalDevice"],
      name: p.name,
      category: p.category,
      description: p.short,
      brand: { "@type": "Brand", name: "Synaptik Corp" },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue d'implants — Synaptik Corp" },
      {
        name: "description",
        content:
          "30 implants cybernétiques certifiés NS-88 : puces cognitives, optiques tactiques, renforts musculo-squelettiques, régulateurs organiques et packs.",
      },
      { property: "og:title", content: "Catalogue d'implants — Synaptik Corp" },
      {
        property: "og:description",
        content:
          "Filtrez par gamme et par profil neuronal, comparez les indices de rejet et commandez votre augmentation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="h-24" />
      <Catalogue />
      <Footer />
      <VeraChat />
    </main>
  );
}
