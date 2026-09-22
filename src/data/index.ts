/* ══════════════════════════════════════════════════
   ALL PAWS INN — content
   ══════════════════════════════════════════════════ */

const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

/**
 * Booking is handled by Gingr, not on this site. Every "Book now" opens this.
 *
 * TODO: swap for All Paws Inn's own Gingr subdomain — it will look like
 * https://allpawsinn.gingrapp.com/front_end/login — this is the vendor's
 * home page standing in until that address is known.
 */
export const GINGR_BOOKING_URL = 'https://www.gingrapp.com/'

export const EASE = [0.16, 1, 0.3, 1] as const

export const brand = {
  name: 'All Paws Inn',
  short: 'All Paws Inn',
  tagline: 'Pet Boarding / Day Care / Bathing',
}

/** Anchor-safe slug — shared by the nav dropdowns and the section targets they point at. */
export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* ── Our story ── */
export const story = {
  heading: ['Twenty years of pets,', 'now in Clear Lake.'],
  body: [
    'ALL PAWS INN is run by David and Andrea Little, who have spent more than twenty years in pet hospitality — building and running boarding, daycare and grooming houses across the United States.',
    'All of that experience now sits on one street in Clear Lake, Houston. Our staff bring 20+ years of hands-on animal care between them, and boarding is not a sideline here — it is the only thing we do, and we intend to do it better than anyone in the business.',
  ],
  pull: '“We have looked after pets all over the country. Clear Lake is where we wanted to put down roots.”',
  signature: 'David & Andrea Little',
  image: U('1778100030992-42ca7ed2592b', 1500),
  imageAlt: 'A tabby cat curled up asleep on a plaid blanket',
}

/* ── Hero ── */
export const hero = {
  image: U('1587300003388-59208cc962cb', 2000, 82),
  imageAlt: 'A dog with its ears in the wind, grinning in warm afternoon light',
}

/* Hero montage — crossfades like a short film */
export const heroImages = [
  U('1587300003388-59208cc962cb', 1900, 80),
  U('1552053831-71594a27632d', 1900, 80),
  U('1763718171036-79437fcc57fd', 1900, 80),
  U('1548199973-03cce0bbc87b', 1900, 80),
  U('1548802673-380ab8ebc7b7', 1900, 80),
]

/* ── Accommodations — editorial bands ── */
export interface Suite {
  id: string
  name: string
  price: number
  blurb: string
  amenities: string[]
  image: string
  loved?: boolean
}

export const suites: Suite[] = [
  {
    id: 'condo',
    name: 'Condo',
    price: 37,
    blurb: 'A cozy, comfortable condo for the ones who like their world close and familiar.',
    amenities: ['Comfortable bedding', 'Two walks a day', 'Evening wind-down', 'Climate control'],
    image: U('1769117320704-b4d7d21ada85', 1500),
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 55,
    blurb: 'More room, more window, more play. The one most parents pick, by a mile.',
    amenities: ['Plush bed', 'Three walks + a play session', 'Daily enrichment session', 'Climate control'],
    image: U('1773280222094-4c24fc89ea90', 1500),
    loved: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 65,
    blurb: 'Extra room and garden views, with a full day of play built in.',
    amenities: ['King memory-foam bed', 'Garden-view suite', 'Extra play session', 'Bedtime lights-dim'],
    image: U('1597633425046-08f5110420b5', 1500),
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: 75,
    blurb: 'A private wing, a carer who is theirs alone, and a day shaped entirely around them.',
    amenities: ['Private suite + patio', 'Dedicated 1:1 carer', 'Unlimited play + pool', 'Updates on demand'],
    image: U('1587402092301-725e37c70fd8', 1500),
  },
]

