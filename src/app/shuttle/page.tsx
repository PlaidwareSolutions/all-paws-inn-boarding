import type { Metadata } from "next";
import { shuttleFares } from "@/data/addons";
import { images } from "@/lib/images";
import { money } from "@/lib/pricing";
import { PageHeroBleed } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Airport Run",
  description:
    "Door-to-door transfers to Hobby and Bush Intercontinental, timed to your flight, plus weekday neighbourhood runs from League City, Friendswood, Pearland, Nassau Bay, Seabrook and the Medical Center.",
};

const howItWorks = [
  {
    step: "01",
    title: "Book the stay first",
    body: "Add the Airport Run in the planner or ring us. Six animals per run, and we need your flight number rather than a preferred time.",
  },
  {
    step: "02",
    title: "We come to the door",
    body: "Airport runs collect from your address. Neighbourhood runs use a fixed stop with a ten-minute window either side. Bring their food and anything on the packing list — the van has crates, carriers and water.",
  },
  {
    step: "03",
    title: "We text when they arrive",
    body: "A photograph from the car park, usually before you have cleared security. Then the daily note starts that evening as usual.",
  },
];

export default function ShuttlePage() {
  return (
    <>
      <PageHeroBleed
        eyebrow="The Airport Run"
        title="You are flying at six. We will come to you."
        lead="Everybody here has a car. Nobody wants to spend the best part of two hours getting to Bush Intercontinental at five in the morning — and then do it again jet-lagged. Hobby is the easy trip; IAH is the one that eats a morning. Either way, we do the driving."
        image={images.shuttleDogCar}
        alt="A dog riding calmly in the van on the way to the inn"
        facts={[
          { label: "To IAH", value: money(95) },
          { label: "To Hobby", value: money(85) },
          { label: "Per journey", value: "Not per animal" },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">Schedule and fares</p>
            <h2 className="mt-5 text-(length:--text-display-3)">Two airports, four neighbourhood runs.</h2>
          </Reveal>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Shuttle routes, schedule and fares</caption>
              <thead>
                <tr className="border-b border-[var(--hairline-strong)]">
                  <th scope="col" className="pb-4 pr-6"><span className="eyebrow">Route</span></th>
                  <th scope="col" className="pb-4 pr-6"><span className="eyebrow">Schedule</span></th>
                  <th scope="col" className="pb-4 text-right"><span className="eyebrow">Each way</span></th>
                </tr>
              </thead>
              <tbody>
                {shuttleFares.map((f) => (
                  <tr key={f.route} className="border-b border-[var(--hairline)]">
                    <th scope="row" className="py-5 pr-6 text-left font-display text-[1.125rem] font-normal">
                      {f.route}
                    </th>
                    <td className="py-5 pr-6 text-[0.875rem] leading-snug text-slate">{f.schedule}</td>
                    <td className="py-5 text-right font-mono text-[0.9375rem] tabular text-ink">
                      {money(f.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-[58ch] text-[0.875rem] leading-relaxed text-muted">
            Fares are per journey. Two or three animals from one household travel on a single fare.
            Airport transfers are arranged around your flight rather than a timetable.
          </p>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
            <Reveal className="frame aspect-3/2 w-full">
              <Img
                asset={images.buildingParking}
                alt="A dachshund happily riding with its head out the car window"
                sizes="(max-width: 1024px) 92vw, 44vw"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Three steps.</h2>
              <ol className="mt-9 border-t border-[var(--hairline)]">
                {howItWorks.map((h) => (
                  <li key={h.step} className="grid gap-2 border-b border-[var(--hairline)] py-5 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <p className="font-mono text-[0.6875rem] tabular text-ember sm:pt-1">{h.step}</p>
                    <div>
                      <h3 className="font-display text-(length:--text-title-2) leading-snug">{h.title}</h3>
                      <p className="mt-2 max-w-[48ch] leading-[1.65] text-slate">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="tight">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-(length:--text-display-3)">The van, specifically.</h2>
            <p className="mt-6 leading-[1.7] text-slate">
              A climate-controlled Sprinter with six secured crates and separate carrier bays, so a
              cat never travels in the open beside a dog. It is driven by one of our caregivers,
              never a contractor — the person who collects your animal is a person they will see
              again that evening.
            </p>
            <p className="mt-5 leading-[1.7] text-slate">
              Animals are never left in it unattended, not for two minutes, not at a fuel stop —
              which in a Houston summer is the whole point. It does not run in weather we would not
              drive our own animals in, and if we cancel a run we refund the fare and help you work
              something out.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Add the Airport Run to a stay."
        body="Pick it in the planner with your flight number, or ring the front desk and we will tell you which runs still have space."
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
