import { motion } from 'framer-motion'
import { team, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="bg-paper-2 py-24 md:py-32">
      <div className="gutter">
        <SectionTag name="Who looks after them" className="mb-8" />
        <h2 id="team-h" className="d-1 max-w-[16ch] font-serif text-ink">
          <Words lines={['The house,', 'the humans.']} italicLine={1} accentLine={1} />
        </h2>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20">
          {team.map((m, i) => (
            <motion.figure
              key={m.name}
              /* above the fixed paw-print layer (z-0), which otherwise walks across the cards */
              className="relative z-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium hover:scale-[1.04]"
                  />
                ) : (
                  /* No photograph yet — a plain avatar holds the slot, so real portraits drop in
                     later without the layout moving. The caption below carries the name. */
                  <span
                    aria-hidden="true"
                    className="grid h-full w-full place-items-center border border-ink/12 bg-white"
                  >
                    <svg viewBox="0 0 64 64" className="w-[45%]" aria-hidden="true">
                      {/* the shoulders run past the disc; the clip cuts them to its edge, so the
                          figure sits in the circle instead of floating as a cropped dome */}
                      <clipPath id={`avatar-disc-${i}`}>
                        <circle cx="32" cy="32" r="32" />
                      </clipPath>
                      <circle cx="32" cy="32" r="32" className="fill-ink/[0.13]" />
                      <g clipPath={`url(#avatar-disc-${i})`} className="fill-white">
                        <circle cx="32" cy="24.5" r="9.5" />
                        <path d="M32 36c-11 0-20 7.6-20 17v11h40V53c0-9.4-9-17-20-17Z" />
                      </g>
                    </svg>
                  </span>
                )}
              </div>
              <figcaption className="mt-5">
                <span className="block font-serif text-[1.4rem] text-ink">{m.name}</span>
                <span className="mt-1 block font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] text-teal">
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
