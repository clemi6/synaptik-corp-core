import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";

type Msg = { role: "vera" | "user" | "system"; text: string };

const INTRO: Msg[] = [
  {
    role: "system",
    text: "[Canal chiffré établi · V.E.R.A. — Virtual Enhancement Robotic Assistant]",
  },
  {
    role: "vera",
    text: "Bonjour. Je suis V.E.R.A., assistante clinique de SYNAPTIK CORP. Avant toute recommandation, avez-vous des antécédents de cyberpsychose ou de rejet immunitaire ?",
  },
];

const suggestions = [
  "Délais de livraison ?",
  "Compatibilité du Titan Grip ?",
  "Prix du pack Netrunner ?",
  "Parler à un opérateur humain",
];

function answer(q: string): Msg[] {
  const t = q.toLowerCase();
  if (t.includes("humain") || t.includes("opérateur") || t.includes("conseiller")) {
    return [
      { role: "system", text: "[Connexion sécurisée établie avec un opérateur humain niveau 3]" },
      { role: "vera", text: "Opérateur K-118 en ligne. Je reprends le dossier, un instant." },
    ];
  }
  if (t.includes("livraison") || t.includes("délai"))
    return [
      {
        role: "vera",
        text: "Expédition sous 48h en caisson stérile. La pose chirurgicale est planifiée sous 5 à 9 jours dans l'une de nos 212 cliniques agréées.",
      },
    ];
  if (t.includes("titan") || t.includes("bras"))
    return [
      {
        role: "vera",
        text: "Le Bras Bionique Titan Grip (5 800 €) exige un renfort vertébral en carbone-tungstène au-delà de 400 kg de charge. Indice de rejet : 0.1%. Souhaitez-vous simuler la compatibilité ?",
      },
    ];
  if (t.includes("pack") || t.includes("netrunner"))
    return [
      {
        role: "vera",
        text: "Pack « Netrunner Pro » : 8 500 € (Synapse v4 + Oracle + Neuro-glace), soit -15%. Garantie de maintenance 2 ans incluse.",
      },
    ];
  if (t.includes("prix") || t.includes("tarif"))
    return [
      {
        role: "vera",
        text: "Notre catalogue s'échelonne de 650 € (module anti-éblouissement) à 12 400 € (packs intégraux). Précisez la gamme souhaitée pour un devis chiffré.",
      },
    ];
  if (t.includes("non") || t.includes("aucun"))
    return [
      {
        role: "vera",
        text: "Parfait. Profil neuro-synaptique nominal. Je peux vous orienter vers une gamme : Neural & Cortex, Optique, Musculo-Squelettique ou Systémique.",
      },
    ];
  return [
    {
      role: "vera",
      text: "Requête enregistrée. Sur le plan clinique, je vous recommande de préciser la zone d'implantation visée (cortex, optique, membre, organique) afin que j'évalue la compatibilité neuro-synaptique.",
    },
  ];
}

export function VeraChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INTRO);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setValue("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, ...answer(text)]);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ouvrir l'assistance V.E.R.A."
        className="bevel-sm fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-primary/60 bg-primary px-4 py-3 font-mono text-[11px] font-bold tracking-widest text-primary-foreground shadow-lg"
      >
        {open ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        V.E.R.A.
      </button>

      {open && (
        <div className="bevel fixed bottom-20 right-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col border border-border bg-popover">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-display text-xs font-bold tracking-widest">V.E.R.A.</p>
              <p className="mono-label">Support clinique · Niveau 1</p>
            </div>
            <span
              className="h-2 w-2 rounded-full bg-primary"
              style={{ animation: "pulse-node 1.6s ease-in-out infinite" }}
            />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i}>
                {m.role === "system" ? (
                  <p className="mono-label text-center text-warning">{m.text}</p>
                ) : (
                  <div className={m.role === "user" ? "flex justify-end" : ""}>
                    <p
                      className={`bevel-sm max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground"
                      }`}
                    >
                      {m.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {typing && <p className="mono-label">V.E.R.A. analyse la requête…</p>}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-1 border-t border-border px-3 py-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Décrivez votre requête…"
              className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="bevel-sm bg-primary p-2 text-primary-foreground"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
