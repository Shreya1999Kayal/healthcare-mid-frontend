import { HOSPITAL_BASE_PATH } from "../../../constants/hospitalConstants/hospitalDashboard.constants"

// ("beds", "h1") -> "/hospitalDashboard/beds/h1"
export const hospitalPath = (section: string, hospitalId: string) => `${HOSPITAL_BASE_PATH}/${section}/${hospitalId}`

// "/hospitalDashboard/beds/h1" -> "beds"
export const getHospitalSection = (pathname: string) => pathname.split("/")[2] ?? ""

// "2026-11-21" -> "21 Nov 2026"
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// "2026-11-21" -> "21 Nov 2026"
export const formatIsoDate = (iso: string) => {
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}

// "Seva City Hospital" -> "SC"
export const getHospitalInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()