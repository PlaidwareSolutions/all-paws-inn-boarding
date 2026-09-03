export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { title: string; links: NavLink[] };
export type NavGroup = {
  label: string;
  href?: string;
  /** Titled columns — used by Stays to give each house its own column. */
  columns?: NavColumn[];
  links?: NavLink[];
  featured?: { href: string; label: string; note: string };
};

export const navigation: NavGroup[] = [
  {
    label: "Stays",
    columns: [
      {
        title: "Dogs",
        links: [
          { label: "The Suites", href: "/suites", note: "Four rooms in the Lodge, from $58" },
          { label: "Day Guests", href: "/daycare", note: "Half and full days, packages" },
          { label: "Dog Grooming", href: "/spa#dogs", note: "Priced by coat, not by breed" },
        ],
      },
      {
        title: "Cats",
        links: [
          { label: "The Cattery", href: "/cattery", note: "Its own wing. No dogs, ever." },
          { label: "The Solarium & Catio", href: "/cattery#solarium", note: "Glass room and private screened catios" },
          { label: "Cat Grooming", href: "/spa#cats", note: "Sedation-free, in short sessions" },
        ],
      },
    ],
    featured: {
      href: "/quiet-wing",
      label: "The Quiet Wing",
      note: "For dogs and cats who find the rest of it too much. Priced at what the staffing costs.",
    },
  },
  {
    label: "The Inn",
    links: [
      { label: "The Property", href: "/the-inn", note: "16,000 sq ft, and who looks after it" },
      { label: "Care & Safety", href: "/safety", note: "Ratios, storms, heat, sanitation" },
      { label: "The Kitchen", href: "/kitchen", note: "Their food free; ours if you fancy it" },
      { label: "The Den Cam", href: "/den-cam", note: "Both wings, live in your account" },
      { label: "The Airport Run", href: "/shuttle", note: "IAH, Hobby and the neighbourhoods" },
    ],
    featured: {
      href: "/safety",
      label: "Someone is always here",
      note: "Staff work overnight shifts around the clock, every night of the year — storm season included.",
    },
  },
  { label: "Rates", href: "/rates" },
  { label: "New Guests", href: "/new-guests" },
];

export const footerNav: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Dogs",
    links: [
      { label: "The Suites", href: "/suites" },
      { label: "Day Guests", href: "/daycare" },
      { label: "Dog Grooming", href: "/spa#dogs" },
    ],
  },
  {
    title: "Cats",
    links: [
      { label: "The Cattery", href: "/cattery" },
      { label: "The Solarium & Catio", href: "/cattery#solarium" },
      { label: "Cat Grooming", href: "/spa#cats" },
    ],
  },
  {
    title: "The Inn",
    links: [
      { label: "The Quiet Wing", href: "/quiet-wing" },
      { label: "The Property", href: "/the-inn" },
      { label: "Care & Safety", href: "/safety" },
      { label: "The Kitchen", href: "/kitchen" },
      { label: "The Den Cam", href: "/den-cam" },
    ],
  },
  {
    title: "Practical",
    links: [
      { label: "Rates & Packages", href: "/rates" },
      { label: "Before Your First Stay", href: "/new-guests" },
      { label: "Policies", href: "/policies" },
      { label: "Visit & Contact", href: "/contact" },
      { label: "Guest Portal", href: "/portal" },
    ],
  },
];
