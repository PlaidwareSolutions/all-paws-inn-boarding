import { allSuites, type Suite } from "@/data/suites";
import { eachNight, isPeak, peakWindowFor } from "@/lib/dates";

/**
 * Deterministic mock availability.
 *
 * The same date + suite always yields the same number, so "2 left over Thanksgiving"
 * never contradicts itself between the hero, the calendar and the planner.
 * Real inventory would come from the CRM; the shape of this module is what a real
 * integration would replace.
 */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** Published surcharges. Everything that quotes a figure must import these —
    copy that hardcodes a number silently contradicts the planner. */
export const PEAK_SURCHARGE = 14;
export const EXTRA_ANIMAL = 22;
export const QUIET_WING_SURCHARGE = 18;

export function remainingFor(suite: Suite, dateISO: string): number {
  const r = hash(`${suite.slug}:${dateISO}`);
  const peak = isPeak(dateISO);
  const dow = new Date(dateISO + "T12:00:00").getDay();
  const weekend = dow === 5 || dow === 6;

  // Occupancy pressure: peak weeks are nearly full, weekends busier than midweek.
  const pressure = peak ? 0.93 : weekend ? 0.72 : 0.48;
  const occupied = Math.round(suite.count * pressure + (r - 0.5) * suite.count * 0.28);
  return Math.max(0, Math.min(suite.count, suite.count - occupied));
}

export type SuiteAvailability = {
  suite: Suite;
  /** Fewest rooms free on any night of the range — the true constraint. */
  remaining: number;
  available: boolean;
  soldOutNights: string[];
  peakNights: number;
};

export function availabilityFor(suite: Suite, from: string, to: string): SuiteAvailability {
  const nights = eachNight(from, to);
  if (nights.length === 0) {
    return { suite, remaining: suite.count, available: false, soldOutNights: [], peakNights: 0 };
  }
  let min = suite.count;
  const soldOut: string[] = [];
  let peakNights = 0;
  for (const n of nights) {
    const left = remainingFor(suite, n);
    if (left < min) min = left;
    if (left === 0) soldOut.push(n);
    if (isPeak(n)) peakNights++;
  }
  return { suite, remaining: min, available: min > 0, soldOutNights: soldOut, peakNights };
}

export function availabilityForSpecies(species: "dog" | "cat", from: string, to: string) {
  return allSuites.filter((s) => s.species === species).map((s) => availabilityFor(s, from, to));
}

/** Minimum-stay rule for a range that touches a peak window. */
export function minNightsFor(from: string, to: string): { nights: number; window: string } | null {
  let worst: { nights: number; window: string } | null = null;
  for (const n of eachNight(from, to)) {
    const w = peakWindowFor(n);
    if (w && (!worst || w.minNights > worst.nights)) worst = { nights: w.minNights, window: w.name };
  }
  return worst;
}

export function scarcityLabel(remaining: number, total: number): { tone: "good" | "low" | "warn"; text: string } {
  if (remaining === 0) return { tone: "warn", text: "Fully booked" };
  if (remaining <= 2) return { tone: "low", text: remaining === 1 ? "1 room left" : `${remaining} rooms left` };
  if (remaining <= Math.ceil(total * 0.35)) return { tone: "low", text: `${remaining} rooms left` };
  return { tone: "good", text: "Available" };
}

/**
 * Nearest window of the same length with at least one room free, searched
 * outward from the requested dates. Prevents a sold-out range from being a
 * dead end.
 */
export function nearestAvailable(
  species: "dog" | "cat",
  from: string,
  to: string,
  maxShiftDays = 45,
): { from: string; to: string; shift: number } | null {
  const nights = eachNight(from, to).length;
  if (nights === 0) return null;
  const suites = allSuites.filter((s) => s.species === species);
  const todayISO = new Date().toISOString().slice(0, 10);

  for (let shift = 1; shift <= maxShiftDays; shift++) {
    for (const dir of [1, -1]) {
      const f = addDaysISO(from, shift * dir);
      if (f < todayISO) continue;
      const t = addDaysISO(f, nights);
      const anyFree = suites.some((s) => availabilityFor(s, f, t).available);
      if (anyFree) return { from: f, to: t, shift: shift * dir };
    }
  }
  return null;
}

function addDaysISO(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y ?? 1970, (m ?? 1) - 1, (d ?? 1) + n);
  const p = (x: number) => String(x).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}`;
}
