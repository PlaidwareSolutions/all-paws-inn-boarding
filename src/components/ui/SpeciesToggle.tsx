"use client";

import { cn } from "@/lib/cn";
import type { Species } from "@/lib/site";

/**
 * One control, three sections. Matches the segmented control already used for
 * daycare pricing rather than inventing a second style for the same job.
 */
export function SpeciesToggle({
  value,
  onChange,
  labels = { dog: "The Lodge", cat: "The Cattery" },
  tone = "light",
  className,
  label = "Choose a house",
}: {
  value: Species;
  onChange: (s: Species) => void;
  labels?: { dog: string; cat: string };
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex rounded-sm border p-1",
        dark ? "border-[var(--hairline-invert)]" : "border-[var(--hairline-strong)]",
        className,
      )}
    >
      {(["dog", "cat"] as const).map((s) => {
        const active = value === s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-pressed={active}
            className={cn(
              "min-h-10 rounded-sm px-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors",
              active
                ? dark
                  ? "bg-bone text-ink"
                  : "bg-moss text-bone"
                : dark
                  ? "text-bone/70 hover:text-bone"
                  : "text-slate hover:text-ink",
            )}
          >
            {labels[s]}
          </button>
        );
      })}
    </div>
  );
}
