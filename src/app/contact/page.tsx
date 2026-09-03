import type { Metadata } from "next";
import Link from "next/link";
import { site, NAP } from "@/lib/site";
import { images } from "@/lib/images";
import { ContactForm } from "@/components/sections/ContactForm";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Visit & Contact",
  description: `${NAP}. Lobby hours, directions from Houston, and how to reach the front desk.`,
};

const directions = [
  {
    from: "From downtown or the Medical Center",
    detail: "I-45 South (the Gulf Freeway) to NASA Parkway, then east. About twenty-five minutes outside rush hour.",
  },
  {
    from: "From League City, Friendswood and Pearland",
    detail: "I-45 or TX-3 north to NASA Parkway. Fifteen to twenty minutes.",
  },
  {
    from: "From Nassau Bay and Seabrook",
    detail: "Straight up NASA Parkway or TX-146, mostly surface streets. Under fifteen minutes.",
  },
  {
    from: "From the airports",
    detail: "Hobby is about twenty minutes, Bush Intercontinental about sixty-five. We run door-to-door transfers to both, timed to your flight.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="parchment" rhythm="none" className="pb-12 pt-[calc(var(--header-h)+3rem)] lg:pb-16 lg:pt-[calc(var(--header-h)+5rem)]">
        <Container width="wide">
          <p className="eyebrow">Visit &amp; contact</p>
          <h1 className="mt-5 max-w-[18ch] text-(length:--text-display-2)">
            Turn up during lobby hours and ask for a look around.
          </h1>
          <p className="mt-7 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
            No appointment, and nobody will follow you with a clipboard. A boarding business that
            needs notice before you can see the building is telling you something.
          </p>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <address className="not-italic">
                <p className="eyebrow">The inn</p>
                <p className="mt-4 font-display text-(length:--text-title-1) leading-snug">
                  {site.address.street}
                  <br />
                  {site.address.town}, {site.address.state} {site.address.zip}
                </p>
                <p className="mt-6 flex flex-col gap-2">
                  <a href={site.phoneHref} className="link-underline w-fit text-(length:--text-lead) text-ink">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="link-underline w-fit text-slate">
                    {site.email}
                  </a>
                </p>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline mt-4 inline-block text-[0.9375rem] text-slate"
                >
                  Open in maps
                </a>
              </address>

              <div className="mt-10 border-t border-[var(--hairline)] pt-8">
                <p className="eyebrow">Lobby hours</p>
                <dl className="mt-4 space-y-2">
                  {site.hours.lobby.map((h) => (
                    <div key={h.days} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-[var(--hairline)] pb-2">
                      <dt className="text-[0.9375rem] text-slate">{h.days}</dt>
                      <dd className="font-mono text-[0.875rem] tabular text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-[46ch] text-[0.875rem] leading-relaxed text-muted">
                  {site.hours.note}
                </p>
              </div>

              <div className="mt-10 border-t border-[var(--hairline)] pt-8">
                <p className="eyebrow">Getting here</p>
                <dl className="mt-4 space-y-5">
                  {directions.map((d) => (
                    <div key={d.from}>
                      <dt className="font-display text-[1.125rem]">{d.from}</dt>
                      <dd className="mt-1.5 max-w-[48ch] leading-relaxed text-slate">{d.detail}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/shuttle" className="link-underline mt-5 inline-block font-medium text-ink">
                  The Airport Run
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <ContactForm />
              <div className="frame mt-8 aspect-3/2 w-full">
                <Img
                  asset={images.buildingExterior}
                  alt="A Bernese mountain dog standing happily on a wooded path"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
