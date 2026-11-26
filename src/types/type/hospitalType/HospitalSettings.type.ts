import type { HospitalNotificationType } from "./HospitalDashboard.type"

export type HospitalPasswordFormValues = {
  current: string
  next: string
  confirm: string
}

export type HospitalNotificationChannel = "email" | "sms"

export type HospitalNotificationPreferences = {
  types: Record<HospitalNotificationType, boolean>
  channels: Record<HospitalNotificationChannel, boolean>
}

export type HospitalLanguage = "English" | "Bengali" | "Hindi"

// Numbers are kept as text while typing
export type HospitalPreferences = {
  slotMinutes: string
  maxAppointmentsPerDay: string
  onlineBooking: boolean
  autoConfirm: boolean
  language: HospitalLanguage
}

export type HospitalPreferenceToggle = "onlineBooking" | "autoConfirm"