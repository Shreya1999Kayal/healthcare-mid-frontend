import type { LucideIcon } from "lucide-react"
import type { AdminApplicantRole } from "./AdminVerification.type"

export type AdminNavLink = {
  label: string
  section: string // URL part: /adminDashboard/<section>/:id
  icon: LucideIcon
  roles?: AdminApplicantRole[] // pending applications of these roles show as a badge
}

export type AdminStatusStyle = {
  label: string
  className: string
}

// Admin account (placeholder until login is built)
export type AdminAccount = {
  id: string
  name: string
  email: string
}
