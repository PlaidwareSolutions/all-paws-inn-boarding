import { site } from "@/lib/site";

export type Faq = {
  question: string;
  answer: string;
  group: "booking" | "stay" | "health" | "weather" | "holidays";
};

/**
 * Cat questions sit inside the ordinary groups rather than in a cat section.
 * A separate cat FAQ would say cats are a special case, which is the whole
 * thing this site is trying not to say.
 */
export const faqs: Faq[] = [
  {
    group: "booking",
    question: "Do I have to do a meet and greet before my dog can stay?",
    answer:
      "Yes, for a first overnight stay, and it is free. It takes about forty minutes and it is genuinely useful — we learn how your dog handles a new group, and you get to look at every room before you commit to one. Day guests do a shorter version on a weekday morning.",
  },
  {
    group: "booking",
    question: "Do cats need a meet and greet too?",
    answer:
      "No, and we would rather they did not. A second journey in a carrier costs a cat more than the visit is worth. Send us your notes and their records instead, and come and look around on your own if you would like to — you are welcome any time in lobby hours.",
  },
  {
    group: "booking",
    question: "How far ahead should I book?",
    answer:
      "Two to three weeks for an ordinary week, and considerably further for the peak windows — Thanksgiving, the week between Christmas and New Year, and Texas spring break are usually full months in advance. We publish those dates a year ahead so nobody is caught out.",
  },
  {
    group: "booking",
    question: "What happens after I send a reservation request?",
    answer: `Somebody reads it and replies within ${site.confirmWindow} during opening hours. Nothing is charged when you send a request; we take a deposit only once we have confirmed the room and you have said yes.`,
  },
  {
    group: "stay",
    question: "Is the Cattery really separate, or is it a room off the dog corridor?",
    answer:
      "Across the suite from the Lodge, behind its own locked door and its own air handler. No dog has ever been inside it. Cats can smell a dog through a wall, so a closed door on a shared corridor is not separation and we will not call it that.",
  },
  {
    group: "stay",
    question: "Can I see my animal while I'm away?",
    answer:
      "Yes. Every guest gets a photograph and a written note daily, dog and cat alike. There are cameras on the yard, on the Solarium and on the Perch Room, and Courtyard Suites, Family Suites and the Conservatory have a camera in the room, on all night.",
  },
  {
    group: "stay",
    question: "My dog doesn't like other dogs. Is that a problem?",
    answer:
      "No, and it is more common than people think. Dogs who would rather not be in a group get solo walks, scent work and time in the yards on their own — at no extra charge. If your dog is reactive or fearful rather than simply uninterested, look at The Quiet Wing.",
  },
  {
    group: "stay",
    question: "Will my cat be put with other cats?",
    answer:
      "Never. Cats from different households do not meet here, and rooms are arranged so no cat can see an unrelated cat — most cattery stress is territorial, and territory is about sightlines. Cats from the same home share by choice, in the Garden Room or the Conservatory.",
  },
  {
    group: "stay",
    question: "What food do you feed?",
    answer:
      "Yours. Bring it portioned or bring the bag, and there is no charge for preparing and serving it on whatever schedule you keep at home. The kitchen menu is genuinely optional — though cats go off their food away from home more readily than dogs, which is what most of the cat menu exists for.",
  },
  {
    group: "health",
    question: "Which vaccinations do you require?",
    answer:
      "Dogs: rabies, DHPP, and Bordetella within the last six months, plus canine influenza year round. Cats: rabies, FVRCP, and FeLV for any cat with outdoor access. Everyone needs current heartworm and flea prevention, and we need records at least 48 hours before arrival.",
  },
  {
    group: "health",
    question: "Why is heartworm prevention not optional?",
    answer:
      "Because this is the Gulf Coast and the mosquitoes do not have an off-season. Heartworm is endemic in Harris County and it is a genuinely awful, genuinely preventable disease. A lapsed prevention record is the one thing we will turn a booking away over.",
  },
  {
    group: "health",
    question: "Will you give medication?",
    answer:
      "Yes, at no charge, including injectables. It must arrive in the original labelled packaging. Two caregivers sign for every dose and the log goes home with you. Two of our staff are licensed veterinary technicians and both work the Quiet Wing.",
  },
  {
    group: "health",
    question: "What if my animal gets sick while I'm away?",
    answer: `${site.vetName} is ${site.vetDistanceMinutes} minutes away and holds our guests on file. If it is urgent we go first and call you from the car; if it is not, we call you first. We do not charge for the transport or the decision.`,
  },
  {
    group: "weather",
    question: "What happens in a hurricane?",
    answer:
      "There is a written plan, not an intention. This is the Texas Gulf Coast, close enough to the Bay that hurricane season isn't optional to plan for — there is a whole-suite backup generator tested monthly, UPS battery backup for climate control and the cameras, and seventy-two hours of food and water for a full house. If we evacuate, both wings move together to a partner facility in Conroe, about forty miles north, and every animal is chipped, photographed and logged out.",
  },
  {
    group: "weather",
    question: "Does the building flood?",
    answer:
      "It has not, and we will tell you plainly if that ever changes. Anybody on this coast who says flooding is impossible is selling something — which is exactly why the generator, the battery backup and the written evacuation plan exist rather than a promise that we will not need them.",
  },
  {
    group: "weather",
    question: "How do you handle the summer?",
    answer:
      "Yard sessions move to before ten and after six once it is over 90°F, and midday is indoors regardless of what anybody requests. Above 95°F turnouts shorten to fifteen minutes with a misting fan running. Flat-faced breeds go out early and late only, whatever the thermometer says.",
  },
  {
    group: "holidays",
    question: "Are peak rates different?",
    answer:
      "Yes, and they are published a year ahead so you can see them before you plan anything. Peak nights carry a $14 per night surcharge and a minimum stay. That is the whole of it — no separate holiday booking fee, no premium on enrichment, no surge on the Airport Run.",
  },
  {
    group: "holidays",
    question: "What are the peak windows?",
    answer:
      "Texas spring break in March, the week around 4 July, the Memorial Day and Labor Day weekends, the week of Thanksgiving, and 20 December through 2 January. Everything else in the year is standard rate.",
  },
  {
    group: "holidays",
    question: "What if you're full?",
    answer:
      "We keep a real waiting list rather than a form that goes nowhere, and we work it in order. Roughly one in five peak requests is filled from the list because of a cancellation. The Cattery frees up more often than the Lodge does.",
  },
];

