import { motion } from 'framer-motion'
import { services, servicePage, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

/* Three cards, then two wider ones — a 6-column grid keeps the last row from orphaning. */
const span = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']
const crop = ['aspect-[4/3]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[16/9]', 'aspect-[16/9]']

/** The Services page — each card opens that service's own page. */
export default function ServicesOverview() {
  return (
    <section aria-labelledby="svc-overview-h" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="gutter">
        <SectionTag name="Services" className="mb-8" />

        <div>
          <h1 id="svc-overview-h" className="d-1 font-serif text-ink">
            <Words lines={['Five ways', 'to stay.']} italicLine={1} accentLine={1} inline />
          </h1>
          <p className="lede measure mt-5 text-ink-70">
            Boarding, daycare and bathing for dogs and cats — all of it run by the same
            people, to the same standard.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-6">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href={servicePage(s.title)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              className={`group relative z-10 overflow-hidden rounded-3xl border border-ink/15 bg-bone shadow-[0_20px_50px_-30px_rgba(27,22,19,0.4)] transition-colors duration-500 hover:border-teal/60 ${span[i]}`}
            >
              <div className={`w-full overflow-hidden ${crop[i]}`}>
                <img
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_30%] transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>

              <div className="flex items-start gap-4 p-6 md:p-7">
                <div>
                  <h2 className="d-3 font-serif text-ink transition-colors duration-300 group-hover:text-teal">
                    {s.title}
                  </h2>
                  <p className="mt-2 body text-ink-70">{s.line}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
