import { site, houses } from "@/lib/site";

export const vaccineRequirements = {
  dog: [
    { name: "Rabies", detail: "Current, administered by a veterinarian." },
    { name: "DHPP", detail: "Distemper, hepatitis, parainfluenza, parvovirus." },
    { name: "Bordetella", detail: "Within the last six months, not twelve." },
    { name: "Canine influenza", detail: "H3N2 and H3N8. Required year round on the Gulf Coast." },
  ],
  cat: [
    { name: "Rabies", detail: "Current, administered by a veterinarian." },
    { name: "FVRCP", detail: "Rhinotracheitis, calicivirus, panleukopenia." },
    { name: "FeLV", detail: "Required for cats with any outdoor access." },
  ],
  also: [
    "Heartworm prevention current — mosquitoes here do not have an off-season, and this is not optional.",
    "Flea and tick prevention current, year round rather than seasonally.",
    "Spayed or neutered if over seven months old.",
    "Records sent to us at least 48 hours before arrival, or brought to the meet and greet.",
  ],
};

export type CarePillar = { title: string; body: string; facts: Array<{ label: string; value: string }> };

export const carePillars: CarePillar[] = [
  {
    title: "Who is actually here",
    body:
      "Staff work overnight in shifts, not a night check and not a camera feed watched from a phone. Somebody is " +
      "awake and in the building every night of the year, and walks both wings at two in the morning because that " +
      "is when an animal in trouble is usually found.",
    facts: [
      { label: "The Lodge", value: houses.barn.headline },
      { label: "The Cattery", value: "Two dedicated caregivers" },
      { label: "Overnight", value: "Staffed, every night" },
      { label: "Holidays", value: "Fully staffed, no exceptions" },
    ],
  },
  {
    title: "What they are trained in",
    body:
      "Every caregiver holds Pet First Aid and CPR before they work an unsupervised shift. The Lodge team is Fear " +
      "Free certified and the Cattery team holds the separate Fear Free Feline certification — cat stress signals " +
      "are not dog stress signals, and staff who cannot read them do harm without meaning to.",
    facts: [
      { label: "Pet CPR & First Aid", value: "All caregivers, renewed every two years" },
      { label: "Fear Free certified", value: "All caregivers" },
      { label: "Fear Free Feline", value: "The full Cattery team" },
      { label: "Licensed vet techs", value: "Two on staff" },
    ],
  },
  {
    title: "If something goes wrong",
    body:
      `${site.vetName} is ${site.vetDistanceMinutes} minutes away and holds our animals on file. We call them ` +
      "before we call you if the situation is urgent, and we call you immediately afterward. You are never billed " +
      "for a transport decision we made.",
    facts: [
      { label: "Veterinary partner", value: site.vetName },
      { label: "Distance", value: `${site.vetDistanceMinutes} minutes` },
      { label: "After hours", value: "On-call, 24 hours" },
      { label: "Transport fee", value: "None, ever" },
    ],
  },
  {
    title: "How the suite is kept",
    body:
      "Sealed poured floors with no grout lines, because grout is where things live. Air is exchanged mechanically " +
      "six times an hour and filtered on the way through — and the two wings are on entirely separate air handlers, " +
      "so the Cattery never breathes the Lodge's air. Nothing is fogged or ozoned while animals are in the room.",
    facts: [
      { label: "Air changes", value: "6 per hour, filtered" },
      { label: "Ventilation", value: "Separate air handler per wing" },
      { label: "Floors", value: "Sealed, seamless, no grout" },
      { label: "Common areas", value: "Cleaned three times daily" },
    ],
  },
  {
    title: "The Cattery, specifically",
    body:
      "It is across the suite from the Lodge, behind its own locked door and its own air handler. No dog has ever " +
      "been inside it and none ever will be. Cats are never housed within sight of a cat from another household, " +
      "every room has a covered box to disappear into, and trays are stripped and replaced rather than scooped.",
    facts: [
      { label: "Dogs on site", value: "None, ever" },
      { label: "From the Lodge", value: "Across the suite, own locked door" },
      { label: "Line of sight", value: "No cat sees an unrelated cat" },
      { label: "Litter", value: "Your brand, or ours — stripped daily" },
    ],
  },
  {
    title: "Storms and flooding",
    body:
      "This is the Texas Gulf Coast, close enough to the Bay that hurricane season isn't optional to plan for. " +
      "There is a whole-suite backup generator, battery backup for climate control and the cameras through short " +
      "outages, and a written evacuation plan with a named destination inland — not an intention to work something " +
      "out.",
    facts: [
      { label: "Generator", value: "Whole-suite, tested monthly" },
      { label: "Backup power", value: "UPS for climate control and cameras" },
      { label: "Reserve", value: "72 hours, food and water" },
      { label: "Evacuation", value: "Written plan, named destination" },
    ],
  },
];

