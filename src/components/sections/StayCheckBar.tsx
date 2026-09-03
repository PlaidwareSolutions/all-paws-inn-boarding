"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { addDays, toISO } from "@/lib/dates";
import { cn } from "@/lib/cn";

/**
 * The hero's booking surface. Seeds the Stay Planner, so a visitor reaches a
 * real price without ever meeting a form. Answers the industry's worst habit —
 * "call for a quote" — in the first screen.
 */
export function StayCheckBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const router = useRouter();
  const id = useId();
  const [today, setToday] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [species, setSpecies] = useState<"dog" | "cat">("dog");

  /* Dates are set after mount so server and client markup can't disagree. */
  /* eslint-disable react-hooks/set-state-in-effect -- initialises from a client-only
     source (browser storage, or today's date) that does not exist during SSR. Doing it
     after mount is precisely what keeps the server and client markup identical. */
  useEffect(() => {
    const t = toISO(new Date());
    setToday(t);
    setFrom(addDays(t, 14));
    setTo(addDays(t, 18));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to, species });
    router.push(`/plan?${params.toString()}`);
  };

  const dark = tone === "dark";
  const field =
    "min-h-12 w-full rounded-sm border bg-transparent px-3 text-[0.9375rem] tabular " +
    (dark
      ? "border-[var(--hairline-invert)] text-bone [color-scheme:dark]"
      : "border-[var(--hairline-strong)] text-ink");
  const label = cn("eyebrow mb-2 block", dark && "!text-sage");

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid gap-4 border p-5 sm:p-6 md:grid-cols-[1fr_1fr_auto_auto] md:items-end md:gap-5",
        dark ? "border-[var(--hairline-invert)] bg-moss-deep" : "border-[var(--hairline)] bg-bone",
      )}
    >
      <div>
        <label htmlFor={`${id}-from`} className={label}>
          Arriving
        </label>
        <input
          id={`${id}-from`}
          type="date"
          value={from}
          min={today}
          onChange={(e) => {
            setFrom(e.target.value);
            if (e.target.value >= to) setTo(addDays(e.target.value, 3));
          }}
          className={field}
        />
      </div>
      <div>
        <label htmlFor={`${id}-to`} className={label}>
          Leaving
        </label>
        <input
          id={`${id}-to`}
          type="date"
          value={to}
          min={from ? addDays(from, 1) : today}
          onChange={(e) => setTo(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor={`${id}-species`} className={label}>
          Guest
        </label>
        <select
          id={`${id}-species`}
          value={species}
          onChange={(e) => setSpecies(e.target.value as "dog" | "cat")}
          className={cn(field, "appearance-none pr-9")}
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </div>
      <button
        type="submit"
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 text-[0.9375rem] font-medium transition-colors",
          dark ? "bg-bone text-ink hover:bg-linen" : "bg-moss text-bone hover:bg-moss-soft",
        )}
      >
        See rooms and rates
        <ArrowRight size={16} aria-hidden />
      </button>
      <p
        className={cn(
          "text-[0.8125rem] md:col-span-4 md:-mt-1",
          dark ? "text-bone/55" : "text-muted",
        )}
      >
        Real prices, no account, nothing to fill in. Peak dates are published a year ahead.
      </p>
    </form>
  );
}
