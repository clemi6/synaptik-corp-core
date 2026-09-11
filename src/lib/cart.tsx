import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/products";

export type CartLine = { slug: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: { slug: string; name: string; category: string; price: number; qty: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "synaptik-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const detailed = lines.flatMap((l) => {
      const p = products.find((x) => x.slug === l.slug);
      return p
        ? [{ slug: p.slug, name: p.name, category: p.category, price: p.price, qty: l.qty }]
        : [];
    });
    return {
      lines,
      detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: detailed.reduce((n, l) => n + l.price * l.qty, 0),
      add: (slug) =>
        setLines((prev) =>
          prev.some((l) => l.slug === slug)
            ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { slug, qty: 1 }],
        ),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
