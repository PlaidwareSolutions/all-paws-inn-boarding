import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin, Phone, Clock } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { navLinks, EASE, footer, type NavLink } from '../data'
import logo from '../images/all-paws-logo.png'

/* "/about/team/", "/about/team", "/about/team/index.html" all mean the same page. */
const normalize = (p: string) => `/${p.replace(/index\.html$/, '').replace(/^\/+|\/+$/g, '')}/`

/** Which page are we on? Static per load — these are real page navigations, not a router.
    A parent counts as current while you're on one of its children. */
function isCurrentPage(href: string) {
  const target = normalize(href.split('#')[0])
  const path = normalize(window.location.pathname)
  if (target === '/') return path === '/'
  return path === target || path.startsWith(target)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  /* which parent's sub-list is open in the mobile menu */
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { openBooking } = useBooking()

  useEffect(() => {
    if (!open) setOpenSection(null)
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Logo on its own row up top, the link row stacked directly beneath it. */}
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ${
          scrolled ? 'border-ink/10 shadow-[0_10px_40px_-22px_rgba(27,22,19,0.45)]' : 'border-ink/10'
        }`}
      >
        {/* The mark holds the left edge at full header height; everything else stacks to the
            right of it — a dark phone plate along the top, the links right-aligned beneath. */}
        <div className="flex items-stretch">
          <a
            href="/"
            aria-label="ALL PAWS INN — home"
            className="flex shrink-0 items-center py-3 pl-[clamp(1.25rem,4vw,4rem)] pr-6 md:py-4"
          >
            <img src={logo} alt="All Paws Inn" className="h-16 w-auto md:h-24 lg:h-[7rem]" />
          </a>

          <div className="ml-auto flex flex-1 flex-col justify-center lg:justify-start">
            {/* phone plate — bleeds to the right edge, starting where the mark ends */}
            <div className="hidden justify-end bg-teal-soft py-3 pl-10 pr-[clamp(1.25rem,4vw,4rem)] lg:flex">
              <a href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`} className="group text-right">
                <span className="block font-sans text-[0.64rem] font-bold uppercase tracking-[0.2em] text-ink/70">
                  {footer.area}
                </span>
                <span className="mt-0.5 block font-sans text-[1.4rem] font-bold leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-ember">
                  {footer.phone}
                </span>
              </a>
            </div>

            {/* links + booking CTA, right-aligned under the plate */}
            <div className="flex flex-1 items-center justify-end gap-3 py-3 pr-[clamp(1.25rem,4vw,4rem)]">
              <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex xl:gap-2">
                {navLinks.map(l => (
                  <NavItem key={l.href} link={l} />
                ))}
              </nav>

              <button
                onClick={() => openBooking()}
                className="group hidden items-center gap-2 rounded-full bg-flame px-6 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.16em] text-bone shadow-[0_12px_30px_-12px_rgba(244,85,29,0.8)] transition-colors duration-400 hover:bg-ember sm:flex"
              >
                Book now
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 bg-bone/70 transition-colors hover:bg-bone lg:hidden"
              >
                <span className="h-[2px] w-5 rounded-full bg-ink" />
                <span className="h-[2px] w-5 rounded-full bg-ink" />
                <span className="h-[2px] w-3.5 rounded-full bg-ink" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-bone"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-sans text-[1.3rem] font-extrabold uppercase tracking-tight">
                All <span className="italic text-teal">Paws</span> Inn
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="font-sans text-[0.66rem] uppercase tracking-[0.24em] text-bone/75 hover:text-bone"
              >
                Close
              </button>
            </div>

            {/* Touch has no hover, so the desktop dropdowns would simply vanish here. Each
                parent keeps its own sub-list, opened by the chevron; tapping the label still
                opens the page itself. */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide px-6 py-2">
              {navLinks.map((l, i) => {
                const expanded = openSection === l.href
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.55, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={l.href}
                        aria-current={isCurrentPage(l.href) ? 'page' : undefined}
                        className={`flex-1 py-3.5 font-serif text-[9vw] leading-[1.15] ${
                          isCurrentPage(l.href) ? 'text-teal' : ''
                        }`}
                      >
                        {l.label}
                      </a>
                      {l.children && (
                        <button
                          onClick={() => setOpenSection(expanded ? null : l.href)}
                          aria-expanded={expanded}
                          aria-label={`${expanded ? 'Hide' : 'Show'} ${l.label} sections`}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-bone transition-colors hover:bg-white/10"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {expanded && l.children && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {l.children.map(c => (
                            <li key={c.href}>
                              <a
                                href={c.href}
                                className="block border-t border-white/10 py-3 pl-5 font-sans text-[1.02rem] font-semibold text-bone/85"
                              >
                                {c.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}

              <motion.button
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navLinks.length * 0.06, duration: 0.55, ease: EASE }}
                onClick={() => {
                  setOpen(false)
                  openBooking()
                }}
                className="w-full py-4 text-left font-serif text-[9vw] italic leading-[1.15] text-teal"
              >
                Book →
              </motion.button>
            </nav>

            <div className="flex flex-col gap-4 px-6 py-8 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-bone/65">
              <a
                href="/guidelines/"
                target="_blank"
                rel="noopener noreferrer"
                className="ul-draw self-start font-bold text-bone/85"
              >
                Guest Policies ↗
              </a>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`}
                  className="ul-draw font-bold text-bone/85"
                >
                  {footer.phone}
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="ul-draw font-bold text-bone/85"
                >
                  {footer.instagram}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** A top-level nav link. Links with children reveal a panel on hover (and on keyboard focus). */
function NavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number>()
  const current = isCurrentPage(link.href)

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const show = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  /* a short grace period so a diagonal cursor path into the panel doesn't close it */
  const hide = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 140)
  }

  if (!link.children && !link.contactCard) {
    return (
      <a
        href={link.href}
        aria-current={current ? 'page' : undefined}
        className={`ul-draw whitespace-nowrap rounded-full px-3 py-2 font-sans text-[1.02rem] font-bold tracking-tight transition-colors duration-300 hover:text-teal xl:px-4 ${
          current ? 'text-teal' : 'text-ink'
        }`}
      >
        {link.label}
      </a>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <a
        href={link.href}
        aria-expanded={open}
        aria-current={current ? 'page' : undefined}
        className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-sans text-[1.02rem] font-bold tracking-tight transition-colors duration-300 xl:px-4 ${
          open || current ? 'text-teal' : 'text-ink hover:text-teal'
        }`}
      >
        <span className="ul-draw">{link.label}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.24, ease: EASE }}
            /* pt- keeps a hoverable bridge between the link and the panel */
            className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${
              link.contactCard ? 'w-[19rem]' : 'w-[15rem]'
            }`}
          >
            {link.contactCard ? (
              <ContactPanel />
            ) : (
              <ul className="overflow-hidden rounded-2xl border border-ink/10 bg-bone shadow-[0_28px_60px_-24px_rgba(27,22,19,0.45)]">
                {link.children!.map(c => (
                  <li key={c.href} className="border-b border-ink/10 last:border-b-0">
                    <a
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block px-5 py-3.5 font-sans text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:bg-ink/[0.04] hover:text-teal"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Hover panel for the Contact nav item — address, phone, hours and a map preview. */
function ContactPanel() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(footer.location)}&output=embed`
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-bone shadow-[0_28px_60px_-24px_rgba(27,22,19,0.45)]">
      <iframe
        src={mapSrc}
        title="All Paws Inn location"
        loading="lazy"
        className="h-28 w-full border-0"
      />
      <div className="p-5">
        <ul className="space-y-2.5 font-sans text-[0.86rem] text-ink-70">
          <li className="flex items-start gap-2.5">
            <MapPin size={15} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
            <span>{footer.location}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Phone size={14} className="shrink-0 text-teal" aria-hidden="true" />
            <a href={`tel:${footer.phone.replace(/[^\d+]/g, '')}`} className="ul-draw text-ink">
              {footer.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Clock size={14} className="shrink-0 text-teal" aria-hidden="true" />
            <span>{footer.hours}</span>
          </li>
        </ul>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footer.location)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink"
        >
          <span className="ul-draw">Get directions</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  )
}
