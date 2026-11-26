import type { DoctorNotificationType } from "./DoctorDashboard.type"
import type { ConsultationType } from "./DoctorProfile.type"

export type PasswordFormValues = {
  current: string
  next: string
  confirm: string
}

export type NotificationChannel = "email" | "sms"

export type NotificationPreferences = {
  types: Record<DoctorNotificationType, boolean>
  channels: Record<NotificationChannel, boolean>
}

export type AppLanguage = "English" | "Bengali" | "Hindi"

export type PracticeSettings = {
  defaultFee: string
  consultationType: ConsultationType
  language: AppLanguage
}