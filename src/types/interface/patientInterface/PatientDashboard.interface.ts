import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type {
  PatientAccount,
  PatientNotification,
  PatientProfileValues,
  PatientStatusStyle,
} from "../../type/patientType/PatientDashboard.type"
import type {
  PatientAppointment,
  PatientBloodRequest,
  PatientBloodRequestValues,
  PatientBookingValues,
  PatientFavorite,
  PatientPrescription,
  PatientRecordValues,
  PatientReviewOption,
  PatientReviewValues,
} from "../../type/patientType/PatientCare.type"

export interface PatientOutletContext {
  patient: PatientAccount // current patient (from :id) with the live profile
  appointments: PatientAppointment[]
  bloodRequests: PatientBloodRequest[]
  favorites: PatientFavorite[]
  notifications: PatientNotification[]
  onSaveProfile: (profile: PatientProfileValues) => void
  onBookAppointment: (values: PatientBookingValues) => void
  onRescheduleAppointment: (appointmentId: string, values: PatientBookingValues) => void
  onCancelAppointment: (appointmentId: string) => void
  onRequestBlood: (values: PatientBloodRequestValues) => void
  onCancelBloodRequest: (requestId: string) => void
  onRemoveFavorite: (favoriteId: string) => void
  onMarkRead: (notificationId: string) => void
  onMarkAllRead: () => void
}

export interface PatientSidebarProps {
  patient: PatientAccount
}

export interface PatientTopbarProps {
  patient: PatientAccount
  unread: number
}

export interface PatientNavItemProps {
  label: string
  to: string
  icon: LucideIcon
  compact?: boolean
}

export interface PatientAvatarProps {
  name: string
  className?: string
}

export interface PatientSummaryCardProps {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export interface PatientStatusBadgeProps {
  style: PatientStatusStyle
}

export interface PatientFormFieldProps {
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export interface PatientBookingFormProps {
  title: string
  appointments: PatientAppointment[] // used to stop double booking of a slot
  initial?: PatientBookingValues
  editingId?: string // set when rescheduling
  lockDoctor?: boolean
  onSave: (values: PatientBookingValues) => void
  onCancel: () => void
}

export interface PatientBloodRequestFormProps {
  onSave: (values: PatientBloodRequestValues) => void
  onCancel: () => void
}

export interface PatientRecordFormProps {
  onSave: (values: PatientRecordValues) => void
  onCancel: () => void
}

export interface PatientReviewFormProps {
  options: PatientReviewOption[]
  onSave: (values: PatientReviewValues) => void
  onCancel: () => void
}

export interface PatientPrescriptionModalProps {
  prescription: PatientPrescription
  onClose: () => void
}
