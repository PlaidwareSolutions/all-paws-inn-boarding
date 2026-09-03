import type { Metadata } from "next";
import Link from "next/link";
import { dogSuites, catSuites } from "@/data/suites";
import { enrichment, spaDogs, spaCats, daycareRates, shuttleFares, kitchen } from "@/data/addons";
import { peakWindows } from "@/lib/dates";
import { PEAK_SURCHARGE, EXTRA_ANIMAL } from "@/lib/availability";
import { money, effectiveDayRate } from "@/lib/pricing";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { images } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Rates & Packages",
  description:
    "Every rate we charge, published in full — rooms, daycare, enrichment, grooming, the shuttle, and the holiday surcharge with its dates.",
};

const YEAR = new Date().getFullYear();

function RateTable({
  caption,
  rows,
  note,
}: {
  caption: string;
  rows: Array<{ name: string; detail?: string; price: string }>;
  note?: string;
}) {
  return (
    <div>
      <h2 className="font-display text-(length:--text-title-1)">{caption}</h2>
      <dl className="mt-6 border-t border-[var(--hairline)]">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-4"
          >
            <dt className="flex-1">
              <span className="block text-[0.9375rem] text-ink">{r.name}</span>
              {r.detail ? (
                <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{r.detail}</span>
              ) : null}
            </dt>
            <dd className="shrink-0 font-mono text-[0.9375rem] tabular text-ink">{r.price}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{note}</p> : null}
    </div>
  );
}

