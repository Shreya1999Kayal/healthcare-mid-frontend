import type { LucideIcon } from "lucide-react"

// bloodBank = only its own blood details, bloodCamp = blood bank sections + camps and donors (step 2)
export type BloodBankRole = "bloodBank" | "bloodCamp"

export type BloodBankNavLink = {
  label: string
  section: string // URL part: /bloodDonationDashboard/<section>/:id
  icon: LucideIcon
  roles: BloodBankRole[] // roles that see this link
}

export type BloodBankStatusStyle = {
  label: string
  className: string
}

export type BloodBankNotificationType = "request" | "stock" | "review" | "system"

export type BloodBankNotification = {
  id: string
  type: BloodBankNotificationType
  message: string
  time: string
  unread: boolean
  link: string // section that opens when clicked
}

export type BloodBankNotificationFilter = "all" | "unread" | "read"