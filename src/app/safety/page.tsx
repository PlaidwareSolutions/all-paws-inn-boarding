import type { Metadata } from "next";
import Link from "next/link";
import {
  carePillars,
  cleaningSchedule,
  playgroupRules,
  catteryRules,
  stormProtocol,
  heatProtocol,
  vaccineRequirements,
} from "@/data/care";
import { site, houses } from "@/lib/site";
import { images } from "@/lib/images";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Care & Safety",
  description:
    "Staffing, certifications, sanitation, the separate Cattery, hurricane and flood protocol, summer heat limits and veterinary arrangements — written out rather than summarised as badges.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHeroSplit
        eyebrow="Care & safety"
        title="The answers, rather than the badges."
        lead="Most of this page is detail nobody enjoys writing. It is here because 'fully trained, 24-hour care' means nothing, and the specifics are the only thing worth judging a boarding business on."
        image={images.careBrushHands}
        alt="A caregiver's hand gently cupping a dog's face"
        facts={[
          { label: "The Lodge", value: `${houses.barn.rooms} rooms` },
          { label: "The Cattery", value: `${houses.cattery.rooms} rooms` },
          { label: "Vet", value: `${site.vetDistanceMinutes} min` },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="space-y-[clamp(3.5rem,2rem+5vw,6rem)]">
            {carePillars.map((p, i) => (
              <Reveal key={p.title}>
                <div className="grid gap-8 border-t border-[var(--hairline)] pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
                  <div>
                    <p className="font-mono text-[0.6875rem] tabular text-ember">0{i + 1}</p>
                    <h2 className="mt-4 max-w-[16ch] text-(length:--text-display-3) leading-[1.1]">
                      {p.title}
                    </h2>
                  </div>
                  <div>
                    <p className="max-w-[58ch] text-(length:--text-lead) leading-[1.6] text-slate">
                      {p.body}
                    </p>
                    <dl className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                      {p.facts.map((f) => (
                        <div key={f.label} className="border-t border-[var(--hairline)] pt-4">
                          <dt className="eyebrow">{f.label}</dt>
                          <dd className="mt-2 text-[0.9375rem] leading-snug text-ink">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Cleaning</p>
              <h2 className="mt-5 text-(length:--text-display-3)">What gets done, and when.</h2>
              <p className="mt-6 max-w-[46ch] leading-[1.7] text-slate">
                Nothing is fogged or ozoned while animals are in the room. It is a shortcut, it is
                not good for their airways, and we do not take it.
              </p>
              <div className="frame mt-10 aspect-3/2 w-full">
                <Img
                  asset={images.suiteTwoDogs}
                  alt="Two dogs from one household asleep together in a freshly made room"
                  sizes="(max-width: 1024px) 92vw, 40vw"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <dl className="border-t border-[var(--hairline)]">
                {cleaningSchedule.map((c) => (
                  <div key={c.when} className="grid gap-2 border-b border-[var(--hairline)] py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="eyebrow sm:pt-1">{c.when}</dt>
                    <dd className="max-w-[52ch] leading-relaxed text-slate">{c.what}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* A full-bleed band leading into the dark storms section — the page runs
          ten screens, and this is its most distinctive content. */}
      <figure className="relative">
        <div className="frame aspect-[12/5] w-full">
          <Img
            asset={images.safetyStorm}
            alt="A summer storm approaching under a darkening sky, with lightning in the distance"
            sizes="100vw"
          />
        </div>
      </figure>

      {/* The two things a Gulf Coast boarding business has to answer for. */}
      <Section tone="moss" rhythm="default" id="storms">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow !text-sage">Storms and flooding</p>
              <h2 className="mt-5 text-(length:--text-display-3) text-bone">
                There is a plan, not an intention.
              </h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-bone/72">
                This is the Gulf Coast and pretending otherwise would be insulting. Anybody in this
                county who tells you flooding is impossible is selling something. Here is what we
                actually do, in the order we do it.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <ol className="border-t border-[var(--hairline-invert)]">
                {stormProtocol.map((x) => (
                  <li
                    key={x.when}
                    className="grid gap-2 border-b border-[var(--hairline-invert)] py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <p className="eyebrow !text-sage sm:pt-1">{x.when}</p>
                    <p className="max-w-[52ch] leading-relaxed text-bone/80">{x.what}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default" id="heat">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Heat</p>
              <h2 className="mt-5 text-(length:--text-display-3)">
                From June the schedule bends around the thermometer.
              </h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-slate">
                Not around what anybody would prefer. These limits are not adjustable on request,
                including by owners who tell us their dog loves the heat.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <dl className="border-t border-[var(--hairline)]">
                {heatProtocol.map((x) => (
                  <div
                    key={x.when}
                    className="grid gap-2 border-b border-[var(--hairline)] py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="eyebrow sm:pt-1">{x.when}</dt>
                    <dd className="max-w-[52ch] leading-relaxed text-slate">{x.what}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">Playgroups, and the absence of them</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              How each house is actually run.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow border-b border-[var(--hairline)] pb-4">In the Lodge</p>
              <ul className="mt-6 space-y-7">
                {playgroupRules.map((r) => (
                  <li key={r.title}>
                    <h3 className="font-display text-(length:--text-title-2) leading-snug">{r.title}</h3>
                    <p className="mt-2.5 max-w-[46ch] leading-[1.65] text-slate">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow border-b border-[var(--hairline)] pb-4">In the Cattery</p>
              <ul className="mt-6 space-y-7">
                {catteryRules.map((r) => (
                  <li key={r.title}>
                    <h3 className="font-display text-(length:--text-title-2) leading-snug">{r.title}</h3>
                    <p className="mt-2.5 max-w-[46ch] leading-[1.65] text-slate">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="moss" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow !text-sage">Health requirements</p>
              <h2 className="mt-5 text-(length:--text-display-3) text-bone">
                What every guest needs before arrival.
              </h2>
              <p className="mt-6 max-w-[46ch] leading-[1.7] text-bone/70">
                We check records at booking rather than at the door, so nobody is turned away in a
                car park with a packed bag. Send them at least 48 hours ahead.
              </p>
            </Reveal>
            <Reveal delay={90} className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow !text-sage border-b border-[var(--hairline-invert)] pb-3">Dogs</p>
                <ul className="mt-4 space-y-3">
                  {vaccineRequirements.dog.map((v) => (
                    <li key={v.name} className="text-[0.9375rem] leading-snug">
                      <span className="text-bone">{v.name}</span>
                      <span className="block text-bone/55">{v.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow !text-sage border-b border-[var(--hairline-invert)] pb-3">Cats</p>
                <ul className="mt-4 space-y-3">
                  {vaccineRequirements.cat.map((v) => (
                    <li key={v.name} className="text-[0.9375rem] leading-snug">
                      <span className="text-bone">{v.name}</span>
                      <span className="block text-bone/55">{v.detail}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-2 border-t border-[var(--hairline-invert)] pt-5">
                  {vaccineRequirements.also.map((a) => (
                    <li key={a} className="text-[0.875rem] leading-snug text-bone/60">{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="tight">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-(length:--text-display-3)">If you want to check any of this.</h2>
            <p className="mt-6 leading-[1.7] text-slate">
              Turn up unannounced during lobby hours and ask to see the building. We will show you
              the rooms, the yards, the kitchen and the medication book. A boarding business that
              needs notice before you can look around is telling you something.
            </p>
            <p className="mt-5 leading-[1.7] text-slate">
              You can also read our{" "}
              <Link href="/policies" className="link-underline text-ink">
                full policies
              </Link>{" "}
              — cancellations, medication, behaviour and what happens if something goes wrong.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Come and look around."
        body="No appointment needed during lobby hours, and a meet and greet is free whether or not you book anything afterwards."
        primary={{ href: "/new-guests", label: "Book a meet & greet" }}
        secondary={{ href: "/contact", label: "Visit & contact" }}
      />
    </>
  );
}
