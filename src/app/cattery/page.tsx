import type { Metadata } from "next";
import Link from "next/link";
import { catSuites } from "@/data/suites";
import { vaccineRequirements, catteryRules } from "@/data/care";
import { enrichment, kitchen } from "@/data/addons";
import { images } from "@/lib/images";
import { houses } from "@/lib/site";
import { money } from "@/lib/pricing";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { SuiteDetail } from "@/components/sections/SuiteDetail";
import { SuiteMatrix } from "@/components/sections/SuiteMatrix";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Cattery",
  description:
    "A separate wing for cats in Clear Lake, Houston — its own locked door, its own ventilation, a glazed solarium and private screened catios. No dog has ever been inside it.",
};

const separation = [
  { label: "Dogs on site", value: "None, ever. No dog has been inside this wing." },
  { label: "Distance", value: "Across the suite from the Lodge, behind its own locked door." },
  { label: "Air", value: "An independent ventilation system. The Cattery never breathes the Lodge's air." },
  { label: "Staff", value: "Two dedicated caregivers who do not work the Lodge shift." },
];

const catMenu = kitchen.find((k) => k.title === "The cat kitchen");

export default function CatteryPage() {
  const from = Math.min(...catSuites.map((s) => s.rate));
  const catEnrichment = enrichment.filter((e) => e.species === "cat" || e.species === "both");

  return (
    <>
      {/* Cooler, brighter and airier than the Lodge pages — a different wing. */}
      <PageHeroSplit
        eyebrow="Cats, overnight"
        title="A wing no dog has ever been inside."
        lead="Most places keep cats in a room off the dog corridor and call it a cattery. Ours is its own wing with its own locked door, its own air, a glazed south room and private screened catios."
        image={images.panelCattery}
        alt="A tabby cat sitting in a bright window with its eyes closed in the sun"
        facts={[
          { label: "From", value: `${money(from)} / night` },
          { label: "Rooms", value: String(houses.cattery.rooms) },
          { label: "Dogs on site", value: "None" },
        ]}
      />

      <Section tone="bone" rhythm="tight">
        <Container width="wide">
          <Reveal>
            <p className="eyebrow">What separate actually means</p>
            <h2 className="mt-5 max-w-[20ch] text-(length:--text-display-3)">
              Cats can smell a dog through a wall.
            </h2>
            <p className="mt-6 max-w-[58ch] text-(length:--text-lead) leading-[1.55] text-slate">
              So a shared corridor with a closed door is not separation, and we will not call it
              that. Four things had to be true before we would take cats at all.
            </p>
          </Reveal>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {separation.map((s, i) => (
              <Reveal key={s.label} delay={Math.min(i, 3) * 70}>
                <dt className="eyebrow border-b border-[var(--hairline)] pb-3">{s.label}</dt>
                <dd className="mt-3.5 text-[0.9375rem] leading-snug text-slate">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="bone" rhythm="none" className="pb-[clamp(3.5rem,2rem+5vw,6rem)]">
        {catSuites.map((s, i) => (
          <SuiteDetail key={s.slug} suite={s} index={i} />
        ))}
      </Section>

      <SuiteMatrix
        suites={catSuites}
        title="The four rooms, side by side."
        note="Every room has a covered box to disappear into. That matters more to most cats than floor area does."
      />

      {/* The Cattery's own differentiator, and the nav target for /cattery#solarium */}
      <Section tone="linen" rhythm="default" id="solarium">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
            <Reveal>
              <p className="eyebrow">The solarium &amp; the catios</p>
              <h2 className="mt-5 max-w-[18ch] text-(length:--text-display-3)">
                Warm by nine, shaded by two.
              </h2>
              <p className="mt-6 max-w-[52ch] text-(length:--text-lead) leading-[1.55] text-slate">
                The glass room runs the south side of the wing. It is warm early, screened by
                external blinds through the worst of the Texas afternoon, and it looks into the
                courtyard where the feeders are.
              </p>
              <p className="mt-5 max-w-[52ch] leading-[1.7] text-slate">
                Perch guests come in on rotation, two sessions a day, always alone. Solarium Suites
                open into it directly through a cat door. Garden Rooms skip it altogether and have a
                private screened catio of their own — outdoor air and a window-box planter, with
                none of the risk of an open garden.
              </p>
              <dl className="mt-9 grid gap-x-10 gap-y-5 border-t border-[var(--hairline)] pt-7 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Glass</dt>
                  <dd className="mt-2 text-[0.9375rem] text-slate">South-facing, externally shaded</dd>
                </div>
                <div>
                  <dt className="eyebrow">Catios</dt>
                  <dd className="mt-2 text-[0.9375rem] text-slate">Screened, private, one per Garden Room</dd>
                </div>
                <div>
                  <dt className="eyebrow">Company</dt>
                  <dd className="mt-2 text-[0.9375rem] text-slate">One household at a time, always</dd>
                </div>
                <div>
                  <dt className="eyebrow">Camera</dt>
                  <dd className="mt-2 text-[0.9375rem] text-slate">
                    <Link href="/den-cam" className="link-underline text-ink">On the solarium, 7–7</Link>
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={90} className="frame arch aspect-4/5 w-full">
              <Img
                asset={images.catGardenP}
                alt="A cream-coloured cat with blue eyes looking out through a sunlit window"
                sizes="(max-width: 1024px) 92vw, 40vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">How cats are kept here</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              There is no cat equivalent of a playgroup.
            </h2>
            <p className="mt-6 max-w-[56ch] text-(length:--text-lead) leading-[1.55] text-slate">
              Because there is no such thing as a well-run one. Everything below follows from that.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {catteryRules.map((r, i) => (
              <Reveal as="li" key={r.title} delay={Math.min(i, 2) * 80}>
                <p className="font-mono text-[0.6875rem] tabular text-ember">0{i + 1}</p>
                <h3 className="mt-3.5 font-display text-(length:--text-title-1) leading-tight">
                  {r.title}
                </h3>
                <p className="mt-3 max-w-[44ch] leading-[1.65] text-slate">{r.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow">Enrichment</p>
              <h2 className="mt-5 text-(length:--text-display-3)">Offered daily, never insisted on.</h2>
              <p className="mt-6 max-w-[46ch] leading-[1.7] text-slate">
                Most cats want a quiet room and their own routine rather than company. These are
                here for the ones who want more, and a stay with none of them booked is not a lesser
                stay.
              </p>
              <dl className="mt-9 border-t border-[var(--hairline)]">
                {catEnrichment.map((e) => (
                  <div key={e.slug} className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-4">
                    <dt className="flex-1">
                      <span className="block text-[0.9375rem] text-ink">{e.name}</span>
                      <span className="mt-1 block max-w-[46ch] text-[0.8125rem] leading-snug text-muted">
                        {e.description}
                      </span>
                    </dt>
                    <dd className="shrink-0 font-mono text-[0.9375rem] tabular text-ink">
                      {money(e.price)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow">The cat kitchen</p>
              <h2 className="mt-5 text-(length:--text-display-3)">For cats who stop eating.</h2>
              <p className="mt-6 max-w-[46ch] leading-[1.7] text-slate">
                Cats go off their food away from home far more readily than dogs do. Their own food
                is prepared and served at no charge — this menu exists for the second night, when
                that has not worked.
              </p>
              <dl className="mt-9 border-t border-[var(--hairline)]">
                {(catMenu?.items ?? []).map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-4">
                    <dt className="flex-1">
                      <span className="block text-[0.9375rem] text-ink">{item.name}</span>
                      <span className="mt-1 block max-w-[46ch] text-[0.8125rem] leading-snug text-muted">
                        {item.note}
                      </span>
                    </dt>
                    <dd className="shrink-0 font-mono text-[0.9375rem] tabular text-ink">
                      {item.price === null ? "—" : money(item.price)}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link href="/kitchen" className="link-underline mt-6 inline-block font-medium text-ink">
                The whole kitchen
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
            <Reveal className="frame aspect-3/2 w-full">
              <Img
                asset={images.careCatHands}
                alt="A caregiver's hand resting on a settled, contented cat"
                sizes="(max-width: 1024px) 92vw, 44vw"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="eyebrow">Before a first stay</p>
              <h2 className="mt-5 text-(length:--text-display-3)">What cats need from you.</h2>
              <ul className="mt-8 space-y-3 border-t border-[var(--hairline)] pt-7">
                {vaccineRequirements.cat.map((v) => (
                  <li key={v.name} className="text-[0.9375rem] leading-snug">
                    <span className="text-ink">{v.name}</span>
                    <span className="text-muted"> — {v.detail}</span>
                  </li>
                ))}
                <li className="text-[0.9375rem] leading-snug">
                  <span className="text-ink">Heartworm and flea prevention</span>
                  <span className="text-muted"> — current, year round. Cats get heartworm here too.</span>
                </li>
              </ul>
              <p className="mt-7 max-w-[50ch] leading-[1.65] text-slate">
                Cats do not need a meet and greet before a first stay — being brought here twice is
                worse for them than being brought once. Send your notes instead: where they hide,
                what they refuse, which side the bowl goes.{" "}
                <Link href="/new-guests" className="link-underline text-ink">
                  Everything else a new guest needs
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Check the Cattery."
        body="Fifteen rooms, and the Conservatory takes three cats from one household at a single rate."
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
