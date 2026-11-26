import { DONOR_BASE_PATH } from "../../../../constants/blood/donorConstants/donorDashboard.constants"
import { hospitalsList } from "../../../../constants/public/hospital.constants"


// ("records", "d1") -> "/donorDashboard/records/d1"
export const donorPath = (section: string, donorId: string) => `${DONOR_BASE_PATH}/${section}/${donorId}`

// "/donorDashboard/records/d1" -> "records"
export const getDonorSection = (pathname: string) => pathname.split("/")[2] ?? ""

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// "2026-11-24" -> "24 Nov 2026"
export const formatDonorDate = (iso: string) => {
  if (!iso) return "—"
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}

// "Rahul Sen" -> "RS"
export const getDonorInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

// Hospital name and location come from hospitalsList, so they match the Hospitals page
export const getDonorHospital = (hospitalId: string) => hospitalsList.find((hospital) => hospital.id === hospitalId)