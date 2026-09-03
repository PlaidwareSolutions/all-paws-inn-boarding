import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

/**
 * Environmental photography only — hands, backs, mid-action. No stock portrait
 * carries an invented name and an invented certification on this site.
 */
export type TeamEntry = {
  name: string;
  role: string;
  since: number;
  detail: string;
  image: ImageAsset;
  alt: string;
};

export const team: TeamEntry[] = [
  {
    name: "Marguerite",
    role: "Innkeeper",
    since: 2016,
    detail:
      "Boarded a handful of dogs out of a rented room for five years before signing the lease here. Runs both wings, does the rota, and still works two overnight shifts a month.",
    image: images.careDogHandler,
    alt: "A caregiver's hand reaching down to pet a happy corgi outdoors",
  },
  {
    name: "Theo",
    role: "Head of care",
    since: 2017,
    detail:
      "Licensed veterinary technician. Writes the medication protocol and does most of the meet and greets, because he is the best of us at spotting a dog who is not coping.",
    image: images.careBrushHands,
    alt: "A caregiver's hand gently cupping a dog's face",
  },
  {
    name: "Ines",
    role: "Cattery lead",
    since: 2019,
    detail:
      "Fear Free Feline certified, and runs the Cattery as a genuinely separate operation — separate keys, separate laundry, separate everything. Has strong views about how many hiding places a cat needs, and she is right.",
    image: images.careWalkParkAlt,
    alt: "A caregiver's hands gently holding a Shiba Inu's face, leash visible",
  },
  {
    name: "Sam",
    role: "Spa",
    since: 2021,
    detail:
      "Grooms dogs and cats, and is the reason we stopped dematting difficult coats. Will clip a dog rather than put it through an hour it does not need.",
    image: images.careHoldDog,
    alt: "A caregiver holding a wet puppy gently in both hands during a bath",
  },
];

export const propertyStory = [
  {
    year: "2010",
    title: "A rented room, elsewhere in the Bay Area",
    body: "Before there was a business, there was a rented room. Marguerite boarded a handful of dogs for neighbours out of a spare room elsewhere in Clear Lake for five years, nights and weekends around a full-time job.",
  },
  {
    year: "2015",
    title: "The lease at Pineloch Center",
    body: "She signed the lease on a plain second-floor suite and spent five months on the build-out — new flooring, two separate air handlers, a fenced section of the lot behind the building for a yard. Suite 700 was empty office space when she got the keys.",
  },
  {
    year: "2016",
    title: "Six rooms",
    body: "We opened with six rooms and one member of staff, boarding dogs for people we already knew around Clear Lake. The waiting list of dogs we had to turn away was the reason we carried on.",
  },
  {
    year: "2019",
    title: "The Cattery",
    body: "A separate wing rather than a converted corner, across the suite from the Lodge with its own air. It took two more years to afford, and cats that had never settled anywhere else started sleeping through the night within a week of it opening.",
  },
  {
    year: "2021",
    title: "A generator, and a plan",
    body: "After the freeze we put in a whole-suite backup generator and battery backup for climate control and the cameras, and had a written hurricane evacuation plan drawn up with a named destination inland. Nobody on this coast gets to be casual about weather, and no guest room here has lost climate control since, whatever the grid outside is doing.",
  },
  {
    year: "2023",
    title: "The Quiet Wing",
    body: "A soundproofed corridor at the back of the suite for animals who cannot manage the rest of it, dogs and cats both. The part of this business we are most glad to have built.",
  },
];
