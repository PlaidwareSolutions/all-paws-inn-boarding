import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE } from '../data'
import {
  addDays,
  addMonths,
  fmtMonth,
  monthGrid,
  nightsBetween,
  startOfMonth,
  stayLabel,
  todayISO,
} from '../lib/dates'

export interface DateRange {
  checkIn: string
  checkOut: string
}

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/** Quick stays, measured from today. `nights: 0` is a same-day daycare visit. */
const presets = [
  { id: 'today', label: 'Today', nights: 0 },
  { id: 'one', label: 'One day', nights: 1 },
  { id: 'two', label: 'Two days', nights: 2 },
] as const

function presetRange(nights: number): DateRange {
  const t = todayISO()
  return { checkIn: t, checkOut: addDays(t, nights) }
}

/** The panel: preset chips over a single month that takes both ends of the stay. */
export function DateRangePicker({
  value,
  onChange,
  onComplete,
  className = '',
}: {
  value: DateRange
  onChange: (r: DateRange) => void
  onComplete?: () => void
  className?: string
}) {
  const today = todayISO()
  const [month, setMonth] = useState(() => startOfMonth(value.checkIn || today))
  const [picking, setPicking] = useState<'start' | 'end'>('start')
  const [hover, setHover] = useState<string | null>(null)
  const [custom, setCustom] = useState(false)

  const { checkIn, checkOut } = value
  const activePreset = custom
    ? 'custom'
    : presets.find(p => {
        const r = presetRange(p.nights)
        return r.checkIn === checkIn && r.checkOut === checkOut
      })?.id ?? 'custom'

  /* while choosing the far end, preview the range under the cursor */
  const previewEnd = picking === 'end' && hover && hover >= checkIn ? hover : checkOut

  const pick = (day: string) => {
    setCustom(true)
    if (picking === 'start' || !checkIn || day < checkIn) {
      onChange({ checkIn: day, checkOut: '' })
      setPicking('end')
      return
    }
    onChange({ checkIn, checkOut: day })
    setPicking('start')
    onComplete?.()
  }

  const applyPreset = (nights: number) => {
    setCustom(false)
    setPicking('start')
    const r = presetRange(nights)
    setMonth(startOfMonth(r.checkIn))
    onChange(r)
  }

  return (
    <div className={`font-sans ${className}`}>
      {/* presets */}
      <div className="flex flex-wrap gap-2 border-b border-ink/12 pb-4">
        {presets.map(p => {
          const on = activePreset === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.nights)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
                on
                  ? 'border-teal bg-teal text-bone'
                  : 'border-ink/20 text-ink/72 hover:border-ink/50 hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => {
            setCustom(true)
            setPicking('start')
            onChange({ checkIn: '', checkOut: '' })
          }}
          aria-pressed={activePreset === 'custom'}
          className={`rounded-full border px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
            activePreset === 'custom'
              ? 'border-teal bg-teal text-bone'
              : 'border-ink/20 text-ink/72 hover:border-ink/50 hover:text-ink'
          }`}
        >
          Custom
        </button>
      </div>

      {/* month nav */}
      <div className="flex items-center justify-between px-1 pb-3 pt-4">
        <button
          type="button"
          onClick={() => setMonth(m => addMonths(m, -1))}
          disabled={startOfMonth(today) >= month}
          aria-label="Previous month"
          className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft size={17} />
        </button>
        <span className="font-serif text-[1.15rem] text-ink">{fmtMonth(month)}</span>
        <button
          type="button"
          onClick={() => setMonth(m => addMonths(m, 1))}
          aria-label="Next month"
          className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {DOW.map((d, i) => (
          <span
            key={i}
            className="pb-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.1em] text-ink/50"
          >
            {d}
          </span>
        ))}

        {monthGrid(month).map((day, i) => {
          if (!day) return <span key={`b${i}`} />

          const past = day < today
          const isStart = day === checkIn
          const isEnd = !!previewEnd && day === previewEnd
          const inRange = !!checkIn && !!previewEnd && day > checkIn && day < previewEnd
          const sameDay = isStart && checkIn === checkOut && !!checkOut

          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => pick(day)}
              onMouseEnter={() => setHover(day)}
              onMouseLeave={() => setHover(null)}
              aria-label={day}
              aria-current={isStart || isEnd ? 'date' : undefined}
              className={`relative h-10 text-[0.88rem] font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:text-ink/25 ${
                inRange ? 'bg-teal/25 text-ink' : ''
              } ${isStart && !sameDay ? 'rounded-l-full' : ''} ${isEnd && !sameDay ? 'rounded-r-full' : ''} ${
                sameDay ? 'rounded-full' : ''
              } ${
                isStart || isEnd
                  ? 'bg-teal text-bone'
                  : past
                  ? ''
                  : 'text-ink hover:bg-ink/[0.07]'
              }`}
            >
              {Number(day.slice(-2))}
            </button>
          )
        })}
      </div>

      {/* running summary */}
      <p className="mt-4 border-t border-ink/12 pt-4 text-[0.85rem] font-semibold text-ink-70">
        {checkIn && !checkOut
          ? 'Now pick the day they leave — or the same day for daycare.'
          : stayLabel(checkIn, checkOut)}
      </p>
    </div>
  )
}

/** Trigger + popover, for use on the page itself. */
export function DateRangeField({
  value,
  onChange,
  label = 'Dates',
  error,
}: {
  value: DateRange
  onChange: (r: DateRange) => void
  label?: string
  error?: string
}) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const nights = nightsBetween(value.checkIn, value.checkOut)

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full flex-col gap-2.5 px-6 py-4 text-left md:pl-[clamp(1.25rem,4vw,4rem)]"
      >
        <span className="label text-ink/55">{label}</span>
        <span className="flex items-center gap-2.5 text-ink">
          <CalendarDays size={16} className="shrink-0 text-teal" />
          <span className="font-serif text-[1.12rem] leading-none">
            {value.checkIn && value.checkOut ? stayLabel(value.checkIn, value.checkOut) : 'Pick your dates'}
          </span>
        </span>
        {error && <span className="text-[0.7rem] font-semibold text-flame">{error}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute left-0 top-full z-40 mt-2 w-[21rem] max-w-[calc(100vw-2rem)] rounded-3xl border border-ink/12 bg-bone p-5 shadow-[0_30px_70px_-28px_rgba(27,22,19,0.5)]"
          >
            <DateRangePicker
              value={value}
              onChange={onChange}
              onComplete={() => window.setTimeout(() => setOpen(false), 180)}
            />
            {nights >= 0 && value.checkIn && value.checkOut && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 w-full rounded-full bg-ink py-3 font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-flame"
              >
                Done
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
