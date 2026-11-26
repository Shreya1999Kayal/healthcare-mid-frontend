import { AlertTriangle, Droplet, Info, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { BloodBankNotificationFilter, BloodBankNotificationType } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"

export const bloodBankNotificationFilters: { value: BloodBankNotificationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
]

export const notificationTypeStyles: Record<BloodBankNotificationType, { label: string; className: string; icon: LucideIcon }> = {
  request: { label: "Request", className: "bg-red-50 text-red-600", icon: Droplet },
  stock: { label: "Stock", className: "bg-amber-50 text-amber-700", icon: AlertTriangle },
  review: { label: "Review", className: "bg-yellow-50 text-yellow-700", icon: Star },
  system: { label: "System", className: "bg-slate-100 text-slate-600", icon: Info },
}