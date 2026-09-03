"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { suitesFor } from "@/data/suites";
import { houseFor, type Species } from "@/lib/site";
import { money } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { SpeciesToggle } from "@/components/ui/SpeciesToggle";
import { cn } from "@/lib/cn";

/**
 * The most important product section on the site, and the place the old build
 * quietly said "dogs first". Both wings now share it on a toggle: four rooms
 * each, same index, same arch, same weight.
 */
export function TwoHouses() {
  const [species, setSpecies] = useState<Species>("dog");
  const [active, setActive] = useState(0);

  const suites = suitesFor(species);
  const house = houseFor(species);
  const suite = suites[Math.min(active, suites.length - 1)] ?? suites[0]!;

  const pick = (s: Species) => {
    setSpecies(s);
    setActive(0);
  };

  return (
    <Section tone="parchment" rhythm="default">
      <Container width="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <p className="eyebrow">Two wings, one suite</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              Four rooms each, and none of them is a run.
            </h2>
          </div>
          <SpeciesToggle value={species} onChange={pick} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-20">
          <div className="order-2 lg:order-1">
            {/* The arch — the brand's signature door shape. */}
            <div className="frame arch relative aspect-4/5 w-full max-w-[26rem] lg:max-w-none">
              {suites.map((s, i) => (
                <div
                  key={s.slug}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <Img asset={s.portrait} alt={s.portraitAlt} sizes="(max-width: 1024px) 90vw, 38vw" />
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">{suite.blurb}</p>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="max-w-[52ch] text-(length:--text-lead) leading-[1.55] text-slate">
                {species === "dog"
                  ? "The Lodge holds twenty-two rooms. Every one has a door that closes, a window, and a bed off the floor — what separates them is space, and how much of the outdoors your dog can reach without asking."
                  : "The Cattery is across the suite, behind its own locked door and its own air handler. Fifteen rooms, no dog has ever been inside, and no cat is ever housed within sight of a cat from another household."}
              </p>
              <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                {house.name} · {house.rooms} rooms · {house.headline}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-10 border-t border-[var(--hairline)]">
                {suites.map((s, i) => (
                  <li key={s.slug}>
                    <Link
                      href={`${house.href}#${s.slug}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={cn(
                        "group flex items-baseline gap-4 border-b border-[var(--hairline)] py-5 transition-colors sm:gap-8",
                        i === active ? "text-ink" : "text-slate hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.6875rem] tabular transition-colors",
                          i === active ? "text-ember" : "text-muted",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-(length:--text-title-1) leading-tight">
                          {s.name}
                        </span>
                        <span className="mt-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                          {s.spec.dimensions} · {s.spec.bed}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-mono text-[0.9375rem] tabular text-ink">
                          {money(s.rate)}
                        </span>
                        <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                          per night
                        </span>
                      </span>
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="hidden shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={house.href} className="link-underline font-medium text-ink">
                  {species === "dog" ? "Compare all four rooms" : "Inside the Cattery"}
                </Link>
                <button
                  type="button"
                  onClick={() => pick(species === "dog" ? "cat" : "dog")}
                  className="link-underline text-[0.875rem] text-slate"
                >
                  {species === "dog" ? "Looking for the Cattery?" : "Looking for the Lodge?"}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
