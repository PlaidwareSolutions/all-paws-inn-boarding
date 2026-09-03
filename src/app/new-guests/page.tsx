import type { Metadata } from "next";
import { faqs, type Faq } from "@/data/faq";
import { firstStay, vaccineRequirements } from "@/data/care";
import { images } from "@/lib/images";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { MeetGreetForm } from "@/components/sections/MeetGreetForm";
import { PackingChecklist } from "@/components/sections/PackingChecklist";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Img } from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "Before Your First Stay",
  description:
    "Vaccination requirements, what to pack, how the free meet and greet works, and answers to the questions new guests ask most.",
};

const groups: Array<{ key: Faq["group"]; label: string }> = [
  { key: "booking", label: "Booking" },
  { key: "stay", label: "The stay" },
  { key: "health", label: "Health & medication" },
  { key: "holidays", label: "Holidays" },
];

export default function NewGuestsPage() {
  return (
    <>
      <PageHeroSplit
        eyebrow="New guests"
        title="Everything you need before a first stay."
        lead="Three things stand between you and a booking: a meet and greet, current vaccinations, and a bag. None of it takes long, and the meet and greet is free."
        image={images.careSitDown}
        alt="A golden retriever resting its head on a caregiver's knee"
        facts={[
          { label: "Meet & greet", value: "Free" },
          { label: "Records needed", value: "48h ahead" },
          { label: "Reply within", value: "1 hour" },
        ]}
      />

      <Section tone="bone" rhythm="default" id="meet-greet">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Step one</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Book a meet and greet.</h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-slate">
                It is the only part we insist on for dogs, and it is as much for you as for us. You
                see the rooms, we see how your dog handles a new group, and everybody finds out
                whether this is the right place before any money changes hands.
              </p>
              <ol className="mt-9 border-t border-[var(--hairline)]">
                {firstStay.map((s) => (
                  <li key={s.step} className="grid gap-2 border-b border-[var(--hairline)] py-5 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <p className="font-mono text-[0.6875rem] tabular text-ember sm:pt-1">{s.step}</p>
                    <div>
                      <h3 className="font-display text-(length:--text-title-2) leading-snug">{s.title}</h3>
                      <p className="mt-2 max-w-[46ch] leading-[1.65] text-slate">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={90}>
              <MeetGreetForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Step two</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Vaccinations.</h2>
              <p className="mt-6 max-w-[50ch] leading-[1.7] text-slate">
                Send records at least 48 hours before arrival, or bring them to the meet and greet.
                We check at booking rather than at the door, so nobody is turned away in the car
                park with a packed bag.
              </p>
              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow border-b border-[var(--hairline)] pb-3">Dogs</p>
                  <ul className="mt-4 space-y-3">
                    {vaccineRequirements.dog.map((v) => (
                      <li key={v.name} className="text-[0.9375rem] leading-snug">
                        <span className="text-ink">{v.name}</span>
                        <span className="block text-muted">{v.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow border-b border-[var(--hairline)] pb-3">Cats</p>
                  <ul className="mt-4 space-y-3">
                    {vaccineRequirements.cat.map((v) => (
                      <li key={v.name} className="text-[0.9375rem] leading-snug">
                        <span className="text-ink">{v.name}</span>
                        <span className="block text-muted">{v.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className="mt-8 space-y-2 border-t border-[var(--hairline)] pt-6">
                {vaccineRequirements.also.map((a) => (
                  <li key={a} className="text-[0.875rem] leading-snug text-slate">{a}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow">Step three</p>
              <h2 className="mt-5 text-(length:--text-display-3)">The bag.</h2>
              <div className="mt-9">
                <PackingChecklist />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default" id="faq">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-5 text-(length:--text-display-3)">The ones we get asked most.</h2>
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            {groups.map((g, i) => (
              <Reveal key={g.key} delay={Math.min(i, 2) * 70}>
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ember">
                  {g.label}
                </h3>
                <Accordion className="mt-4" items={faqs.filter((f) => f.group === g.key).map((f) => ({ question: f.question, answer: f.answer }))} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="linen" rhythm="tight">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
            <Reveal className="frame aspect-3/2 w-full">
              <Img
                asset={images.catCarrier}
                alt="A ginger kitten peeking curiously out of an open carrier"
                sizes="(max-width: 1024px) 92vw, 40vw"
              />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-(length:--text-display-3)">On the first morning.</h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-slate">
                Come in, hand over the bag, and go. Long goodbyes in the lobby make it harder — dogs
                read the anxiety and it colours the first hour. We will text you a photograph within
                ninety minutes, which is usually of a dog who has entirely forgotten about you.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
