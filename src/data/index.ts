/* ══════════════════════════════════════════════════
   ALL PAWS INN — content
   ══════════════════════════════════════════════════ */

const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const EASE = [0.16, 1, 0.3, 1] as const

export const brand = {
  name: 'All Paws Inn',
  short: 'All Paws Inn',
  tagline: 'Pet Boarding / Day Care / Grooming',
}

/** Anchor-safe slug — shared by the nav dropdowns and the section targets they point at. */
export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* ── Our story ── */
export const story = {
  heading: ['Built by people', 'who hate leaving.'],
  body: [
    "ALL PAWS INN started in 2019, in a converted space near Clear Lake, Houston — because our founder couldn't find a single place she'd actually feel right leaving her own dog.",
    'Six years on we still run one house, minutes from Space Center Houston. The rule that started it hasn’t moved: if we wouldn’t board our own, we don’t board yours.',
  ],
  pull: '“We built the place we wanted to drop our own dogs off at. Then we opened the doors.”',
  signature: 'Nadia Okafor — Founder',
  image: U('1573865526739-10659fec78a5', 1500),
  imageAlt: 'A relaxed ginger cat stretched out, half asleep',
}

/* ── Who's staying — real photographs rather than glyphs, in the booking flow ── */
export const petPhotos: Record<'DOGS' | 'CATS' | 'OTHER', string> = {
  DOGS: U('1552053831-71594a27632d', 400, 70),
  CATS: U('1573865526739-10659fec78a5', 400, 70),
  OTHER: U('1585110396000-c9ffd4e4b308', 400, 70),
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
  U('1518155317743-a8ff43ea6a5f', 1900, 80),
  U('1548199973-03cce0bbc87b', 1900, 80),
  U('1514888286974-6c03e2ca1dba', 1900, 80),
]

/* ── Accommodations — editorial bands ── */
export interface Suite {
  id: string
  n: string
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
    n: '01',
    name: 'Condo',
    price: 30,
    blurb: 'A cozy, comfortable condo for the ones who like their world close and familiar.',
    amenities: ['Comfortable bedding', 'Two walks a day', 'Evening wind-down', 'Climate control'],
    image: U('1561037404-61cd46aa615b', 1500),
  },
  {
    id: 'standard',
    n: '02',
    name: 'Standard',
    price: 55,
    blurb: 'More room, more window, more play. The one most parents pick, by a mile.',
    amenities: ['Plush bed', 'Three walks + a play session', 'Daily enrichment session', 'Climate control'],
    image: U('1552053831-71594a27632d', 1500),
    loved: true,
  },
  {
    id: 'luxury',
    n: '03',
    name: 'Luxury',
    price: 75,
    blurb: 'A private wing, a carer who is theirs alone, and a day shaped entirely around them.',
    amenities: ['Private suite + patio', 'Dedicated 1:1 carer', 'Unlimited play + pool', 'Updates on demand'],
    image: U('1543466835-00a7907e9de1', 1500),
  },
  {
    id: 'premium',
    n: '04',
    name: 'Premium',
    price: 60,
    blurb: 'Extra room and garden views, with a full day of play built in.',
    amenities: ['King memory-foam bed', 'Garden-view suite', 'Extra play session', 'Bedtime lights-dim'],
    image: U('1450778869180-41d0601e046e', 1500),
  },
]

/* ── Services — each one gets its own band on the page ── */
export interface Service {
  n: string
  title: string
  line: string
  points: string[]
  from: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    n: '01',
    title: 'Dog Boarding',
    line: 'Private suites, carers awake all night, a report card every morning.',
    points: [
      'Condo, Standard, Luxury and Premium suites',
      'Three walks and a play session every day',
      'Medication and special diets handled to your notes',
      'A nightly report card, with photographs',
    ],
    from: 'From $30 a night',
    image: U('1450778869180-41d0601e046e', 1400),
    imageAlt: 'A dog asleep on a plush bed in a bright suite',
  },
  {
    n: '02',
    title: 'Dog Daycare',
    line: 'Full and half days of structured play, rest and enrichment.',
    points: [
      'Doors open at 6:30am, last pickup at 7:00pm',
      'Play groups matched by size and temperament',
      'An enforced quiet hour after lunch',
      '$10 off when it is added to a boarding stay',
    ],
    from: 'From $25 a half day',
    image: U('1442605527737-ed62b867591f', 1400),
    imageAlt: 'Two dogs mid-play in a sunlit yard',
  },
  {
    n: '03',
    title: 'Cat Boarding',
    line: 'A dog-free floor with climbing walls, sun shelves and quiet corners.',
    points: [
      'Condo and Suite rooms, never stacked',
      'A floor of their own — no dogs, ever',
      'Window perches and daily one-to-one play',
      'Litter, food and medication kept to their routine',
    ],
    from: 'From $25 a night',
    image: U('1514888286974-6c03e2ca1dba', 1400),
    imageAlt: 'A cat perched on a sunlit shelf by a window',
  },
  {
    n: '04',
    title: 'Cat Daycare',
    line: 'Calm, supervised daytime stays — their own space, their own pace.',
    points: [
      'Full and half days on the cat floor',
      'One-to-one attention, never group play',
      'Somewhere to hide whenever they want it',
      'Same-day booking whenever we have the room',
    ],
    from: 'From $15 a half day',
    image: U('1573865526739-10659fec78a5', 1400),
    imageAlt: 'A ginger cat stretched out and half asleep',
  },
  {
    n: '05',
    title: 'Grooming',
    line: 'Baths, brush-outs and full grooms, timed around their stay.',
    points: [
      'Dogs and cats, small breeds through to large',
      'A Fear-Free certified groomer, every appointment',
      'Nail trims and de-shedding treatments',
      'Book it alone, or fold it into a boarding stay',
    ],
    from: 'From $15 a nail trim',
    image: U('1591160690555-5debfba289f0', 1400),
    imageAlt: 'A freshly groomed dog being towel-dried',
  },
]

