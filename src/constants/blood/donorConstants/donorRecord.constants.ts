import type { DonationPlaceType, DonationRecord, DonationRecordFilter } from "../../../types/type/blood/donorType/DonorRecord.type";


// Same rule as the public Blood page: donate again 90 days after the last donation
export const DONATION_GAP_DAYS = 90

export const placeTypeLabels: Record<DonationPlaceType, string> = {
  camp: "Blood camp",
  "blood-bank": "Blood bank",
}

export const recordFilters: { value: DonationRecordFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "received", label: "Received by a patient" },
  { value: "waiting", label: "Not used yet" },
]

// Placeholder data per donor id. hospitalId must match an id in hospitalsList.
export const donationRecords: Record<string, DonationRecord[]> = {
  d1: [
    {
      id: "dr1", donatedOn: "2026-03-10", place: "Seva City Hospital Blood Bank", placeType: "blood-bank", units: 1,
      recipient: { patient: "Arjun P.", hospitalId: "2", usedOn: "2026-03-14" },
    },
    {
      id: "dr2", donatedOn: "2025-12-07", place: "Winter Camp 2025, Seva City Hospital", placeType: "camp", units: 1,
      recipient: { patient: "Baby of Rina S.", hospitalId: "3", usedOn: "2025-12-10" },
    },
    {
      id: "dr3", donatedOn: "2025-08-03", place: "Heart Health Camp 2025, HeartCare Institute", placeType: "camp", units: 1,
      recipient: { patient: "Rohit D.", hospitalId: "5", usedOn: "2025-08-06" },
    },
    {
      id: "dr4", donatedOn: "2025-04-20", place: "Red Drop Blood Bank", placeType: "blood-bank", units: 1,
      recipient: { patient: "Meera B.", hospitalId: "1", usedOn: "2025-04-22" },
    },
  ],
  d8: [
    { id: "dr5", donatedOn: "2026-10-05", place: "Lifespring Voluntary Blood Bank", placeType: "blood-bank", units: 1, recipient: null },
    {
      id: "dr6", donatedOn: "2026-06-14", place: "World Blood Donor Day Camp, Seva City Hospital", placeType: "camp", units: 1,
      recipient: { patient: "Imran K.", hospitalId: "1", usedOn: "2026-06-17" },
    },
    {
      id: "dr7", donatedOn: "2026-02-12", place: "Freshers Donation Drive, City College", placeType: "camp", units: 1,
      recipient: { patient: "Priya D.", hospitalId: "6", usedOn: "2026-02-15" },
    },
  ],
}