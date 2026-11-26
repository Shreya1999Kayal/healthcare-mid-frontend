import type { LucideIcon } from "lucide-react"
import type { HospitalNotificationType } from "./HospitalDashboard.type"

// Tabs on the Notifications page
export type HospitalNotificationFilter = "all" | "unread" | HospitalNotificationType

export type NotificationTypeStyle = {
  label: string
  icon: LucideIcon
  className: string // icon circle colours
}