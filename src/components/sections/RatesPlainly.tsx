import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dogSuites, catSuites } from "@/data/suites";
import { daycareRates } from "@/data/addons";
import { PEAK_SURCHARGE } from "@/lib/availability";
import { money } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const included = [
  "Their own food, prepared and served",
  "All medication, including injectables",
  "A written note and a photograph daily",
  "Yard turnouts and the cameras",
];

const extra = [
  "Enrichment sessions, if you want them",
  "Anything ordered from the kitchen",
  "Grooming",
  `Peak nights, at ${money(PEAK_SURCHARGE)} — published a year ahead`,
];

/**
 * Directly answers the category's worst habit. Stating the policy on the
 * homepage is itself the differentiator.
 */
export function RatesPlainly() {
  const from = Math.min(...dogSuites.map((s) => s.rate));
  const catFrom = Math.min(...catSuites.map((s) => s.rate));

  return (
    <Section tone="parchment" rhythm="tight">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">What it costs</p>
            <h2 className="mt-5 max-w-[15ch] text-(length:--text-display-3)">
              We publish every rate we charge.
            </h2>
            <p className="mt-6 max-w-[46ch] leading-[1.65] text-slate">
              You should not have to ring a business to find out what a room costs, and you should
              not find out about a holiday surcharge at checkout. Ours are set a year ahead.
            </p>

            <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-5">
              <p>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  Dogs, per night
                </span>
                <span className="mt-1.5 block font-display text-[2.25rem] leading-none tabular">
                  {money(from)}
                </span>
              </p>
              <p>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  Cats, per night
                </span>
                <span className="mt-1.5 block font-display text-[2.25rem] leading-none tabular">
                  {money(catFrom)}
                </span>
              </p>
              <p>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  Daycare, per day
                </span>
                <span className="mt-1.5 block font-display text-[2.25rem] leading-none tabular">
                  {money(daycareRates.halfDay)}
                </span>
              </p>
            </div>

            <Link
              href="/rates"
              className="link-underline mt-8 inline-flex items-center gap-2 font-medium text-ink"
            >
              Every rate, in full
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={110} className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow border-b border-[var(--hairline)] pb-4">In the room rate</p>
              <ul className="mt-5 space-y-3">
                {included.map((x) => (
                  <li key={x} className="text-[0.9375rem] leading-snug text-slate">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow border-b border-[var(--hairline)] pb-4">Charged separately</p>
              <ul className="mt-5 space-y-3">
                {extra.map((x) => (
                  <li key={x} className="text-[0.9375rem] leading-snug text-slate">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
