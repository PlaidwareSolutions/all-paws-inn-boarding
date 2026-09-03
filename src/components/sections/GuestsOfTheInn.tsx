import { guests } from "@/data/guests";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Real animals with one specific observed detail each. Proof of attention
 * beats a testimonial, because you cannot fake having noticed something.
 */
export function GuestsOfTheInn() {
  return (
    <Section tone="linen" rhythm="default">
      <Container width="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <p className="eyebrow">Guests of the inn</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              We keep notes on all of them.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[0.9375rem] leading-snug text-slate">
            Four from each house, and the one thing each of them is known for here.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 lg:mt-16 lg:gap-x-8">
          {guests.map((g, i) => (
            <Reveal as="li" key={g.name} delay={Math.min(i, 3) * 70}>
              <figure>
                <div className="frame aspect-square w-full">
                  <Img
                    asset={g.image}
                    alt={g.alt}
                    sizes="(max-width: 768px) 46vw, 23vw"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display text-[1.1875rem] leading-none">{g.name}</p>
                  <p className="mt-2 font-mono text-[0.625rem] uppercase leading-[1.6] tracking-[0.12em] text-muted">
                    {g.breed}
                    <span className="block">
                      {g.stays} stays · {g.species === "dog" ? "The Lodge" : "The Cattery"}
                    </span>
                  </p>
                  <p className="mt-3 text-[0.8125rem] leading-[1.5] text-slate">{g.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
