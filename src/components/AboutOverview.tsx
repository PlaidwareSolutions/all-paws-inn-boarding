import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { story, heroImages, EASE } from '../data'
import { Words } from './primitives'
import SectionTag from './SectionTag'

const cards = [
  {
    href: '/about/our-story/',
    title: 'Our Story',
    line: 'Twenty years of pet hospitality across the country, now on one street in Clear Lake.',
    image: story.image,
    alt: story.imageAlt,
  },
  {
    href: '/about/team/',
    title: 'Team',
    line: 'David and Andrea Little, and the people who feed, walk, groom and sit up all night with your pets.',
    image: heroImages[1],
    alt: 'A dog mid-play in the afternoon sun',
  },
]

export default function AboutOverview() {
  return (
    <section aria-labelledby="about-h" className="bg-paper pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="gutter">
        <SectionTag name="About us" className="mb-8" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <h1 id="about-h" className="d-1 font-serif text-ink md:col-span-7">
            <Words lines={['The house,', 'and the humans.']} italicLine={1} accentLine={1} />
          </h1>
          <p className="font-sans text-[1.02rem] leading-[1.8] text-ink-70 md:col-span-4 md:col-start-9">
            One house in Clear Lake, Houston, run by David and Andrea Little — 20+ years of pet
            hospitality, five minutes from Space Center Houston.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.a
              key={c.href}
              href={c.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative z-10 overflow-hidden rounded-3xl border border-ink/15 bg-bone shadow-[0_20px_50px_-30px_rgba(27,22,19,0.4)] transition-colors duration-500 hover:border-teal/60"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_30%] transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-7">
                <div>
                  <h2 className="d-3 font-serif text-ink transition-colors duration-300 group-hover:text-teal">
                    {c.title}
                  </h2>
                  <p className="mt-2 font-sans text-[0.98rem] leading-[1.65] text-ink-70">{c.line}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="mt-2 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
