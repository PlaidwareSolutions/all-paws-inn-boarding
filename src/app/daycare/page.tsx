import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/lib/images";
import { playgroupRules } from "@/data/care";
import { dogDay } from "@/data/timeline";
import { daycareRates } from "@/data/addons";
import { money } from "@/lib/pricing";
import { PageHeroBleed } from "@/components/layout/PageHero";
import { DaycarePricing } from "@/components/sections/DaycarePricing";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InnIcon } from "@/components/ui/InnIcons";

export const metadata: Metadata = {
  title: "Day Guests",
  description:
    "Dog daycare in Clear Lake, Houston. Half and full days, curated playgroups capped at eight, and solo time for dogs who would rather not join in.",
};

export default function DaycarePage() {
  const schedule = dogDay.slice(1, 6);
  return (
    <>
      <PageHeroBleed
        eyebrow="Dogs, daytime"
        title="Somewhere to be while you are at work."
        lead="Drop-off from seven, pickup by six, and a day with enough structure in it that they sleep when they get home. Playgroups are capped at eight and matched on how a dog plays, not how much it weighs."
        image={images.daycareGroup}
        alt="A group of dogs playing together in the yard"
        facts={[
          { label: "Half day", value: money(daycareRates.halfDay) },
          { label: "Full day", value: money(daycareRates.fullDay) },
          { label: "Group size", value: "8 maximum" },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="wide">
          <Reveal className="max-w-[44rem]">
            <p className="eyebrow">Playgroups</p>
            <h2 className="mt-5 text-(length:--text-display-3)">
              The part everybody worries about.
            </h2>
            <p className="mt-6 max-w-[54ch] text-(length:--text-lead) leading-[1.55] text-slate">
              A badly run yard is the single biggest risk in daycare, and it is invisible from the
              car park. Here is exactly how ours is run.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {playgroupRules.map((r, i) => (
              <Reveal as="li" key={r.title} delay={Math.min(i, 2) * 80}>
                <p className="font-mono text-[0.6875rem] tabular text-ember">0{i + 1}</p>
                <h3 className="mt-3.5 font-display text-(length:--text-title-1) leading-tight">
                  {r.title}
                </h3>
                <p className="mt-3 max-w-[44ch] leading-[1.65] text-slate">{r.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="mt-12 max-w-[58ch] border-l-2 border-ember pl-6 leading-[1.7] text-ink">
              If your dog would rather not be in a group at all, say so and we will not put them in
              one. They get solo walks and scent work instead, at the same price. Roughly one day
              guest in six is with us on that basis.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="linen" rhythm="default">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">A day, roughly</p>
              <h2 className="mt-5 text-(length:--text-display-3)">
                Same shape, every day.
              </h2>
              <p className="mt-6 max-w-[46ch] leading-[1.65] text-slate">
                Dogs settle into a routine much faster than they settle into a building, so we keep
                the routine identical and let the building become familiar on its own.
              </p>
              <Link href="/#a-day" className="link-underline mt-7 inline-block font-medium text-ink">
                The full day, hour by hour
              </Link>
            </Reveal>

            <Reveal delay={90}>
              <ol className="border-t border-[var(--hairline)]">
                {schedule.map((s) => (
                  <li
                    key={s.time}
                    className="flex items-start gap-5 border-b border-[var(--hairline)] py-5"
                  >
                    <span className="w-14 shrink-0 pt-0.5 font-mono text-[0.8125rem] tabular text-ember">
                      {s.time}
                    </span>
                    <InnIcon name={s.icon} className="mt-0.5 size-5 shrink-0 text-muted" />
                    <span>
                      <span className="block font-display text-[1.125rem] leading-snug">
                        {s.title}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      <DaycarePricing />

      <Section tone="bone" rhythm="tight">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
            <Reveal className="frame aspect-3/2 w-full">
              <Img
                asset={images.yardTurfDog}
                alt="A dog playing with a ball across the fenced turf yard"
                sizes="(max-width: 1024px) 92vw, 52vw"
              />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-(length:--text-display-3)">The first day is an assessment.</h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-slate">
                Every new day guest does a short weekday morning where we introduce them to a small
                group and watch. It is free, it takes about two hours, and it tells us which group
                they belong in — or whether a group is the wrong idea for them.
              </p>
              <Link
                href="/new-guests"
                className="link-underline mt-7 inline-block font-medium text-ink"
              >
                Book the first morning
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="linen" rhythm="tight">
        <Container width="narrow">
          <Reveal>
            <p className="eyebrow">One thing we do not do</p>
            <h2 className="mt-5 text-(length:--text-display-3)">There is no cat daycare here.</h2>
            <p className="mt-6 leading-[1.7] text-slate">
              We are asked for it and we keep saying no. For almost every cat, the round trip in a
              carrier costs more than the day is worth — the journey is the stressful part, not the
              hours. A cat dropped off at eight and collected at six has had two bad experiences and
              one indifferent one.
            </p>
            <p className="mt-5 leading-[1.7] text-slate">
              If you are away overnight or longer, the{" "}
              <Link href="/cattery" className="link-underline text-ink">Cattery</Link> is its own
              wing with its own locked door and a glazed solarium. If you are out for the day, a
              sitter coming to your house is genuinely the better answer and we will say so.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Come in for a morning."
        body="Free, about two hours, and you will know by lunchtime whether this is right for your dog."
        primary={{ href: "/new-guests", label: "Book a first morning" }}
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
