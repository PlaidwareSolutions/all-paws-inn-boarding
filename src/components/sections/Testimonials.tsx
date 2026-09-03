import { testimonials, guests } from "@/data/guests";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Asymmetric on purpose: a lead quote carried at display size, with two
 * supporting voices set smaller beside it. Three equal columns would read as a
 * card grid, which is the pattern this page is trying to avoid.
 */
export function Testimonials() {
  const [lead, ...rest] = testimonials;
  if (!lead) return null;
  const leadGuest = guests.find((g) => g.name === lead.guest);

  return (
    <Section tone="bone" rhythm="default">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <Reveal>
            <figure>
              <blockquote>
                <p className="font-display text-(length:--text-display-3) leading-[1.2] text-ink">
                  &ldquo;{lead.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                {leadGuest ? (
                  <span className="frame size-14 shrink-0">
                    <Img asset={leadGuest.image} alt="" sizes="56px" />
                  </span>
                ) : null}
                <span className="font-mono text-[0.6875rem] uppercase leading-[1.7] tracking-[0.12em] text-muted">
                  <span className="text-slate">{lead.author}</span> · {lead.town}
                  <span className="block">
                    {lead.guest} · {lead.detail}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col justify-center gap-10 border-t border-[var(--hairline)] pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            {rest.map((t, i) => (
              <Reveal as="figure" key={t.author} delay={80 + i * 80}>
                <blockquote>
                  <p className="leading-[1.65] text-slate">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 font-mono text-[0.625rem] uppercase leading-[1.7] tracking-[0.12em] text-muted">
                  <span className="text-slate">{t.author}</span> · {t.town}
                  <span className="block">
                    {t.guest} · {t.detail}
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
