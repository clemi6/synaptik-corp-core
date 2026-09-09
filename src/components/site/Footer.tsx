export function Footer() {
  return (
    <footer id="corp" className="relative border-t border-border bg-card/40 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bevel-sm inline-flex h-8 w-8 items-center justify-center bg-primary font-display text-sm font-bold text-primary-foreground">
              S
            </span>
            <span className="font-display text-sm font-bold tracking-[0.28em]">SYNAPTIK</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Upgrading Human Potential Since 2088. Mégacorporation de bio-mécatronique certifiée
            NS-88.
          </p>
        </div>

        {[
          ["Gammes", ["Neural & Cortex", "Optique & Sensoriel", "Musculo-Squelettique", "Systémique & Organique"]],
          ["Corp", ["À propos", "Cliniques agréées", "Protocole de garantie", "Recrutement"]],
          ["Protocoles", ["Mentions légales", "Politique de rejet immunitaire", "llms.txt", "Flux RSS"]],
        ].map(([title, items]) => (
          <div key={title as string}>
            <p className="mono-label">{title as string}</p>
            <ul className="mt-4 space-y-2">
              {(items as string[]).map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border px-5 pt-6">
        <p className="mono-label">© 2088 SYNAPTIK CORP — Tous droits neuronaux réservés</p>
        <p className="mono-label text-primary">SRV-EU-03 · UPTIME 99.998%</p>
      </div>
    </footer>
  );
}