export default function RatesPage() {
  const windows = [...peakWindows(YEAR), ...peakWindows(YEAR + 1)].filter(
    (w) => w.to >= new Date().toISOString().slice(0, 10),
  ).slice(0, 6);

  return (
    <>
      <Section tone="parchment" rhythm="none" className="pb-14 pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+6rem)]">
        <Container width="wide">
          <p className="eyebrow">Rates &amp; packages</p>
          <h1 className="mt-5 max-w-[16ch] text-(length:--text-display-2)">
            Every rate we charge, on one page.
          </h1>
          <p className="mt-7 max-w-[56ch] text-(length:--text-lead) leading-[1.55] text-slate">
            You should not have to ring a business to find out what a room costs. Nothing here is a
            starting point that turns into something else at checkout — this is the bill.
          </p>
          <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-[var(--hairline)] pt-8">
            {[
              { label: "Dogs from", value: `${money(Math.min(...dogSuites.map((s) => s.rate)))} / night` },
              { label: "Cats from", value: `${money(Math.min(...catSuites.map((s) => s.rate)))} / night` },
              { label: "Daycare from", value: `${money(daycareRates.halfDay)} / day` },
              { label: "Booking fee", value: "None" },
            ].map((f) => (
              <div key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-2.5 font-display text-[1.75rem] leading-none tabular">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <RateTable
                caption="Rooms for dogs"
                rows={dogSuites.map((s) => ({
                  name: s.name,
                  detail: `${s.spec.dimensions} · ${s.spec.sharing}`,
                  price: `${money(s.rate)} / night`,
                }))}
                note={`A second or subsequent animal from the same household sharing one room is ${money(EXTRA_ANIMAL)} a night, not a second room rate.`}
              />
            </Reveal>
            <Reveal delay={80}>
              <RateTable
                caption="Rooms for cats"
                rows={catSuites.map((s) => ({
                  name: s.name,
                  detail: `${s.spec.dimensions} · ${s.spec.sharing}`,
                  price: `${money(s.rate)} / night`,
                }))}
                note="The Cattery is across the suite, behind its own locked door and its own ventilation."
              />
            </Reveal>
            <Reveal>
              <RateTable
                caption="Day guests"
                rows={[
                  { name: "Half day", detail: "Up to five hours", price: money(daycareRates.halfDay) },
                  { name: "Full day", detail: "7:00 am to 6:00 pm", price: money(daycareRates.fullDay) },
                  ...daycareRates.packages.map((p) => ({
                    name: p.name,
                    detail: `${p.note} · works out at $${effectiveDayRate(p.price, p.days).toFixed(2)} a day`,
                    price: money(p.price),
                  })),
                ]}
              />
            </Reveal>
            <Reveal delay={80}>
              <RateTable
                caption="Enrichment"
                rows={enrichment.map((e) => ({
                  name: e.name,
                  detail: `${e.unit === "per day" ? "Per day" : "Per session"} · ${e.species === "cat" ? "cats" : e.species === "dog" ? "dogs" : "dogs and cats"}`,
                  price: money(e.price),
                }))}
                note="Entirely optional. Plenty of guests book none of it, and their stay is not a lesser one."
              />
            </Reveal>
            <Reveal>
              <RateTable
                caption="The spa — dogs"
                rows={spaDogs.map((x) => ({ name: x.name, detail: x.description, price: x.price }))}
              />
            </Reveal>
            <Reveal delay={80}>
              <RateTable
                caption="The spa — cats"
                rows={spaCats.map((x) => ({ name: x.name, detail: x.description, price: x.price }))}
              />
            </Reveal>
            <Reveal>
              <RateTable
                caption="The Airport Run"
                rows={shuttleFares.map((f) => ({ name: f.route, detail: f.schedule, price: `${money(f.price)} each way` }))}
                note="Fares are per journey, not per animal — two animals from one household travel on one fare. Airport runs are timed to your flight rather than a timetable."
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Six screens of tables want one place to rest. */}
      <figure className="frame aspect-[12/5] w-full">
        <Img
          asset={images.daycareGroup}
          alt="A curated playgroup out on the grass together"
          sizes="100vw"
        />
      </figure>

      <Section tone="parchment" rhythm="default" id="holidays">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Peak dates</p>
              <h2 className="mt-5 text-(length:--text-display-3)">
                Published a year ahead, so nobody is surprised.
              </h2>
              <p className="mt-6 max-w-[46ch] leading-[1.7] text-slate">
                Peak nights carry a {money(PEAK_SURCHARGE)} surcharge and a minimum stay. That is
                the whole of it — there is no separate holiday booking fee, no premium on
                enrichment, and no surge on the shuttle.
              </p>
              <p className="mt-5 max-w-[46ch] leading-[1.7] text-slate">
                These weeks fill early. Thanksgiving and the Christmas window are usually full by
                the beginning of October, and we keep a real waiting list that we work in order.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Peak windows, surcharge and minimum stay</caption>
                <thead>
                  <tr className="border-b border-[var(--hairline-strong)]">
                    <th scope="col" className="pb-4 pr-4"><span className="eyebrow">Window</span></th>
                    <th scope="col" className="pb-4 pr-4"><span className="eyebrow">Dates</span></th>
                    <th scope="col" className="pb-4 text-right"><span className="eyebrow">Minimum</span></th>
                  </tr>
                </thead>
                <tbody>
                  {windows.map((w) => (
                    <tr key={`${w.name}-${w.from}`} className="border-b border-[var(--hairline)]">
                      <th scope="row" className="py-4 pr-4 text-left font-normal text-[0.9375rem] text-ink">
                        {w.name}
                      </th>
                      <td className="py-4 pr-4 font-mono text-[0.8125rem] tabular text-slate">
                        {w.from} → {w.to}
                      </td>
                      <td className="py-4 text-right font-mono text-[0.8125rem] tabular text-slate">
                        {w.minNights} nights
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[0.8125rem] text-muted">
                Surcharge of {money(PEAK_SURCHARGE)} per night applies to every night inside these
                windows.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="tight">
        <Container width="wide">
          <div className="grid gap-12 sm:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="font-display text-(length:--text-title-1)">Included in every room rate</h2>
              <ul className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-6">
                {[
                  "Their own food, prepared and served on your schedule",
                  "All medication, including injectables, with a signed log",
                  "A written note and a photograph every day",
                  "Yard turnouts and access to the cameras",
                  "Bedding, laundered between guests",
                  "Any veterinary transport we decide is necessary",
                ].map((x) => (
                  <li key={x} className="text-[0.9375rem] leading-snug text-slate">{x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-(length:--text-title-1)">Charged on top</h2>
              <ul className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-6">
                {[
                  "Enrichment sessions, if you choose any",
                  `Anything ordered from ${"the kitchen"}`,
                  "Grooming",
                  `Peak nights, at ${money(PEAK_SURCHARGE)} — dates above`,
                  `Additional animals sharing a room, at ${money(EXTRA_ANIMAL)} a night`,
                  "Veterinary treatment, billed at cost with the invoice",
                ].map((x) => (
                  <li key={x} className="text-[0.9375rem] leading-snug text-slate">{x}</li>
                ))}
              </ul>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-muted">
                The kitchen menu is at{" "}
                <Link href="/kitchen" className="link-underline text-slate">
                  {kitchen.length} sections
                </Link>
                , and the first one is free.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Put dates against it."
        body="The planner adds it all up as you go — room, peak nights, extras — and shows the total before you give us a name."
        secondary={{ href: "/policies", label: "Cancellation policy" }}
      />
    </>
  );
}
