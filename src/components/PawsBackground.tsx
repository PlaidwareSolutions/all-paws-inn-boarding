import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/* ── Walking trails ───────────────────────────────────────────────────────────
   Each trail is a path across the viewport. Prints are laid down one at a time as
   you scroll — alternating left/right of the centre line like a real gait, each one
   turned to face the way it's going — so it reads as an animal walking through,
   not a field of floating paws. Coordinates are viewport percentages.          */

interface Trail {
  from: [number, number]
  to: [number, number]
  steps: number
  gait: number // half-width between left and right prints
  startAt: number // scroll progress where the walk begins
  endAt: number //  …and where it finishes
  size: number
}

/* Fewer, bigger prints — a large animal crossing the page, with a long stride between
   steps. Ranges still overlap a little so a new walk starts before the last one lifts. */
const TRAILS: Trail[] = [
  /* negative start: this one is already part-walked when the page loads, so the top of the
     page isn't bare while the first trail is still finding its feet */
  { from: [-8, 50], to: [96, 14], steps: 8, gait: 3.4, startAt: -0.1, endAt: 0.14, size: 50 },
  { from: [-6, 88], to: [104, 46], steps: 9, gait: 3.6, startAt: 0.06, endAt: 0.3, size: 58 },
  { from: [104, 14], to: [-8, 60], steps: 9, gait: 3.4, startAt: 0.24, endAt: 0.48, size: 52 },
  { from: [10, -10], to: [66, 108], steps: 8, gait: 3.2, startAt: 0.42, endAt: 0.64, size: 46 },
  { from: [104, 104], to: [20, -10], steps: 9, gait: 3.5, startAt: 0.58, endAt: 0.82, size: 60 },
  { from: [-8, 32], to: [106, 80], steps: 9, gait: 3.3, startAt: 0.76, endAt: 1.0, size: 54 },
]

interface Print {
  left: number
  top: number
  rot: number
  size: number
  at: number // scroll progress when this paw lands
  gone: number //  …and when the trail behind it lifts
}

function buildPrints(): Print[] {
  const out: Print[] = []

  for (const t of TRAILS) {
    const [x0, y0] = t.from
    const [x1, y1] = t.to
    const dx = x1 - x0
    const dy = y1 - y0
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    /* the paw art points "up", so rotate by the heading measured from straight up */
    const rot = (Math.atan2(ux, -uy) * 180) / Math.PI
    /* perpendicular, for the left/right stagger of the gait */
    const px = -uy
    const py = ux

    for (let i = 0; i < t.steps; i++) {
      const p = i / (t.steps - 1)
      const side = i % 2 === 0 ? 1 : -1
      const wobble = ((i * 37) % 11) / 11 - 0.5 // a little irregularity per step
      out.push({
        left: x0 + dx * p + px * t.gait * side,
        top: y0 + dy * p + py * t.gait * side,
        rot: rot + side * 7 + wobble * 9,
        size: t.size,
        at: t.startAt + (t.endAt - t.startAt) * p,
        gone: t.endAt + 0.06 + p * 0.02,
      })
    }
  }
  return out
}

const PRINTS = buildPrints()

function PawIcon({ size }: { size: number }) {
  /* Sizes are tuned for a ~1440px viewport. Fixed pixels would make these enormous relative
     to a phone screen — big enough to swallow the copy — so scale with the viewport width
     and cap at the intended size. */
  const scaled = `clamp(${Math.round(size * 0.62)}px, ${((size / 1440) * 100).toFixed(2)}vw, ${size}px)`
  return (
    <svg
      viewBox="0 0 64 64"
      style={{ width: scaled, height: scaled }}
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="44" rx="17" ry="14" />
      <ellipse cx="13" cy="22" rx="7.5" ry="9.5" transform="rotate(-20 13 22)" />
      <ellipse cx="30" cy="10" rx="7.5" ry="9.5" />
      <ellipse cx="47" cy="14" rx="7.5" ry="9.5" transform="rotate(20 47 14)" />
      <ellipse cx="55" cy="32" rx="7" ry="8.5" transform="rotate(38 55 32)" />
    </svg>
  )
}

function Step({ print, progress }: { print: Print; progress: MotionValue<number> }) {
  const { at, gone } = print
  /* land quickly, hold while the walk continues, then lift behind the animal */
  const opacity = useTransform(progress, [at - 0.012, at, gone, gone + 0.05], [0, 1, 1, 0])
  /* a small press as the paw sets down */
  const scale = useTransform(progress, [at - 0.012, at, at + 0.01], [0.72, 1.06, 1])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${print.left}%`,
        top: `${print.top}%`,
        rotate: print.rot,
        opacity,
        scale,
      }}
      className="text-ink"
    >
      <PawIcon size={print.size} />
    </motion.div>
  )
}

/** Paw prints that walk across the page as you scroll. Fixed, faint, non-interactive.
    z-0 keeps them beneath every positioned element (hero, cards, the header), and the
    low-opacity multiply makes them read as an impression in the paper rather than a
    layer sitting on top of the copy. */
export default function PawsBackground() {
  const { scrollYProgress } = useScroll()
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.16] mix-blend-multiply"
    >
      {PRINTS.map((p, i) => (
        <Step key={i} print={p} progress={scrollYProgress} />
      ))}
    </div>
  )
}
