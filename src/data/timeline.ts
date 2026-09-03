import { images } from "@/lib/images";
import type { ImageAsset } from "@/lib/images";

export type TimelineStop = {
  time: string;
  label: string;
  title: string;
  body: string;
  image: ImageAsset;
  alt: string;
  icon: "sunrise" | "bowl" | "play" | "rest" | "nose" | "walk" | "moon" | "sun" | "feather" | "brush";
};

export const dogDay: TimelineStop[] = [
  {
    time: "6:45",
    label: "Morning",
    title: "Doors open before the heat does",
    body:
      "The overnight caregiver is already awake and has been through every room. In summer the first turnout is the long one, because by eleven it will be too hot to ask much of anybody.",
    image: images.yardMorning,
    alt: "Two dogs playing together on the grass during the first turnout",
    icon: "sunrise",
  },
  {
    time: "7:30",
    label: "Breakfast",
    title: "Their own food, measured to your note",
    body:
      "Meals are portioned the night before against what you told us at check-in. Medication is given here, signed by two people, and logged in a book you can ask to see.",
    image: images.feedDog,
    alt: "A dog eating its breakfast from a bowl",
    icon: "bowl",
  },
  {
    time: "9:00",
    label: "First yard",
    title: "Playgroups, sorted by how they play",
    body:
      "Groups are capped at eight and matched on size, energy and play style — not on breed. A caregiver is inside the fence with them the entire time, never watching from a gate.",
    image: images.dogsPlay,
    alt: "Two dogs running together across grass",
    icon: "play",
  },
  {
    time: "11:30",
    label: "Quiet",
    title: "Everyone goes back to their room",
    body:
      "Through the hottest part of the day, and longer from June to September. Dogs that never settle at boarding are usually dogs that were never given the chance to.",
    image: images.suiteBeagleFloor,
    alt: "A beagle resting on a floor in a quiet room with soft light",
    icon: "rest",
  },
  {
    time: "14:00",
    label: "Enrichment",
    title: "Scent work, puzzles, or a walk with one person",
    body:
      "Whatever is on your dog's card. Scent work tires an anxious dog out more thoroughly than an hour of running, and it does not raise their temperature — which matters here.",
    image: images.careWalkParkAlt,
    alt: "A caregiver's hands gently holding a Shiba Inu's face, leash visible",
    icon: "nose",
  },
  {
    time: "17:30",
    label: "Second yard",
    title: "The long turnout, once the sun is off the turf",
    body:
      "The big one. The kiddie pool comes out May through September, under the shade sail over the yard.",
    image: images.yardTurfDog,
    alt: "A dog playing with a ball across the fenced turf yard",
    icon: "walk",
  },
  {
    time: "19:45",
    label: "Turndown",
    title: "Lights down, and the day gets written",
    body:
      "Supper, a last turnout, and then the note. Somebody who spent the day with your dog writes a few sentences about it, and it reaches your phone before you go to sleep.",
    image: images.quietRestPeaceful,
    alt: "A golden puppy asleep, nestled in a blanket, in the evening",
    icon: "moon",
  },
];

/**
 * The cat day is genuinely different, not the dog day with the words swapped.
 * Cats sleep sixteen hours, hunt in short bursts, and find being handled all
 * day worse than being left alone — so the shape of it is the proof.
 */
export const catDay: TimelineStop[] = [
  {
    time: "7:00",
    label: "Morning",
    title: "The Cattery wakes slower",
    body:
      "Blinds come up rather than lights coming on, and the room is quiet for the first half hour. Cats that have travelled the day before are left entirely alone until they come out on their own.",
    image: images.catDayWake,
    alt: "A cat stretching awake on pale bedding in morning light",
    icon: "sunrise",
  },
  {
    time: "7:45",
    label: "Breakfast",
    title: "Their own food, and we weigh what is left",
    body:
      "Appetite is the first thing to change in an unhappy cat, so every bowl is weighed back. If a cat leaves two meals we ring you rather than waiting to see.",
    image: images.catDayBreakfast,
    alt: "A calico cat reaching a paw toward a hand near its food bowls",
    icon: "bowl",
  },
  {
    time: "9:00",
    label: "The solarium",
    title: "Warm by nine, shaded by two",
    body:
      "The glass room faces south, so it is warm early and screened from the worst of the afternoon. Perch guests come in on rotation; Solarium and Garden Room guests come and go as they like.",
    image: images.catDaySolarium,
    alt: "A cat rolling playfully in a patch of sunlight on the floor",
    icon: "sun",
  },
  {
    time: "11:00",
    label: "The long sleep",
    title: "Four hours where nothing happens",
    body:
      "This is the part people are surprised by. A cat sleeps sixteen hours a day at home and should sleep sixteen hours here. We do not wake them for enrichment, and we do not count it as a service withheld.",
    image: images.catDaySleep,
    alt: "A cat asleep on a windowsill in soft daylight",
    icon: "rest",
  },
  {
    time: "15:30",
    label: "Play",
    title: "Ten minutes of hunting, one cat at a time",
    body:
      "Wand and feather, always alone, always short. Cats hunt in bursts and then stop; a long session is a human idea. No cat is ever in a room with a cat from another household.",
    image: images.catDayPlay,
    alt: "A cat reaching up a paw toward a toy, mid-play",
    icon: "feather",
  },
  {
    time: "17:45",
    label: "Supper",
    title: "The second meal, and fresh water everywhere",
    body:
      "Water is changed in three places per room, because cats routinely refuse to drink beside their food. It is a small thing that keeps older cats out of trouble.",
    image: images.catDaySupper,
    alt: "A fluffy tuxedo cat licking its lips beside its bowl in warm evening light",
    icon: "bowl",
  },
  {
    time: "19:30",
    label: "Turndown",
    title: "Brushing, litter, and the day gets written",
    body:
      "Trays are stripped rather than scooped, coats are brushed for anyone who wants it, and then the note — the same written note the dogs get, from whoever spent the day in the building.",
    image: images.catDayBrush,
    alt: "A tabby kitten peeking curiously from a couch cushion in warm lamplight",
    icon: "brush",
  },
];

export const dayFor = (species: "dog" | "cat") => (species === "dog" ? dogDay : catDay);

/** Retained for anything still importing the original name. */
export const dayAtTheInn = dogDay;
