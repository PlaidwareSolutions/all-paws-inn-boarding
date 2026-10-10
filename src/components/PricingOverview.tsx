import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { pricingCategories, ratePage, fromPrice, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

export default function PricingOverview() {
  return (
    <section aria-labelledby="rates-h" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="gutter">
        <SectionTag name="The rate card" className="mb-8" />

        <div>
          <h1 id="rates-h" className="d-1 font-serif text-ink">
            <Words
              lines={['Your pet’s home', 'away from home.']}
              italicLine={1}
              accentLine={1}
              inline
            />
          </h1>
          <p className="lede measure mt-5 text-ink-70">
            Explore our flexible hourly, daily, and overnight rates designed to fit your busy
            lifestyle.
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
              className="group relative z-10 flex flex-col justify-between rounded-3xl border border-ink/15 bg-bone p-7 shadow-[0_20px_50px_-32px_rgba(27,22,19,0.4)] transition duration-300 hover:border-flame hover:shadow-[0_0_0_6px_rgba(244,85,29,0.38),0_0_38px_2px_rgba(244,85,29,0.45)]"
            >
              <div>
                <h2 className="d-3 font-serif text-ink transition-colors duration-300 group-hover:text-flame">
                  {c.title}
                </h2>
                <p className="mt-3 body-sm text-ink-70">
                  {c.items.length} {c.items.length === 1 ? 'rate' : 'rates'}
                  {fromPrice(c.items) && (
                    <>
                      , from <span className="font-semibold text-teal">{fromPrice(c.items)}</span>
                    </>
                  )}
                </p>
              </div>
              <span className="mt-6 flex items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">
                <span className="ul-draw">See rates</span>
                <ArrowRight size={14} className="text-teal transition duration-300 group-hover:translate-x-1 group-hover:text-flame" />
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
