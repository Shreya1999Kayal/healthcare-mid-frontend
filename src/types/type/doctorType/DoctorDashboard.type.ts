import type { LucideIcon } from "lucide-react"

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "reschedule-requested"
  | "rescheduled"
  | "checked-in"
  | "in-consultation"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no-show"

export type AppointmentDay = "today" | "upcoming" | "past"
export type ConsultationMode = "In-person" | "Online"
export type DoctorNotificationType = "appointment" | "check-in" | "cancellation" | "reschedule" | "reminder"



export type DoctorSelf = {
  name: string
  speciality: string
  image: string
  registrationNo: string
  rating: number
  reviewsCount: number
}

export type DashboardChamber = {
  id: string
  hospital: string
  patients: number // total patients seen at this chamber
}

export type DoctorAppointment = {
  id: string
  patientId: string // must match an id in doctorPatients
  patient: string
  age: number
  gender: "M" | "F"
  chamberId: string // must match an id in doctorChambers
  day: AppointmentDay
  date: string
  time: string
  mode: ConsultationMode
  status: AppointmentStatus
  reason: string
}

export type WeeklyPoint = {
  day: string
  appointments: number
}
export type DoctorNotification = {
  id: string
  type: DoctorNotificationType
  message: string
  time: string
  unread: boolean
  link: string // section that opens when clicked, e.g. "queue"
}

export type DoctorNavLink = {
  label: string
  section: string // URL part: /doctorDashboard/<section>/:id
  icon: LucideIcon
}

export type StatusStyle = {
  label: string
  className: string
}

