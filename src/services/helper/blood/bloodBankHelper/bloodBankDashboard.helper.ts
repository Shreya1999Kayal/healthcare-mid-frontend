import { hospitalsList } from "../../../../constants/public/hospital.constants"
import { BLOOD_BANK_BASE_PATH, bloodBankNavLinks } from "../../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import type { BloodBankRole } from "../../../../types/type/blood/bloodBankType/BloodBankDashboard.type"

// ("inventory", "bb1") -> "/bloodDonationDashboard/inventory/bb1"
export const bloodBankPath = (section: string, bankId: string) => `${BLOOD_BANK_BASE_PATH}/${section}/${bankId}`

// "/bloodDonationDashboard/inventory/bb1" -> "inventory"
export const getBloodBankSection = (pathname: string) => pathname.split("/")[2] ?? ""

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// "2026-11-23" -> "23 Nov 2026"
export const formatIsoDate = (iso: string) => {
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}

// "Red Drop Blood Bank" -> "RD"
export const getBloodBankInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

// Sidebar shows only the links of this role (same idea as the admin-only Category link)
export const getNavLinksForRole = (role: BloodBankRole) => bloodBankNavLinks.filter((link) => link.roles.includes(role))

// A section typed by hand in the URL that this role can't use -> false
export const isSectionForRole = (section: string, role: BloodBankRole) => {
  const link = bloodBankNavLinks.find((item) => item.section === section)
  return !link || link.roles.includes(role)
}

// Hospital names and locations come from hospitalsList, so they match the Hospitals page
export const getHospital = (hospitalId: string) => hospitalsList.find((hospital) => hospital.id === hospitalId)

export const getHospitalName = (hospitalId: string) => getHospital(hospitalId)?.name ?? "Unknown hospital"