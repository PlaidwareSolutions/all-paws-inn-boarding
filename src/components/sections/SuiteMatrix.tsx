import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { specRows, type Suite } from "@/data/suites";
import { money } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function cellValue(suite: Suite, key: (typeof specRows)[number]["key"]) {
  const v = suite.spec[key];
  if (typeof v === "boolean") {
    return v ? (
      <span className="inline-flex items-center gap-1.5 text-ink">
        <Check size={15} aria-hidden className="text-success" />
        <span className="sr-only">Yes</span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-muted">
        <Minus size={15} aria-hidden />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return v;
}

/**
 * Desktop: a real table with the feature column pinned.
 * Mobile: the same data as swipeable cards with inline labels — a table that
 * scrolls sideways on a phone is unreadable, which is the research's point.
 */
export function SuiteMatrix({ suites, title, note }: { suites: Suite[]; title: string; note?: string }) {
  return (
    <Section tone="bone" rhythm="default" id="compare">
      <Container width="wide">
        <Reveal className="max-w-[46rem]">
          <p className="eyebrow">Side by side</p>
          <h2 className="mt-5 text-(length:--text-display-3)">{title}</h2>
          {note ? <p className="mt-6 max-w-[54ch] leading-[1.65] text-slate">{note}</p> : null}
        </Reveal>

        {/* Desktop table */}
        <div className="mt-12 hidden lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Room comparison by size, bed, outdoor access and amenities</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[15rem] border-b border-[var(--hairline-strong)] pb-5 pr-6 align-bottom">
                  <span className="eyebrow">Room</span>
                </th>
                {suites.map((s) => (
                  <th
                    key={s.slug}
                    scope="col"
                    className="border-b border-[var(--hairline-strong)] px-4 pb-5 align-bottom"
                  >
                    <Link href={`#${s.slug}`} className="group block">
                      <span className="block font-display text-[1.375rem] leading-tight transition-colors group-hover:text-ember">
                        {s.name}
                      </span>
                      <span className="mt-2 block font-mono text-[0.9375rem] tabular text-slate">
                        {money(s.rate)}
                        <span className="text-muted"> / night</span>
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, i) => (
                <tr key={row.key} className={i % 2 === 1 ? "bg-parchment/60" : undefined}>
                  <th
                    scope="row"
                    className="border-b border-[var(--hairline)] py-4 pr-6 align-top font-mono text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-muted"
                  >
                    {row.label}
                  </th>
                  {suites.map((s) => (
                    <td
                      key={s.slug}
                      className="border-b border-[var(--hairline)] px-4 py-4 align-top text-[0.9375rem] leading-snug text-slate"
                    >
                      {cellValue(s, row.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Container>

      {/* Mobile cards. Deliberately outside the Container: a full-width scroll
          rail rather than a negative-margin escape, which the viewport can
          otherwise scroll sideways to reach. */}
      <div className="lg:hidden">
        <div className="snap-rail no-scrollbar mt-10 flex gap-4 overflow-x-auto px-(--spacing-gutter) pb-2">
          {suites.map((s) => (
            <div
              key={s.slug}
              className="w-[min(20rem,82vw)] shrink-0 border border-[var(--hairline-strong)] bg-bone"
            >
              <div className="border-b border-[var(--hairline)] p-5">
                <p className="font-display text-[1.375rem] leading-tight">{s.name}</p>
                <p className="mt-2 font-mono text-[0.9375rem] tabular text-slate">
                  {money(s.rate)} <span className="text-muted">/ night</span>
                </p>
              </div>
              <dl className="divide-y divide-[var(--hairline)]">
                {specRows.map((row) => (
                  <div key={row.key} className="px-5 py-3">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[0.875rem] leading-snug text-slate">
                      {cellValue(s, row.key)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <Container width="wide">
          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            Swipe to compare →
          </p>
        </Container>
      </div>
    </Section>
  );
}