/* ── Team ── */
export interface TeamMember {
  name: string
  role: string
  bio: string
  photo: string
}

export const team: TeamMember[] = [
  {
    name: 'Nadia Okafor',
    role: 'Founder & Head Innkeeper',
    bio: 'Started All Paws Inn in 2019 because she couldn’t find a place she trusted with her own dog. Still on the floor most mornings.',
    photo: U('1573497019940-1c28c88b4f3e', 900),
  },
  {
    name: 'Marcus Teel',
    role: 'Lead Veterinary Technician',
    bio: 'On-site every shift, vet on call around the clock. Keeps the house’s health records and medication schedule.',
    photo: U('1500648767791-00dcc994a43e', 900),
  },
  {
    name: 'Priya Anand',
    role: 'Daycare & Play Lead',
    bio: 'Builds every play group by size and temperament, and runs the enrichment sessions guests love most.',
    photo: U('1580489944761-15a19d654956', 900),
  },
  {
    name: 'Jordan Reyes',
    role: 'Grooming Lead',
    bio: 'Fear-Free certified groomer for dogs and cats — baths, brush-outs and full grooms, timed around each stay.',
    photo: U('1568602471122-7832951cc4c5', 900),
  },
]

/* ── Rates — the pricing flow chart ── */
export interface PriceItem {
  label: string
  price: string
}
export interface PriceCategory {
  n: string
  title: string
  items: PriceItem[]
}

export const pricingCategories: PriceCategory[] = [
  {
    n: '01',
    title: 'Dog Daycare',
    items: [
      { label: 'Full Day', price: '$35' },
      { label: 'Half Day', price: '$25' },
      { label: 'Boarding Discount', price: '-$10' },
      { label: 'Individual Playtime', price: '$15' },
    ],
  },
  {
    n: '02',
    title: 'Cat Daycare',
    items: [
      { label: 'Full Day', price: '$20' },
      { label: 'Half Day', price: '$15' },
    ],
  },
  {
    n: '03',
    title: 'Daycare Membership',
    items: [
      { label: '1 Week (6 days)', price: '$192' },
      { label: '2 Weeks (12 days)', price: '$360' },
      { label: '3 Weeks (18 days)', price: '$504' },
      { label: '4 Weeks (24 days)', price: '$600' },
    ],
  },
  {
    n: '04',
    title: 'Dog Boarding',
    items: [
      { label: 'Condo', price: '$30' },
      { label: 'Standard', price: '$55' },
      { label: 'Luxury', price: '$75' },
      { label: 'Premium', price: '$60' },
    ],
  },
  {
    n: '05',
    title: 'Cat Boarding',
    items: [
      { label: 'Condo', price: '$25' },
      { label: 'Suite', price: '$29' },
    ],
  },
  {
    n: '06',
    title: 'Dog Grooming',
    items: [
      { label: 'Bath & Brush', price: '$35' },
      { label: 'Full Groom — Small', price: '$55' },
      { label: 'Full Groom — Large', price: '$75' },
      { label: 'Nail Trim', price: '$15' },
    ],
  },
  {
    n: '07',
    title: 'Cat Grooming',
    items: [
      { label: 'Bath & Brush', price: '$40' },
      { label: 'Full Groom', price: '$65' },
      { label: 'De-shedding Treatment', price: '$25' },
      { label: 'Nail Trim', price: '$15' },
    ],
  },
]

export const pricingNote = 'For each additional cat/dog, rooms are discounted — ask for details.'

/* ── Footer ── */
export const footer = {
  street: '1051 Pineloch Dr. Ste 700',
  cityLine: 'Houston, TX 77062',
  location: '1051 Pineloch Dr. Ste 700, Houston, TX 77062',
  area: 'Clear Lake, Houston',
  phone: '(713) 555-0192',
  email: 'stay@allpawsinn.com',
  hours: 'Reception 6:30am – 7:00pm · Care 24/7',
  instagram: '@allpawsinn',
}

/** Condensed for the footer — the day-by-day table belongs on the Contact page. */
export const hoursSummary: [string, string][] = [
  ['Mon – Fri', '6:30am – 7:00pm'],
  ['Saturday', '7:00am – 5:00pm'],
  ['Sunday', '12:00pm – 5:00pm'],
]

/** Front-desk hours, day by day. Overnight care runs around the clock regardless. */
export const openingHours: [string, string][] = [
  ['Mon', '6:30am – 7:00pm'],
  ['Tue', '6:30am – 7:00pm'],
  ['Wed', '6:30am – 7:00pm'],
  ['Thu', '6:30am – 7:00pm'],
  ['Fri', '6:30am – 7:00pm'],
  ['Sat', '7:00am – 5:00pm'],
  ['Sun', '12:00pm – 5:00pm'],
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
