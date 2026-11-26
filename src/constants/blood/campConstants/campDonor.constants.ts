import type { CampDonorFilter } from "../../../types/type/blood/campType/CampDonor.type";


// Same rule as the public Blood page
export const CAMP_DONATION_GAP_DAYS = 90

export const campDonorFilters: { value: CampDonorFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "eligible", label: "Eligible" },
  { value: "not-eligible", label: "Not eligible yet" },
]