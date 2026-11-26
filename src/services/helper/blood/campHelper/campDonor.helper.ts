import { CAMP_DONATION_GAP_DAYS } from "../../../../constants/blood/campConstants/campDonor.constants"
import { ALL_GROUPS } from "../../../../constants/public/bloods.constants"
import type { CampDonorFilter, CampDonorRow } from "../../../../types/type/blood/campType/CampDonor.type"
import type { Donor } from "../../../../types/type/public/Donor.type"
import { getCampDate, isEligibleDonor } from "../../public/blood.helper"

// Date -> "2026-11-23"
const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

// Last donation + 90 days; null for a first-time donor
export const getCampNextEligibleDate = (lastDonated: string | null) => {
  if (!lastDonated) return null
  const next = getCampDate(lastDonated)
  next.setDate(next.getDate() + CAMP_DONATION_GAP_DAYS)
  return toIso(next)
}

// Uses the public isEligibleDonor, so the rule matches the Blood page
export const buildCampDonorRows = (donors: Donor[], today: string): CampDonorRow[] =>
  donors.map((donor) => ({
    ...donor,
    eligible: isEligibleDonor(donor, getCampDate(today)),
    nextEligibleOn: getCampNextEligibleDate(donor.lastDonated),
  }))

// Search by name or city, plus blood group
export const searchCampDonors = (rows: CampDonorRow[], search: string, group: string) => {
  const text = search.trim().toLowerCase()

  return rows.filter(
    (row) =>
      (!text || row.name.toLowerCase().includes(text) || row.city.toLowerCase().includes(text)) &&
      (group === ALL_GROUPS || row.bloodGroup === group),
  )
}

export const filterCampDonors = (rows: CampDonorRow[], filter: CampDonorFilter) => {
  if (filter === "eligible") return rows.filter((row) => row.eligible)
  if (filter === "not-eligible") return rows.filter((row) => !row.eligible)
  return rows
}

export const validateCampDonationDate = (date: string, donor: CampDonorRow, today: string) => {
  if (!date) return "Choose the donation date"
  if (date > today) return "The date can't be in the future"
  if (donor.lastDonated && date <= donor.lastDonated) return "The date must be after the last donation"
  if (donor.nextEligibleOn && date < donor.nextEligibleOn) return `This donor can donate again from ${donor.nextEligibleOn}`
  return ""
}