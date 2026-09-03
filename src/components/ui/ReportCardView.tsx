import type { ReportCard } from "@/data/reportCards";
import { Img } from "./Img";
import { cn } from "@/lib/cn";

/**
 * The daily note, rendered as the actual artifact rather than a phone mockup.
 * It is more convincing to show the thing than a picture of the thing.
 */
export function ReportCardView({ card, className }: { card: ReportCard; className?: string }) {
  const rows: Array<[string, string]> = [
    ["Meals", card.meals],
    ["Appetite", card.appetite],
    ["Playgroup", card.playgroup],
    ["Enrichment", card.enrichment],
    ["Slept", card.sleep],
    ["Mood", card.mood],
  ];

  return (
    <article className={cn("border border-[var(--hairline-strong)] bg-bone", className)}>
      <header className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] px-6 py-5">
        <div>
          <p className="eyebrow">Daily note</p>
          <p className="mt-2 font-display text-[1.375rem] leading-none">{card.guest}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            {card.date}
          </p>
          <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
            {card.room}
          </p>
        </div>
      </header>

      <div className="frame aspect-3/2 w-full">
        <Img asset={card.image} alt={card.alt} sizes="(max-width: 1024px) 92vw, 42vw" />
      </div>

      <dl className="divide-y divide-[var(--hairline)] border-b border-[var(--hairline)]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4 px-6 py-3">
            <dt className="w-[6.5rem] shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              {k}
            </dt>
            <dd className="text-[0.875rem] leading-snug text-slate">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="px-6 py-6">
        <p className="text-[0.9375rem] leading-[1.7] text-ink">{card.note}</p>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
          — {card.author}
        </p>
      </div>
    </article>
  );
}
