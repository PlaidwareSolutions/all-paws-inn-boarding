import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

export type Guest = {
  name: string;
  species: "dog" | "cat";
  breed: string;
  stays: number;
  /** One specific observed thing. That is what proves somebody was paying attention. */
  note: string;
  image: ImageAsset;
  alt: string;
};

/** Four from each house. The order alternates so neither reads as the main event. */
export const guests: Guest[] = [
  {
    name: "Biscuit",
    species: "dog",
    breed: "Bernese Mountain Dog",
    stays: 14,
    note: "Inspects every new arrival from the third stair. Will not come down until satisfied.",
    image: images.guestBiscuit,
    alt: "A Bernese mountain dog sitting on a green lawn",
  },
  {
    name: "Pim",
    species: "cat",
    breed: "Domestic shorthair",
    stays: 11,
    note: "Solarium, eleven o'clock, second window from the left. Non-negotiable.",
    image: images.guestPim,
    alt: "A cream and white cat resting in warm light",
  },
  {
    name: "Otis",
    species: "dog",
    breed: "French Bulldog",
    stays: 31,
    note: "Will not sleep without the blue blanket. We keep a spare blue blanket.",
    image: images.guestOtis,
    alt: "A French bulldog tilting its head, photographed indoors in soft light",
  },
  {
    name: "Bruno",
    species: "cat",
    breed: "British Shorthair",
    stays: 19,
    note: "Sleeps in the sink. We stopped trying to redirect him in 2023.",
    image: images.guestBruno,
    alt: "A grey British shorthair cat resting compactly, paws tucked in",
  },
  {
    name: "Juniper",
    species: "dog",
    breed: "Border Collie cross",
    stays: 9,
    note: "Herds the tennis balls into a single pile by the gate. Nobody asked her to.",
    image: images.guestJuniper,
    alt: "A merle border collie moving through long green grass",
  },
  {
    name: "Saffron",
    species: "cat",
    breed: "Ginger tabby",
    stays: 7,
    note: "Will not eat unless the bowl is moved two inches to the left. We move it.",
    image: images.guestSaffron,
    alt: "A ginger tabby cat with green eyes, resting and gazing upward in warm sunlight",
  },
  {
    name: "Marlowe",
    species: "dog",
    breed: "Greyhound",
    stays: 22,
    note: "Sleeps nineteen hours. Sprints for four minutes. Sleeps again.",
    image: images.guestMarlowe,
    alt: "A close portrait of a fawn greyhound with soft, alert eyes looking toward the camera",
  },
  {
    name: "Clementine",
    species: "cat",
    breed: "Tortoiseshell",
    stays: 5,
    note: "Hides for exactly two hours, then supervises everything.",
    image: images.guestClementine,
    alt: "A tortoiseshell cat resting on a patterned blanket with a relaxed, sleepy gaze",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  town: string;
  detail: string;
  guest: string;
  species: "dog" | "cat";
};

/** Two from each house. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Otis is a nervous dog and I had stopped travelling because of it. The third morning they sent a photo of him asleep on his back in the patio doorway. I have never seen him do that at home.",
    author: "Dana R.",
    town: "The Heights, Houston",
    detail: "31 stays since 2021",
    guest: "Otis",
    species: "dog",
  },
  {
    quote:
      "I had used two places before that called themselves cat-friendly and both of them had a dog barking somewhere. Here it is a separate wing on the other side of the suite. Bruno eats on the first night now, which he never once did anywhere else.",
    author: "Wes A.",
    town: "Seabrook, TX",
    detail: "19 stays, The Cattery",
    guest: "Bruno",
    species: "cat",
  },
  {
    quote:
      "Marlowe is sixteen and on four medications. They asked more questions than my vet does, then sent the dosing log home with him. That is the whole reason we drive up from League City.",
    author: "Priya S.",
    town: "League City, TX",
    detail: "22 stays, The Quiet Wing",
    guest: "Marlowe",
    species: "dog",
  },
  {
    quote:
      "What I did not expect was the note. Not a form — a real sentence about what she did that day. Clementine hid under the shelf for two hours and they wrote that down too, instead of pretending she was fine.",
    author: "Nadia H.",
    town: "Friendswood, TX",
    detail: "5 stays, The Garden Room",
    guest: "Clementine",
    species: "cat",
  },
];
