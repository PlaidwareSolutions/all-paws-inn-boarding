/* Date helpers for the booking flow.
   Everything is a 'YYYY-MM-DD' string in the user's own timezone — never `new Date(iso)`,
   which parses as UTC and can land a day early west of Greenwich. */

const pad = (n: number) => String(n).padStart(2, '0')

export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const todayISO = () => toISO(new Date())

export const addDays = (iso: string, n: number) => {
  const d = fromISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}

/** Nights between two days — 0 when they're the same day (a daycare visit). */
export const nightsBetween = (a: string, b: string) =>
  !a || !b ? 0 : Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86_400_000)

export const fmtLong = (iso: string) =>
  iso ? fromISO(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''

export const fmtShort = (iso: string) =>
  iso ? fromISO(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

export const fmtMonth = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

export const startOfMonth = (iso: string) => {
  const d = fromISO(iso)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1)

/** The 6-week grid for a month view: leading blanks, then each day of the month. */
export const monthGrid = (month: Date): (string | null)[] => {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (string | null)[] = Array.from({ length: first.getDay() }, () => null)
  for (let i = 1; i <= days; i++) cells.push(toISO(new Date(month.getFullYear(), month.getMonth(), i)))
  return cells
}

/** A stay is described by how many nights it runs — 0 nights means daycare. */
export const stayLabel = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 'Pick your dates'
  const n = nightsBetween(checkIn, checkOut)
  if (n === 0) return `Daycare · ${fmtShort(checkIn)}`
  return `${fmtShort(checkIn)} – ${fmtShort(checkOut)} · ${n} night${n === 1 ? '' : 's'}`
}
