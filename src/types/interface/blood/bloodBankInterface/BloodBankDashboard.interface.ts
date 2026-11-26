import type { ChangeEvent, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { BloodGroup, BloodStock } from "../../../type/public/Blood.type"
import type { BloodBankNavLink, BloodBankNotification, BloodBankStatusStyle } from "../../../type/blood/bloodBankType/BloodBankDashboard.type"
import type { BloodBankRequest } from "../../../type/blood/bloodBankType/BloodBankRequest.type"
import type {
  BloodBankAccount,
  BloodBankDocuments,
  BloodBankField,
  BloodBankVerificationValues,
  VerificationStatus,
} from "../../../type/blood/bloodBankType/BloodBankVerification.type"

export interface BloodBankOutletContext {
  bank: BloodBankAccount // current blood bank (from :id) with the live verification
  notifications: BloodBankNotification[]
  stock: BloodStock
  requests: BloodBankRequest[]
  lowStockLimit: number
  onMarkRead: (notificationId: string) => void
  onMarkAllRead: () => void
  onSubmitVerification: (details: BloodBankVerificationValues, documents: BloodBankDocuments) => void
  onUpdateStock: (group: BloodGroup, units: number) => void
  onAcceptRequest: (requestId: string) => void
  onRejectRequest: (requestId: string, reason: string) => void
  onDeliverRequest: (requestId: string) => void
  onChangeLowStockLimit: (limit: number) => void
}

export interface BloodBankAvatarProps {
  name: string
  className?: string
}

export interface BloodBankSidebarProps {
  bank: BloodBankAccount
  navLinks: BloodBankNavLink[]
}

export interface BloodBankTopbarProps {
  bank: BloodBankAccount
  unread: number
}

export interface BloodBankNavItemProps {
  label: string
  to: string
  icon: LucideIcon
  locked: boolean
  compact?: boolean
}

export interface BloodBankSummaryCardProps {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export interface BloodBankBadgeProps {
  style: BloodBankStatusStyle
}

export interface BloodBankFormFieldProps {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}

export interface BloodBankFieldInputProps<T extends string> {
  field: BloodBankField<T>
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export interface BloodBankFilterOption<T extends string> {
  value: T
  label: string
  count?: number
}

export interface BloodBankFilterTabsProps<T extends string> {
  options: BloodBankFilterOption<T>[]
  value: T
  onChange: (value: T) => void
}

export interface BloodBankEmptyStateProps {
  title: string
  message: string
}

export interface BloodBankLockedSectionProps {
  bankId: string
  status: VerificationStatus
}

export interface BloodBankNotificationItemProps {
  notification: BloodBankNotification
  bankId: string
  onMarkRead: (notificationId: string) => void
}

export interface BloodBankRecentNotificationsProps {
  notifications: BloodBankNotification[]
  bankId: string
}