import { footer, slug } from '../data'
import { guidelinesIntro, guidelineSections } from '../data/guidelines'
import SectionTag from './SectionTag'

/** Guest Policies — a page under About us, carrying the same chrome as every other page. */
export default function GuidelinesPage() {
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

      <div className="gutter grid grid-cols-1 gap-x-14 gap-y-12 pb-24 md:grid-cols-[16rem_1fr] md:pb-32">
        {/* contents rail */}
        <nav
          aria-label="Contents"
          /* Seventeen sections stand taller than the screen left under the header, and a
             pinned rail cannot be reached by scrolling the page, so it scrolls itself. */
          className="md:sticky md:top-[calc(var(--header-h,0px)+2rem)] md:max-h-[calc(100svh-var(--header-h,0px)-4rem)] md:self-start md:overflow-y-auto md:pr-3"
        >
          <p className="label border-b border-ink/20 pb-3 text-ink/62">Contents</p>
          <ul className="mt-4 space-y-2.5">
            {guidelineSections.map(s => (
              <li key={s.title} className="flex gap-3">
                <a
                  href={`#${slug(s.title)}`}
                  className="ul-draw font-sans text-[0.98rem] font-bold text-ink/75 transition-colors hover:text-flame"
                >
                  {s.title}
                </a>
              </li>
            ))}
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
              className="scroll-mt-[calc(var(--header-h,0px)+1.5rem)] border-t border-ink/20 py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="d-3 font-serif text-ink">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4">
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
          <a href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`} className="ul-draw text-ink transition-colors duration-300 hover:text-flame">
            {footer.phone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${footer.email}`} className="ul-draw text-ink transition-colors duration-300 hover:text-flame">
            {footer.email}
          </a>
        </p>
      </div>
    </section>
  )
}
