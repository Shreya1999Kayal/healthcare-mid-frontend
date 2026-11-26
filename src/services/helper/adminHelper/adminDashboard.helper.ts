import { ADMIN_BASE_PATH } from "../../../constants/adminConstants/adminDashboard.constants"

// "doctorVerification" -> "/adminDashboard/doctorVerification"
export const adminPath = (section: string) => `${ADMIN_BASE_PATH}/${section}`

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// "2026-11-21" -> "21 Nov 2026", "" -> "—"
export const formatAdminDate = (iso: string) => {
  if (!iso) return "—"
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}

// "Seva Admin" -> "SA"
export const getAdminInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()
