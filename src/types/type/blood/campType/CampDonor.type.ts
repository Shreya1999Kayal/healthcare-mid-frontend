import type { Donor } from "../../public/Donor.type"


export type CampDonorFilter = "all" | "eligible" | "not-eligible"

// A donor from donorsList with the 90-day eligibility worked out
export type CampDonorRow = Donor & {
  eligible: boolean
  nextEligibleOn: string | null
}