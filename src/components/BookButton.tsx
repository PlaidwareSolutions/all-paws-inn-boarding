import { ArrowRight } from 'lucide-react'
import { GINGR_BOOKING_URL } from '../data'

/**
 * The one call-to-action on the site. Booking lives in Gingr, so this is a link
 * out rather than a button that opens anything here.
 */
export default function BookButton({
  label = 'Book now',
  size = 'md',
  tone = 'flame',
  className = '',
}: {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: 'flame' | 'ink' | 'bone'
  className?: string
}) {
  const pad =
    size === 'lg'
      ? 'px-9 py-4 text-[0.76rem]'
      : size === 'sm'
      ? 'px-5 py-2.5 text-[0.64rem]'
      : 'px-7 py-3.5 text-[0.7rem]'

  const skin =
    tone === 'ink'
      ? 'bg-ink text-bone hover:bg-flame'
      : tone === 'bone'
      ? 'bg-bone text-ink hover:bg-flame hover:text-bone'
      : 'bg-flame text-bone hover:bg-ember'

  return (
    <a
      href={GINGR_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full font-sans font-semibold uppercase tracking-[0.18em] shadow-[0_14px_34px_-14px_rgba(244,85,29,0.55)] transition-colors duration-400 ${skin} ${pad} ${className}`}
    >
      {label}
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