export const policies = [
  {
    title: "Cancellation",
    items: [
      `Standard dates: cancel more than ${site.cancellationDays} days out and the deposit is returned in full.`,
      `Peak dates: ${site.holidayCancellationDays} days.`,
      "Inside those windows we hold the deposit as credit for twelve months rather than keeping it.",
      "If your animal is unwell, or your flight is cancelled, we return the deposit. Tell us what happened.",
      "If a named storm closes the airport or the roads, everything is refunded in full. That is not a goodwill gesture, it is the policy.",
    ],
  },
  {
    title: "Deposits",
    items: [
      "One night's room rate, taken once we confirm the room, not when you send the request.",
      "Applied to the final bill.",
      "No deposit on daycare or grooming.",
    ],
  },
  {
    title: "Arrival and departure",
    items: [
      "Check-in from 8:00 am. Check-out by 11:00 am.",
      "A late departure up to 4:00 pm is charged as a half day.",
      "Sunday is pickup and drop-off only, between 9:00 am and 4:00 pm.",
      "Cats arrive in a carrier. We will carry it in; please do not open it in the car park.",
    ],
  },
  {
    title: "Medication and medical",
    items: [
      "Given at no charge, in original labelled packaging only.",
      "Two caregivers sign for every dose; the log goes home with you.",
      "We require a second contact who can authorise treatment if we cannot reach you.",
      "Veterinary costs incurred during a stay are billed at cost, with the invoice.",
    ],
  },
  {
    title: "Behaviour",
    items: [
      "Every dog is assessed before a first overnight stay, and dogs do sometimes fail.",
      "If a dog is not coping we move them out of group play and tell you the same day.",
      "We do not use corrective collars, and we ask that they are not left with us.",
      "Intact dogs over seven months cannot join group play, but are welcome to board.",
      "Cats are never grouped, so there is nothing for a cat to fail.",
    ],
  },
  {
    title: "Weather",
    items: [
      "Yard time is restricted above 90°F and again above 95°F. This is not adjustable on request.",
      "Named storm approaching: intake closes at the warning, and early collection is offered at no charge.",
      "If we evacuate, both wings move together and you are told before we leave.",
      "We do not board during a mandatory evacuation order for this zone.",
    ],
  },
];
