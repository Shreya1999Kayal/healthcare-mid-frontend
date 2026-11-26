import { doctorProfileDetails } from "./doctorProfile.constants"
import type { AppLanguage, NotificationChannel, NotificationPreferences, PasswordFormValues, PracticeSettings } from "../../types/type/doctorType/DoctorSettings.type"

export const initialPasswordForm: PasswordFormValues = { current: "", next: "", confirm: "" }

export const languageOptions: AppLanguage[] = ["English", "Bengali", "Hindi"]

export const channelLabels: Record<NotificationChannel, string> = {
  email: "Email",
  sms: "SMS",
}

export const initialNotificationPreferences: NotificationPreferences = {
  types: { appointment: true, "check-in": true, cancellation: true, reschedule: true, reminder: false },
  channels: { email: true, sms: false },
}

export const initialPracticeSettings: PracticeSettings = {
  defaultFee: String(doctorProfileDetails.inPersonFee),
  consultationType: doctorProfileDetails.consultationType,
  language: "English",
}