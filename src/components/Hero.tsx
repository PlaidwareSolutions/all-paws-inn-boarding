import { motion } from 'framer-motion'
import { EASE } from '../data'
import HeroMedia from './HeroMedia'
import BookButton from './BookButton'

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="ALL PAWS INN"
      /* The photograph sits beside the copy rather than under it, so no face is hidden
         behind text and the words need no scrim to stay readable. The horizontal drift
         the copy used to have on scroll is gone — it read as the text sliding away. */
      className="relative bg-paper md:min-h-[calc(100svh-var(--header-h,0px))]"
    >
      <div className="grid grid-cols-1 md:min-h-[calc(100svh-var(--header-h,0px))] md:grid-cols-2">
        {/* copy — left on desktop, beneath the photograph on a phone */}
        <div className="order-2 flex flex-col justify-center gutter py-12 md:order-1 md:py-16 lg:pl-16">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="max-w-[17ch] font-serif text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.12] tracking-[-0.02em] text-ink"
          >
            A Happy Place to Stay, Play &amp; Feel at Home.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="measure mt-6 space-y-5"
          >
            <p className="body text-ink-70">
              At All Paws Inn, we know pets are family. Whether your best friend is spending
              the day playing, settling in for an overnight stay, or enjoying a little extra
              one-on-one attention, our goal is simple: provide a safe, comfortable and caring
              place where pets can feel at home — and their people can feel confident leaving
              them in our care.
            </p>
            <p className="body text-ink-70">
              Serving pet families in the Webster and Clear Lake area, All Paws Inn offers dog
              and cat daycare, boarding, enrichment and bathing services. Grooming services are
              planned as we grow.
            </p>
            <p className="body-lg font-medium text-teal">
              Come. Stay. Play. We&rsquo;ll take care of the rest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-8"
          >
            <BookButton size="lg" />
          </motion.div>
        </div>

        {/* the photograph, given its own half of the page */}
        <div className="order-1 relative min-h-[46svh] overflow-hidden md:order-2 md:min-h-0">
          <HeroMedia />
        </div>
      </div>
    </section>
  )
}