export const stormProtocol = [
  { when: "Watch issued", what: "We ring every owner with an animal in the building, before the news does. Reserves and generator checked." },
  { when: "Warning issued", what: "Intake closes. Owners inside a two-hour drive are offered early collection at no charge." },
  { when: "If we evacuate", what: "Both wings move together to our partner facility in Conroe, about forty miles north. Every animal is chipped, photographed and logged out." },
  { when: "Through the storm", what: "Two caregivers stay with the animals. We post to the guest portal every four hours while the network holds, and by SMS when it does not." },
  { when: "After", what: "You get a written account of your animal's storm — what they did, what they ate, how they handled it." },
];

export const heatProtocol = [
  { when: "Above 90°F", what: "Yard sessions move to before ten and after six. Midday is indoors, and that is not negotiable by request." },
  { when: "Above 95°F", what: "Turnouts shorten to fifteen minutes, a misting fan runs in the yard, and the kiddie pool stays out." },
  { when: "All summer", what: "Water in three places in the yard, cooling mats in every room, and no dog walked on the parking-lot asphalt after eleven." },
  { when: "Flat-faced breeds", what: "Frenchies, pugs and bulldogs go out early and late only, whatever the thermometer says. We would rather bore them than risk them." },
];

export const cleaningSchedule = [
  { when: "Between every guest", what: "Room stripped to bare surfaces, disinfected, bedding laundered at 60°C." },
  { when: "Three times daily", what: "All corridors, yards, water stations and both lobbies." },
  { when: "Daily", what: "Every occupied room spot-cleaned; bedding changed or laundered. Cattery trays stripped and replaced, not scooped." },
  { when: "Weekly", what: "Yard substrate turned and treated; toy inventory washed and inspected; catio screens checked." },
  { when: "Monthly", what: "Ventilation filters replaced on both systems; drains cleared; generator tested; full building audit." },
];

export const playgroupRules = [
  {
    title: "Assessed before they play",
    body: "Every dog does a meet and greet before a first overnight stay. It is not a formality and dogs do fail it.",
  },
  {
    title: "Matched on play style, not breed",
    body: "Wrestlers with wrestlers, chasers with chasers. A gentle 70-pound dog goes in with gentle dogs, whatever the scale says.",
  },
  {
    title: "Capped at eight",
    body: "Two caregivers inside the fence with them for groups above five. Nobody supervises from the gate.",
  },
  {
    title: "Nobody has to join",
    body: "Plenty of dogs are happier not in a group. They get solo walks and scent work instead, at no extra cost.",
  },
];

/** The Cattery equivalent. Cats are not grouped at all, and the reason matters. */
export const catteryRules = [
  {
    title: "Cats are never grouped",
    body: "There is no cat equivalent of a playgroup here, because there is no such thing as a well-run one. Cats from different households never meet.",
  },
  {
    title: "Out of sight of each other",
    body: "Rooms are arranged so no cat can see an unrelated cat. Most cattery stress is territorial, and territory is about sightlines.",
  },
  {
    title: "Somewhere to disappear",
    body: "Every room has a covered box. A cat that hides is not a cat that is doing badly — it is a cat using the thing we provided.",
  },
  {
    title: "Handled less, not more",
    body: "Most cats want a quiet room and their own routine, not company. We offer contact daily and we do not insist on it.",
  },
];

export const firstStay = [
  {
    step: "01",
    title: "Come and look around",
    body: "A meet and greet takes about forty minutes. Your dog spends part of it with a small group while you watch, and you see every room they could stay in. Free, and no pressure at the end of it. Cats do not need one — a second journey is worse for them than none.",
  },
  {
    step: "02",
    title: "Send the paperwork",
    body: "Vaccination records, heartworm and flea prevention, your vet's details, feeding and medication instructions. Emailed, or handed over at the meet and greet — we do not ask anyone to print or fax anything.",
  },
  {
    step: "03",
    title: "Book the first stay",
    body: "We suggest one or two nights before a long trip, so their first time away is not also their longest. Most people do this. A few do not, and it is usually fine.",
  },
];

export const packingList = [
  { item: "Their food, portioned if you can", required: true, note: "Enough for the stay plus two days. Changing food on arrival upsets stomachs." },
  { item: "Medication in the original packaging", required: true, note: "With the label. We cannot give anything from an unlabelled container." },
  { item: "Vaccination and prevention records", required: true, note: "Including heartworm and flea. If we do not already hold them." },
  { item: "Your vet's name and number", required: true, note: "And a second contact who can make a decision if we cannot reach you." },
  { item: "One thing that smells like home", required: false, note: "A T-shirt is better than a toy. It does not need washing first — that is the point." },
  { item: "Their own bed or blanket", required: false, note: "We have beds. Some animals want theirs." },
  { item: "Your usual litter, for cats", required: false, note: "We stock a clumping unscented clay. Cats with strong opinions should bring theirs." },
  { item: "A worn collar with tags", required: false, note: "We use our own slip leads in the yard." },
];
