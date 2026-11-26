import { bloodGroups, hospitalBloodBanks, organisationBloodBanks } from "../../../constants/public/bloods.constants"
import { campOrganisers } from "../../../constants/public/campOrganisers.constants"
import { hospitalsList } from "../../../constants/public/hospital.constants"
import type { BankView, BloodBankItem } from "../../../types/type/public/Blood.type"
import type { Donor } from "../../../types/type/public/Donor.type"

const ELIGIBLE_AFTER_DAYS = 90
const DAY_IN_MS = 86_400_000

// "2026-12-06" -> local Date (adding the time avoids a one-day shift by time zone)
export const getCampDate = (iso: string) => new Date(`${iso}T00:00:00`)

export const formatCampDate = (iso: string) =>
  getCampDate(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

// A donor can donate again 90 days after the last donation
export const isEligibleDonor = (donor: Donor, today = new Date()) => {
  if (!donor.lastDonated) return true
  const days = (today.getTime() - getCampDate(donor.lastDonated).getTime()) / DAY_IN_MS
  return days >= ELIGIBLE_AFTER_DAYS
}

// Hospital banks take name, location and address from hospitalsList,
// so they always match the Hospitals page.
export const getBloodBanks = (view: BankView): BloodBankItem[] => {
  if (view === "organisation") return organisationBloodBanks

  return hospitalBloodBanks.flatMap((bank) => {
    const hospital = hospitalsList.find((item) => item.id === bank.hospitalId)
    if (!hospital) return []
    return [
      {
        id: `hospital-${hospital.id}`,
        name: `${hospital.name} Blood Bank`,
        location: hospital.location,
        address: hospital.address,
        phone: bank.phone,
        timings: bank.timings,
        availableGroups: bloodGroups.filter((group) => bank.stock[group] > 0),
        hospitalId: hospital.id,
      },
    ]
  })
}

export const getCampOrganiser = (organiserId: string) => campOrganisers.find((organiser) => organiser.id === organiserId)

export const getAverageRating = (ratings: number[]) =>
  ratings.length === 0 ? 0 : ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length