/* ── Services — each one gets its own band on the page ── */
export interface Service {
  title: string
  line: string
  points: string[]
  from: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    title: 'Dog Boarding',
    line: 'Private suites, carers awake all night, a report card every morning.',
    points: [
      'Condo, Standard, Luxury and Premium suites',
      'Three walks and a play session every day',
      'Medication and special diets handled to your notes',
      'A nightly report card, with photographs',
    ],
    from: 'From $37 a night',
    image: U('1598397678815-c5dc869035b8', 1400),
    imageAlt: 'A dog asleep on a plush pet bed',
  },
  {
    title: 'Dog Daycare',
    line: 'Full and half days of structured play, rest and enrichment.',
    points: [
      'Doors open at 8:00am, last pickup at 6:00pm',
      'Play groups matched by size and temperament',
      'An enforced quiet hour after lunch',
      '$10 off when it is added to a boarding stay',
    ],
    from: 'From $25 a half day',
    image: U('1775018118638-f5d3a8c60f39', 1400),
    imageAlt: 'A corgi grinning up at the camera',
  },
  {
    title: 'Cat Boarding',
    line: 'A dog-free floor with climbing walls, sun shelves and quiet corners.',
    points: [
      'Condo and Suite rooms, never stacked',
      'A floor of their own — no dogs, ever',
      'Window perches and daily one-to-one play',
      'Litter, food and medication kept to their routine',
    ],
    from: 'From $25 a night',
    image: U('1541781774459-bb2af2f05b55', 1400),
    imageAlt: 'A cat asleep, tucked under a soft duvet',
  },
  {
    title: 'Cat Daycare',
    line: 'Calm, supervised daytime stays — their own space, their own pace.',
    points: [
      'Full and half days on the cat floor',
      'One-to-one attention, never group play',
      'Somewhere to hide whenever they want it',
      'Same-day booking whenever we have the room',
    ],
    from: 'From $15 a half day',
    image: U('1637069810813-3aea5273dc7e', 1400),
    imageAlt: 'A ginger and white cat sitting against a bright background',
  },
  {
    title: 'Bathing',
    line: 'Baths, brush-outs and coat care, timed around their stay.',
    points: [
      'Dogs small through XL, and cats',
      'Gentle pre-bath brushing, a bath and a thorough dry',
      'Extra coat care for heavy shedding or a dense coat',
      'Book it alone, or fold it into a boarding stay',
    ],
    from: 'From $30 a bath',
    image: U('1598875706250-21faaf804361', 1400),
    imageAlt: 'A freshly groomed golden retriever, bright and happy',
  },
]

/* ── Team ── */
export interface TeamMember {
  name: string
  /** Job title, when they have one on the card. */
  role?: string
  bio: string
  /** A real photograph of that person — until we have one, the card shows their initials. */
  photo?: string
}

export const team: TeamMember[] = [
  {
    name: 'David Little',
    bio: 'Twenty-plus years in pet hospitality across the United States, from boarding houses to grooming rooms. Runs the floor, the suites and the overnight rota.',
  },
  {
    name: 'Andrea Little',
    bio: 'Built and ran pet care houses around the country before Clear Lake. Looks after daycare groups, bathing appointments and every guest’s daily routine.',
  },
]

/* ── Rates — the pricing flow chart ── */
export interface PriceItem {
  label: string
  price: string
}
export interface PriceCategory {
  title: string
  items: PriceItem[]
}

/**
 * The lowest actual rate in a category, for the "from $x" line on the overview cards.
 *
 * Surcharges (`+$10`) are not rates you can buy, and some entries carry no number at
 * all (`Bath rate`), so both are skipped rather than counted as the cheapest option.
 */
export const fromPrice = (items: PriceItem[]): string | null => {
  const amounts = items
    .filter(i => !i.price.trim().startsWith('+'))
    .map(i => Number(i.price.replace(/[^0-9.]/g, '')))
    .filter(n => Number.isFinite(n) && n > 0)
  return amounts.length ? `$${Math.min(...amounts)}` : null
}

export const pricingCategories: PriceCategory[] = [
  {
    title: 'Dog Daycare',
    items: [
      { label: 'Full Day', price: '$35' },
      { label: 'Additional Dog — Same Household', price: '$30' },
      { label: 'Half Day — Up to 5 Hours', price: '$25' },
      { label: 'Additional Dog — Half Day', price: '$20' },
    ],
  },
  {
    title: 'Cat Daycare',
    items: [
      { label: 'Full Day', price: '$25' },
      { label: 'Additional Cat — Full Day', price: '$20' },
      { label: 'Half Day — Up to 5 Hours', price: '$15' },
      { label: 'Additional Cat — Half Day', price: '$10' },
    ],
  },
  {
    title: 'Daycare Membership',
    items: [
      { label: '1 Day a Week', price: '$32' },
      { label: 'Additional Dog', price: '$28' },
      { label: '2 Days a Week', price: '$60' },
      { label: 'Additional Dog', price: '$52' },
      { label: '3 Days a Week', price: '$84' },
      { label: 'Additional Dog', price: '$72' },
      { label: 'Unlimited', price: '$125' },
      { label: 'Additional Dog — Unlimited', price: '$105' },
    ],
  },
  {
    title: 'Dog Boarding',
    items: [
      { label: 'Condo', price: '$37' },
      { label: 'Standard Suite', price: '$55' },
      { label: 'Additional Dog — Shared Standard', price: '$40' },
      { label: 'Premium Suite', price: '$65' },
      { label: 'Additional Dog — Shared Premium', price: '$45' },
      { label: 'Luxury Suite', price: '$75' },
      { label: 'Additional Dog — Shared Luxury', price: '$50' },
      { label: 'Holiday / Peak, per pet a night', price: '+$10' },
    ],
  },
  {
    title: 'Cat Boarding',
    items: [
      { label: 'Cat Condo', price: '$25' },
      { label: 'Additional Cat — Shared Condo', price: '$20' },
      { label: 'Cat Standard Suite', price: '$30' },
      { label: 'Additional Cat — Shared Standard', price: '$25' },
      { label: 'Holiday / Peak, per cat a night', price: '+$10' },
    ],
  },
  {
    title: 'Bathing',
    items: [
      { label: 'Small Dog Bath', price: 'From $30' },
      { label: 'Medium Dog Bath', price: 'From $35' },
      { label: 'Large Dog Bath', price: 'From $45' },
      { label: 'XL Dog Bath', price: 'From $55' },
      { label: 'Cat Bath', price: 'From $40' },
      { label: 'Extra Coat Care', price: 'From $15' },
    ],
  },
  {
    title: 'Add-Ons',
    items: [
      { label: 'Extra Playtime, per 30 min', price: '$10' },
      { label: 'Extra Leisure Walk', price: '$10' },
      { label: 'Photo Update', price: '$5' },
      { label: 'Premium Treat / Frozen Enrichment', price: '$5' },
      { label: 'Bedtime Tuck-In / Cuddle Time', price: '$8' },
      { label: 'Medication Administration', price: 'From $5' },
      { label: 'Departure Bath', price: 'Bath rate' },
    ],
  },
]

