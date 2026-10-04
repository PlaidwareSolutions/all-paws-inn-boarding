import { ArrowRight } from 'lucide-react'
import { pricingCategories, ratePage, type PriceCategory } from '../data'
import { Words, Reveal } from './primitives'
import SectionTag from './SectionTag'
import BookButton from './BookButton'

/** One rate category, on its own page. */
export default function PricingDetail({ category }: { category: PriceCategory }) {
  const others = pricingCategories.filter(c => c.title !== category.title)

  return (
    <>
      <section aria-labelledby="rate-h" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="gutter">
          <SectionTag name="The rate card" className="mb-8" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <h1 id="rate-h" className="d-2 font-serif text-ink md:col-span-7">
              <Words lines={[category.title]} accentLine={0} />
            </h1>
            <p className="font-sans text-[1.02rem] leading-[1.7] text-ink-70 md:col-span-4 md:col-start-9">
              Every stay includes round-the-clock care and a nightly report card. No booking fees.
            </p>
          </div>

          {/* Rates on the left, the conditions that govern them in the right column rather
              than stacked underneath — the right half of this page was empty, and the notes
              read better beside the prices they qualify than as a footnote below them. */}
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <ul className="border-t border-ink/20">
                {category.items.map(item => (
                  <li key={item.label} className="flex items-baseline gap-4 border-b border-ink/15 py-5">
                    <span className="font-sans text-[1.05rem] text-ink-70">{item.label}</span>
                    <span className="mx-2 flex-1 translate-y-[-0.28em] border-b border-dotted border-ink/30" />
                    <span className="shrink-0 font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] text-ink">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
              <BookButton label="Reserve a room" size="lg" className="mt-10" />
            </Reveal>

            {category.notes && (
              <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
                <h2 className="label text-ink/60">Good to know</h2>
                <ul className="mt-5 space-y-4 border-t border-ink/20 pt-5">
                  {category.notes.map(note => (
                    <li
                      key={note}
                      className="font-sans text-[0.92rem] font-medium leading-[1.65] text-ink"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
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
                  className="group relative z-10 flex items-center justify-between gap-3 rounded-2xl border border-ink/15 bg-bone px-5 py-4 transition-colors duration-300 hover:border-teal/60"
                >
                  <span className="font-serif text-[1.15rem] text-ink transition-colors duration-300 group-hover:text-teal">
                    {o.title}
                  </span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
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
