import { footer, slug } from '../data'
import { guidelinesIntro, guidelineSections } from '../data/guidelines'
import logo from '../images/all-paws-logo.png'

/** Standalone Guest Policies page — opened in its own tab from the site footer. */
export default function GuidelinesPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-paper">
      <div className="grain-overlay" aria-hidden="true" />

      {/* header */}
      <header className="border-b border-ink/15 bg-paper">
        <div className="gutter flex flex-wrap items-center justify-between gap-4 py-5">
          <a href="/" aria-label="ALL PAWS INN — home">
            <img src={logo} alt="All Paws Inn" className="h-14 w-auto md:h-16" />
          </a>
          <a
            href="/"
            className="group flex items-center gap-2.5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-teal"
          >
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span className="ul-draw">Back to the site</span>
          </a>
        </div>
      </header>

      {/* title */}
      <div className="gutter pb-10 pt-16 md:pb-14 md:pt-24">
        <p className="label text-teal">Guest Policies</p>
        <h1 className="mt-5 d-1 max-w-[15ch] font-serif text-ink">
          Their health <span className="italic text-teal">and safety</span> first.
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[1.05rem] font-semibold leading-[1.75] text-ink-70">
          {guidelinesIntro}
        </p>
      </div>

      <div className="gutter grid grid-cols-1 gap-x-14 gap-y-12 pb-24 md:grid-cols-[16rem_1fr] md:pb-32">
        {/* contents rail */}
        <nav aria-label="Contents" className="md:sticky md:top-10 md:self-start">
          <p className="label border-b border-ink/20 pb-3 text-ink/62">Contents</p>
          <ul className="mt-4 space-y-2.5">
            {guidelineSections.map(s => (
              <li key={s.title} className="flex gap-3">
                <a
                  href={`#${slug(s.title)}`}
                  className="ul-draw font-sans text-[0.98rem] font-bold text-ink/75 transition-colors hover:text-teal"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* the policies */}
        <div className="max-w-3xl">
          {guidelineSections.map(s => (
            <section
              key={s.title}
              id={slug(s.title)}
              className="scroll-mt-10 border-t border-ink/20 py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-tight text-ink">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="font-sans text-[1rem] font-medium leading-[1.8] text-ink-70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="border-t border-ink/20 bg-paper-2">
        <div className="gutter flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-[1.02rem] font-bold text-ink">
              Questions about any of this?
            </p>
            <p className="mt-2 font-sans text-[0.98rem] text-ink-70">
              Call{' '}
              <a href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`} className="ul-draw text-ink">
                {footer.phone}
              </a>{' '}
              or email{' '}
              <a href={`mailto:${footer.email}`} className="ul-draw text-ink">
                {footer.email}
              </a>
            </p>
          </div>
          <p className="label text-ink/60">© {year} All Paws Inn · Houston · Clear Lake · Space Center Houston</p>
        </div>
      </footer>
    </div>
  )
}
