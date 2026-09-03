import type { Suite } from "@/data/suites";
import { enrichment, kitchen } from "@/data/addons";
import { eachNight, isPeak } from "@/lib/dates";
import { EXTRA_ANIMAL, PEAK_SURCHARGE } from "@/lib/availability";

export type QuoteLine = { label: string; detail?: string; amount: number; kind: "room" | "peak" | "extra" | "addon" | "menu" };

export type Quote = {
  nights: number;
  peakNights: number;
  lines: QuoteLine[];
  total: number;
  perNight: number;
};

export function money(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function quote({
  suite,
  from,
  to,
  animals = 1,
  addOnSlugs = [],
  menuNames = [],
}: {
  suite: Suite;
  from: string;
  to: string;
  animals?: number;
  addOnSlugs?: string[];
  menuNames?: string[];
}): Quote {
  const nights = eachNight(from, to);
  const n = nights.length;
  const peakNights = nights.filter(isPeak).length;
  const lines: QuoteLine[] = [];

  if (n > 0) {
    lines.push({
      label: suite.name,
      detail: `${n} ${n === 1 ? "night" : "nights"} at ${money(suite.rate)}`,
      amount: suite.rate * n,
      kind: "room",
    });

    if (peakNights > 0) {
      lines.push({
        label: "Peak season",
        detail: `${peakNights} ${peakNights === 1 ? "night" : "nights"} at ${money(PEAK_SURCHARGE)} — published in advance`,
        amount: PEAK_SURCHARGE * peakNights,
        kind: "peak",
      });
    }

    const extra = Math.max(0, animals - 1);
    if (extra > 0) {
      lines.push({
        label: extra === 1 ? "Second animal" : `${extra} additional animals`,
        detail: `${money(EXTRA_ANIMAL)} per night, sharing one room`,
        amount: EXTRA_ANIMAL * extra * n,
        kind: "extra",
      });
    }
  }

  for (const slug of addOnSlugs) {
    const a = enrichment.find((e) => e.slug === slug);
    if (!a) continue;
    const qty = a.unit === "per day" ? n : Math.max(1, Math.ceil(n / 2));
    lines.push({
      label: a.name,
      detail: a.unit === "per day" ? `${n} days at ${money(a.price)}` : `${qty} sessions at ${money(a.price)}`,
      amount: a.price * qty,
      kind: "addon",
    });
  }

  const menuItems = kitchen.flatMap((s) => s.items);
  for (const name of menuNames) {
    const item = menuItems.find((i) => i.name === name);
    if (!item || item.price === null) continue;
    lines.push({
      label: item.name,
      detail: `${n} ${n === 1 ? "serving" : "servings"} at ${money(item.price)}`,
      amount: item.price * n,
      kind: "menu",
    });
  }

  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  return { nights: n, peakNights, lines, total, perNight: n > 0 ? Math.round(total / n) : 0 };
}

/** Effective per-day cost of a daycare package — powers the pay-vs-package toggle. */
export function effectiveDayRate(price: number, days: number): number {
  return Math.round((price / days) * 100) / 100;
}

export function reference(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `API-${n}`;
}
