import type { Metadata } from "next";
import Link from "next/link";
import { team, propertyStory } from "@/data/team";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { PageHeroBleed } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Inn",
  description:
    "A 16,000 sq ft suite in Pineloch Center, Clear Lake — two wings, a fenced turf yard, and the people who look after them.",
};

const gallery = [
  { asset: images.buildingExterior, alt: "A Bernese mountain dog standing happily on a wooded path near the entrance", span: "lg:col-span-7" },
  { asset: images.yardTurfDog, alt: "A dog playing with a ball across the fenced turf yard behind the building", span: "lg:col-span-5" },
  { asset: images.yardMorning, alt: "Two dogs playing together with a ball on the grass", span: "lg:col-span-5" },
  { asset: images.courtyardEntrance, alt: "Two tabby cats curled up asleep together on a couch", span: "lg:col-span-7" },
  { asset: images.buildingParking, alt: "A dachshund happily riding with its head out the car window", span: "lg:col-span-7" },
  { asset: images.daycareGroup, alt: "A curated playgroup out on the grass together", span: "lg:col-span-5" },
];

export default function TheInnPage() {
  return (
    <>
      <PageHeroBleed
        eyebrow="The property"
        title="16,000 square feet, and two wings for the animals who board here."
        lead="A fenced turf yard behind the building, a landscaped entry courtyard, and a suite built out in two halves — one for dogs, one for cats, each behind its own locked door and its own air handler."
        image={images.buildingExterior}
        alt="A Bernese mountain dog standing happily on a wooded path near the entrance"
        facts={[
          { label: "Square feet", value: site.squareFeet.toLocaleString() },
          { label: "Established", value: String(site.established) },
          { label: "From downtown", value: site.drive.downtown },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">How it happened</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Six dates.</h2>
            </Reveal>
            <Reveal delay={90}>
              <ol className="border-t border-[var(--hairline)]">
                {propertyStory.map((s) => (
                  <li
                    key={s.year}
                    className="grid gap-2 border-b border-[var(--hairline)] py-6 sm:grid-cols-[6rem_1fr] sm:gap-8"
                  >
                    <p className="font-mono text-[0.8125rem] tabular text-ember sm:pt-1">{s.year}</p>
                    <div>
                      <h3 className="font-display text-(length:--text-title-2) leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 max-w-[52ch] leading-[1.65] text-slate">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">The yard</p>
            <h2 className="mt-5 text-(length:--text-display-3)">One yard, built for actual use.</h2>
            <p className="mt-6 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
              A fenced turf yard behind the building, a shade sail over its busiest corner, and a
              landscaped courtyard at the entrance the Cattery&apos;s Perches look into. Dogs on
              escorted walks go around the block rather than a perimeter path.
            </p>
          </Reveal>

          {/* Fixed row height on large screens: a 7-span and a 5-span sharing a
              fixed aspect ratio resolve to different heights, which left a ragged
              gap under every narrower tile. */}
          <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:auto-rows-[21rem] lg:gap-5">
            {gallery.map((g, i) => (
              <Reveal key={g.alt} delay={Math.min(i, 3) * 70} className={`${g.span} lg:h-full`}>
                <div className="frame frame-hover aspect-3/2 w-full lg:aspect-auto lg:h-full">
                  <Img asset={g.asset} alt={g.alt} sizes="(max-width: 1024px) 92vw, 45vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[46rem]">
            <p className="eyebrow">Who works here</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              Eleven people work here. These four run both wings.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal as="li" key={t.name} delay={Math.min(i, 3) * 70}>
                <div className="frame aspect-4/5 w-full">
                  <Img
                    asset={t.image}
                    alt={t.alt}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                  />
                </div>
                <h3 className="mt-5 font-display text-(length:--text-title-2) leading-none">
                  {t.name}
                </h3>
                <p className="mt-2.5 font-mono text-[0.625rem] uppercase leading-[1.6] tracking-[0.12em] text-muted">
                  {t.role}
                  <span className="block">Since {t.since}</span>
                </p>
                <p className="mt-3.5 text-[0.875rem] leading-[1.6] text-slate">{t.detail}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="linen" rhythm="tight">
        <Container width="narrow">
          <Reveal>
            <p className="eyebrow">The rescue</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              A share of every stay goes to {site.rescuePartner}.
            </h2>
            <p className="mt-6 leading-[1.7] text-slate">
              We do not publish a running total or an animated counter, because the number is not
              the point and we would rather not turn it into marketing. What we will say is that
              they use two of our rooms free of charge whenever they are over capacity, and that six
              of the animals photographed on this website came through them.
            </p>
            <p className="mt-5 leading-[1.7] text-slate">
              If you are fostering for them, boarding is half price. Tell us at the meet and greet.{" "}
              <Link href="/contact" className="link-underline text-ink">
                Get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Come and see it."
        body="Turn up during lobby hours and ask for a look around. No appointment, and nobody will follow you with a clipboard."
        primary={{ href: "/contact", label: "Visit the inn" }}
        secondary={{ href: "/safety", label: "Care & safety" }}
      />
    </>
  );
}
