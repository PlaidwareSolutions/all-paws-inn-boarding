import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

export type Camera = {
  slug: string;
  name: string;
  house: "The Lodge" | "The Cattery" | "Both";
  where: string;
  hours: string;
  alwaysOn: boolean;
  image: ImageAsset;
  alt: string;
};

/** Two in each wing, plus the in-room cameras. */
export const cameras: Camera[] = [
  {
    slug: "the-yard",
    name: "The Yard",
    house: "The Lodge",
    where: "Main play yard, behind the building",
    hours: "7:00 am – 7:00 pm",
    alwaysOn: false,
    image: images.dogsPlay,
    alt: "Two dogs running together across an open lawn",
  },
  {
    slug: "turf-side",
    name: "The Turf Side",
    house: "The Lodge",
    where: "Quieter relief-area side of the yard",
    hours: "7:00 am – 7:00 pm",
    alwaysOn: false,
    image: images.yardTurfDog,
    alt: "A dog playing with a ball across the fenced turf yard",
  },
  {
    slug: "solarium",
    name: "The Solarium",
    house: "The Cattery",
    where: "Glazed south room, the Cattery wing",
    hours: "7:00 am – 7:00 pm",
    alwaysOn: false,
    image: images.catSunbeamFloor,
    alt: "A cat stretched out in sunlight on the solarium floor",
  },
  {
    slug: "perch-room",
    name: "The Perch Room",
    house: "The Cattery",
    where: "Main cattery room, where the Perches face the courtyard",
    hours: "7:00 am – 7:00 pm",
    alwaysOn: false,
    image: images.catConservatoryP,
    alt: "Two cats resting on a sunlit windowsill above the garden",
  },
  {
    slug: "in-room",
    name: "Your room",
    house: "Both",
    where: "Courtyard Suites, Family Suites and the Conservatory",
    hours: "Always on",
    alwaysOn: true,
    image: images.suiteBedSoft,
    alt: "A dog asleep on a bed inside a suite",
  },
];
