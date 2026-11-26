import { ALL_CHAMBERS, DOCTOR_BASE_PATH } from "../../../constants/doctorConstants/doctorDashboard.constants"
import type { DashboardChamber } from "../../../types/type/doctorType/DoctorDashboard.type"


export const getChamberName = (chambers: DashboardChamber[], chamberId: string) =>
  chambers.find((chamber) => chamber.id === chamberId)?.hospital ?? "Unknown chamber"

// Keeps only the items of the selected chamber ("all" keeps everything)
export const filterByChamber = <T extends { chamberId: string }>(items: T[], chamberId: string) =>
  chamberId === ALL_CHAMBERS ? items : items.filter((item) => item.chamberId === chamberId)

export const getInitials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
// "2026-11-26" -> "26 Nov 2026"
export const formatIsoDate = (iso: string) => {
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}



// ("queue", "d1") -> "/doctorDashboard/queue/d1"
export const doctorPath = (section: string, doctorId: string) => `${DOCTOR_BASE_PATH}/${section}/${doctorId}`

// "/doctorDashboard/queue/d1" -> "queue"
export const getDoctorSection = (pathname: string) => pathname.split("/")[2] ?? ""