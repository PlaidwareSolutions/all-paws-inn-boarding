import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { firstStay, vaccineRequirements } from "@/data/care";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The qualification wall, done calmly. It prevents unqualified bookings
 * without reading as a list of rules.
 */
export function BeforeFirstStay() {
  return (
    <Section tone="bone" rhythm="default">
      <Container width="wide">
        <Reveal className="max-w-[44rem]">
          <p className="eyebrow">Before a first stay</p>
          <h2 className="mt-5 text-(length:--text-display-3)">Three things, then you are a guest.</h2>
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-10 lg:grid-cols-3 lg:gap-x-14">
          {firstStay.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 90}>
              <p className="font-mono text-[0.6875rem] tabular text-ember">{s.step}</p>
              <h3 className="mt-4 font-display text-(length:--text-title-1) leading-tight">
                {s.title}
              </h3>
              <p className="mt-3.5 max-w-[42ch] leading-[1.65] text-slate">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-16 border-t border-[var(--hairline)] pt-10">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:gap-14">
              <div>
                <p className="eyebrow border-b border-[var(--hairline)] pb-3">Dogs</p>
                <ul className="mt-4 space-y-2 text-[0.9375rem] text-slate">
                  {vaccineRequirements.dog.map((v) => (
                    <li key={v.name}>
                      <span className="text-ink">{v.name}</span>
                      <span className="text-muted"> — {v.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow border-b border-[var(--hairline)] pb-3">Cats</p>
                <ul className="mt-4 space-y-2 text-[0.9375rem] text-slate">
                  {vaccineRequirements.cat.map((v) => (
                    <li key={v.name}>
                      <span className="text-ink">{v.name}</span>
                      <span className="text-muted"> — {v.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start justify-end gap-4 lg:items-end">
                <Link
                  href="/new-guests"
                  className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-moss px-6 text-[0.9375rem] font-medium text-bone transition-colors hover:bg-moss-soft"
                >
                  Book a meet &amp; greet
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <p className="max-w-[32ch] text-[0.8125rem] leading-snug text-muted lg:text-right">
                  Free, about forty minutes, no obligation. Cats do not need one — a second journey
                  costs them more than the visit is worth.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-[70ch] text-[0.875rem] leading-relaxed text-muted">
              Everyone also needs current heartworm and flea prevention. Mosquitoes here do not have
              an off-season, and a lapsed heartworm record is the one thing we turn a booking away over.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
