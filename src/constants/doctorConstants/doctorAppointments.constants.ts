import { appointmentStatusStyles } from "./doctorDashboard.constants"
import type { AppointmentStatus } from "../../types/type/doctorType/DoctorDashboard.type"
import type { ActionTone, AppointmentAction, AppointmentTab } from "../../types/type/doctorType/DoctorAppointments.type"

// Value of the status filter that shows every status
export const ALL_STATUSES = "all"

export const appointmentTabs: AppointmentTab[] = [
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
]

// All 10 statuses, in the same order as the badge styles
export const appointmentStatusList = Object.keys(appointmentStatusStyles) as AppointmentStatus[]

const bookedActions: AppointmentAction[] = [
  { label: "Mark no-show", next: "no-show", tone: "neutral" },
  { label: "Cancel", next: "cancelled", tone: "danger" },
]

// Buttons shown for each status (empty = no action left)
export const appointmentActions: Record<AppointmentStatus, AppointmentAction[]> = {
  pending: [
    { label: "Approve", next: "confirmed", tone: "primary" },
    { label: "Reject", next: "rejected", tone: "danger" },
  ],
  "reschedule-requested": [
    { label: "Accept reschedule", next: "rescheduled", tone: "primary" },
    { label: "Decline", next: "confirmed", tone: "neutral" },
  ],
  confirmed: bookedActions,
  rescheduled: bookedActions,
  "checked-in": [],
  "in-consultation": [],
  completed: [],
  cancelled: [],
  rejected: [],
  "no-show": [],
}

export const actionToneClass: Record<ActionTone, string> = {
  primary: "bg-doctor-primary text-white hover:bg-doctor-primary-dark",
  danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  neutral: "border border-doctor-border bg-white text-doctor-navy hover:bg-doctor-bg",
}