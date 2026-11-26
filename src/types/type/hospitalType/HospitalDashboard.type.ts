import type { LucideIcon } from "lucide-react"

export type HospitalNavLink = {
  label: string
  section: string // URL part: /hospitalDashboard/<section>/:id
  icon: LucideIcon
}

export type HospitalStatusStyle = {
  label: string
  className: string
}

export type HospitalBed = {
  id: string
  type: string // General, ICU, Private ...
  total: number
  occupied: number
}

export type AmbulanceStatus = "available" | "on-duty" | "maintenance"

export type HospitalAmbulance = {
  id: string
  vehicleNo: string
  driver: string
  type: string
  status: AmbulanceStatus
}

export type HospitalAppointmentStatus = "pending" | "confirmed" | "checked-in" | "completed" | "cancelled"

export type HospitalAppointment = {
  id: string
  patient: string
  doctor: string
  department: string
  time: string
  status: HospitalAppointmentStatus
}

export type HospitalNotificationType = "appointment" | "emergency" | "blood" | "bed" | "system"

export type HospitalNotification = {
  id: string
  type: HospitalNotificationType
  message: string
  time: string
  unread: boolean
  link: string // section that opens when clicked, e.g. "beds"
}