import type { LucideIcon } from "lucide-react"

export type DonorNavLink = {
  label: string
  section: string // URL part: /donorDashboard/<section>/:id
  icon: LucideIcon
}

export type DonorStatusStyle = {
  label: string
  className: string
}