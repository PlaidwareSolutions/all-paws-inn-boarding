import { Check, ArrowRight } from 'lucide-react'
import { services, servicePage, type Service } from '../data'
import { Words, ClipImage, Reveal } from './primitives'
import SectionTag from './SectionTag'
import BookButton from './BookButton'

/** One service, on its own page. Nothing else on the page but this. */
export default function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter(s => s.title !== service.title)

  return (
    <>
      <section aria-labelledby="svc-h" className="bg-paper py-20 md:py-28">
        <div className="gutter">
          <SectionTag name="Services" className="mb-8" />

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 id="svc-h" className="d-2 font-serif text-ink">
                <Words lines={[service.title]} accentLine={0} />
              </h1>
              <p className="lede mt-5 max-w-md text-ink-70">{service.line}</p>

              <Reveal delay={0.08}>
                <ul className="mt-8 border-t border-ink/15">
                  {service.points.map(p => (
                    <li
                      key={p}
                      className="flex items-start gap-3 border-b border-ink/15 py-3.5 font-sans text-[0.98rem] leading-[1.6] text-ink-70"
                    >
                      <Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.14} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <BookButton label={`Book ${service.title}`} />
                <span className="label text-ink/60">{service.from}</span>
              </Reveal>
            </div>

            <ClipImage
              src={service.image}
              alt={service.imageAlt}
              eager
              className="aspect-[4/3] w-full rounded-3xl md:aspect-[5/4]"
            />
          </div>
        </div>
      </section>

      {/* the other four, so this page isn't a dead end */}
      <section aria-labelledby="other-h" className="bg-paper-2 py-16 md:py-20">
        <div className="gutter">
          <h2 id="other-h" className="label text-ink/60">
            Other services
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(o => (
              <li key={o.title}>
                <a
                  href={servicePage(o.title)}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/15 bg-bone px-5 py-4 transition-colors duration-300 hover:border-teal/60"
                >
                  <span className="font-serif text-[1.15rem] text-ink transition-colors duration-300 group-hover:text-teal">
                    {o.title}
                  </span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