/* Printed under every rate list — the conditions the prices above assume. */
export const pricingNotes = [
  'Potty walks roughly every two hours through 6pm or pickup. Boarding dogs also get an overnight potty pad.',
  'Every boarded dog gets two hours of play a day — an hour in the morning, an hour in the evening.',
  'Additional-pet rates are for compatible pets from the same household. Condos hold one dog and cannot be shared.',
  'A $10 per pet, per night holiday and peak fee applies on designated high-demand dates.',
  'Boarded pets are fed to their usual home schedule, on food you bring. A food fee may apply if it runs out.',
  'Memberships run to a four-week minimum. The Luxury Suite includes a departure bath; extra coat care may still apply.',
]

/* ── Footer ── */
export const footer = {
  street: '1051 Pineloch Dr. Ste 700',
  cityLine: 'Houston, TX 77062',
  location: '1051 Pineloch Dr. Ste 700, Houston, TX 77062',
  area: 'Clear Lake, Houston',
  phone: '(713) 966-2500',
  email: 'info@allpawsinnboarding.com',
  hours: 'Mon – Fri 8am – 6pm · Sat 9am – 5pm · Sun closed',
  instagram: '@allpawsinn',
}

/* ── Social profiles ──
   PLACEHOLDER URLS: these point at each platform's front page, not at the real
   profiles — swap in the actual links when they're known. Guessing a handle risks
   sending people to someone else's account. */
export interface Social {
  id: 'instagram' | 'facebook' | 'tiktok'
  label: string
  handle: string
  url: string
}

export const socials: Social[] = [
  { id: 'instagram', label: 'Instagram', handle: '@allpawsinn', url: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', handle: 'All Paws Inn', url: 'https://facebook.com' },
  { id: 'tiktok', label: 'TikTok', handle: '@allpawsinn', url: 'https://tiktok.com' },
]

/** Condensed for the footer — the day-by-day table belongs on the Contact page. */
export const hoursSummary: [string, string][] = [
  ['Mon – Fri', '8:00am – 6:00pm'],
  ['Saturday', '9:00am – 5:00pm'],
  ['Sunday', 'Closed'],
]

/** Front-desk hours, day by day. Overnight care runs around the clock regardless. */
export const openingHours: [string, string][] = [
  ['Mon', '8:00am – 6:00pm'],
  ['Tue', '8:00am – 6:00pm'],
  ['Wed', '8:00am – 6:00pm'],
  ['Thu', '8:00am – 6:00pm'],
  ['Fri', '8:00am – 6:00pm'],
  ['Sat', '9:00am – 5:00pm'],
  ['Sun', 'Closed'],
]

export const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

/* ── Nav — declared last so the dropdowns can be built from the content above ── */
export interface NavChild {
  label: string
  href: string
}
export interface NavLink {
  label: string
  href: string
  children?: NavChild[]
  /** Contact shows a mini address/hours/map card on hover instead of a plain link list. */
  contactCard?: boolean
}

/* Every nav entry is a real page of its own — a click loads that page and nothing else.
   Nesting under /services/ and /pricing/ also keeps "Dog Boarding" the service distinct
   from "Dog Boarding" the rate category without needing a prefix. */
export const servicePage = (title: string) => `/services/${slug(title)}/`
export const ratePage = (title: string) => `/pricing/${slug(title)}/`

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About us',
    href: '/about/',
    children: [
      { label: 'Our Story', href: '/about/our-story/' },
      { label: 'Team', href: '/about/team/' },
    ],
  },
  {
    label: 'Services',
    href: '/services/',
    children: services.map(s => ({ label: s.title, href: servicePage(s.title) })),
  },
  {
    label: 'Pricing',
    href: '/pricing/',
    children: pricingCategories.map(c => ({ label: c.title, href: ratePage(c.title) })),
  },
  { label: 'Contact', href: '/contact/', contactCard: true },
]
