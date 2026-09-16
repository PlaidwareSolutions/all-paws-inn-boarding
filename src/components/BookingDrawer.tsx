import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Check, ArrowRight } from 'lucide-react'
import { useBooking, type PetType } from '../context/BookingContext'
import { suites, EASE, usd, petPhotos } from '../data'
import { DateRangePicker } from './DateRangePicker'
import { fmtShort, nightsBetween, stayLabel } from '../lib/dates'

type Step = 'stay' | 'you' | 'done'
const petOpts = [
  { id: 'DOGS' as PetType, label: 'Dogs', photo: petPhotos.DOGS },
  { id: 'CATS' as PetType, label: 'Cats', photo: petPhotos.CATS },
  { id: 'OTHER' as PetType, label: 'Other', photo: petPhotos.OTHER },
]

/** Full-day daycare rates from the rate card, used when a stay has no nights in it. */
const DAYCARE_RATE: Record<PetType, number> = { DOGS: 35, CATS: 20, OTHER: 35 }

const PAPER = '#F4EDE0'
/* selection highlight — the logo teal, same value as `teal` in tailwind.config.js.
   Inline because these buttons set it alongside other inline styles. */
const SELECTED = '#287293'
const labelCls = 'mb-2 block font-sans text-[0.6rem] uppercase tracking-[0.24em] text-ink/62'
const textField =
  'w-full border-b border-ink/25 bg-transparent pb-2 font-serif text-[1.1rem] text-ink placeholder:font-sans placeholder:text-[0.98rem] placeholder:text-ink/50 focus:border-teal focus:outline-none'

