import type { Metadata } from "next";
import Link from "next/link";
import { cameras } from "@/data/cameras";
import { DenCamViewer } from "@/components/sections/DenCamViewer";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Den Cam",
  description:
    "Cameras on the yard, the Solarium and the Perch Room, plus the larger rooms in both wings. Open to guests with an animal staying. Yard cameras run 7am to 7pm; room cameras are on all night.",
};

export default function DenCamPage() {
  return (
    <>
      <Section tone="parchment" rhythm="none" className="pb-12 pt-[calc(var(--header-h)+3rem)] lg:pb-16 lg:pt-[calc(var(--header-h)+5rem)]">
        <Container width="wide">
          <p className="eyebrow">The Den Cam</p>
          <h1 className="mt-5 max-w-[18ch] text-(length:--text-display-2)">
            Look in whenever you want to.
          </h1>
          <p className="mt-7 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
            Five cameras — two angles on the yard, two in the Cattery, and one in your room if you
            have booked one of the larger ones. Most people watch obsessively for a day and then
            stop, which is more or less the point of having them.
          </p>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
            <Reveal>
              <DenCamViewer />
            </Reveal>
            <Reveal delay={90}>
              <h2 className="font-display text-(length:--text-title-1)">Where they are</h2>
              <dl className="mt-6 border-t border-[var(--hairline)]">
                {cameras.map((c) => (
                  <div key={c.slug} className="border-b border-[var(--hairline)] py-4">
                    <dt className="font-display text-[1.125rem] leading-snug">{c.name}</dt>
                    <dd className="mt-1.5 text-[0.875rem] leading-snug text-slate">{c.where}</dd>
                    <dd className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ember">
                      {c.house}
                    </dd>
                    <dd className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                      {c.hours}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-l-2 border-ember pl-5">
                <p className="text-[0.9375rem] leading-[1.7] text-ink">
                  There are no cameras in the Loft, the Garden Suites, the Perch or the Garden Room,
                  and we would rather say so than imply otherwise. If watching the room itself
                  matters to you, book a Courtyard Suite, a Family Suite or the Conservatory.
                </p>
              </div>

              <p className="mt-7 text-[0.875rem] leading-relaxed text-muted">
                Cameras are not a substitute for the daily note, and they are not monitored by us as
                a safety measure — that is what the caregivers are for. See{" "}
                <Link href="/safety" className="link-underline text-slate">Care &amp; Safety</Link>.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Book a room with a camera."
        body="Courtyard Suites and Family Suites in the Lodge, and the Conservatory in the Cattery — all have a camera in the room, on all night."
        secondary={{ href: "/suites", label: "See the rooms" }}
      />
    </>
  );
}
