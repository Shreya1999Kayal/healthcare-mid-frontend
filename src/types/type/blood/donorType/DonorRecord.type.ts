export type DonationPlaceType = "camp" | "blood-bank"

// Who got the blood; null = still in the blood bank
export type DonationRecipient = {
  patient: string // first name + initial only (privacy-safe)
  hospitalId: string // id from hospitalsList
  usedOn: string // yyyy-mm-dd
}

export type DonationRecord = {
  id: string
  donatedOn: string // yyyy-mm-dd
  place: string // camp or blood bank name
  placeType: DonationPlaceType
  units: number
  recipient: DonationRecipient | null
}

export type DonationRecordFilter = "all" | "received" | "waiting"

export type DonorEligibility = {
  lastDonated: string | null
  eligible: boolean
  nextEligibleOn: string | null
  daysLeft: number
}
