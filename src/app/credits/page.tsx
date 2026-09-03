import type { Metadata } from "next";
import { allImages } from "@/lib/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Credits",
  description: "Photography credits and a note about this being a demonstration website.",
};

export default function CreditsPage() {
  const byPhotographer = new Map<string, { url: string; count: number }>();
  for (const img of allImages) {
    const e = byPhotographer.get(img.credit.photographer);
    if (e) e.count += 1;
    else byPhotographer.set(img.credit.photographer, { url: img.credit.photographerUrl, count: 1 });
  }
  const list = [...byPhotographer.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <>
      <Section tone="parchment" rhythm="none" className="pb-12 pt-[calc(var(--header-h)+3rem)] lg:pb-16 lg:pt-[calc(var(--header-h)+5rem)]">
        <Container width="narrow">
          <p className="eyebrow">Credits</p>
          <h1 className="mt-5 text-(length:--text-display-2)">About this site.</h1>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="narrow">
          <div className="max-w-[62ch] space-y-5 leading-[1.75] text-slate">
            <p>
              <span className="text-ink">{site.name} is a fictional business.</span> This website was
              built as a design and engineering demonstration. The property, the people, the rates,
              the reviews, the guest records and the availability shown throughout are all invented.
              Nothing here can be booked and no form on this site sends anything anywhere.
            </p>
            <p>
              The animals in the photographs are real animals photographed by real people, none of
              whom are connected to this project. Where the site refers to staff, it uses
              environmental photography — hands, backs, figures at a distance — so that no
              identifiable person is shown alongside an invented name or an invented qualification.
            </p>
            <p>
              All photography comes from Unsplash under the Unsplash License, which permits free
              commercial use. {allImages.length} images are used across the site.
            </p>
          </div>

          <h2 className="mt-16 font-display text-(length:--text-title-1)">Photographers</h2>
          <ul className="mt-6 grid gap-x-10 gap-y-1 border-t border-[var(--hairline)] pt-5 sm:grid-cols-2">
            {list.map(([name, { url, count }]) => (
              <li key={name} className="flex items-baseline justify-between gap-4 py-1.5">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-[0.9375rem] text-ink"
                >
                  {name}
                </a>
                <span className="shrink-0 font-mono text-[0.6875rem] tabular text-muted">
                  {count}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-(length:--text-title-1)">Built with</h2>
          <p className="mt-5 max-w-[62ch] leading-[1.75] text-slate">
            Next.js and React, Tailwind CSS, and three typefaces — Fraunces for display, Instrument
            Sans for text, and JetBrains Mono for specifications, rates and dates.
          </p>
        </Container>
      </Section>
    </>
  );
}
