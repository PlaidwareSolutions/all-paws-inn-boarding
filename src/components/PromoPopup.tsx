import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE } from '../data'
import BookButton from './BookButton'

/** Served from /public, so the flyer can be swapped without a rebuild touching code. */
const FLYER_SRC = '/promo/grand-opening-flyer.webp'

/* When the offer last appeared, as epoch milliseconds. Kept in localStorage so the
   10-minute clock is shared by every tab and survives closing the browser. Bump the key
   when the flyer changes, so every visitor sees the new offer straight away. */
const LAST_SHOWN_KEY = 'apinn-promo-grand-opening-last-shown'

/** The offer comes back once this long has passed since it last appeared. */
const REPEAT_MS = 10 * 60 * 1000

/** Short pause after load, so the page has painted before the offer covers it. */
const OPEN_DELAY_MS = 1200

const FLYER_ALT =
  "We're open! All Paws Inn pet boarding and daycare, 1051 Pineloch Dr. Ste 700, Houston, TX 77062. " +
  'One free daycare for new clients only; pets must be fully vaccinated. Daycare and boarding starting at $25. ' +
  '15% off for first responders, military, nurses and teachers, with valid professional ID or other proof of eligibility at check-in. ' +
  'Free Saturday and Sunday with the purchase of Monday to Friday. ' +
  'Free day of daycare with the purchase of 5 daycare days. ' +
  'One coupon per client, not valid with any other offers.'

function lastShown(): number {
  try {
    return Number(localStorage.getItem(LAST_SHOWN_KEY)) || 0
  } catch {
    return 0
  }
}

function markShown() {
  try {
    localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()))
  } catch {
    /* storage blocked: the offer then shows on every page load */
  }
}

/* A browser reports a normal reload and a hard reload (Ctrl+Shift+R) the same way, so
   both count. Clicking a link to another page does not. */
function isReload() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  return nav?.type === 'reload'
}

/** The grand-opening flyer, raised over the page on a reload and every ten minutes. */
export default function PromoPopup() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  /* Show it on a reload, or once ten minutes have passed since it last appeared. While
     the visitor stays on one page, a timer brings it back when the ten minutes run out. */
  useEffect(() => {
    let timer: number

    const show = () => {
      setOpen(true)
      markShown()
      schedule()
    }

    const schedule = () => {
      const wait = Math.max(lastShown() + REPEAT_MS - Date.now(), OPEN_DELAY_MS)
      timer = window.setTimeout(() => {
        /* Another tab may have shown it in the meantime and reset the clock. */
        if (Date.now() - lastShown() >= REPEAT_MS) show()
        else schedule()
      }, wait)
    }

    if (isReload() || Date.now() - lastShown() >= REPEAT_MS) {
      timer = window.setTimeout(show, OPEN_DELAY_MS)
    } else {
      schedule()
    }
    return () => window.clearTimeout(timer)
  }, [])

  /* Lock the page behind it, close on Escape, and hand focus to the close button. */
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="promo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="All Paws Inn grand opening offers"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={e => e.stopPropagation()}
            /* 0.7727 = 2040 / 2640: the width at which the flyer plus the action row fits the
               viewport height, leaving 9rem for padding and the row beneath it. */
            style={{ maxWidth: 'min(30rem, calc((100svh - 9rem) * 0.7727))' }}
            className="relative flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-bone shadow-lift"
          >
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close offer"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/80 text-bone transition-colors duration-300 hover:bg-flame"
            >
              <X size={18} />
            </button>

            {/* The flyer keeps its own 2040 × 2640 proportions; the dialog's width is capped
                by the viewport height above, so the whole flyer fits without scrolling. */}
            <img
              src={FLYER_SRC}
              alt={FLYER_ALT}
              width={2040}
              height={2640}
              className="h-auto w-full"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-5 py-4">
              <button
                onClick={() => setOpen(false)}
                className="ul-draw font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-70 transition-colors hover:text-ink"
              >
                Maybe later
              </button>
              <BookButton label="Claim offer" size="sm" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
