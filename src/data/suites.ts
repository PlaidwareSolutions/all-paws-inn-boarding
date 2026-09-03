import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

export type SuiteSpec = {
  dimensions: string;
  area: string;
  bed: string;
  outdoor: string;
  window: string;
  camera: boolean;
  walks: string;
  sharing: string;
};

export type Suite = {
  slug: string;
  name: string;
  species: "dog" | "cat";
  rate: number;
  blurb: string;
  body: string;
  spec: SuiteSpec;
  includes: string[];
  image: ImageAsset;
  alt: string;
  /** Portrait crop for the arch frame; the 3:2 above is used on detail pages. */
  portrait: ImageAsset;
  portraitAlt: string;
  /** Rough share of inventory — drives the mock availability model. */
  count: number;
};

export const dogSuites: Suite[] = [
  {
    slug: "the-loft",
    name: "The Loft",
    species: "dog",
    rate: 58,
    blurb: "Our smallest room, and still nobody's idea of a kennel.",
    body:
      "Lofts run along the north wall of the Lodge, where the light is even all day. Each has a full glass front " +
      "onto the corridor, so your dog can see the room and the people in it — most dogs settle faster when they " +
      "can watch what's happening. An elevated orthopedic cot keeps them off the floor and lets air move " +
      "underneath, which matters more in a Gulf Coast August than people expect.",
    spec: {
      dimensions: "4 ft × 6 ft",
      area: "24 sq ft",
      bed: "Elevated orthopedic cot",
      outdoor: "Four yard turnouts daily",
      window: "Glass front to corridor",
      camera: false,
      walks: "Included in yard turnouts",
      sharing: "One dog",
    },
    includes: ["Four yard turnouts", "Two meals, their own food", "Nightly turndown", "Daily photo"],
    image: images.suiteLabFloor,
    alt: "A yellow labrador stretched out asleep on a sunlit wooden floor",
    portrait: images.suiteLoftP,
    portraitAlt: "A shiba inu resting on a wooden floor in a band of afternoon sun",
    count: 8,
  },
  {
    slug: "the-garden-suite",
    name: "The Garden Suite",
    species: "dog",
    rate: 84,
    blurb: "A private patio, and a door they can use whenever they like.",
    body:
      "Garden Suites open onto their own small walled patio through a dog door the animal controls. This is the " +
      "room we recommend for dogs who are house-trained and hate being asked to wait. A shade sail keeps the " +
      "patios out of direct sun from mid-morning, and the rooms hold 74 degrees whatever August is doing outside. " +
      "Most of our repeat guests stay here.",
    spec: {
      dimensions: "6 ft × 8 ft",
      area: "48 sq ft + 40 sq ft patio",
      bed: "Memory foam, washable cover",
      outdoor: "Private shaded patio, unrestricted",
      window: "Exterior window + patio door",
      camera: false,
      walks: "One escorted walk daily",
      sharing: "Up to two dogs from one home",
    },
    includes: [
      "Private shaded patio",
      "Climate control and a cooling mat",
      "One escorted walk daily",
      "Two meals, their own food",
      "Nightly turndown",
      "Daily photo",
    ],
    image: images.suiteBedStretch,
    alt: "A dog asleep and stretched across a made bed in soft daylight",
    portrait: images.suiteGardenP,
    portraitAlt: "A dog resting on a window-side daybed, looking out at the garden",
    count: 7,
  },
  {
    slug: "the-courtyard-suite",
    name: "The Courtyard Suite",
    species: "dog",
    rate: 112,
    blurb: "A real bed, a real window, and a camera you can log into.",
    body:
      "The Courtyard Suites face east over the building's landscaped entry courtyard, which means morning light " +
      "and something to watch. Each has a proper twin bed with washable linens, a screen that plays whatever the " +
      "dog is used to at home, and an in-suite camera you can open from your account at any hour.",
    spec: {
      dimensions: "8 ft × 10 ft",
      area: "80 sq ft",
      bed: "Twin bed, washable linens",
      outdoor: "Private shaded patio, unrestricted",
      window: "Full east-facing window",
      camera: true,
      walks: "Two escorted walks daily",
      sharing: "Up to two dogs from one home",
    },
    includes: [
      "In-suite camera, always on",
      "Twin bed with linens",
      "Two escorted walks daily",
      "Private shaded patio",
      "Two meals, their own food",
      "Nightly turndown",
      "Daily photo and written note",
    ],
    image: images.suiteBedSoft,
    alt: "A dog sleeping on a bed with soft bedding beside a window",
    portrait: images.suiteOrchardP,
    portraitAlt: "A dog asleep on a bed, head on its paws, in morning light",
    count: 5,
  },
  {
    slug: "the-family-suite",
    name: "The Family Suite",
    species: "dog",
    rate: 158,
    blurb: "One room, one family, and two hundred square feet of fenced yard.",
    body:
      "There are two Family Suites at the back of the Lodge, each with its own interior door and its own fenced " +
      "section of the yard, shaded by a shade sail rather than a tree. Reclaimed-timber shelving lines the walls " +
      "— a build-out choice, not a working barn. Families with three or four dogs book these so nobody has to be " +
      "separated. A caregiver sits with your dogs twice a day, on the floor, for twenty minutes — that is written " +
      "into the rate rather than sold as an add-on.",
    spec: {
      dimensions: "10 ft × 12 ft",
      area: "120 sq ft + 200 sq ft yard",
      bed: "Queen bed, washable linens",
      outdoor: "Private shaded yard, unrestricted",
      window: "Two windows, west and south",
      camera: true,
      walks: "Two escorted walks daily",
      sharing: "Up to four dogs from one home",
    },
    includes: [
      "Private fenced yard, own shade sail",
      "Own interior door",
      "Two private sit-downs daily",
      "In-suite camera, always on",
      "Queen bed with linens",
      "Two escorted walks daily",
      "Two meals, their own food",
      "Daily photo and written note",
    ],
    image: images.suiteCurlWarm,
    alt: "A dog curled up asleep in warm afternoon light on a wooden floor",
    portrait: images.suiteBarnP,
    portraitAlt: "Two dogs from the same household asleep together on a bed by a window",
    count: 2,
  },
];

