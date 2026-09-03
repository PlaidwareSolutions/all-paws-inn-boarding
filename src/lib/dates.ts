/** Local-date helpers. Everything is handled as a YYYY-MM-DD string to dodge timezone drift. */

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function addDays(iso: string, n: number): string {
  const d = fromISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function nightsBetween(from: string, to: string): number {
  const a = fromISO(from).getTime();
  const b = fromISO(to).getTime();
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

export function eachNight(from: string, to: string): string[] {
  const out: string[] = [];
  const n = nightsBetween(from, to);
  for (let i = 0; i < n; i++) out.push(addDays(from, i));
  return out;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export function formatDate(iso: string, style: "long" | "short" | "day" = "long"): string {
  const d = fromISO(iso);
  const mon = MONTHS[d.getMonth()] ?? "";
  if (style === "short") return `${mon.slice(0, 3)} ${d.getDate()}`;
  if (style === "day") return `${DAYS[d.getDay()]?.slice(0, 3)} ${mon.slice(0, 3)} ${d.getDate()}`;
  return `${mon} ${d.getDate()}, ${d.getFullYear()}`;
}

export function formatRange(from: string, to: string): string {
  const a = fromISO(from);
  const b = fromISO(to);
  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  if (sameMonth) return `${MONTHS[a.getMonth()]} ${a.getDate()} – ${b.getDate()}, ${b.getFullYear()}`;
  return `${formatDate(from, "short")} – ${formatDate(to, "short")}, ${b.getFullYear()}`;
}

/** nth weekday of a month, e.g. 4th Thursday of November. */
function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const d = new Date(year, month, 1);
  const shift = (weekday - d.getDay() + 7) % 7;
  d.setDate(1 + shift + (n - 1) * 7);
  return d;
}

/** last weekday of a month, e.g. last Monday of May. */
function lastWeekday(year: number, month: number, weekday: number): Date {
  const d = new Date(year, month + 1, 0);
  const shift = (d.getDay() - weekday + 7) % 7;
  d.setDate(d.getDate() - shift);
  return d;
}

export type PeakWindow = { name: string; from: string; to: string; minNights: number };

/** Peak windows are computed, not hardcoded, so published dates stay correct year to year. */
export function peakWindows(year: number): PeakWindow[] {
  const thanksgiving = nthWeekday(year, 10, 4, 4); // 4th Thursday of November
  const memorial = lastWeekday(year, 4, 1); // last Monday of May
  const labor = nthWeekday(year, 8, 1, 1); // 1st Monday of September

  // Texas school spring break is the second full week of March and is a genuine
  // Houston travel peak — it belongs beside the national holidays.
  const springBreakStart = nthWeekday(year, 2, 1, 2); // 2nd Monday of March

  return [
    {
      name: "Spring break",
      from: addDays(toISO(springBreakStart), -2),
      to: addDays(toISO(springBreakStart), 7),
      minNights: 3,
    },
    {
      name: "Memorial Day weekend",
      from: addDays(toISO(memorial), -4),
      to: addDays(toISO(memorial), 1),
      minNights: 2,
    },
    { name: "Independence Day", from: `${year}-07-01`, to: `${year}-07-08`, minNights: 3 },
    {
      name: "Labor Day weekend",
      from: addDays(toISO(labor), -4),
      to: addDays(toISO(labor), 1),
      minNights: 2,
    },
    {
      name: "Thanksgiving week",
      from: addDays(toISO(thanksgiving), -3),
      to: addDays(toISO(thanksgiving), 4),
      minNights: 5,
    },
    { name: "Christmas & New Year", from: `${year}-12-20`, to: `${year + 1}-01-03`, minNights: 5 },
  ];
}

export function peakWindowFor(iso: string): PeakWindow | null {
  const year = fromISO(iso).getFullYear();
  for (const y of [year - 1, year]) {
    for (const w of peakWindows(y)) {
      if (iso >= w.from && iso < w.to) return w;
    }
  }
  return null;
}

export function isPeak(iso: string): boolean {
  return peakWindowFor(iso) !== null;
}
