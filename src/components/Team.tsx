import { motion } from 'framer-motion'
import { team, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="bg-paper-2 py-24 md:py-32">
      <div className="gutter">
        <SectionTag n="03" name="Who looks after them" className="mb-8" />
        <h2 id="team-h" className="d-1 max-w-[16ch] font-serif text-ink">
          <Words lines={['The house,', 'the humans.']} italicLine={1} flameLine={1} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.figure
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-5">
                <span className="block font-serif text-[1.4rem] text-ink">{m.name}</span>
                <span className="mt-1 block font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] text-flame">
                  {m.role}
                </span>
                <p className="mt-3 font-sans text-[0.94rem] leading-[1.7] text-ink-70">{m.bio}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
