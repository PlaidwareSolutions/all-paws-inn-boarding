import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import { EASE } from '../data'

/** Mobile only — a hairline bar, not a button. */
export default function StickyBookingCTA() {
  const { openBooking, isOpen } = useBooking()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && !isOpen && (
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-paper/95 px-3 py-3 backdrop-blur lg:hidden"
        >
          <button
            onClick={() => openBooking()}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-flame py-3.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bone"
          >
            Book now
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
