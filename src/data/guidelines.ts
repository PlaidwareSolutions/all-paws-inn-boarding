/* ══════════════════════════════════════════════════
   ALL PAWS INN — Guest Policies
   Transcribed from "All Paws Inn — Guest Policies (Updated)".
   Keep the wording in step with that document; it is the source of truth.
   ══════════════════════════════════════════════════ */

export interface GuidelineSection {
  title: string
  body: string[]
}

export const guidelinesIntro =
  'At All Paws Inn, your pet’s health, safety, and comfort are our highest priorities. To ensure a safe and happy environment for all of our guests, we strictly enforce the following policies.'

export const guidelineSections: GuidelineSection[] = [
  {
    title: 'Hours of Operation, Check-In, and Check-Out',
    body: [
      'Daycare hours — Monday to Friday: 8:00 AM to 6:00 PM. Saturday: 9:00 AM to 5:00 PM. Sunday: closed.',
      'Boarding check-in — Monday to Friday from 2:30 PM to 5:30 PM, and Saturday from 2:30 PM to 4:30 PM.',
      'Boarding check-out — Monday to Friday from 9:00 AM to 12:00 PM, and Saturday from 10:00 AM to 12:00 PM. Sunday: closed.',
      'Early check-in / late check-out — Early drop-offs or late pick-ups will incur a half-day daycare charge.',
      'Any pet not picked up by closing time will automatically be boarded for the night at the owner’s expense, plus a late-handling fee.',
    ],
  },
  {
    title: 'Vaccinations & Wellness',
    body: [
      'For everyone’s health and safety, current veterinary vaccination records must be on file before daycare or boarding. Records should come from a licensed veterinarian; owner-administered or handwritten records may not be accepted. We recommend receiving records at least 24 hours before arrival so there are no surprises at check-in.',
      'Dogs — RV (Rabies): Annual or 3-year period, based on specific documentation by veterinarian.',
      'Dogs — DHPP: Annual after initial puppy series. Every 3 or 5 years thereafter.',
      'Dogs — BV (Bordetella or Canine Cough): Every 6 months.',
      'Dogs — CIV (Canine Influenza virus) H3N2/H3N8 (Bivalent): Annual after initial 2-part boosters. First booster must be given 10 days prior to arrival at All Paws Inn.',
      'Cats — RV (Rabies): Annual or 3-year, based on specific documentation by veterinarian.',
      'Cats — RCP (respiratory distemper): Annual after initial kitten series. Every 3 years thereafter.',
      'Cats — Feline Leukemia: strongly recommended.',
      'Pets must be in good general health when they arrive. We cannot accept pets showing signs of contagious illness, significant unexplained vomiting or diarrhea, active parasites, or other symptoms suggesting they may need veterinary care. All Paws Inn reserves the right to decline check-in or discontinue services if a pet appears ill or if accepting the pet could put that pet, other guests, or staff at risk.',
    ],
  },
  {
    title: 'Age, Heat Cycles & Special Medical Needs',
    body: [
      'The proposed minimum age for daycare, boarding and bathing is 4 months, subject to completion of the facility’s required vaccination schedule. Pets in heat will not be accepted for daycare or boarding.',
      'Because All Paws Inn is not a veterinary hospital, pets requiring skilled nursing, injections, intensive monitoring, or other complex medical care may need a veterinary boarding facility instead. Special needs and senior pets should be discussed with us before booking so we can determine whether we can safely meet their needs.',
    ],
  },
  {
    title: 'Meals, Food & Dietary Needs',
    body: [
      'A familiar meal can make being away from home much easier. Please bring enough of your pet’s current food for the entire stay and provide clear feeding instructions, including portions, schedule, allergies, sensitivities, and dietary restrictions. We recommend individual meals be portioned and clearly labeled with your pet’s name.',
      'Suddenly switching foods can upset a pet’s digestive system, so we want to keep your pet on the diet their body already knows. If your pet’s food is not provided or runs out, All Paws Inn will supply house food when necessary, and an additional fee will apply.',
      'Treats are welcome when safely packaged and labeled. Rawhide and other items staff considers a choking, obstruction, or safety risk will not be given during the stay.',
    ],
  },
  {
    title: 'Medications',
    body: [
      'We may administer eligible oral or topical medications according to written instructions. Prescription medication should arrive in its original labeled prescription container and should be packed separately from food. Medication administration fees apply according to the current Services & Pricing Guide; additional handling fees may apply for unusually complex medication routines.',
    ],
  },
  {
    title: 'Fleas, Ticks & Parasites',
    body: [
      'Please make sure your pet arrives free of fleas and ticks and is maintained on an appropriate parasite-prevention program. If fleas or ticks are discovered, your pet may be separated from other guests while we contact you. An appropriate treatment may be obtained or applied. The cost of treatment and any published service fee will be added to your account. A pet with a significant infestation or signs of contagious parasites may need to be picked up or transferred for veterinary care.',
    ],
  },
  {
    title: 'Bathing & Grooming',
    body: [
      'De-matting severely matted fur is painful and risky for pets. For their health and safety, All Paws Inn may shave or closely clip severe mats. We are not responsible for any skin irritation, nicks, or cuts caused by removing tight mats. Additional fees may apply for matted coat care or heavy de-shedding.',
    ],
  },
  {
    title: 'Temperament, Aggression & Group Play',
    body: [
      'Every guest deserves to feel safe. All Paws Inn reserves the right to refuse, separate, or discontinue services for a pet displaying aggression, biting, snapping, lunging, unsafe behavior, extreme distress, or behavior staff reasonably believes could endanger the pet, another animal, or a team member.',
      'Dogs participating in group daycare may be required to complete a temperament evaluation. Group-play privileges may be modified or discontinued at any time if a dog’s behavior or comfort level changes. Boarding pets from different households will not share sleeping accommodations. Same-household pets may share only when staff determines that doing so is safe and appropriate.',
    ],
  },
  {
    title: 'Leashes, Carriers & Safe Arrivals',
    body: [
      'For everyone’s safety, dogs must arrive and leave on a secure leash and remain under control in all public areas of the property. Cats must arrive and leave in a secure carrier. Please do not allow pets to greet unfamiliar animals in the lobby, parking area, or other transition spaces unless directed by staff.',
    ],
  },
  {
    title: 'Personal Belongings, Bedding & Toys',
    body: [
      'You’re welcome to send a few familiar comforts from home. Please clearly label belongings with your pet’s name. Washable blankets or similar bedding are preferred; oversized or non-washable beds may be declined if they cannot be safely cleaned with our equipment. Dog crates are not placed inside boarding accommodation because staff must be able to clearly observe each guest.',
      'Please limit toys to three per pet. For sanitation and safety, personal food and water bowls may be declined. While we will take reasonable care of belongings, items can occasionally be damaged or misplaced during cleaning, play, or normal boarding activity, so please leave irreplaceable items at home.',
    ],
  },
  {
    title: 'Accommodation & Same-Household Pets',
    body: [
      'We want every pet to be comfortable in the space chosen for them. All Paws Inn may move a guest to another suitable accommodation if the original space becomes unsafe or inappropriate because of behavior, stress, destructive activity, sanitation needs, or another welfare concern. Shared-room discounts apply only to compatible pets from the same household that can safely stay together.',
    ],
  },
  {
    title: 'During Your Pet’s Stay',
    body: [
      'We know you may miss your best friend! To help keep the lodging environment calm and predictable, in-person visits during a boarding stay may be limited. We’re happy to help you stay connected with updates about how your pet is settling in. Optional photo updates may also be available through our Services & Pricing Guide.',
    ],
  },
  {
    title: 'Illness, Injury & Emergency Veterinary Care',
    body: [
      'Your pet’s safety comes first. Before a stay, please provide your current contact information, an alternate emergency contact, your regular veterinarian’s information, and important medical history.',
      'If your pet becomes ill or injured, we will make every reasonable effort to contact you or your designated emergency contact immediately. For non-emergency concerns (such as persistent digestive issues or a loss of appetite), we will reach out to discuss next steps. If our staff believes your pet requires urgent veterinary care and delaying treatment puts them at risk, we will transport your pet to your designated clinic or the nearest emergency veterinary hospital. You will be responsible for all incurred costs, including veterinary care, medications, diagnostics, treatments, and transportation.',
    ],
  },
  {
    title: 'Damage to Accommodations',
    body: [
      'Normal wear is part of caring for pets, and no routine damage deposit is proposed. However, if a pet causes unusual or significant damage to an accommodation or facility property beyond normal use, a reasonable repair or replacement charge may be added to the account. Any such charge should be documented and communicated to the pet parent.',
    ],
  },
  {
    title: 'Deposits, Cancellations, Holiday & Peak Periods',
    body: [
      'All Paws Inn requires a deposit equal to 2 nights of lodging in the selected accommodation during Holiday and Peak Periods. Customers who cancel within 14 days of their arrival date or do not show up for their reservation will forfeit this deposit. There is no penalty for canceling or changing a reservation (subject to availability) as long as 14 days’ advance notice is provided.',
      'For any reduction in the length of a reservation impacting a major holiday (Spring Break, Memorial Day weekend, Independence Day weekend, Labor Day weekend, Thanksgiving, Christmas, and New Year’s) within 14 days of the reservation start date, a penalty fee will be assessed equaling two nights of lodging or the number of nights being reduced, whichever is less.',
      'A $10 per pet, per night Holiday / Peak Boarding Fee is added to regular overnight boarding rates during designated high-demand periods. These may include Spring Break, Memorial Day weekend, Independence Day weekend, Labor Day weekend, Thanksgiving, Christmas, and New Year’s. All Paws Inn will communicate the exact applicable dates when reservations are made.',
      'For non-peak periods, no deposit is required. Customers who repeatedly cancel reservations (with or without 14 days’ notice) may be required to provide a non-refundable deposit equal to 2 days of lodging for each future reservation.',
    ],
  },
  {
    title: 'Photos & Videos',
    body: [
      'All Paws Inn may take photos and/or videos of your pet(s) while on our premises. By bringing your pet(s) to All Paws Inn, you hereby grant All Paws Inn a perpetual, irrevocable, royalty-free right and license to publish, distribute, adapt, modify or otherwise use the photos and/or videos, or any portions thereof, in any manner for any commercial or non-commercial purpose without your notice, review or approval.',
    ],
  },
  {
    title: 'Right to Refuse or Discontinue Services',
    body: [
      'All Paws Inn reserves the right to refuse admission, modify participation, require early pickup, or discontinue services when staff reasonably determines that continuing care presents health, safety, welfare, or significant behavioral risk to the pet, other guests, or team members. Whenever practical, we will communicate concerns with the pet parent and work toward the safest next step.',
    ],
  },
]
