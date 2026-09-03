import type { Metadata } from "next";
import { dogSuites } from "@/data/suites";
import { images } from "@/lib/images";
import { money } from "@/lib/pricing";
import { EXTRA_ANIMAL } from "@/lib/availability";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { SuiteDetail } from "@/components/sections/SuiteDetail";
import { SuiteMatrix } from "@/components/sections/SuiteMatrix";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Suites",
  description:
    "Four rooms for dogs in Clear Lake, Houston, from a glass-front loft at $58 a night to a Family Suite with its own fenced section of yard. Real dimensions, published rates.",
};

const choosing = [
  {
    q: "Your dog is house-trained and hates waiting",
    a: "The Garden Suite. The patio door is theirs to use, which removes the single most common source of stress in boarding.",
  },
  {
    q: "You want to see them without asking anyone",
    a: "The Courtyard Suite or a Family Suite. Both have a camera in the room, on all night, open from your account.",
  },
  {
    q: "You are sending more than two dogs",
    a: `A Family Suite takes four from one household, and they are charged one room rate plus ${money(EXTRA_ANIMAL)} a night each — not four rates.`,
  },
  {
    q: "Your dog is happiest in a smaller space",
    a: "The Loft, genuinely. Some dogs settle better in a room they can see all of. It is our cheapest room and often the right one.",
  },
];

export default function SuitesPage() {
  const from = Math.min(...dogSuites.map((s) => s.rate));
  return (
    <>
      <PageHeroSplit
        eyebrow="Dogs, overnight"
        title="Four rooms, and none of them is a run."
        lead="Every room has a door that closes, a window, and a bed off the floor. What separates them is floor area and how much of the outdoors your dog can reach without asking a person first."
        image={images.suiteGardenP}
        alt="A dog resting on a window-side daybed, looking out at the garden"
        facts={[
          { label: "From", value: `${money(from)} / night` },
          { label: "Rooms", value: "22" },
          { label: "Daytime ratio", value: "1:4" },
        ]}
      />

      <Section tone="bone" rhythm="none" className="pt-[clamp(3.5rem,2rem+5vw,6rem)]">
        {dogSuites.map((s, i) => (
          <SuiteDetail key={s.slug} suite={s} index={i} />
        ))}
      </Section>

      <SuiteMatrix
        suites={dogSuites}
        title="The same information, side by side."
        note="Dimensions are the actual measured floor of the room, not including the patio or yard where there is one."
      />

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">Choosing</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              If you are not sure, this is usually how it goes.
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {choosing.map((c, i) => (
              <Reveal key={c.q} delay={Math.min(i, 2) * 80}>
                <dt className="font-display text-(length:--text-title-2) leading-snug">{c.q}</dt>
                <dd className="mt-3 max-w-[46ch] leading-[1.65] text-slate">{c.a}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <ClosingCta
        title="See which rooms are free."
        body="Pick two dates and you will get real availability and a real price, with no account and nothing to fill in."
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
