"use client";

import { AlertTriangle } from "lucide-react";
import type { Quote } from "@/lib/pricing";
import { money } from "@/lib/pricing";
import { formatRange } from "@/lib/dates";
import type { Suite } from "@/data/suites";
import { cn } from "@/lib/cn";

export function SummaryBody({
  quote,
  suite,
  from,
  to,
  minStay,
  compact = false,
}: {
  quote: Quote;
  suite: Suite | null;
  from: string;
  to: string;
  minStay: { nights: number; window: string } | null;
  compact?: boolean;
}) {
  const shortfall = minStay && quote.nights > 0 && quote.nights < minStay.nights;

  return (
    <div>
      {!compact ? (
        <>
          <p className="eyebrow">Your stay</p>
          <p className="mt-3 font-display text-[1.5rem] leading-tight">
            {suite ? suite.name : "No room chosen yet"}
          </p>
          <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            {from && to ? formatRange(from, to) : "Pick your dates"}
            {quote.nights > 0 ? ` · ${quote.nights} ${quote.nights === 1 ? "night" : "nights"}` : ""}
          </p>
        </>
      ) : null}

      {quote.lines.length > 0 ? (
        <dl className={cn("border-t border-[var(--hairline)]", compact ? "mt-0" : "mt-6")}>
          {quote.lines.map((l, i) => (
            <div key={`${l.label}-${i}`} className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] py-3">
              <dt className="flex-1">
                <span className="block text-[0.875rem] leading-snug text-ink">{l.label}</span>
                {l.detail ? (
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">{l.detail}</span>
                ) : null}
              </dt>
              <dd className="shrink-0 font-mono text-[0.875rem] tabular text-ink">{money(l.amount)}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="font-display text-[1.125rem]">Total</span>
        <span className="font-display text-[1.875rem] leading-none tabular">
          {money(quote.total)}
        </span>
      </div>
      {quote.nights > 0 && quote.total > 0 ? (
        <p className="mt-2 text-right font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
          {money(quote.perNight)} a night, all in
        </p>
      ) : null}

      {shortfall ? (
        <p className="mt-5 flex gap-2.5 rounded-sm bg-warning/10 p-3.5 text-[0.8125rem] leading-snug text-warning">
          <AlertTriangle size={15} aria-hidden className="mt-0.5 shrink-0" />
          <span>
            {minStay!.window} has a {minStay!.nights}-night minimum. Add{" "}
            {minStay!.nights - quote.nights} more {minStay!.nights - quote.nights === 1 ? "night" : "nights"}.
          </span>
        </p>
      ) : null}

      <p className="mt-5 text-[0.75rem] leading-relaxed text-muted">
        No booking fee and no deposit taken now. We confirm the room first, then take one night as
        a deposit against the total above.
      </p>
    </div>
  );
}
