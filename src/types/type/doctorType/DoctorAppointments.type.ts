import type { AppointmentDay, AppointmentStatus } from "./DoctorDashboard.type"

export type AppointmentStatusFilter = AppointmentStatus | "all"
export type ActionTone = "primary" | "danger" | "neutral"

export type AppointmentAction = {
  label: string
  next: AppointmentStatus // status the appointment moves to
  tone: ActionTone
}

export type DoctorTabOption<T extends string> = {
  id: T
  label: string
  count?: number
}

export type AppointmentTab = DoctorTabOption<AppointmentDay>