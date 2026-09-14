import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { EASE } from '../data'
import HeroMedia from './HeroMedia'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

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
      className="relative min-h-[100svh] overflow-hidden bg-paper"
    >
      {/* full-bleed photo montage */}
      <motion.div style={{ scale: imgScale, y: imgY, x: sx }} className="absolute inset-0">
        <motion.div style={{ y: sy }} className="h-full w-full">
          <HeroMedia />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/15 md:hidden" />
      </motion.div>

      {/* paper panel — the "page" side (desktop) */}
      <div className="absolute inset-y-0 left-0 hidden w-[47%] bg-paper md:block">
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-transparent to-paper" />
      </div>

      {/* marginalia rail */}
      <div className="absolute left-0 top-0 z-20 hidden h-full w-10 items-center justify-center md:flex">
        <span className="rl label whitespace-nowrap text-ink/62">
          Five-star boarding · daycare — Est. Houston, TX
        </span>
      </div>

      {/* the word */}
      <motion.div
        style={{ x: wordX, opacity: fade }}
        className="absolute inset-x-0 bottom-24 z-10 pl-[clamp(1.25rem,4vw,4rem)] md:bottom-[16vh] md:pl-16"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.15, delay: 0.4, ease: EASE }}
            className="whitespace-nowrap pb-[0.12em] pr-[0.12em] font-serif text-[clamp(3.4rem,10vw,9rem)] italic leading-[0.92] tracking-[-0.04em] text-flame [text-shadow:0_2px_22px_rgba(27,22,19,0.14)]"
          >
            Stay and
            <br />
            Play!
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-3 max-w-md font-serif text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.15] text-bone md:text-ink"
        >
          Caring for Clear Lake's pets safely and affordably.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-4 max-w-md font-sans text-[1.02rem] leading-[1.7] text-bone/95 md:text-ink-70"
        >
          We offer protected, stress-free boarding tailored to your pet. From a quick
          day-stay to a week-long getaway, we keep your four-legged family member happy,
          active, and thoroughly pampered.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className="mt-4 flex max-w-sm flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.82rem] font-bold uppercase tracking-[0.1em] text-bone/95 md:text-ink/80"
        >
          <span>Houston</span>
          <span className="text-flame">·</span>
          <span>Clear Lake</span>
          <span className="text-flame">·</span>
          <span>Five minutes from Space Center Houston</span>
        </motion.p>
      </motion.div>

      {/* rotating stamp at the seam */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
        style={{ opacity: fade }}
        className="absolute right-6 top-[22%] z-20 h-24 w-24 md:left-[calc(47%-3.5rem)] md:right-auto md:top-[10%] md:h-28 md:w-28"
      >
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
          <path id="hc" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" fill="none" />
          <text className="fill-bone font-sans text-[10px] uppercase tracking-[0.18em] md:fill-ink">
            <textPath href="#hc">they deserve this · they deserve this · </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 m-auto grid h-8 w-8 place-items-center rounded-full bg-flame text-[0.7rem] text-bone">
          ✦
        </span>
      </motion.div>

    </section>
  )
}
