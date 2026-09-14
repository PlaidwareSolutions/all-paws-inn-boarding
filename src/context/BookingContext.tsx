import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { addDays, todayISO } from '../lib/dates'

export type PetType = 'DOGS' | 'CATS' | 'OTHER'

export interface BookingDraft {
  checkIn: string
  checkOut: string
  petType: PetType
  pets: number
}

interface BookingCtx {
  isOpen: boolean
  draft: BookingDraft
  openBooking: (prefill?: Partial<BookingDraft>) => void
  closeBooking: () => void
  setDraft: (patch: Partial<BookingDraft>) => void
}

/* Opens on tonight's stay — arriving today, leaving tomorrow — so the form is never empty. */
const defaultDraft: BookingDraft = {
  checkIn: todayISO(),
  checkOut: addDays(todayISO(), 1),
  petType: 'DOGS',
  pets: 1,
}

const Ctx = createContext<BookingCtx | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [draft, setDraftState] = useState<BookingDraft>(defaultDraft)

  const setDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraftState(d => ({ ...d, ...patch }))
  }, [])

  const openBooking = useCallback((prefill?: Partial<BookingDraft>) => {
    if (prefill) setDraftState(d => ({ ...d, ...prefill }))
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, draft, openBooking, closeBooking, setDraft }),
    [isOpen, draft, openBooking, closeBooking, setDraft],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBooking() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
