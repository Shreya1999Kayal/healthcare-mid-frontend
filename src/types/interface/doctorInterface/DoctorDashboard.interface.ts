import type { LucideIcon } from "lucide-react"
import type { AppointmentStatus, DashboardChamber, DoctorAppointment, DoctorNotification, WeeklyPoint } from "../../type/doctorType/DoctorDashboard.type"
import type { ApplicationDocuments, ApplicationFormValues, DoctorAccount } from "../../type/doctorType/DoctorApplication.type"

export interface DoctorOutletContext {
  doctor: DoctorAccount // current doctor (from :id) with the live application
  chamberId: string
  notifications: DoctorNotification[]
  onMarkRead: (notificationId: string) => void
  onMarkAllRead: () => void
  onSubmitApplication: (details: ApplicationFormValues, documents: ApplicationDocuments) => void
}

export interface DoctorAvatarProps {
  name: string
  image: string
  className?: string
}

export interface DoctorSidebarProps {
  doctor: DoctorAccount
}

export interface DoctorTopbarProps {
  doctor: DoctorAccount
  chambers: DashboardChamber[]
  chamberId: string
  unread: number
  onChamberChange: (chamberId: string) => void
}

export interface DoctorNavItemProps {
  label: string
  to: string
  icon: LucideIcon
  locked: boolean
  compact?: boolean
}

export interface SummaryCardProps {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export interface StatusBadgeProps {
  status: AppointmentStatus
}

export interface TodayAppointmentsProps {
  appointments: DoctorAppointment[]
  chambers: DashboardChamber[]
}

export interface NextAppointmentProps {
  appointment?: DoctorAppointment
  chambers: DashboardChamber[]
}

export interface PatientsByChamberProps {
  chambers: DashboardChamber[]
}

export interface WeeklyChartProps {
  data: WeeklyPoint[]
}

export interface RecentNotificationsProps {
  notifications: DoctorNotification[]
}