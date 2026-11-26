import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { HospitalAmbulance, HospitalAppointment, HospitalBed, HospitalNotification } from "../../type/hospitalType/HospitalDashboard.type"
import type { HospitalAccount, VerificationDocuments, VerificationFormValues } from "../../type/hospitalType/HospitalVerification.type"

export interface HospitalOutletContext {
  hospital: HospitalAccount // current hospital (from :id) with the live verification
  notifications: HospitalNotification[]
  onMarkRead: (notificationId: string) => void
  onMarkAllRead: () => void
  onSubmitVerification: (details: VerificationFormValues, documents: VerificationDocuments) => void
}

export interface HospitalAvatarProps {
  name: string
  className?: string
}

export interface HospitalSidebarProps {
  hospital: HospitalAccount
}

export interface HospitalTopbarProps {
  hospital: HospitalAccount
  unread: number
}

export interface HospitalNavItemProps {
  label: string
  to: string
  icon: LucideIcon
  locked: boolean
  compact?: boolean
}

export interface HospitalSummaryCardProps {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export interface HospitalFormFieldProps {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}



export interface BedAvailabilityProps {
  beds: HospitalBed[]
}

export interface AmbulanceStatusListProps {
  ambulances: HospitalAmbulance[]
}

export interface TodayHospitalAppointmentsProps {
  appointments: HospitalAppointment[]
}

export interface HospitalRecentNotificationsProps {
  notifications: HospitalNotification[]
  hospitalId: string
}