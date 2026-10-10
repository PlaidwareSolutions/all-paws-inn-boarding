import { ArrowRight } from 'lucide-react'
import { pricingCategories, ratePage, type PriceCategory, type PriceItem } from '../data'
import { Words, Reveal } from './primitives'
import SectionTag from './SectionTag'
import BookButton from './BookButton'

/** One rate category, on its own page. */
export default function PricingDetail({ category }: { category: PriceCategory }) {
  const others = pricingCategories.filter(c => c.title !== category.title)

  /* "Additional Dog/Cat — ..." rows always follow the rate they modify in the sheet,
     so they fold into that row rather than standing beside it as an equal choice. */
  const rows = category.items.reduce<{ item: PriceItem; modifiers: PriceItem[] }[]>((acc, item) => {
    if (item.label.startsWith('Additional') && acc.length)
      acc[acc.length - 1].modifiers.push(item)
    else acc.push({ item, modifiers: [] })
    return acc
  }, [])

  return (
    <>
      <section aria-labelledby="rate-h" className="relative z-10 bg-bone pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="gutter">
          <SectionTag name="The rate card" className="mb-8" />

          <div>
            <h1 id="rate-h" className="d-2 font-serif text-ink">
              <Words lines={[category.title]} accentLine={0} />
            </h1>
            {category.intro ? (
              /* The intro runs the full width of the rate list beneath it rather than
                 stopping two thirds of the way across. Set as one column it would be
                 ~135 characters a line, so the paragraphs sit side by side instead —
                 the width is filled and a line stays about 65 characters. */
              <div className="mt-4 md:columns-2 md:gap-12 lg:gap-16">
                {category.intro.map(para => (
                  <p
                    key={para}
                    className="break-inside-avoid body-lg pb-4 text-ink-70 md:pb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <p className="lede mt-4 max-w-2xl text-ink-70">
                Every stay includes round-the-clock care and a nightly report card. No booking
                fees.
              </p>
            )}
          </div>

          {/* The menu pattern: name, leader, price on one line, with what the rate covers
              on a second line beneath it. The previous three-column grid left a 388px hole
              between a short label and its description, and nothing tied the name to its
              price. The leader does that job, and putting the detail underneath rather
              than beside makes it read as subordinate without having to fade it away. */}
          <Reveal className="mt-12">
            <ul className="border-t border-ink/20">
              {rows.map(({ item, modifiers }) => (
                <li key={`${item.label}-${item.price}`} className="border-b border-ink/15 py-6">
                  <div className="flex items-baseline gap-4">
                    <span className="body-lg font-medium text-ink">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="mx-1 flex-1 translate-y-[-0.3em] border-b border-dotted border-ink/30"
                    />
                    <span className="shrink-0 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-none text-teal">
                      {item.price}
                    </span>
                  </div>
                  {!category.intro && (
                    <p className="measure mt-2 body text-ink-70">{item.detail}</p>
                  )}

                  {/* An "Additional dog" rate is not a product of its own — it modifies the
                      rate above it, so it is nested and a step quieter throughout. */}
                  {modifiers.map(mod => (
                    <div
                      key={`${mod.label}-${mod.price}`}
                      className="mt-5 border-l-2 border-ink/15 pl-4 md:pl-5"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="body font-medium text-ink-70">{mod.label}</span>
                        <span
                          aria-hidden="true"
                          className="mx-1 flex-1 translate-y-[-0.3em] border-b border-dotted border-ink/20"
                        />
                        <span className="shrink-0 font-serif text-[1.6rem] leading-none text-teal">
                          {mod.price}
                        </span>
                      </div>
                      {!category.intro && (
                        <p className="measure mt-1.5 body-sm text-ink/55">{mod.detail}</p>
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
            <BookButton label="Reserve a room" size="lg" className="mt-10" />
          </Reveal>

          {/* The sheet prints its conditions under each table, so they sit at the foot of
              the section here too rather than off in a sidebar. */}
          {category.notes && !category.intro && (
            <Reveal
              delay={0.1}
              className="mt-14 border-t border-ink/20 pt-8"
            >
              <h2 className="label text-ink/60">Good to know</h2>
              <ul
                className={`mt-5 space-y-3 ${
                  category.notes.length > 3 ? 'md:columns-2 md:gap-10 md:space-y-0' : 'measure'
                }`}
              >
                {category.notes.map(note => (
                  <li
                    key={note}
                    className="break-inside-avoid body pb-3 text-ink-70"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

        </div>
      </section>

      <section aria-labelledby="other-rates-h" className="bg-paper-2 py-16 md:py-20">
        <div className="gutter">
          <h2 id="other-rates-h" className="label text-ink/60">
            Other rates
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(o => (
              <li key={o.title}>
                <a
                  href={ratePage(o.title)}
                  className="group relative z-10 flex items-center justify-between gap-3 rounded-2xl border border-ink/15 bg-bone px-5 py-4 transition duration-300 hover:border-flame hover:shadow-[0_0_0_5px_rgba(244,85,29,0.38),0_0_26px_0_rgba(244,85,29,0.40)]"
                >
                  <span className="font-serif text-[1.15rem] text-ink transition-colors duration-300 group-hover:text-flame">
                    {o.title}
                  </span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-teal transition duration-300 group-hover:translate-x-1 group-hover:text-flame"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
