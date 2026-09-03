import type { Metadata } from "next";
import { images } from "@/lib/images";
import { QUIET_WING_SURCHARGE } from "@/lib/availability";
import { money } from "@/lib/pricing";
import { PageHeroBleed } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "The Quiet Wing",
  description:
    `Six rooms for anxious, reactive, senior and medically fragile animals — dogs and cats both. One assigned caregiver, nothing asked of anybody, its own door off the back corridor. Room rate plus ${money(QUIET_WING_SURCHARGE)} a night.`,
};

const whoFor = [
  {
    title: "Reactive dogs",
    body: "Dogs who bark, lunge or freeze around other dogs. They never meet one here — not in a corridor, not through a fence, not on the way to the yard.",
  },
  {
    title: "Cats who do not travel",
    body: "Cats who have never boarded well anywhere, who stop eating in a new room, or who a vet has already described as difficult. The Quiet Wing takes cats as readily as dogs.",
  },
  {
    title: "Fearful animals",
    body: "Rescue dogs in their first year, cats who shut down in new places, and anybody who has had a bad experience at boarding before and shows it.",
  },
  {
    title: "The old ones",
    body: "Dogs who stopped finding other dogs interesting some years ago, and cats of fourteen and up who need the floor non-slip, the tray close, and the night uninterrupted.",
  },
  {
    title: "Medically fragile animals",
    body: "Post-operative recovery, multiple daily medications, mobility support, subcutaneous fluids. Both of our licensed veterinary technicians work this wing.",
  },
];

const differences = [
  { label: "Entrance", value: "Its own door at the back of the suite. Nobody crosses the main corridor or the Cattery." },
  { label: "Caregiver", value: "One person assigned for the whole stay, not a rota." },
  { label: "Company", value: "None asked of anybody. Solo yard time for dogs, on a schedule that avoids the others; cats see no other cat at all." },
  { label: "Sound", value: "The corridor is soundproofed, so noise from the yard and the Lodge does not reach it." },
  { label: "Enrichment", value: "Scent work and foraging for dogs. Hides, height and a still room for cats — which is what a frightened cat actually wants." },
  { label: "Comfort", value: "Pheromone diffusers in every room, and cats keep their own litter and their own bowl." },
  { label: "First visit", value: "Ninety minutes rather than forty for dogs, and we will do it twice if it helps. Cats do not come twice." },
];

const faqs = [
  {
    question: "Is this just an expensive room?",
    answer:
      `No. The six rooms are sized like a Garden Suite for dogs and a Garden Room for cats, and they are charged at that room's rate plus ${money(QUIET_WING_SURCHARGE)} a night. That figure is what the extra staffing costs — one caregiver covers two Quiet Wing guests rather than four. We do not make more margin on it than on a standard room.`,
  },
  {
    question: "How do I actually book it?",
    answer:
      "Tick the Quiet Wing box when you plan a stay, or say so when you ring. You pick the room type as usual — the wing's rooms match a Garden Suite for dogs and a Garden Room for cats — and we place your animal in the wing rather than the main corridor. If all six are taken for your dates we will tell you straight away rather than putting them in the Lodge and hoping.",
  },
  {
    question: "My dog has bitten someone. Will you take him?",
    answer:
      "Possibly, and we would rather you told us than not. It depends on the circumstances, the warning your dog gives, and whether our team can handle him safely. We will say no if the answer is no — but a bite history alone is not automatically a refusal.",
  },
  {
    question: "Will my animal be alone all day?",
    answer:
      "Dogs get more one-to-one human time here than anywhere else in the building — typically four separate sessions a day. What they do not get is other dogs. Cats get the opposite and it is deliberate: contact offered four times, insisted on never, because for most frightened cats being left alone in a still room is the service.",
  },
  {
    question: "What if my animal does not cope even here?",
    answer:
      "We call you the same day and tell you honestly. If your animal is genuinely distressed we would rather help you find another arrangement than keep taking your money. This has happened with both a dog and a cat, and we refunded both stays.",
  },
];

export default function QuietWingPage() {
  return (
    <>
      <PageHeroBleed
        eyebrow="The Quiet Wing"
        title="For animals who should not be asked to join in."
        lead="Six rooms in a soundproofed corridor at the back of the suite, staffed differently and priced at what the staffing costs. Built for the dogs and cats most boarding kennels quietly hope they can manage."
        image={images.quietDarkLight}
        alt="A golden retriever puppy asleep, eyes closed, in warm soft light"
        tone="darker"
        facts={[
          { label: "Rooms", value: "6" },
          { label: "Ratio", value: "1:2" },
          { label: "Surcharge", value: `+${money(QUIET_WING_SURCHARGE)} / night` },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[52rem]">
            <p className="max-w-[30ch] font-display text-(length:--text-display-3) leading-[1.15]">
              Most places will take a fearful animal. Very few will change anything for one.
            </p>
            <p className="mt-8 max-w-[60ch] text-(length:--text-lead) leading-[1.6] text-slate">
              The standard answer is a quieter corner of the same building and a promise to keep an
              eye out. That does not work, because the problem was never the corner — it was the
              traffic past the door, the noise from the yard, and a different person every shift.
              For a cat it is worse still: a cattery that is one room away from a dog is not, to a
              cat, a cattery at all.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[42rem]">
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-5 text-(length:--text-display-3)">Five kinds of guest.</h2>
          </Reveal>
          <dl className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {whoFor.map((w, i) => (
              <Reveal key={w.title} delay={Math.min(i, 2) * 80}>
                <dt className="font-display text-(length:--text-title-1) leading-tight">{w.title}</dt>
                <dd className="mt-3.5 max-w-[46ch] leading-[1.65] text-slate">{w.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">What is actually different</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Seven changes, not a label.</h2>
              <div className="frame mt-10 aspect-3/2 w-full">
                <Img
                  asset={images.catSeniorSoft}
                  alt="An older cat resting quietly in soft, low light"
                  sizes="(max-width: 1024px) 92vw, 40vw"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <dl className="border-t border-[var(--hairline)]">
                {differences.map((d) => (
                  <div key={d.label} className="border-b border-[var(--hairline)] py-5">
                    <dt className="eyebrow">{d.label}</dt>
                    <dd className="mt-2.5 max-w-[52ch] leading-relaxed text-slate">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="linen" rhythm="default">
        <Container width="narrow">
          <Reveal>
            <p className="eyebrow">Honestly</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              This is not right for every animal.
            </h2>
            <p className="mt-6 leading-[1.7] text-slate">
              Some animals are better off at home with a sitter, and we will tell you so before you
              pay rather than after. This is true of cats more often than dogs — a cat that has
              never left its house and is not ill is frequently better served by somebody coming in
              twice a day. If your animal is on the second week of a new medication, or recovering
              from something acute, a boarding stay may be the wrong tool no matter how it is staffed.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-12">
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Start with a longer meet and greet."
        body="Ninety minutes, free, and no obligation. Cats do not need to come — send us your notes instead. Bring everything you are worried about; that conversation is the useful part."
        primary={{ href: "/new-guests", label: "Book a meet & greet" }}
        secondary={{ href: "/safety", label: "How we staff the place" }}
      />
    </>
  );
}
