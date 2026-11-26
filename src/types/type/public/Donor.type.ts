import type { BloodGroup } from "./Blood.type"

export type Donor = {
  id: string
  name: string // first name + initial only (privacy-safe)
  bloodGroup: BloodGroup
  city: string
  lastDonated: string | null // yyyy-mm-dd, null = first-time donor
  donations: number
}