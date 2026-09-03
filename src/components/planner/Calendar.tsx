"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, formatDate, fromISO, isPeak, toISO } from "@/lib/dates";
import { remainingFor, PEAK_SURCHARGE } from "@/lib/availability";
import type { Suite } from "@/data/suites";
import { cn } from "@/lib/cn";

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function monthGrid(year: number, month: number): Array<string | null> {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<string | null> = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(toISO(new Date(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** Availability across the whole species, so the calendar means something
    before a room has been chosen. */
function freeOn(iso: string, suites: Suite[]): number {
  return suites.reduce((n, s) => n + remainingFor(s, iso), 0);
}

export function Calendar({
  from,
  to,
  onChange,
  suites,
}: {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  suites: Suite[];
}) {
  const today = useMemo(() => toISO(new Date()), []);
  const [cursor, setCursor] = useState(() => {
    const d = from ? fromISO(from) : new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [focus, setFocus] = useState<string>(from || today);
  const gridRef = useRef<HTMLDivElement>(null);

  const shift = (n: number) =>
    setCursor((c) => {
      const d = new Date(c.y, c.m + n, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const pick = (iso: string) => {
    // First click sets arrival; second sets departure unless it is earlier.
    if (!from || (from && to)) return onChange(iso, "");
    if (iso <= from) return onChange(iso, "");
    onChange(from, iso);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7,
    };
    const delta = map[e.key];
    if (delta === undefined) return;
    e.preventDefault();
    const next = addDays(focus, delta);
    if (next < today) return;
    setFocus(next);
    const d = fromISO(next);
    if (d.getMonth() !== cursor.m || d.getFullYear() !== cursor.y) {
      const inSecond = d.getFullYear() === new Date(cursor.y, cursor.m + 1, 1).getFullYear()
        && d.getMonth() === new Date(cursor.y, cursor.m + 1, 1).getMonth();
      if (!inSecond) setCursor({ y: d.getFullYear(), m: d.getMonth() });
    }
    requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${next}"]`)?.focus();
    });
  };

  const months = [
    { y: cursor.y, m: cursor.m },
    { y: new Date(cursor.y, cursor.m + 1, 1).getFullYear(), m: new Date(cursor.y, cursor.m + 1, 1).getMonth() },
  ];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={new Date(cursor.y, cursor.m, 1) <= new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
          aria-label="Previous month"
          className="inline-flex size-10 items-center justify-center rounded-sm border border-[var(--hairline-strong)] text-ink transition-colors hover:border-ink disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>
        <p aria-live="polite" className="font-display text-[1.125rem]">
          {MONTHS[cursor.m]} {cursor.y}
          <span className="hidden sm:inline text-muted">
            {" "}— {MONTHS[months[1]!.m]} {months[1]!.y}
          </span>
        </p>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Next month"
          className="inline-flex size-10 items-center justify-center rounded-sm border border-[var(--hairline-strong)] text-ink transition-colors hover:border-ink"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div ref={gridRef} onKeyDown={onKeyDown} className="grid gap-8 sm:grid-cols-2">
        {months.map((mo, mi) => (
          <div key={`${mo.y}-${mo.m}`} className={mi === 1 ? "hidden sm:block" : undefined}>
            <p className="mb-3 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted sm:hidden">
              {MONTHS[mo.m]} {mo.y}
            </p>
            <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`${MONTHS[mo.m]} ${mo.y}`}>
              {DOW.map((d) => (
                <div key={d} role="columnheader" className="pb-2 text-center font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-muted">
                  {d}
                </div>
              ))}
              {monthGrid(mo.y, mo.m).map((iso, i) => {
                if (!iso) return <div key={`e${i}`} />;
                const past = iso < today;
                const free = past ? 0 : freeOn(iso, suites);
                const soldOut = !past && free === 0;
                const peak = isPeak(iso);
                const isFrom = iso === from;
                const isTo = iso === to;
                const inRange = !!from && !!to && iso > from && iso < to;
                const disabled = past || soldOut;
                const day = fromISO(iso).getDate();

                return (
                  <button
                    key={iso}
                    type="button"
                    data-iso={iso}
                    role="gridcell"
                    tabIndex={iso === focus ? 0 : -1}
                    disabled={disabled}
                    aria-label={`${formatDate(iso)}${peak ? ", peak night" : ""}${soldOut ? ", fully booked" : `, ${free} rooms free`}`}
                    aria-selected={isFrom || isTo}
                    onClick={() => { setFocus(iso); pick(iso); }}
                    className={cn(
                      "relative flex aspect-square min-h-10 flex-col items-center justify-center rounded-sm text-[0.8125rem] tabular transition-colors",
                      disabled && "cursor-not-allowed text-muted/40 line-through",
                      !disabled && !isFrom && !isTo && !inRange && "text-ink hover:bg-linen",
                      inRange && "bg-sage/25 text-ink",
                      (isFrom || isTo) && "bg-moss text-bone",
                    )}
                  >
                    {day}
                    {/* Scarcity and peak markers, legend below. */}
                    {!disabled && !isFrom && !isTo ? (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute bottom-1 size-1 rounded-full",
                          peak ? "bg-ember-mark" : free <= 6 ? "bg-warning" : "bg-transparent",
                        )}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--hairline)] pt-4 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
        <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-ember-mark" aria-hidden /> Peak night, +{`$${PEAK_SURCHARGE}`}</li>
        <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-warning" aria-hidden /> Filling up</li>
        <li className="flex items-center gap-2"><span className="text-muted/50 line-through">00</span> Fully booked</li>
      </ul>
    </div>
  );
}
