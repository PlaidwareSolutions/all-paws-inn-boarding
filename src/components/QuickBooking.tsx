import { useState } from 'react'
import { Minus, Plus, ArrowRight } from 'lucide-react'
import { useBooking, type PetType } from '../context/BookingContext'
import { DateRangeField, type DateRange } from './DateRangePicker'
import { addDays, todayISO } from '../lib/dates'
import { petPhotos } from '../data'

const petOpts = [
  { id: 'DOGS' as PetType, label: 'Dogs', photo: petPhotos.DOGS },
  { id: 'CATS' as PetType, label: 'Cats', photo: petPhotos.CATS },
  { id: 'OTHER' as PetType, label: 'Other', photo: petPhotos.OTHER },
]

/** Front-desk counter · a hotel-style booking bar on the tan band, run edge to edge. */
export default function QuickBooking() {
  const { openBooking } = useBooking()
  /* prefilled with tonight's stay so the bar is usable without touching the calendar */
  const [range, setRange] = useState<DateRange>({ checkIn: todayISO(), checkOut: addDays(todayISO(), 1) })
  const [petType, setPetType] = useState<PetType>('DOGS')
  const [count, setCount] = useState(1)
  const [err, setErr] = useState('')

  return (
    <section aria-label="Check availability" className="bg-paper-2 py-10 md:py-12">
      <div className="gutter mb-4 flex items-baseline justify-between gap-6">
        <p className="label text-ink/60">Front desk</p>
        <p className="hidden font-sans text-[0.9rem] italic text-ink/70 sm:block">
          A room, in about thirty seconds.
        </p>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
          if (!range.checkIn || !range.checkOut) {
            setErr('Pick your dates')
            return
          }
          setErr('')
          openBooking({ ...range, petType, pets: count })
        }}
        className="grid w-full grid-cols-1 border-y border-ink/25 md:grid-cols-[1.6fr_1.35fr_0.9fr_auto]"
      >
        {/* Dates — one calendar for both ends of the stay */}
        <div className="border-b border-ink/20 transition-colors duration-300 hover:bg-ink/[0.025] md:border-b-0">
          <DateRangeField
            label="Arrive · Leave"
            value={range}
            onChange={r => {
              setRange(r)
              if (r.checkIn && r.checkOut) setErr('')
            }}
            error={err}
          />
        </div>

        {/* Pet type — segmented */}
        <div className="flex flex-col justify-center border-b border-ink/20 px-6 py-4 transition-colors duration-300 hover:bg-ink/[0.025] md:border-b-0 md:border-l">
          <span className="label mb-2.5 text-ink/55">Who's staying</span>
          <div className="flex flex-wrap gap-2">
            {petOpts.map(({ id, label, photo }) => {
              const on = petType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPetType(id)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 font-sans text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                    on
                      ? 'border-teal bg-teal text-bone shadow-[0_10px_24px_-10px_rgba(40,114,147,0.75)]'
                      : 'border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink'
                  }`}
                >
                  <img
                    src={photo}
                    alt=""
                    loading="lazy"
                    className={`h-7 w-7 rounded-full object-cover transition ${on ? 'ring-2 ring-bone/70' : ''}`}
                  />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Count */}
        <div className="flex flex-col justify-center border-b border-ink/20 px-6 py-4 transition-colors duration-300 hover:bg-ink/[0.025] md:border-b-0 md:border-l">
          <span className="label mb-2.5 text-ink/55">How many</span>
          <div className="flex items-center gap-4 text-ink">
            <button
              type="button"
              aria-label="Fewer pets"
              onClick={() => setCount(c => Math.max(1, c - 1))}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-bone"
            >
              <Minus size={13} />
            </button>
            <span className="w-5 text-center font-serif text-[1.3rem] leading-none">{count}</span>
            <button
              type="button"
              aria-label="More pets"
              onClick={() => setCount(c => Math.min(6, c + 1))}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-bone"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        {/* Submit — fills the full height of the counter and runs to the page edge */}
        <button
          type="submit"
          className="group flex items-center justify-center gap-3 bg-flame px-8 py-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:bg-ember md:py-0"
        >
          Check availability
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </form>
    </section>
  )
}
