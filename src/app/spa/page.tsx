import type { Metadata } from "next";
import { spaDogs, spaCats, type SpaService } from "@/data/addons";
import { images } from "@/lib/images";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Spa",
  description:
    "Grooming for dogs and cats, priced by coat rather than breed. Bath and brush-out from $38, cat brush-out from $28. Sedation-free, always.",
};

function Menu({ id, title, lead, services }: { id: string; title: string; lead: string; services: SpaService[] }) {
  return (
    <div id={id} className="scroll-mt-28">
      <p className="eyebrow">{title}</p>
      <h2 className="mt-5 max-w-[18ch] text-(length:--text-display-3)">{lead}</h2>
      <dl className="mt-9">
        {services.map((s) => (
          <div
            key={s.name}
            className="grid gap-x-6 gap-y-2 border-b border-[var(--hairline)] py-5 sm:grid-cols-[1fr_auto]"
          >
            <dt className="font-display text-(length:--text-title-2) leading-snug">{s.name}</dt>
            <dd className="font-mono text-[0.9375rem] tabular text-ink sm:text-right">{s.price}</dd>
            <dd className="max-w-[52ch] leading-relaxed text-slate sm:col-span-2">{s.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function SpaPage() {
  return (
    <>
      <PageHeroSplit
        eyebrow="The spa"
        title="Priced by the coat, not by the breed."
        lead="A thin-coated retriever and a matted one are not the same job, and charging both the same 'large dog' rate is how grooming prices end up meaningless. We quote on what is in front of us — and we groom cats properly, not as an afterthought."
        image={images.spaTable}
        alt="A fluffy white Pomeranian sitting happily after a groom"
        facts={[
          { label: "Dogs from", value: "$38" },
          { label: "Cats from", value: "$28" },
          { label: "Sedation", value: "Never" },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Menu id="dogs" title="Dogs" lead="In the Lodge, most mornings." services={spaDogs} />
              <div className="frame mt-10 aspect-3/2 w-full max-w-[26rem]">
                <Img
                  asset={images.spaScissor}
                  alt="A happy white dog peeking out beside the grooming table, tongue out"
                  sizes="(max-width: 640px) 90vw, 26rem"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <Menu
                id="cats"
                title="Cats"
                lead="In the Cattery, never in the Lodge."
                services={spaCats}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
            <Reveal className="frame aspect-3/2 w-full">
              <Img
                asset={images.spaCatBrush}
                alt="A caregiver gently brushing a cat's chin with a soft brush"
                sizes="(max-width: 1024px) 92vw, 52vw"
              />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-(length:--text-display-3)">If they say no, we stop.</h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-slate">
                No animal here is sedated, muzzled for convenience, or held down to finish a groom.
                If a dog or cat is genuinely distressed we stop, we tell you what we managed, and we
                charge for what we did rather than what was booked.
              </p>
              <p className="mt-5 max-w-[48ch] leading-[1.7] text-slate">
                Cats are groomed in the Cattery by the Cattery team, in short sessions across a day
                rather than one long one, and never with a forced-air dryer. For matted coats — dog
                or cat — we will usually recommend clipping rather than dematting. It is less
                satisfying to look at and considerably kinder.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Add grooming to a stay."
        body="Most guests book a bath or a brush-out for the last morning, so they go home clean. Say so in the planner and we will schedule it."
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
