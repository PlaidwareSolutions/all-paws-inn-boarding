import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { pricingCategories, pricingNotes, ratePage, fromPrice, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

export default function PricingOverview() {
  return (
    <section aria-labelledby="rates-h" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="gutter">
        <SectionTag name="The rate card" className="mb-8" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <h1 id="rates-h" className="d-1 font-serif text-ink md:col-span-7">
            <Words lines={['The stay', 'they deserve.']} italicLine={1} accentLine={1} />
          </h1>
          <p className="font-sans text-[1.02rem] leading-[1.7] text-ink-70 md:col-span-4 md:col-start-9">
            Every stay includes round-the-clock care and a nightly report card. No booking fees.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {pricingCategories.map((c, i) => (
            <motion.a
              key={c.title}
              href={ratePage(c.title)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: EASE }}
              className="group relative z-10 flex flex-col justify-between rounded-3xl border border-ink/15 bg-bone p-7 shadow-[0_20px_50px_-32px_rgba(27,22,19,0.4)] transition-colors duration-500 hover:border-teal/60"
            >
              <div>
                <h2 className="d-3 font-serif text-ink transition-colors duration-300 group-hover:text-teal">
                  {c.title}
                </h2>
                <p className="mt-3 font-sans text-[0.95rem] text-ink-70">
                  {c.items.length} {c.items.length === 1 ? 'rate' : 'rates'}
                  {fromPrice(c.items) && (
                    <>
                      , from <span className="font-bold text-ink">{fromPrice(c.items)}</span>
                    </>
                  )}
                </p>
              </div>
              <span className="mt-6 flex items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">
                <span className="ul-draw">See rates</span>
                <ArrowRight size={14} className="text-teal transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </div>

        <ul className="mt-10 space-y-1.5">
              {pricingNotes.map(note => (
                <li key={note} className="font-sans text-[0.88rem] italic leading-relaxed text-ink/68">
                  *{note}
                </li>
              ))}
            </ul>
      </div>
    </section>
  )
}
