import type { Metadata } from "next";
import { kitchen } from "@/data/addons";
import { images } from "@/lib/images";
import { money } from "@/lib/pricing";
import { PageHeroSplit } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Img } from "@/components/ui/Img";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Kitchen",
  description:
    "Their own food, prepared and served at no charge. Plus a short cooked menu — bone broth, poached chicken, seared salmon — for guests who go off their food away from home.",
};

export default function KitchenPage() {
  return (
    <>
      <PageHeroSplit
        eyebrow="The kitchen"
        title="Their own food, cooked to your instructions, free."
        lead="That is the important line on this page. Everything below it is optional, and it exists mostly for animals who stop eating when they are away from home — which is common, and worth having an answer to."
        image={images.feedDog}
        alt="A dog eating a bowl of its own food"
        facts={[
          { label: "Their food", value: "No charge" },
          { label: "Medication", value: "No charge" },
          { label: "Cooked here", value: "Daily, 6am" },
        ]}
      />

      <Section tone="bone" rhythm="default">
        <Container width="narrow">
          <div className="space-y-[clamp(3rem,2rem+3vw,4.5rem)]">
            {kitchen.map((section, si) => (
              <Reveal key={section.title}>
                <div className="flex items-baseline gap-5">
                  <h2 className="font-display text-(length:--text-display-3) leading-none">
                    {section.title}
                  </h2>
                  <span className="h-px flex-1 bg-[var(--hairline)]" />
                </div>
                {section.note ? (
                  <p className="mt-5 max-w-[54ch] leading-[1.7] text-slate">{section.note}</p>
                ) : null}

                <dl className="mt-8">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="grid gap-x-6 gap-y-1.5 border-b border-[var(--hairline)] py-5 sm:grid-cols-[1fr_auto]"
                    >
                      <dt className="font-display text-(length:--text-title-2) leading-snug">
                        {item.name}
                      </dt>
                      <dd className="order-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted sm:order-none sm:col-span-2 sm:row-start-2">
                        {item.note}
                      </dd>
                      <dd className="font-mono text-[0.9375rem] tabular text-ink sm:text-right">
                        {item.price === null ? (
                          <span className="text-success">No charge</span>
                        ) : (
                          money(item.price)
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {si === 0 ? (
                  <div className="frame arch mx-auto mt-14 aspect-4/5 w-full max-w-[22rem]">
                    <Img
                      asset={images.feedCat}
                      alt="Two cats from one household eating side by side"
                      sizes="(max-width: 640px) 90vw, 22rem"
                    />
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="parchment" rhythm="tight">
        <Container width="narrow">
          <Reveal>
            <h2 className="text-(length:--text-display-3)">What we will not do.</h2>
            <ul className="mt-8 space-y-4 border-t border-[var(--hairline)] pt-7">
              <li className="max-w-[58ch] leading-[1.7] text-slate">
                Change your animal&rsquo;s diet without being asked. If they refuse two consecutive
                meals we ring you before we offer anything else.
              </li>
              <li className="max-w-[58ch] leading-[1.7] text-slate">
                Cook with onion, garlic, grapes, or anything else on the list every vet keeps.
                Everything here is unsalted and unseasoned.
              </li>
              <li className="max-w-[58ch] leading-[1.7] text-slate">
                Free-feed. Meals are portioned to your instructions and what is left is weighed and
                written down, because appetite is the first thing to change when an animal is unwell.
              </li>
            </ul>
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Add anything, or nothing."
        body="You can pick meals in the planner, or leave it entirely alone and send their usual bag."
        secondary={{ href: "/rates", label: "All rates" }}
      />
    </>
  );
}
