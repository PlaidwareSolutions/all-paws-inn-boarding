"use client";

import { useState } from "react";
import { daycareRates } from "@/data/addons";
import { effectiveDayRate, money } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Pay-as-you-go against packages, showing the effective per-day cost.
 * Adapted from Kip's bulk-vs-subscription breakdown — the useful part is
 * doing the division for people rather than making them do it.
 */
export function DaycarePricing() {
  const [mode, setMode] = useState<"single" | "package">("single");

  return (
    <Section tone="parchment" rhythm="default" id="rates">
      <Container width="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[40rem]">
            <p className="eyebrow">Day rates</p>
            <h2 className="mt-5 text-(length:--text-display-3)">Pay per day, or buy a block.</h2>
          </div>

          <div
            role="group"
            aria-label="Pricing mode"
            className="flex rounded-sm border border-[var(--hairline-strong)] p-1"
          >
            {(["single", "package"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={cn(
                  "min-h-10 rounded-sm px-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors",
                  mode === m ? "bg-moss text-bone" : "text-slate hover:text-ink",
                )}
              >
                {m === "single" ? "Per day" : "Packages"}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          {mode === "single" ? (
            <dl className="grid gap-x-10 gap-y-8 border-t border-[var(--hairline)] pt-9 sm:grid-cols-2 lg:max-w-[46rem]">
              <div>
                <dt className="eyebrow">Half day — up to five hours</dt>
                <dd className="mt-3 font-display text-[2.75rem] leading-none tabular">
                  {money(daycareRates.halfDay)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Full day — 7am to 6pm</dt>
                <dd className="mt-3 font-display text-[2.75rem] leading-none tabular">
                  {money(daycareRates.fullDay)}
                </dd>
              </div>
            </dl>
          ) : (
            <ul className="grid gap-6 border-t border-[var(--hairline)] pt-9 lg:grid-cols-3">
              {daycareRates.packages.map((p) => {
                const each = effectiveDayRate(p.price, p.days);
                const saving = Math.round((1 - each / daycareRates.fullDay) * 100);
                return (
                  <li key={p.name} className="border border-[var(--hairline-strong)] bg-bone p-6">
                    <p className="eyebrow">{p.name}</p>
                    <p className="mt-4 font-display text-[2.25rem] leading-none tabular">
                      {money(p.price)}
                    </p>
                    <p className="mt-3 font-mono text-[0.8125rem] tabular text-ember">
                      ${each.toFixed(2)} a day
                      {saving > 0 ? <span className="text-muted"> · {saving}% less</span> : null}
                    </p>
                    <p className="mt-4 text-[0.875rem] leading-snug text-muted">{p.note}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Reveal delay={60}>
          <p className="mt-10 max-w-[58ch] text-[0.9375rem] leading-relaxed text-slate">
            A full day includes two yard sessions, a rest period and lunch if you send it. Packages
            never expire inside twelve months and are not tied to particular weekdays.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
