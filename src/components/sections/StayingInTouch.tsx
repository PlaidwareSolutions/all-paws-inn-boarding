"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Mail } from "lucide-react";
import { cardsFor } from "@/data/reportCards";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ReportCardView } from "@/components/ui/ReportCardView";
import { SpeciesToggle } from "@/components/ui/SpeciesToggle";
import type { Species } from "@/lib/site";
import { cn } from "@/lib/cn";

export function StayingInTouch() {
  const [species, setSpecies] = useState<Species>("dog");
  const [day, setDay] = useState(1);
  const cards = cardsFor(species);
  const card = cards[Math.min(day, cards.length - 1)] ?? cards[0]!;

  return (
    <Section tone="parchment" rhythm="default">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">While you are away</p>
              <h2 className="mt-5 max-w-[16ch] text-(length:--text-display-3)">
                Every evening, somebody writes down their day.
              </h2>
              <p className="mt-6 max-w-[52ch] text-(length:--text-lead) leading-[1.55] text-slate">
                Not a template with boxes ticked. A few sentences from whoever spent the day with
                your animal, with a photograph, sent before you go to sleep. This is the real thing
                — three consecutive days of one guest&rsquo;s stay.
              </p>
            </Reveal>

            <Reveal delay={100}>
              {/* dl > div > (dt, dd) — one wrapper level only, per the HTML spec. */}
              <dl className="mt-10 space-y-7 border-t border-[var(--hairline)] pt-8">
                <div>
                  <dt className="flex items-center gap-3 font-display text-[1.125rem]">
                    <Mail size={18} className="shrink-0 text-ember" aria-hidden />
                    A note and a photograph, daily
                  </dt>
                  <dd className="mt-1.5 max-w-[46ch] pl-[1.875rem] text-[0.9375rem] leading-snug text-slate">
                    Included in every rate, in every room, including the smallest one.
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-3 font-display text-[1.125rem]">
                    <Camera size={18} className="shrink-0 text-ember" aria-hidden />
                    Cameras you can open yourself
                  </dt>
                  <dd className="mt-1.5 max-w-[46ch] pl-[1.875rem] text-[0.9375rem] leading-snug text-slate">
                    The yard cameras run 7am to 7pm. Courtyard Suites, Family Suites and the
                    Conservatory have a camera in the room, on all night.{" "}
                    <Link href="/den-cam" className="link-underline text-ink">
                      The Den Cam
                    </Link>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <SpeciesToggle
              value={species}
              onChange={(s) => { setSpecies(s); setDay(1); }}
              labels={{ dog: "Otis", cat: "Pim" }}
              label="Choose a guest"
              className="mb-3"
            />
            <div className="flex gap-1.5" role="group" aria-label="Choose a day of the stay">
              {cards.map((c, i) => (
                <button
                  key={c.date}
                  type="button"
                  onClick={() => setDay(i)}
                  aria-pressed={i === day}
                  className={cn(
                    "flex-1 border px-3 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] transition-colors",
                    i === day
                      ? "border-moss bg-moss text-bone"
                      : "border-[var(--hairline-strong)] text-slate hover:border-ink hover:text-ink",
                  )}
                >
                  Day {i + 1}
                </button>
              ))}
            </div>
            <ReportCardView card={card} className="mt-1.5" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
