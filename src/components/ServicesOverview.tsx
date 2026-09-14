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
    <section aria-labelledby="svc-overview-h" className="bg-paper py-20 md:py-28">
      <div className="gutter">
        <SectionTag n="01" name="Services" className="mb-8" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <h1 id="svc-overview-h" className="d-1 font-serif text-ink md:col-span-7">
            <Words lines={['Five ways', 'to stay.']} italicLine={1} flameLine={1} />
          </h1>
          <p className="font-sans text-[1.02rem] leading-[1.8] text-ink-70 md:col-span-4 md:col-start-9">
            Boarding, daycare and grooming for dogs and cats — all of it run by the same
            people, to the same standard.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-6">
          {services.map((s, i) => (
            <motion.a
              key={s.n}
              href={servicePage(s.title)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              className={`group overflow-hidden rounded-3xl border border-ink/15 bg-bone shadow-[0_20px_50px_-30px_rgba(27,22,19,0.4)] transition-colors duration-500 hover:border-flame/60 ${span[i]}`}
            >
              <div className={`w-full overflow-hidden ${crop[i]}`}>
                <img
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>

              <div className="flex items-start gap-4 p-6 md:p-7">
                <span className="mt-1.5 font-sans text-[0.72rem] tabular-nums text-flame">{s.n}</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-ink transition-colors duration-300 group-hover:text-flame">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-sans text-[0.97rem] leading-[1.65] text-ink-70">{s.line}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
