"use client";

import { useRef, useState } from "react";
import { dayFor } from "@/data/timeline";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { InnIcon } from "@/components/ui/InnIcons";
import { SpeciesToggle } from "@/components/ui/SpeciesToggle";
import type { Species } from "@/lib/site";
import { cn } from "@/lib/cn";

export function DayAtTheInn() {
  const [species, setSpecies] = useState<Species>("dog");
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stops = dayFor(species);
  const stop = stops[Math.min(active, stops.length - 1)] ?? stops[0]!;

  const pickSpecies = (s: Species) => {
    setSpecies(s);
    setActive(0);
  };

  /* Roving tabindex: arrow keys move along the day. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = stops.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section tone="bone" rhythm="default" id="a-day">
      <Container width="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46rem]">
            <p className="eyebrow">A day at the inn</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              {species === "dog" ? "Seven in the morning to eight at night." : "Sixteen hours of sleep, and we plan around it."}
            </h2>
            <p className="mt-6 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
              {species === "dog"
                ? "The shape of it barely changes, which is the point. Dogs settle into a routine faster than they settle into a place."
                : "A cat's day is not a dog's day with the words swapped. Cats sleep most of it, hunt in short bursts, and find being handled all day worse than being left alone."}
            </p>
          </div>
          <SpeciesToggle value={species} onChange={pickSpecies} label="Choose a day" />
        </Reveal>
      </Container>

      {/* The rail runs the full width — the day is a line, not a box. */}
      <div className="mt-14 border-y border-[var(--hairline)] lg:mt-16">
        <Container width="wide" className="!px-0">
          <div
            role="tablist"
            aria-label={species === "dog" ? "A day in the Lodge" : "A day in the Cattery"}
            onKeyDown={onKeyDown}
            className="snap-rail no-scrollbar flex overflow-x-auto"
          >
            {stops.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.time}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`day-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`day-panel-${active}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex min-w-[9.5rem] flex-1 flex-col items-start gap-3 border-r border-[var(--hairline)] px-5 py-6 text-left transition-colors last:border-r-0 sm:min-w-[10.5rem]",
                    selected ? "bg-moss text-bone" : "hover:bg-parchment",
                  )}
                >
                  <InnIcon
                    name={s.icon}
                    className={cn("size-6 shrink-0", selected ? "text-sage" : "text-muted")}
                  />
                  <span className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "font-mono text-[0.8125rem] tabular",
                        selected ? "text-bone" : "text-ink",
                      )}
                    >
                      {s.time}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.625rem] uppercase tracking-[0.14em]",
                        selected ? "text-sage" : "text-muted",
                      )}
                    >
                      {s.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <Container width="wide" className="mt-12 lg:mt-14">
        {/* Only the active panel is mounted: hidden panels cannot resolve `sizes`,
            so Next would request the largest candidate for each of them. */}
        <div
          role="tabpanel"
          id={`day-panel-${active}`}
          aria-labelledby={`day-tab-${active}`}
          tabIndex={0}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
            <div className="frame aspect-3/2 w-full">
              <Img asset={stop.image} alt={stop.alt} sizes="(max-width: 1024px) 92vw, 55vw" />
            </div>
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                {stop.time} · {stop.label}
              </p>
              <h3 className="mt-4 max-w-[16ch] text-(length:--text-title-1)">{stop.title}</h3>
              <p className="mt-5 max-w-[46ch] leading-[1.65] text-slate">{stop.body}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
