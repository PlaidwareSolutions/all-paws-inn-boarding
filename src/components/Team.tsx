import { motion } from 'framer-motion'
import { EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'
import BookButton from './BookButton'

/** The same blank portrait the team cards used, kept while the real ones are away. */
function Avatar({ id }: { id: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-16 w-16 place-items-center rounded-full border border-ink/12 bg-white md:h-20 md:w-20"
    >
      <svg viewBox="0 0 64 64" className="w-[55%]">
        {/* the shoulders run past the disc; the clip cuts them to its edge, so the
            figure sits in the circle instead of floating as a cropped dome */}
        <clipPath id={`team-avatar-${id}`}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
        <circle cx="32" cy="32" r="32" className="fill-ink/[0.13]" />
        <g clipPath={`url(#team-avatar-${id})`} className="fill-white">
          <circle cx="32" cy="24.5" r="9.5" />
          <path d="M32 36c-11 0-20 7.6-20 17v11h40V53c0-9.4-9-17-20-17Z" />
        </g>
      </svg>
    </span>
  )
}

/**
 * The team page while the profiles are being written. It says so plainly and sends
 * people to the one thing that is better than a profile anyway — meeting them.
 */
export default function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="bg-paper-2 pt-10 pb-24 md:pt-14 md:pb-32">
      <div className="gutter">
        <SectionTag name="Who looks after them" className="mb-8" />
        <h1 id="team-h" className="d-2 max-w-[16ch] font-serif text-ink">
          <Words lines={['The house,', 'the humans.']} italicLine={1} accentLine={1} />
        </h1>

        <motion.div
          /* above the fixed paw-print layer (z-0) */
          className="relative z-10 mt-14 overflow-hidden rounded-3xl border border-ink/15 bg-bone px-6 py-16 text-center shadow-[0_20px_50px_-30px_rgba(27,22,19,0.4)] md:mt-20 md:px-10 md:py-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* The discs overlap so they read as a group of people rather than
              three empty slots waiting to be filled. */}
          <div className="flex justify-center -space-x-4 md:-space-x-5">
            {[0, 1, 2].map(i => (
              <Avatar key={i} id={i} />
            ))}
          </div>

          <p className="label mt-8 text-teal">Profiles coming soon</p>
          {/* wide enough that "in person" is not split across the break */}
          <h2 className="d-2 mx-auto mt-4 max-w-[22ch] font-serif text-ink">
            Meet them <span className="italic text-teal">in person</span>.
          </h2>
          <p className="body-lg mx-auto mt-5 max-w-[46ch] text-ink-70">
            This page is being updated. Until it is ready, drop in and say hello — no
            appointment needed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact/"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-8 py-4 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              Visit us
              <span aria-hidden="true">→</span>
            </a>
            <BookButton size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
