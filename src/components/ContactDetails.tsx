import { MapPin, Phone, Mail, Instagram } from 'lucide-react'
import { footer, openingHours } from '../data'
import { Words, Reveal } from './primitives'
import SectionTag from './SectionTag'
import BookButton from './BookButton'

const mapQuery = encodeURIComponent(footer.location)

/** The Contact page body — how to reach the house, and how to find it. */
export default function ContactDetails() {
  return (
    <section id="contact-details" aria-labelledby="contact-h" className="bg-paper py-24 md:py-32">
      <div className="gutter">
        <SectionTag n="01" name="Contact" className="mb-8" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <h2 id="contact-h" className="d-1 font-serif text-ink md:col-span-7">
            <Words lines={['Come and see', 'the house.']} italicLine={1} flameLine={1} />
          </h2>
          <p className="font-sans text-[1.02rem] leading-[1.8] text-ink-70 md:col-span-4 md:col-start-9">
            We are five minutes from Space Center Houston, on the same street since 2019.
            Drop in for a tour — no appointment needed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal>
              <ul className="border-t border-ink/20">
                <li className="flex items-start gap-4 border-b border-ink/15 py-5">
                  <MapPin size={18} className="mt-1 shrink-0 text-flame" aria-hidden="true" />
                  <span>
                    <span className="label block text-ink/55">Address</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ul-draw mt-1 block font-sans text-[1.05rem] leading-[1.6] text-ink"
                    >
                      {footer.street}
                      <br />
                      {footer.cityLine}
                    </a>
                  </span>
                </li>

                <li className="flex items-start gap-4 border-b border-ink/15 py-5">
                  <Phone size={18} className="mt-1 shrink-0 text-flame" aria-hidden="true" />
                  <span>
                    <span className="label block text-ink/55">Phone</span>
                    <a
                      href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`}
                      className="ul-draw mt-1 block font-sans text-[1.05rem] text-ink"
                    >
                      {footer.phone}
                    </a>
                  </span>
                </li>

                <li className="flex items-start gap-4 border-b border-ink/15 py-5">
                  <Mail size={18} className="mt-1 shrink-0 text-flame" aria-hidden="true" />
                  <span>
                    <span className="label block text-ink/55">Email</span>
                    <a
                      href={`mailto:${footer.email}`}
                      className="ul-draw mt-1 block font-sans text-[1.05rem] text-ink"
                    >
                      {footer.email}
                    </a>
                  </span>
                </li>

                <li className="flex items-start gap-4 border-b border-ink/15 py-5">
                  <Instagram size={18} className="mt-1 shrink-0 text-flame" aria-hidden="true" />
                  <span>
                    <span className="label block text-ink/55">Instagram</span>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="ul-draw mt-1 block font-sans text-[1.05rem] text-ink"
                    >
                      {footer.instagram}
                    </a>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <h3 className="font-serif text-[1.5rem] text-ink">Hours of Operation</h3>
              <dl className="mt-4 max-w-sm">
                {openingHours.map(([day, time]) => (
                  <div key={day} className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-2">
                    <dt className="font-sans text-[0.98rem] text-ink-70">{day}</dt>
                    <dd className="font-sans text-[0.98rem] tabular-nums text-ink-70">{time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-sans text-[0.88rem] italic text-ink/62">
                Overnight care runs around the clock.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <BookButton size="lg" className="mt-10" />
            </Reveal>
          </div>

          <div>
            <iframe
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title="All Paws Inn location"
              loading="lazy"
              className="aspect-square w-full rounded-3xl border-0 md:aspect-[4/5]"
            />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink"
            >
              <span className="ul-draw">Get directions</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
