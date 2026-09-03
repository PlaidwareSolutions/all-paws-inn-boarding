import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

/** Mock account behind the demonstration sign-in. One animal from each house. */
export type Pet = {
  name: string;
  species: "dog" | "cat";
  breed: string;
  age: string;
  weight: string;
  house: string;
  image: ImageAsset;
  alt: string;
  vaccines: Array<{ name: string; expires: string; status: "current" | "expiring" | "expired" }>;
  notes: string;
  medication?: string;
};

export const account = {
  owner: "Dana Reyes",
  since: 2021,
  town: "The Heights, Houston",
  stays: 31,
};

export const pets: Pet[] = [
  {
    name: "Otis",
    species: "dog",
    breed: "French Bulldog",
    age: "6 years",
    weight: "27 lb",
    house: "The Lodge",
    image: images.guestOtis,
    alt: "A French bulldog tilting its head indoors",
    vaccines: [
      { name: "Rabies", expires: "14 Aug 2027", status: "current" },
      { name: "DHPP", expires: "2 Feb 2027", status: "current" },
      { name: "Bordetella", expires: "19 Oct 2026", status: "expiring" },
      { name: "Heartworm prevention", expires: "Monthly — logged 4 Sep", status: "current" },
    ],
    notes:
      "Will not settle without the blue blanket — we keep a spare. Slow to eat the first evening, normal by the second. Prefers the patio door open. Flat-faced, so early and late turnouts only from June through September.",
    medication: "Apoquel 5.4mg, one tablet with breakfast.",
  },
  {
    name: "Pim",
    species: "cat",
    breed: "Domestic shorthair",
    age: "9 years",
    weight: "10.6 lb",
    house: "The Cattery",
    image: images.guestPim,
    alt: "A cream and white cat resting in warm light",
    vaccines: [
      { name: "Rabies", expires: "22 May 2027", status: "current" },
      { name: "FVRCP", expires: "22 May 2027", status: "current" },
      { name: "Heartworm prevention", expires: "Monthly — logged 2 Sep", status: "current" },
      { name: "Flea prevention", expires: "Monthly — logged 2 Sep", status: "current" },
    ],
    notes:
      "Solarium at eleven, second window from the left. Will not use a covered tray. Hides for the first two hours of every stay, then does not. Drinks only from the bowl furthest from his food.",
  },
];

export const upcoming = {
  reference: "API-4471",
  room: "Garden Suite 4",
  guest: "Otis",
  arrive: "Friday 20 November",
  depart: "Sunday 29 November",
  nights: 9,
  total: 882,
  shuttle: "Bush Intercontinental (IAH), Friday 5:30 am",
  status: "Confirmed",
};

export const pastStays = [
  { dates: "12 – 16 March 2026", room: "Solarium Suite 2", guest: "Pim", nights: 4, total: 208 },
  { dates: "12 – 16 March 2026", room: "Garden Suite 4", guest: "Otis", nights: 4, total: 336 },
  { dates: "2 – 4 January 2026", room: "Garden Suite 2", guest: "Otis", nights: 2, total: 196 },
  { dates: "18 – 27 December 2025", room: "The Perch", guest: "Pim", nights: 9, total: 468 },
  { dates: "30 Aug – 2 Sep 2025", room: "Garden Suite 4", guest: "Otis", nights: 3, total: 252 },
];

export const documents = [
  { name: "Vaccination record — Otis", date: "Updated 14 Aug 2026", kind: "PDF" },
  { name: "Vaccination record — Pim", date: "Updated 22 May 2026", kind: "PDF" },
  { name: "Heartworm prevention log", date: "Updated 4 Sep 2026", kind: "PDF" },
  { name: "Boarding agreement", date: "Signed 3 Feb 2021", kind: "PDF" },
  { name: "Medication authorisation — Otis", date: "Updated 12 Mar 2026", kind: "PDF" },
];
