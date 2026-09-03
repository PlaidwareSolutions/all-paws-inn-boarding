"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { packingList } from "@/data/care";
import { cn } from "@/lib/cn";

const KEY = "api:packing";

/** Ticks persist, so it works as an actual checklist the night before. */
export function PackingChecklist() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- initialises from a client-only
     source (browser storage, or today's date) that does not exist during SSR. Doing it
     after mount is precisely what keeps the server and client markup identical. */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw) as string[]);
    } catch {
      /* storage unavailable — the list still works, it just will not persist */
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(done));
    } catch {
      /* ignore */
    }
  }, [done, ready]);

  const toggle = (item: string) =>
    setDone((d) => (d.includes(item) ? d.filter((x) => x !== item) : [...d, item]));

  const required = packingList.filter((p) => p.required);
  const packed = required.filter((p) => done.includes(p.item)).length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--hairline-strong)] pb-4">
        <p className="eyebrow">What to bring</p>
        <p aria-live="polite" className="font-mono text-[0.6875rem] tabular text-muted">
          {packed} of {required.length} essentials
        </p>
      </div>

      <ul className="mt-2">
        {packingList.map((p) => {
          const checked = done.includes(p.item);
          return (
            <li key={p.item} className="border-b border-[var(--hairline)]">
              <label className="flex cursor-pointer items-start gap-4 py-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(p.item)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
                    checked ? "border-moss bg-moss text-bone" : "border-[var(--hairline-strong)]",
                  )}
                >
                  {checked ? <Check size={13} strokeWidth={2.5} /> : null}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-[0.9375rem] leading-snug transition-colors",
                      checked ? "text-muted line-through" : "text-ink",
                    )}
                  >
                    {p.item}
                    {p.required ? (
                      <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ember">
                        Essential
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{p.note}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
