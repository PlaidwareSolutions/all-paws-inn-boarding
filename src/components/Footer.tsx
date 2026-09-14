import { Instagram } from 'lucide-react'
import { footer, hoursSummary } from '../data'
import logo from '../images/all-paws-logo.png'

const mapQuery = encodeURIComponent(footer.location)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-paper">
      {/* mark · the house · hours · where to find us — edge to edge */}
      <div className="border-y border-ink/12 bg-bone">
        <div className="gutter grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:py-12">
          <div className="md:col-span-2">
            <a href="/" className="inline-block">
              <img src={logo} alt="All Paws Inn" className="h-16 w-auto md:h-20" />
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-serif text-[1.15rem] leading-tight text-ink">All Paws Inn</h2>

            <address className="mt-3 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="ul-draw block font-sans text-[0.92rem] leading-[1.6] text-ink-70"
              >
                {footer.street}
                <br />
                {footer.cityLine}
              </a>
            </address>

            <p className="mt-3 font-sans text-[0.92rem] text-ink-70">
              T:{' '}
              <a href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`} className="ul-draw text-ink">
                {footer.phone}
              </a>
            </p>
            <p className="font-sans text-[0.92rem] text-ink-70">
              E:{' '}
              <a href={`mailto:${footer.email}`} className="ul-draw text-ink">
                {footer.email}
              </a>
            </p>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label={`All Paws Inn on Instagram — ${footer.instagram}`}
              className="mt-4 grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-bone"
            >
              <Instagram size={16} />
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-serif text-[1.15rem] leading-tight text-ink">Hours</h2>
            <dl className="mt-3">
              {hoursSummary.map(([days, time]) => (
                <div key={days} className="flex items-baseline justify-between gap-6 py-0.5">
                  <dt className="font-sans text-[0.92rem] text-ink-70">{days}</dt>
                  <dd className="font-sans text-[0.92rem] tabular-nums text-ink-70">{time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 font-sans text-[0.82rem] italic text-ink/62">
              Overnight care runs around the clock.
            </p>
            <a
              href="/contact/"
              className="ul-draw mt-3 inline-block font-sans text-[0.8rem] font-bold text-ink"
            >
              Full hours &amp; directions
            </a>
          </div>

          <div className="md:col-span-4">
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title="All Paws Inn location"
              loading="lazy"
              className="aspect-[16/9] w-full rounded-2xl border-0"
            />
          </div>
        </div>
      </div>

      {/* pb clears the sticky mobile "Book their stay" bar, which otherwise sits on this line. */}
      <div className="gutter flex flex-col gap-2 pb-24 pt-4 label !tracking-[0.14em] text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:!tracking-[0.26em] lg:pb-4">
        <span className="whitespace-nowrap">© {year} All Paws Inn</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="whitespace-nowrap">Houston</span>
          <span aria-hidden="true" className="text-flame">·</span>
          <span className="whitespace-nowrap">Clear Lake</span>
          <span aria-hidden="true" className="text-flame">·</span>
          <span className="whitespace-nowrap">Space Center Houston</span>
        </span>
      </div>
    </footer>
  )
}
