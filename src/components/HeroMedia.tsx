import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { heroImages, EASE } from '../data'

/** A looping, ken-burns photo montage — the hero plays like a short film. */
export default function HeroMedia() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI(p => (p + 1) % heroImages.length), 3600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {heroImages.map((src, idx) => {
        const active = i === idx
        return (
          <motion.img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={idx === 0 ? 'eager' : 'lazy'}
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.12 : 1.02 }}
            transition={{
              opacity: { duration: 1.3, ease: EASE },
              scale: { duration: 4.4, ease: 'linear' },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      })}

      {/* progress ticks */}
      <div className="absolute bottom-6 right-6 z-10 hidden gap-1.5 md:flex">
        {heroImages.map((_, idx) => (
          <span
            key={idx}
            className={`h-[3px] w-6 transition-colors duration-500 ${
              i === idx ? 'bg-bone' : 'bg-bone/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