export default function BookingDrawer() {
  const { isOpen, closeBooking, draft, setDraft } = useBooking()
  const [step, setStep] = useState<Step>('stay')
  const [suiteId, setSuiteId] = useState('standard')
  const [ref, setRef] = useState('')
  const [err, setErr] = useState<Record<string, string>>({})

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  useEffect(() => {
    if (isOpen) {
      setStep('stay')
      setErr({})
    }
  }, [isOpen])

  const suite = suites.find(s => s.id === suiteId)!
  const n = nightsBetween(draft.checkIn, draft.checkOut)
  const daycare = !!draft.checkIn && draft.checkIn === draft.checkOut
  const pets = Math.max(1, draft.pets)
  const total = daycare ? DAYCARE_RATE[draft.petType] * pets : n * suite.price * pets

  const toYou = () => {
    const e: Record<string, string> = {}
    if (!draft.checkIn || !draft.checkOut) e.dates = 'Pick the days of their stay'
    else if (n < 0) e.dates = 'Departure must be on or after arrival'
    setErr(e)
    if (!Object.keys(e).length) {
      setErr({})
      setStep('you')
    }
  }

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const fd = new FormData(ev.currentTarget)
    const e: Record<string, string> = {}
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const pet = String(fd.get('pet') || '').trim()
    if (!name) e.name = 'Your name, please'
    else if (name.length < 2) e.name = 'Name is too short'
    if (!email) e.email = 'Your email, please'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
    if (!phone) e.phone = 'A number we can reach you on'
    else if (phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number'
    if (!pet) e.pet = "Your pet's name, please"
    else if (pet.length < 2) e.pet = 'Name is too short'
    setErr(e)
    if (Object.keys(e).length) return
    setRef('API-' + Math.floor(1000 + ((total * 31 + n * 7) % 9000)))
    setStep('done')
    window.setTimeout(() => close(), 2500)
  }

  const close = () => {
    closeBooking()
    window.setTimeout(() => setStep('stay'), 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            aria-label="Close"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Reserve a room"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ backgroundColor: PAPER }}
            className="fixed inset-x-0 bottom-0 z-[81] flex max-h-[92svh] flex-col shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.5)] sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-[min(30rem,100vw)] sm:shadow-[-20px_0_80px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-ink/15 sm:hidden" />

            <header
              style={{ backgroundColor: PAPER }}
              className="flex items-center justify-between border-b border-ink/12 px-6 py-5"
            >
              <div>
                <p className="font-serif text-[1.4rem] leading-none text-ink">
                  {step === 'stay' && 'Their stay'}
                  {step === 'you' && 'Your details'}
                  {step === 'done' && "You're in"}
                </p>
                {step !== 'done' && (
                  <p className="mt-1 font-sans text-[0.58rem] uppercase tracking-[0.24em] text-ink/60">
                    Step {step === 'stay' ? '1' : '2'} of 2
                  </p>
                )}
              </div>
              <button
                onClick={close}
                className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-ink/62 hover:text-ink"
              >
                Close
              </button>
            </header>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-7">
              <AnimatePresence mode="wait">
                {step === 'stay' && (
                  <motion.div
                    key="stay"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.26 }}
                    className="space-y-8"
                  >
                    <div>
                      <span className={labelCls}>When</span>
                      <DateRangePicker
                        value={{ checkIn: draft.checkIn, checkOut: draft.checkOut }}
                        onChange={r => {
                          setDraft({ checkIn: r.checkIn, checkOut: r.checkOut })
                          setErr(p => { const e = { ...p }; delete e.dates; return e })
                        }}
                      />
                      {err.dates && (
                        <span className="mt-2 block font-sans text-[0.7rem] font-semibold text-flame">
                          {err.dates}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className={labelCls}>Who's staying</span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {petOpts.map(({ id, label, photo }) => {
                          const on = draft.petType === id
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => setDraft({ petType: id })}
                              aria-pressed={on}
                              style={
                                on
                                  ? { backgroundColor: SELECTED, borderColor: SELECTED, color: '#FBF7EF' }
                                  : undefined
                              }
                              className={`relative flex flex-col items-center gap-2.5 rounded-2xl border-2 px-2 py-3.5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ${
                                on
                                  ? 'shadow-[0_10px_24px_-10px_rgba(40,114,147,0.7)]'
                                  : 'border-ink/20 text-ink/62 hover:border-ink/40 hover:text-ink/80'
                              }`}
                            >
                              {on && (
                                <span className="absolute right-1.5 top-1.5 z-10 grid h-5 w-5 place-items-center rounded-full bg-white text-teal">
                                  <Check size={11} strokeWidth={3.5} />
                                </span>
                              )}
                              {/* a round crop sits the animal's face in the middle — a wide
                                  strip cut their heads off */}
                              <img
                                src={photo}
                                alt=""
                                loading="lazy"
                                className={`h-12 w-12 rounded-full object-cover transition duration-300 ${
                                  on ? 'ring-2 ring-bone/80' : 'ring-1 ring-ink/15'
                                }`}
                              />
                              <span>{label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <span className={labelCls}>How many</span>
                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          aria-label="Fewer"
                          onClick={() => setDraft({ pets: Math.max(1, draft.pets - 1) })}
                          className="grid h-9 w-9 place-items-center border border-ink/25 text-ink/60 transition-colors hover:border-ink hover:text-ink"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-5 text-center font-serif text-[1.5rem] text-ink">{draft.pets}</span>
                        <button
                          type="button"
                          aria-label="More"
                          onClick={() => setDraft({ pets: Math.min(6, draft.pets + 1) })}
                          className="grid h-9 w-9 place-items-center border border-ink/25 text-ink/60 transition-colors hover:border-ink hover:text-ink"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {daycare ? (
                      <div className="rounded-2xl border-2 border-teal/40 bg-teal/[0.07] p-4">
                        <span className={labelCls}>Daycare</span>
                        <p className="font-serif text-[1.15rem] text-ink">A full day with us</p>
                        <p className="mt-1.5 font-sans text-[0.85rem] text-ink-70">
                          Arriving and leaving the same day — {usd(DAYCARE_RATE[draft.petType])} per pet.
                          Pick a later departure day for an overnight room.
                        </p>
                      </div>
                    ) : (
                    <div>
                      <span className={labelCls}>Room</span>
                      <div className="space-y-2.5">
                        {suites.map(s => {
                          const on = suiteId === s.id
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSuiteId(s.id)}
                              style={on ? { borderColor: SELECTED, backgroundColor: 'rgba(40,114,147,0.08)' } : undefined}
                              className={`flex w-full items-center gap-3.5 border-2 p-2.5 text-left transition-all duration-200 ${
                                on ? '' : 'border-ink/15 hover:border-ink/40'
                              }`}
                            >
                              <img
                                src={s.image}
                                alt=""
                                className={`h-12 w-12 shrink-0 object-cover transition ${on ? '' : 'grayscale'}`}
                              />
                              <span className="flex-1">
                                <span className="block font-serif text-[1.15rem] text-ink">{s.name}</span>
                                <span className="block font-sans text-[0.72rem] text-ink/68">
                                  {usd(s.price)} / night
                                </span>
                              </span>
                              <span
                                style={on ? { backgroundColor: SELECTED, borderColor: SELECTED } : undefined}
                                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                                  on ? 'text-white' : 'border-ink/25'
                                }`}
                              >
                                {on && <Check size={13} strokeWidth={3.5} />}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    )}
                  </motion.div>
                )}

                {step === 'you' && (
                  <motion.form
                    key="you"
                    id="you-form"
                    onSubmit={submit}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.26 }}
                    className="space-y-7"
                  >
                    <Field label="Your name" name="name" placeholder="Jordan Rivera" err={err.name} autoComplete="name" onClearErr={() => setErr(p => { const e = { ...p }; delete e.name; return e })} />
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                      <Field label="Email" name="email" type="email" placeholder="you@email.com" err={err.email} autoComplete="email" onClearErr={() => setErr(p => { const e = { ...p }; delete e.email; return e })} />
                      <Field label="Phone" name="phone" type="tel" placeholder="(555) 012-3456" err={err.phone} autoComplete="tel" onClearErr={() => setErr(p => { const e = { ...p }; delete e.phone; return e })} />
                    </div>
                    <Field label="Their name" name="pet" placeholder="Biscuit" err={err.pet} onClearErr={() => setErr(p => { const e = { ...p }; delete e.pet; return e })} />
                    <div>
                      <span className={labelCls}>Anything we should know?</span>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Meds at 8am · nervous around big dogs · loves the hose"
                        className={`${textField} resize-none`}
                      />
                    </div>
                    <p className="font-sans text-[0.75rem] leading-relaxed text-ink/62">
                      No payment is taken now — we'll confirm your dates by email within the hour.
                    </p>
                  </motion.form>
                )}

                {step === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="py-8"
                  >
                    <p className="font-serif text-[clamp(2.6rem,11vw,3.5rem)] italic leading-[0.95] text-teal">
                      See you<br />soon.
                    </p>
                    <p className="mt-6 max-w-xs font-sans text-[1.02rem] leading-[1.7] text-ink/80">
                      Booking <span className="text-ink">{ref}</span> is in for{' '}
                      {daycare ? (
                        <>
                          a <span className="text-ink">daycare day</span> on{' '}
                          <span className="text-ink">{fmtShort(draft.checkIn)}</span>
                        </>
                      ) : (
                        <>
                          the <span className="text-ink">{suite.name}</span>
                          {n > 0 && (
                            <>
                              {' '}· {fmtShort(draft.checkIn)} – {fmtShort(draft.checkOut)} · {n} night
                              {n === 1 ? '' : 's'}
                            </>
                          )}
                        </>
                      )}
                      . A confirmation is on its way.
                    </p>
                    <button
                      onClick={close}
                      className="group mt-8 flex items-center gap-3 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-ink"
                    >
                      <span className="ul-draw">Done</span>
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step !== 'done' && (
              <footer
                style={{ backgroundColor: PAPER }}
                className="border-t border-ink/15 px-6 py-5"
              >
                <div className="mb-4 flex items-end justify-between">
                  <span className="font-sans text-[0.64rem] uppercase tracking-[0.18em] text-ink/62">
                    {daycare
                      ? `${stayLabel(draft.checkIn, draft.checkOut)} · full day`
                      : n > 0
                      ? `${stayLabel(draft.checkIn, draft.checkOut)} · ${suite.name}`
                      : 'Pick your dates'}
                  </span>
                  {total > 0 && (
                    <span className="font-serif text-[1.6rem] leading-none text-ink">{usd(total)}</span>
                  )}
                </div>
                {step === 'stay' ? (
                  <button
                    onClick={toYou}
                    className="group flex w-full items-center justify-between bg-ink px-6 py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-flame"
                  >
                    Continue
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="you-form"
                    className="flex w-full items-center justify-between bg-flame px-6 py-4 font-sans text-[0.72rem] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ember"
                  >
                    Confirm booking
                    <ArrowRight size={14} />
                  </button>
                )}
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  name,
  err,
  type = 'text',
  onClearErr,
  ...rest
}: {
  label: string
  name: string
  err?: string
  type?: string
  placeholder?: string
  autoComplete?: string
  onClearErr?: () => void
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input name={name} type={type} className={`${textField} ${err ? 'border-flame' : ''}`} onChange={onClearErr} {...rest} />
      {err && <span className="mt-1.5 block font-sans text-[0.66rem] text-flame">{err}</span>}
    </label>
  )
}
