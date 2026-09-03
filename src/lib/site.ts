/** Single source of truth for the inn's operational facts. */
export const site = {
  name: "All Paws Inn",
  tagline: "A boutique inn for dogs and cats",
  established: 2016,
  squareFeet: 16000,
  yardSquareFeet: 3200,
  address: {
    street: "1051 Pineloch Dr, Ste 700",
    town: "Houston",
    state: "TX",
    zip: "77062",
    county: "Harris County",
  },
  phone: "(281) 990-0170",
  phoneHref: "tel:+12819900170",
  email: "frontdesk@allpawsinn.com",
  mapUrl: "https://www.openstreetmap.org/search?query=1051%20Pineloch%20Dr%2C%20Houston%2C%20TX%2077062",
  drive: {
    downtown: "25 minutes",
    hobby: "20 minutes",
    iah: "65 minutes",
    galveston: "45 minutes",
  },
  hours: {
    lobby: [
      { days: "Monday – Friday", time: "7:00 am – 6:00 pm" },
      { days: "Saturday", time: "8:00 am – 5:00 pm" },
      { days: "Sunday", time: "9:00 am – 4:00 pm (pickup & drop-off only)" },
    ],
    note: "Staff are on site around the clock in overnight shifts — someone is always awake and in the building, including holidays and during storms.",
  },
  vetDistanceMinutes: 4,
  vetName: "Bay Area Veterinary Hospital",
  rescuePartner: "Bay Area Second Chance Rescue",
  cancellationDays: 7,
  holidayCancellationDays: 14,
  confirmWindow: "one business hour",
} as const;

/**
 * Two wings, one suite. Dogs and cats are on opposite sides of the build-out,
 * each behind its own door with its own air handler — so they get separate
 * facts rather than one borrowed from the other. A caregiver-to-cat ratio is
 * the wrong measure for a cattery; "no dog has ever been inside" is the
 * right one.
 */
export const houses = {
  barn: {
    key: "barn",
    name: "The Lodge",
    species: "dog",
    forWhom: "Dogs, overnight and daytime",
    rooms: 22,
    headline: "1:4 in the yard",
    facts: [
      { label: "Rooms", value: "22" },
      { label: "Daytime ratio", value: "1:4 caregivers to dogs" },
      { label: "Playgroups", value: "Eight dogs maximum" },
      { label: "Overnight", value: "Overnight staff, every night" },
    ],
    href: "/suites",
  },
  cattery: {
    key: "cattery",
    name: "The Cattery",
    species: "cat",
    forWhom: "Cats, overnight",
    rooms: 15,
    headline: "No dog has ever been inside",
    facts: [
      { label: "Rooms", value: "15" },
      { label: "Building", value: "Across the suite, its own locked door" },
      { label: "Air", value: "Its own ventilation system" },
      { label: "Staff", value: "Two dedicated cattery caregivers" },
    ],
    href: "/cattery",
  },
} as const;

export type HouseKey = keyof typeof houses;
export type Species = "dog" | "cat";

export const houseFor = (species: Species) => (species === "dog" ? houses.barn : houses.cattery);

export const NAP = `${site.address.street}, ${site.address.town}, ${site.address.state} ${site.address.zip}`;
