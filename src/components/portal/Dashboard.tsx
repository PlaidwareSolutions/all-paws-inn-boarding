"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Camera, Download, LogOut } from "lucide-react";
import { account, pets, upcoming, pastStays, documents } from "@/data/account";
import { cardsFor } from "@/data/reportCards";
import { money } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Img } from "@/components/ui/Img";
import { ReportCardView } from "@/components/ui/ReportCardView";
import { cn } from "@/lib/cn";

/** The greeting was hardcoded to "Good afternoon", which read as wrong for
    two thirds of the day. */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [pet, setPet] = useState(0);
  const [card, setCard] = useState(2);
  const current = pets[pet]!;
  /* The notes follow whichever animal is selected above. */
  const cards = cardsFor(current.species);
  const activeCard = cards[Math.min(card, cards.length - 1)] ?? cards[0]!;

  return (
    <Container width="wide" className="py-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--hairline)] pb-8">
        <div>
          <p className="eyebrow">Guest portal</p>
          <h1 className="mt-4 text-(length:--text-display-3)">
            {greeting()}, {account.owner.split(" ")[0]}.
          </h1>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            Guest since {account.since} · {account.stays} stays · {account.town}
          </p>
        </div>
        <Button variant="secondary" onClick={onSignOut}>
          <LogOut size={15} aria-hidden /> Sign out
        </Button>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div className="space-y-12">
          {/* Upcoming stay */}
          <section aria-labelledby="upcoming">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="upcoming" className="font-display text-(length:--text-title-1)">
                Your next stay
              </h2>
              <Pill tone="good">{upcoming.status}</Pill>
            </div>
            <div className="mt-5 border border-[var(--hairline-strong)] bg-bone">
              <div className="grid gap-6 p-6 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Arriving</p>
                  <p className="mt-2 font-display text-[1.5rem] leading-none">{upcoming.arrive}</p>
                </div>
                <div>
                  <p className="eyebrow">Leaving</p>
                  <p className="mt-2 font-display text-[1.5rem] leading-none">{upcoming.depart}</p>
                </div>
              </div>
              <dl className="grid gap-x-8 gap-y-3 border-t border-[var(--hairline)] p-6 sm:grid-cols-2">
                {[
                  ["Guest", upcoming.guest],
                  ["Room", upcoming.room],
                  ["Nights", String(upcoming.nights)],
                  ["Total", money(upcoming.total)],
                  ["Reference", upcoming.reference],
                  ["Shuttle", upcoming.shuttle],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 text-[0.875rem]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-mono tabular text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3 border-t border-[var(--hairline)] p-6">
                <Button href="/den-cam" size="sm">
                  <Camera size={14} aria-hidden /> Open the Den Cam
                </Button>
                <Button href="/new-guests" size="sm" variant="secondary">
                  What to bring
                </Button>
                <Button href="/contact" size="sm" variant="ghost">
                  Change these dates
                </Button>
              </div>
            </div>
          </section>

          {/* Animals */}
          <section aria-labelledby="animals">
            <h2 id="animals" className="font-display text-(length:--text-title-1)">
              Your animals
            </h2>
            <div className="mt-5 flex gap-2" role="tablist" aria-label="Your animals">
              {pets.map((p, i) => (
                <button
                  key={p.name}
                  role="tab"
                  aria-selected={i === pet}
                  onClick={() => { setPet(i); setCard(2); }}
                  className={cn(
                    "flex items-center gap-3 border px-4 py-2.5 transition-colors",
                    i === pet ? "border-moss bg-parchment" : "border-[var(--hairline-strong)] hover:border-ink",
                  )}
                >
                  <span className="frame size-9 shrink-0 rounded-sm">
                    <Img asset={p.image} alt="" sizes="36px" />
                  </span>
                  <span className="text-left">
                    <span className="block font-display text-[1.0625rem] leading-none">{p.name}</span>
                    <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                      {p.house}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 border border-[var(--hairline-strong)] bg-bone p-6">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="font-display text-[1.5rem] leading-none">{current.name}</p>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                  {current.breed} · {current.age} · {current.weight} · {current.house}
                </p>
              </div>

              <div className="mt-6">
                <p className="eyebrow">Vaccinations</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {current.vaccines.map((v) => (
                    <li
                      key={v.name}
                      className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] py-2"
                    >
                      <span className="text-[0.875rem] text-ink">{v.name}</span>
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[0.75rem] tabular text-muted">{v.expires}</span>
                        <Pill tone={v.status === "current" ? "good" : v.status === "expiring" ? "warn" : "low"}>
                          {v.status === "current" ? "OK" : v.status === "expiring" ? "Soon" : "Expired"}
                        </Pill>
                      </span>
                    </li>
                  ))}
                </ul>
                {current.vaccines.some((v) => v.status !== "current") ? (
                  <p className="mt-4 rounded-sm bg-warning/10 p-3.5 text-[0.8125rem] leading-snug text-warning">
                    Bordetella expires before your November stay. Send an updated record and we will
                    replace it on file — there is nothing else to do.
                  </p>
                ) : null}
              </div>

              <div className="mt-6 border-t border-[var(--hairline)] pt-5">
                <p className="eyebrow">What we have on file</p>
                <p className="mt-2.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-slate">
                  {current.notes}
                </p>
                {current.medication ? (
                  <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-slate">
                    <span className="text-ink">Medication:</span> {current.medication}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {/* History */}
          <section aria-labelledby="history">
            <h2 id="history" className="font-display text-(length:--text-title-1)">
              Past stays
            </h2>
            <table className="mt-5 w-full border-collapse text-left">
              <caption className="sr-only">Previous stays</caption>
              <thead>
                <tr className="border-b border-[var(--hairline-strong)]">
                  <th scope="col" className="pb-3 pr-4"><span className="eyebrow">Dates</span></th>
                  <th scope="col" className="pb-3 pr-4"><span className="eyebrow">Room</span></th>
                  <th scope="col" className="pb-3 text-right"><span className="eyebrow">Total</span></th>
                </tr>
              </thead>
              <tbody>
                {pastStays.map((st) => (
                  <tr key={st.dates} className="border-b border-[var(--hairline)]">
                    <th scope="row" className="py-3.5 pr-4 text-left font-normal text-[0.875rem] text-ink">
                      {st.dates}
                      <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                        {st.guest} · {st.nights} nights
                      </span>
                    </th>
                    <td className="py-3.5 pr-4 text-[0.875rem] text-slate">{st.room}</td>
                    <td className="py-3.5 text-right font-mono text-[0.875rem] tabular text-ink">
                      {money(st.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="space-y-12">
          <section aria-labelledby="notes">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="notes" className="font-display text-(length:--text-title-1)">
                Daily notes — {current.name}
              </h2>
              <Link href="/den-cam" className="link-underline text-[0.875rem] text-slate">
                Cameras
              </Link>
            </div>
            <div className="mt-5 flex gap-1.5">
              {cards.map((c, i) => (
                <button
                  key={c.date}
                  type="button"
                  onClick={() => setCard(i)}
                  aria-pressed={i === card}
                  className={cn(
                    "flex-1 border px-2 py-2 font-mono text-[0.5625rem] uppercase tracking-[0.1em] transition-colors",
                    i === card ? "border-moss bg-moss text-bone" : "border-[var(--hairline-strong)] text-slate hover:border-ink",
                  )}
                >
                  Day {i + 1}
                </button>
              ))}
            </div>
            <ReportCardView card={activeCard} className="mt-1.5" />
          </section>

          <section aria-labelledby="docs">
            <h2 id="docs" className="font-display text-(length:--text-title-1)">
              Documents
            </h2>
            <ul className="mt-5 border-t border-[var(--hairline)]">
              {documents.map((d) => (
                <li key={d.name} className="border-b border-[var(--hairline)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-ember"
                  >
                    <span>
                      <span className="block text-[0.875rem] text-ink">{d.name}</span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                        {d.kind} · {d.date}
                      </span>
                    </span>
                    <Download size={15} aria-hidden className="shrink-0 text-muted" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-muted">
              Demonstration account — these documents are not real files.
            </p>
          </section>

          <section className="border border-[var(--hairline-strong)] bg-parchment p-6">
            <p className="eyebrow">Book again</p>
            <p className="mt-3 font-display text-[1.375rem] leading-tight">
              Same room, different dates?
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-slate">
              Everything we hold about {current.name} carries over — you only need to pick dates.
            </p>
            <Button href="/plan" className="mt-5 w-full">
              Plan a stay <ArrowRight size={15} aria-hidden />
            </Button>
          </section>
        </div>
      </div>
    </Container>
  );
}
