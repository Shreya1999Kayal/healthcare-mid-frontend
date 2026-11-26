import type { ReactNode } from "react"
import type { AdminStatusStyle } from "../../type/adminType/AdminDashboard.type"
import type { AdminFilterOption } from "../../type/adminType/AdminManagement.type"
import type { AdminDetail } from "../../type/adminType/AdminVerification.type"

export interface AdminPageHeaderProps {
  title: string
  subtitle: string
}

export interface AdminMessageProps {
  message: string
}

export interface AdminStatusBadgeProps {
  style: AdminStatusStyle
}

// One select in the filter bar
export interface AdminFilter {
  label: string // text of the "All ..." option
  value: string
  options: AdminFilterOption[]
  onChange: (value: string) => void
}

export interface AdminFilterBarProps {
  search: string
  onSearch: (value: string) => void
  placeholder: string
  filters: AdminFilter[]
}

export interface AdminTableProps {
  headers: string[]
  isEmpty: boolean
  children: ReactNode
}

export interface AdminInfoModalProps {
  title: string
  subtitle: string
  details: AdminDetail[]
  onClose: () => void
}

export interface AdminRejectModalProps {
  title: string
  onReject: (reason: string) => void
  onClose: () => void
}
