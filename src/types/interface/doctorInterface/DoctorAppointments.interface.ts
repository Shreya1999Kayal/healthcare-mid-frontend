import type { AppointmentStatus, DashboardChamber, DoctorAppointment } from "../../type/doctorType/DoctorDashboard.type"
import type { DoctorTabOption } from "../../type/doctorType/DoctorAppointments.type"
import type { ReactNode } from "react"

export interface DoctorTabsProps<T extends string> {
  options: DoctorTabOption<T>[]
  value: T
  onChange: (value: T) => void
}

export interface DoctorEmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export interface AppointmentsTableProps {
  appointments: DoctorAppointment[]
  chambers: DashboardChamber[]
  onStatusChange: (appointmentId: string, status: AppointmentStatus) => void
}

export interface DoctorFormFieldProps {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}