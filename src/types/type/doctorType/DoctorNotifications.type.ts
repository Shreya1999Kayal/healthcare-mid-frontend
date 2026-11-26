import type { LucideIcon } from "lucide-react"
import type { DoctorNotificationType } from "./DoctorDashboard.type"

export type NotificationReadFilter = "all" | "unread"
export type NotificationTypeFilter = DoctorNotificationType | "all"

export type NotificationTypeStyle = {
  label: string
  icon: LucideIcon
  className: string
}