import { BedDouble, CalendarCheck, Droplet, Info, Siren } from "lucide-react"
import type { HospitalNotificationType } from "../../types/type/hospitalType/HospitalDashboard.type"
import type { HospitalNotificationFilter, NotificationTypeStyle } from "../../types/type/hospitalType/HospitalNotification.type"

export const notificationTypeStyles: Record<HospitalNotificationType, NotificationTypeStyle> = {
  emergency: { label: "Emergency", icon: Siren, className: "bg-red-50 text-red-600" },
  appointment: { label: "Appointments", icon: CalendarCheck, className: "bg-hospital-bg-soft text-hospital-primary-dark" },
  bed: { label: "Beds", icon: BedDouble, className: "bg-amber-50 text-amber-700" },
  blood: { label: "Blood", icon: Droplet, className: "bg-rose-50 text-rose-600" },
  system: { label: "System", icon: Info, className: "bg-slate-100 text-slate-600" },
}

const typeFilters = (Object.keys(notificationTypeStyles) as HospitalNotificationType[]).map((type) => ({
  value: type as HospitalNotificationFilter,
  label: notificationTypeStyles[type].label,
}))

export const hospitalNotificationFilters: { value: HospitalNotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  ...typeFilters,
]