/* ══════════════════════════════════════════════════
   ALL PAWS INN — Guest Policies
   Sourced from guidelines.txt, rebranded for the site footer.
   ══════════════════════════════════════════════════ */

export interface GuidelineSection {
  title: string
  body: string[]
}

export const guidelinesIntro =
  "At ALL PAWS INN your pet's health and safety is our #1 concern."

export const guidelineSections: GuidelineSection[] = [
  {
    title: 'Vaccinations & Requirements',
    body: [
      'ALL PAWS INN must have a formal vaccination record or receipt from a licensed veterinarian indicating that the vaccinations meet the ALL PAWS INN requirements listed below. No hand-written records or owner-administered vaccinations are acceptable. We may not be able to accept your pet if the required records are not received at least 24 hours prior to the pet’s arrival. The following vaccinations are required after the initial series of puppy or kitten shots:',
      'Dogs — RV (Rabies): Annual or 3-year, based on specific documentation by veterinarian.',
      'Dogs — DHPP: Annual after initial puppy series. Every 3 or 5 years thereafter.',
      'Dogs — BV (Bordetella or Canine Cough): Every 6 months.',
      'Dogs — CIV (Canine Influenza virus) H3N2/H3N8 (Bivalent): Annual after initial 2-part boosters. First booster must be given 10 days prior to arrival at ALL PAWS INN.',
      'Cats — RV (Rabies): Annual or 3-year, based on specific documentation by veterinarian.',
      'Cats — RCP (respiratory-distemper): Annual after initial kitten series. Every 3 years thereafter.',
      'Cats — Feline Leukemia: strongly recommended.',
    ],
  },
  {
    title: 'General Health',
    body: [
      'All pets must be in good general health to visit ALL PAWS INN. ALL PAWS INN will not accept diabetic pets, pets exhibiting signs of serious illness, pets with contagious viruses or parasites, or any pet we feel may need veterinary care or supervision. ALL PAWS INN is not staffed for skilled veterinary care, and may not be able to handle geriatric pets or other pets needing significant or special care. For their own safety, ALL PAWS INN will not accept pets in heat.',
    ],
  },
  {
    title: 'Parasites',
    body: [
      'All pets will be checked thoroughly for fleas and ticks. If any are found, that pet will be treated immediately, at the owner’s expense, before being allowed to enter the lodging area.',
    ],
  },
  {
    title: 'Behavioral Problems',
    body: [
      'Pets will not be accepted if they show signs of, or have a history of, aggressive behavior such as biting, snapping or lunging.',
    ],
  },
  {
    title: 'Minimum Age',
    body: ['Pets under the age of 4 months will not be accepted for lodging or daycare.'],
  },
  {
    title: 'Cat Lodging',
    body: ['Only cats that have been spayed or neutered are eligible to visit ALL PAWS INN.'],
  },
  {
    title: 'Personal Items',
    body: [
      'Please mark all items clearly with your pet’s name. We cannot be responsible for any item left with your pet.',
      'Treats/Food: We accept most foods and treats, preferably in disposable zip-lock bags. We do not accept rawhide products or items that may present a risk to your pet while lodging — such items are stored until pick-up.',
      'Medications: We can administer oral or topical medications, but not injections. Prescription medications should be provided in their original containers with clear written directions, kept separate from food. A medication fee of $5/day applies; special handling fees may apply for complex instructions.',
      'Bedding: Blankets and similar bedding are allowed. Beds or stuffed bedding that cannot be laundered on-site are discouraged.',
      'Crates: We do not allow crates in the pets’ enclosures — our staff must be able to easily observe and monitor pet health and behavior throughout the day.',
      'Toys: Maximum of 3 toys per pet. There is a possible risk of misplacing items due to daily sanitizing procedures. Personal food and water bowls will not be accepted.',
    ],
  },
  {
    title: 'Leash Policy',
    body: [
      'For the safety of our clients and their pets, all dogs must be on a leash and under control anywhere on ALL PAWS INN property where the public has access. Likewise, all cats must be in carriers when dropping off or picking up.',
    ],
  },
  {
    title: 'Boarding Policies',
    body: [
      'Accommodations: ALL PAWS INN reserves the right to re-assign pets to different accommodations if they become destructive, overly aggressive or disruptive. Only large breed dogs or multiple pets from the same family may occupy a large suite.',
      'Combining Non-Family Pets: For pet safety, ALL PAWS INN does not allow pets from different families to share a suite or condo. With the exception of our Dog Daycare Program, we do not arrange play between pets from different families.',
      'Access to Lodging Facility: ALL PAWS INN is happy to provide facility tours to prospective clients at any time. To keep a safe, low-stress environment for our pet guests, general customer access to the lodging facility is limited — on arrival and drop-off you may request to see your pet’s accommodations, but visits during a pet’s stay are not permitted. We’re always happy to share an update by phone or email.',
      'Medical Attention: In non-emergency situations we will contact the owner to discuss the recommended protocol. For emergencies requiring urgent care, we will transport the pet to our on-call veterinary clinic and then contact the owner.',
      'Deposits / Cancellation Policy: A deposit equal to 2 nights of lodging is required during weekends and holiday periods. Cancelling within 14 days of arrival, or not showing up, forfeits this deposit. No penalty applies for changes made with 14 days’ notice or more.',
      'Multi-Pet Family Discount: for families with multiple dogs, we offer 25% off the 2nd dog and 50% off the 3rd dog on the nightly boarding rate for family dogs sharing the same accommodation. Discount applies to the nightly room rate only.',
      'Damage Fee: No damage deposit is charged for luxury suites, however a modest fee will apply to cover repairs should any damage occur.',
      'Pet Photos/Videos: ALL PAWS INN may take photos and/or videos of your pet(s) while on our premises, and may use them for any commercial or non-commercial purpose.',
      'Right to Discontinue Services: ALL PAWS INN reserves the right to discontinue services and revoke privileges without notice if we determine a safety risk to your pet, our guests or team members.',
    ],
  },
]
