import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { EASE } from '../data'
import HeroMedia from './HeroMedia'
import BookButton from './BookButton'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20 })
  const sy = useSpring(py, { stiffness: 40, damping: 20 })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 900) return
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 20)
      py.set((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [px, py])

  return (
    <section
      ref={ref}
      id="top"
      aria-label="ALL PAWS INN"
      /* bg-ink, not bg-paper: the photograph covers the whole section now, so the only
         time this shows is the instant before the first frame paints. */
      className="relative min-h-[calc(100svh-var(--header-h,0px))] overflow-hidden bg-ink"
    >
      {/* the photograph, edge to edge */}
      <motion.div style={{ scale: imgScale, y: imgY, x: sx }} className="absolute inset-0">
        <motion.div style={{ y: sy }} className="h-full w-full">
          <HeroMedia />
        </motion.div>
      </motion.div>

      {/* Two scrims, because the copy sits on the picture rather than beside it. The first
          darkens the foot of the frame where the words are; the second only leans in from
          the left on wider screens, where the text column does not reach the right edge.
          Together they hold contrast without flattening the photograph. */}
      <div
        aria-hidden="true"
        /* Phones carry the whole text column over the picture with no side scrim to help,
           so the base stops are much heavier; md+ lightens them again because the
           left-hand scrim below is doing the work there. */
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/72 to-ink/20 md:from-ink/92 md:via-ink/45 md:to-ink/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/30 to-transparent md:block"
      />

      {/* marginalia rail */}
      <div className="absolute left-0 top-0 z-20 hidden h-full w-10 items-center justify-center md:flex">
        <span className="rl label whitespace-nowrap text-bone/70">
          Five-star boarding · daycare — Est. Houston, TX
        </span>
      </div>

      <motion.div
        style={{ x: wordX }}
        className="absolute inset-x-0 bottom-12 z-10 pl-[clamp(1.25rem,4vw,4rem)] pr-5 md:bottom-[9vh] md:pl-16 md:pr-0"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.15, delay: 0.4, ease: EASE }}
            className="whitespace-nowrap pb-[0.12em] pr-[0.12em] font-serif text-[clamp(2.7rem,10vw,9rem)] italic leading-[0.92] tracking-[-0.04em] text-bone [text-shadow:0_4px_30px_rgba(27,22,19,0.55)]"
          >
            Stay and Play!
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-3 max-w-lg font-serif text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.15] text-bone"
        >
          Caring for Clear Lake's pets safely and affordably.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-4 max-w-lg font-sans text-[1.02rem] leading-[1.7] text-bone/90"
        >
          We offer protected, stress-free boarding tailored to your pet. From a quick
          day-stay to a week-long getaway, we keep your four-legged family member happy,
          active, and thoroughly pampered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <BookButton size="lg" />
          <p className="flex max-w-sm flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.8rem] font-bold uppercase tracking-[0.1em] text-bone/85">
            <span>Houston</span>
            <span className="text-teal-soft">·</span>
            <span>Clear Lake</span>
            <span className="text-teal-soft">·</span>
            <span>Five minutes from Space Center Houston</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
