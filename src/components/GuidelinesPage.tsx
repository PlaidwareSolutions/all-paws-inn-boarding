import { useEffect, useMemo, useRef, useState } from 'react'
import { footer, slug } from '../data'
import { guidelinesIntro, guidelineSections } from '../data/guidelines'
import SectionTag from './SectionTag'

/** Guest Policies — a page under About us, carrying the same chrome as every other page. */
export default function GuidelinesPage() {
  const ids = useMemo(() => guidelineSections.map(s => slug(s.title)), [])
  const [active, setActive] = useState(ids[0])
  const railRef = useRef<HTMLElement>(null)

  /* Which policy you are reading, so the contents can say so. The band sits a fifth of
     the way down the screen: high enough to clear the header, low enough that the
     section you are actually looking at is the one that claims it. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const onScreen = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (onScreen[0]) setActive(onScreen[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  /* The rail scrolls on its own, so the entry it has just marked can be off its own
     screen. Nudge the rail only — never the page, which would fight the reader. */
  useEffect(() => {
    const rail = railRef.current
    const link = rail?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!rail || !link) return
    const r = rail.getBoundingClientRect()
    const l = link.getBoundingClientRect()
    if (l.top < r.top) rail.scrollTop -= r.top - l.top + 16
    else if (l.bottom > r.bottom) rail.scrollTop += l.bottom - r.bottom + 16
  }, [active])

  return (
    <section aria-labelledby="policies-h" className="bg-paper">
      {/* title */}
      <div className="gutter pb-10 pt-10 md:pb-14 md:pt-14">
        <SectionTag name="Guest Policies" className="mb-8" />
        <h1 id="policies-h" className="d-1 font-serif text-ink">
          Their health <span className="italic text-teal">and safety</span> first.
        </h1>
        <p className="lede measure mt-5 text-ink-70">{guidelinesIntro}</p>
      </div>

      <div className="gutter grid grid-cols-1 gap-x-14 gap-y-12 pb-24 lg:grid-cols-[15rem_1fr] lg:pb-32">
        {/* contents rail */}
        <nav
          ref={railRef}
          aria-label="Contents"
          /* Seventeen sections stand taller than the screen left under the header, and a
             pinned rail cannot be reached by scrolling the page, so it scrolls itself. */
          className="lg:sticky lg:top-[calc(var(--header-h,0px)+2rem)] lg:max-h-[calc(100svh-var(--header-h,0px)-4rem)] lg:self-start lg:overflow-y-auto"
        >
          <p className="label border-b border-ink/20 pb-3 text-ink/62">Contents</p>
          <ul className="mt-4">
            {guidelineSections.map(s => {
              const id = slug(s.title)
              const current = id === active
              return (
                <li key={s.title}>
                  <a
                    href={`#${id}`}
                    aria-current={current ? 'true' : undefined}
                    /* The marker is a border that is always there and only sometimes
                       coloured, so nothing shifts sideways as you read down the page. */
                    className={`flex gap-3 border-l-2 py-2 pl-4 font-sans text-[0.95rem] font-bold transition-colors duration-300 ${
                      current
                        ? 'border-flame text-ink'
                        : 'border-transparent text-ink/55 hover:border-flame/40 hover:text-flame'
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* the policies */}
        <div>
          {guidelineSections.map(s => (
            <section
              key={s.title}
              id={slug(s.title)}
              /* An anchor jump has to clear the sticky header, or the heading it lands on
                 sits behind it. */
              className="scroll-mt-[calc(var(--header-h,0px)+1.5rem)] grid gap-x-10 gap-y-5 border-t border-ink/20 py-12 first:border-t-0 first:pt-0 xl:grid-cols-[16rem_1fr]"
            >
              {/* The title holds its own column and stays put while a long policy runs
                  past it, so you can always see which one you are reading. */}
              <div className="xl:sticky xl:top-[calc(var(--header-h,0px)+2rem)] xl:self-start">
                <h2 className="d-3 font-serif text-ink">{s.title}</h2>
              </div>
              <div className="space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="body text-ink-70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* closing note — the site footer carries the rest */}
      <div className="gutter border-t border-ink/20 py-10">
        <p className="body font-semibold text-ink">Questions about any of this?</p>
        <p className="mt-2 body-sm text-ink-70">
          Call{' '}
          <a
            href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`}
            className="ul-draw text-ink transition-colors duration-300 hover:text-flame"
          >
            {footer.phone}
          </a>{' '}
          or email{' '}
          <a
            href={`mailto:${footer.email}`}
            className="ul-draw text-ink transition-colors duration-300 hover:text-flame"
          >
            {footer.email}
          </a>
        </p>
      </div>
    </section>
  )
}
