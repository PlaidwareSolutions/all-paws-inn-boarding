export type AddOn = {
  slug: string;
  name: string;
  price: number;
  unit: "per session" | "per day" | "per stay" | "per night";
  description: string;
  species: "dog" | "cat" | "both";
};

/**
 * Enrichment sold inside the Stay Planner as selectable cards.
 * Five options reach each species — cats are not a short appendix to the dog list.
 * Both wings get equal billing.
 */
export const enrichment: AddOn[] = [
  {
    slug: "solo-walk",
    name: "Solo Adventure",
    price: 22,
    unit: "per session",
    description:
      "Forty minutes on the back trails with one caregiver and no other dogs. Early or late in summer, never midday.",
    species: "dog",
  },
  {
    slug: "scent-work",
    name: "Scent Work",
    price: 20,
    unit: "per session",
    description:
      "Twenty minutes of find-the-treat through a set course. Tires an anxious dog out far better than running does.",
    species: "dog",
  },
  {
    slug: "splash-time",
    name: "Splash Time",
    price: 16,
    unit: "per session",
    description:
      "Supervised time in the kiddie pool on the yard turf, refilled fresh for each dog. May to September.",
    species: "dog",
  },
  {
    slug: "window-hour",
    name: "The Window Hour",
    price: 14,
    unit: "per session",
    description:
      "An hour alone in the solarium with the bird feeders in view and nobody else in the room. Booked for cats who guard their space.",
    species: "cat",
  },
  {
    slug: "wand-and-feather",
    name: "Wand and Feather",
    price: 16,
    unit: "per session",
    description:
      "Ten minutes of proper hunting play, one cat at a time. Short by design — cats hunt in bursts and then stop.",
    species: "cat",
  },
  {
    slug: "brush-out",
    name: "Brush-out",
    price: 12,
    unit: "per day",
    description:
      "Daily brushing for long coats, in their own room. The thing most long-haired cats miss most while they are away.",
    species: "cat",
  },
  {
    slug: "sit-down",
    name: "A Sit-Down",
    price: 18,
    unit: "per session",
    description:
      "A caregiver sits on the floor of the room for half an hour. No training, no agenda. Some animals need this more than exercise.",
    species: "both",
  },
  {
    slug: "puzzle-supper",
    name: "Puzzle Supper",
    price: 12,
    unit: "per day",
    description: "Their evening meal served through a foraging mat or a frozen toy instead of a bowl.",
    species: "both",
  },
];

export type MenuItem = { name: string; price: number | null; note: string };
export type MenuSection = { title: string; note?: string; items: MenuItem[] };

/**
 * The Kitchen. Opens with the free option on purpose — it makes the paid items
 * read as a choice rather than an upsell. Both wings get equal billing.
 */
export const kitchen: MenuSection[] = [
  {
    title: "From home",
    note: "What most guests eat, dog and cat alike. Bring it portioned or bring the bag; we measure either way.",
    items: [
      {
        name: "Their own food, prepared and served",
        price: null,
        note: "No charge, ever. Twice daily, or on whatever schedule you keep at home.",
      },
      {
        name: "Medication with meals",
        price: null,
        note: "No charge. Oral, topical, or injectable. Two caregivers sign for every dose.",
      },
    ],
  },
  {
    title: "The dog kitchen",
    note: "Cooked here, in the morning. Served warm. Priced per serving.",
    items: [
      { name: "Bone broth, poured over", price: 5, note: "Unsalted, no onion or garlic. For dogs who go off their food away from home." },
      { name: "Poached chicken and rice", price: 7, note: "The settling dish. Plain by design." },
      { name: "Seared salmon and sweet potato", price: 10, note: "Skin on, deboned twice." },
      { name: "Braised beef and pumpkin", price: 9, note: "Slow-cooked shoulder, no seasoning." },
      { name: "Sunday roast", price: 12, note: "Whatever the kitchen is roasting. Sundays only." },
    ],
  },
  {
    title: "The cat kitchen",
    note: "Cats go off their food away from home more readily than dogs do. This is the answer to that, not a luxury.",
    items: [
      { name: "Flaked tuna in spring water", price: 6, note: "Two ounces, drained." },
      { name: "Poached salmon", price: 8, note: "Cooled and flaked by hand, bones checked twice." },
      { name: "Chicken liver pâté", price: 7, note: "Made here. Cats who refuse everything usually take this." },
      { name: "Steamed white fish", price: 8, note: "Plain, skinned, and served just warm." },
      { name: "Broth to sip", price: 4, note: "Warm, unsalted. Also the way we get water into a cat who will not drink." },
      { name: "Whipped goat's milk", price: 5, note: "Lactose-free. A last resort that works more often than it should." },
    ],
  },
  {
    title: "Occasions",
    items: [
      { name: "Birthday cake", price: 14, note: "Carob and banana for dogs, sardine for cats. Candle included, photograph sent the same day." },
      { name: "Frozen stuffed toy", price: 6, note: "Their own food, frozen into a rubber toy. Lasts about an hour, and longer in August." },
    ],
  },
];

export type SpaService = { name: string; price: string; description: string };

export const spaDogs: SpaService[] = [
  { name: "Bath and brush-out", price: "from $38", description: "Wash, condition, blow-dry, ears, nails. Sized by coat, not by breed." },
  { name: "Full groom", price: "from $70", description: "Bath, brush-out, and a clip to your instructions or the last set of notes on file." },
  { name: "De-shedding treatment", price: "$30", description: "Undercoat rake and high-velocity dry. Booked most often in March and October." },
  { name: "Nail trim and file", price: "$15", description: "Walk-in, most days. Two minutes if they let us." },
  { name: "Paw balm and pad trim", price: "$10", description: "For hot asphalt in summer and grass burrs in autumn." },
];

export const spaCats: SpaService[] = [
  { name: "Brush-out and de-shed", price: "from $28", description: "The service most cats actually need. Done in short sessions rather than one long one." },
  { name: "Full cat groom", price: "from $58", description: "Bath, dry and tidy. Booked for long coats and for cats who have stopped grooming themselves." },
  { name: "Mat removal", price: "from $35", description: "Clipped out rather than combed out. It is faster, and it does not hurt." },
  { name: "Nail trim", price: "$12", description: "Front and back, one paw at a time, with breaks." },
  { name: "Sanitary trim", price: "$18", description: "For long-haired and older cats. Quiet room, no dryer." },
];

/** Daycare — pay-per-day against packages, for the effective-rate toggle. */
export const daycareRates = {
  halfDay: 28,
  fullDay: 40,
  packages: [
    { name: "Ten days", days: 10, price: 360, note: "Valid twelve months." },
    { name: "Twenty days", days: 20, price: 680, note: "Valid twelve months." },
    { name: "Monthly, unlimited", days: 21, price: 440, note: "Weekdays. Averaged over a working month." },
  ],
};

/**
 * The Airport Run. Hobby is the close one from here — Bush Intercontinental is
 * the trip that eats a morning, and the fares say so.
 */
export const shuttleFares = [
  { route: "Bush Intercontinental (IAH)", price: 95, schedule: "Timed to your flight, any day" },
  { route: "Hobby (HOU)", price: 85, schedule: "Timed to your flight, any day" },
  { route: "League City & Friendswood", price: 45, schedule: "Weekday mornings and evenings" },
  { route: "Nassau Bay & Seabrook", price: 35, schedule: "Weekday mornings and evenings" },
  { route: "Pearland", price: 45, schedule: "Weekday mornings and evenings" },
  { route: "Texas Medical Center & Downtown", price: 55, schedule: "Weekday mornings and evenings" },
];