export const catSuites: Suite[] = [
  {
    slug: "the-perch",
    name: "The Perch",
    species: "cat",
    rate: 38,
    blurb: "Three levels, a hiding box, and a window that is entirely theirs.",
    body:
      "Perches are six feet tall and open at the front onto the Cattery's main room, which cats have to " +
      "themselves — no dog has ever been in this wing. Each has three levels, a covered box on the middle " +
      "shelf for cats who want to disappear, and a window seat on top looking into the courtyard.",
    spec: {
      dimensions: "3 ft × 3 ft × 6 ft",
      area: "27 sq ft of levels",
      bed: "Fleece pad, covered box",
      outdoor: "Shared solarium, rotated daily",
      window: "Own window seat",
      camera: false,
      walks: "Two solarium sessions daily",
      sharing: "One cat",
    },
    includes: ["Two solarium sessions", "Covered hiding box", "Two meals, their own food", "Daily photo"],
    image: images.catTower,
    alt: "Two cats sitting on different levels of a tall cat tree",
    portrait: images.catCondoP,
    portraitAlt: "A cat looking out from the covered box of a multi-level perch",
    count: 6,
  },
  {
    slug: "the-solarium-suite",
    name: "The Solarium Suite",
    species: "cat",
    rate: 52,
    blurb: "Direct access to the glass room, on their own schedule.",
    body:
      "Solarium Suites open straight into the glazed south room through a cat door, so they come and go without " +
      "asking anyone. The solarium is warm by nine in the morning and shaded by external blinds through the " +
      "worst of the afternoon. Cats who pace at boarding usually stop pacing here.",
    spec: {
      dimensions: "4 ft × 6 ft",
      area: "24 sq ft + solarium access",
      bed: "Two fleece pads, covered box",
      outdoor: "Direct solarium access, unrestricted",
      window: "Floor-to-ceiling south glass",
      camera: false,
      walks: "Unrestricted solarium",
      sharing: "Up to two cats from one home",
    },
    includes: [
      "Unrestricted solarium access",
      "Warm pad in winter, cooling mat in summer",
      "Covered hiding box",
      "Two meals, their own food",
      "Daily photo",
    ],
    image: images.catSunbeamFloor,
    alt: "A cat stretched out asleep in a broad patch of sunlight on a floor",
    portrait: images.panelCattery,
    portraitAlt: "A tabby cat sitting in a bright window with its eyes closed in the sun",
    count: 4,
  },
  {
    slug: "the-garden-room",
    name: "The Garden Room",
    species: "cat",
    rate: 64,
    blurb: "Their own screened catio, and outdoor air whenever they want it.",
    body:
      "The cat equivalent of a Garden Suite. Each Garden Room has a private screened catio of its own — not a " +
      "shared room on rotation — reached through a cat door the animal controls. Screened rather than open, so " +
      "they get the birds that visit the window-box planter, and the evening air, without any of the risk.",
    spec: {
      dimensions: "5 ft × 7 ft",
      area: "35 sq ft + 30 sq ft catio",
      bed: "Two pads, covered box, climbing shelf",
      outdoor: "Private screened catio, unrestricted",
      window: "Catio door and exterior window",
      camera: false,
      walks: "Unrestricted catio",
      sharing: "Up to two cats from one home",
    },
    includes: [
      "Private screened catio",
      "Climbing shelf and scratching post",
      "Covered hiding box",
      "Two meals, their own food",
      "Daily photo",
    ],
    image: images.catGardenDetail,
    alt: "A cat sitting on a table by a large glazed window with blossom outside",
    portrait: images.catGardenP,
    portraitAlt: "A cream-coloured cat with blue eyes looking out through a sunlit window",
    count: 3,
  },
  {
    slug: "the-conservatory",
    name: "The Conservatory",
    species: "cat",
    rate: 76,
    blurb: "A whole room, glazed on two sides, for one household.",
    body:
      "The Conservatory is a single room at the east end of the Cattery with glass on two sides and a climbing " +
      "wall the length of one of them. It is the room for households sending three cats, for cats who have never " +
      "boarded before, and for cats who simply do not tolerate other cats.",
    spec: {
      dimensions: "8 ft × 6 ft",
      area: "48 sq ft, full room",
      bed: "Two beds, two covered boxes",
      outdoor: "Private, glazed on two sides",
      window: "East and south glass",
      camera: true,
      walks: "Private, unrestricted",
      sharing: "Up to three cats from one home",
    },
    includes: [
      "Entire private room",
      "In-room camera, always on",
      "Climbing wall",
      "Two meals, their own food",
      "Daily photo and written note",
    ],
    image: images.catConservatoryDetail,
    alt: "Two cats from the same household resting together",
    portrait: images.catConservatoryP,
    portraitAlt: "Two cats asleep together on a sunlit windowsill above a garden",
    count: 2,
  },
];

export const allSuites = [...dogSuites, ...catSuites];

export function suiteBySlug(slug: string) {
  return allSuites.find((s) => s.slug === slug);
}

export function suitesFor(species: "dog" | "cat") {
  return species === "dog" ? dogSuites : catSuites;
}

/** Rows for the comparison matrix, in display order. */
export const specRows: Array<{ key: keyof SuiteSpec; label: string }> = [
  { key: "dimensions", label: "Room size" },
  { key: "area", label: "Floor area" },
  { key: "bed", label: "Bed" },
  { key: "outdoor", label: "Outdoor access" },
  { key: "window", label: "Window" },
  { key: "walks", label: "Escorted walks" },
  { key: "camera", label: "In-room camera" },
  { key: "sharing", label: "Shared occupancy" },
];
