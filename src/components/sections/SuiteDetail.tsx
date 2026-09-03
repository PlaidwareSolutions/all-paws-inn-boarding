import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Suite } from "@/data/suites";
import { money } from "@/lib/pricing";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Long-form entry per room. Alternates side so the page has a rhythm. */
export function SuiteDetail({ suite, index }: { suite: Suite; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      id={suite.slug}
      className={cn(
        "scroll-mt-24 border-t border-[var(--hairline)] py-[clamp(3.5rem,2rem+5vw,6rem)]",
        index === 0 && "border-t-0",
      )}
    >
      <Container width="wide">
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20",
          )}
        >
          <Reveal className={cn("frame aspect-3/2 w-full", flip && "lg:order-2")}>
            <Img asset={suite.image} alt={suite.alt} sizes="(max-width: 1024px) 92vw, 52vw" />
          </Reveal>

          <Reveal delay={80} className={cn(flip && "lg:order-1")}>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="font-display text-(length:--text-display-3) leading-tight">
                {suite.name}
              </h2>
              <p className="shrink-0 text-right">
                <span className="block font-mono text-[1.125rem] tabular text-ink">
                  {money(suite.rate)}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                  per night
                </span>
              </p>
            </div>

            <p className="mt-6 max-w-[52ch] leading-[1.7] text-slate">{suite.body}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-[var(--hairline)] py-6">
              <div>
                <dt className="eyebrow">Room size</dt>
                <dd className="mt-1.5 font-mono text-[0.875rem] tabular text-ink">
                  {suite.spec.dimensions}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Occupancy</dt>
                <dd className="mt-1.5 text-[0.875rem] text-ink">{suite.spec.sharing}</dd>
              </div>
            </dl>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {suite.includes.map((inc) => (
                <li key={inc} className="flex gap-2.5 text-[0.9375rem] leading-snug text-slate">
                  <Check size={15} aria-hidden className="mt-1 shrink-0 text-success" />
                  {inc}
                </li>
              ))}
            </ul>

            <Link
              href={`/plan?suite=${suite.slug}&species=${suite.species}`}
              className="link-underline mt-8 inline-flex items-center gap-2 font-medium text-ink"
            >
              Check dates for {suite.name}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
