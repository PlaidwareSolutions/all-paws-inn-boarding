import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

export type ReportCard = {
  species: "dog" | "cat";
  date: string;
  guest: string;
  room: string;
  meals: string;
  appetite: "All of it" | "Most of it" | "Picked at it";
  playgroup: string;
  enrichment: string;
  sleep: string;
  mood: string;
  note: string;
  author: string;
  image: ImageAsset;
  alt: string;
};

export const dogCards: ReportCard[] = [
  {
    species: "dog",
    date: "Thursday, 12 March",
    guest: "Otis",
    room: "Garden Suite 4",
    meals: "Breakfast 7:20 · Supper 17:40",
    appetite: "All of it",
    playgroup: "Small and steady — four dogs, 50 minutes",
    enrichment: "Scent work, the long course",
    sleep: "11:40 – 13:30, and again from 15:00",
    mood: "Loose, chatty by the afternoon",
    note:
      "He would not come off the patio this morning until the sun reached the far corner, which took until about nine. Then he was fine. Found every one of the scent hides, including the one under the bench that nobody found yesterday. Ate everything.",
    author: "Theo, afternoon shift",
    image: images.suiteBedStretch,
    alt: "A dog asleep and stretched out on a bed in soft daylight",
  },
  {
    species: "dog",
    date: "Friday, 13 March",
    guest: "Otis",
    room: "Garden Suite 4",
    meals: "Breakfast 7:15 · Supper 17:30",
    appetite: "All of it",
    playgroup: "Small and steady — five dogs, 55 minutes",
    enrichment: "Solo walk around the block and back",
    sleep: "12:00 – 14:10",
    mood: "Settled. Slept on his back.",
    note:
      "First time we have seen him sleep on his back here. He did it in the patio doorway with his feet in the sun, and stayed there long enough that we took a photograph. Walked the block but would not hurry.",
    author: "Ines, morning shift",
    image: images.suiteCurlWarm,
    alt: "A dog curled up asleep in warm afternoon light",
  },
  {
    species: "dog",
    date: "Saturday, 14 March",
    guest: "Otis",
    room: "Garden Suite 4",
    meals: "Breakfast 7:25 · Supper 17:45",
    appetite: "Most of it",
    playgroup: "Rested — no group today, his choice",
    enrichment: "Puzzle supper and a sit-down",
    sleep: "Most of the middle of the day",
    mood: "Quiet but easy",
    note:
      "Slower today, which we would expect on day three — most dogs take a rest day. Left about a third of his supper. Nothing to be concerned about, but we will watch it and tell you tomorrow either way.",
    author: "Theo, afternoon shift",
    image: images.quietRestPeaceful,
    alt: "A golden puppy asleep with its face nestled in a blanket",
  },
];

export const catCards: ReportCard[] = [
  {
    species: "cat",
    date: "Thursday, 12 March",
    guest: "Pim",
    room: "Solarium Suite 2",
    meals: "Breakfast 7:50 · Supper 17:55",
    appetite: "Picked at it",
    playgroup: "None — cats are never grouped here",
    enrichment: "Solarium, on his own, 11:00 – 12:15",
    sleep: "Most of the morning, under the shelf",
    mood: "Watchful. Not distressed.",
    note:
      "First day, so he spent the morning under the shelf and that is exactly what we expect. Came out for the solarium at eleven and took the second window from the left, which your notes said he would. Ate about half. We will weigh it again tomorrow.",
    author: "Ines, Cattery",
    image: images.catSleepSoft,
    alt: "A ginger cat asleep in soft light",
  },
  {
    species: "cat",
    date: "Friday, 13 March",
    guest: "Pim",
    room: "Solarium Suite 2",
    meals: "Breakfast 7:45 · Supper 17:40",
    appetite: "All of it",
    playgroup: "None — cats are never grouped here",
    enrichment: "Wand and feather, 8 minutes. Solarium 10:40 – 14:00.",
    sleep: "14:00 – 16:30, on the window seat",
    mood: "Out and about. Came to the door.",
    note:
      "Much better. Ate the lot at both meals and came to the front of the room when I opened the door, which he did not do yesterday. Played for about eight minutes and then stopped, which is normal — cats quit while they are ahead.",
    author: "Ines, Cattery",
    image: images.catRollWood,
    alt: "A ginger cat rolling on a warm wooden floor in sunlight",
  },
  {
    species: "cat",
    date: "Saturday, 14 March",
    guest: "Pim",
    room: "Solarium Suite 2",
    meals: "Breakfast 7:50 · Supper 17:50",
    appetite: "All of it",
    playgroup: "None — cats are never grouped here",
    enrichment: "Solarium most of the day. Brush-out at turndown.",
    sleep: "Long stretch, 11:00 – 15:00",
    mood: "Entirely at home",
    note:
      "He has decided the place is his. Spent nearly four hours in the solarium and had to be encouraged out for supper. Brushed him at turndown and he let me do his back, which your notes said was unlikely. Very little hair coming out.",
    author: "Marguerite, evening",
    image: images.catSillAsleep,
    alt: "A cat asleep on a sunlit windowsill",
  },
];

export const cardsFor = (species: "dog" | "cat") => (species === "dog" ? dogCards : catCards);

/** Retained for anything still importing the original name. */
export const reportCards = dogCards;
