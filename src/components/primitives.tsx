import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../data'

/* ── Reveal: opacity + small rise, once ── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'span' | 'p' | 'figure'
  id?: string
}) {
  const Tag = motion[as]
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/* ── Words: line-by-line rise inside a clip mask ── */
export function Words({
  lines,
  className = '',
  italicLine,
  accentLine,
  delay = 0,
  inline = false,
}: {
  lines: string[]
  className?: string
  italicLine?: number
  accentLine?: number
  delay?: number
  /** Run the parts on one line, wrapping only if the viewport forces it. Each part keeps
      its own italic/accent styling and its own reveal, so the device survives. */
  inline?: boolean
}) {
  return (
    <motion.span
      className={`block ${className}`}
      initial="h"
      whileInView="v"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={`overflow-hidden pb-[0.08em] ${
            inline ? 'inline-block align-bottom' : 'block'
          } ${inline && i < lines.length - 1 ? 'mr-[0.26em]' : ''}`}
        >
          <motion.span
            className={`block ${italicLine === i ? 'italic' : ''} ${accentLine === i ? 'text-teal' : ''}`}
            variants={{
              h: { y: '105%', opacity: 0 },
              v: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ── ClipImage: scroll-triggered clip-path wipe (IntersectionObserver) ── */
export function ClipImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  from = 'bottom',
  eager = false,
  position,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  from?: 'bottom' | 'left'
  eager?: boolean
  /** object-position for this image. Inline, so it always beats the default class. */
  position?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const hidden = from === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)'

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={{
          ...(position ? { objectPosition: position } : null),
          clipPath: shown ? 'inset(0 0 0 0)' : hidden,
          transition: 'clip-path 1.05s cubic-bezier(.16,1,.3,1), transform 1.4s cubic-bezier(.16,1,.3,1)',
          transform: shown ? 'scale(1)' : 'scale(1.12)',
        }}
        className={`h-full w-full object-cover object-[50%_30%] ${imgClassName}`}
      />
    </div>
  )
}
