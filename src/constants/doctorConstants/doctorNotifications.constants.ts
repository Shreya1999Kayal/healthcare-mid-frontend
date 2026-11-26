import { BellRing, CalendarClock, CalendarPlus, CalendarX, UserRoundCheck } from "lucide-react"
import type { DoctorNotificationType } from "../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorTabOption } from "../../types/type/doctorType/DoctorAppointments.type"
import type { NotificationReadFilter, NotificationTypeStyle } from "../../types/type/doctorType/DoctorNotifications.type"

// Value of the type filter that shows every type
export const ALL_TYPES = "all"

export const notificationReadTabs: DoctorTabOption<NotificationReadFilter>[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
]

export const notificationTypeStyles: Record<DoctorNotificationType, NotificationTypeStyle> = {
  appointment: { label: "New appointment", icon: CalendarPlus, className: "bg-doctor-bg-soft text-doctor-primary-dark" },
  "check-in": { label: "Check-in", icon: UserRoundCheck, className: "bg-sky-50 text-sky-700" },
  cancellation: { label: "Cancellation", icon: CalendarX, className: "bg-red-50 text-red-600" },
  reschedule: { label: "Reschedule request", icon: CalendarClock, className: "bg-orange-50 text-orange-700" },
  reminder: { label: "Reminder", icon: BellRing, className: "bg-violet-50 text-violet-700" },
}

export const notificationTypeList = Object.keys(notificationTypeStyles) as DoctorNotificationType[]