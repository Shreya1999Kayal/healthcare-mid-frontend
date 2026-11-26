import { notificationTypeStyles } from "./hospitalNotification.constants"
import type { HospitalNotificationType } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  HospitalLanguage,
  HospitalNotificationChannel,
  HospitalNotificationPreferences,
  HospitalPasswordFormValues,
  HospitalPreferences,
  HospitalPreferenceToggle,
} from "../../types/type/hospitalType/HospitalSettings.type"

export const initialHospitalPasswordForm: HospitalPasswordFormValues = { current: "", next: "", confirm: "" }

export const hospitalPasswordFields: { name: keyof HospitalPasswordFormValues; label: string }[] = [
  { name: "current", label: "Current password" },
  { name: "next", label: "New password" },
  { name: "confirm", label: "Confirm new password" },
]

export const hospitalNotificationTypeList = Object.keys(notificationTypeStyles) as HospitalNotificationType[]

export const hospitalChannelLabels: Record<HospitalNotificationChannel, string> = {
  email: "Email",
  sms: "SMS",
}

export const hospitalLanguageOptions: HospitalLanguage[] = ["English", "Bengali", "Hindi"]

export const hospitalSlotOptions = ["10", "15", "20", "30"]

export const hospitalPreferenceToggles: { name: HospitalPreferenceToggle; label: string; hint: string }[] = [
  { name: "onlineBooking", label: "Online booking", hint: "Patients can book from the Seva website." },
  { name: "autoConfirm", label: "Auto-confirm bookings", hint: "New bookings are confirmed without staff review." },
]

// Placeholder data, replace with real data from the API later
export const initialHospitalNotificationPreferences: HospitalNotificationPreferences = {
  types: { emergency: true, appointment: true, bed: true, blood: true, system: false },
  channels: { email: true, sms: true },
}

export const initialHospitalPreferences: HospitalPreferences = {
  slotMinutes: "15",
  maxAppointmentsPerDay: "200",
  onlineBooking: true,
  autoConfirm: false,
  language: "English",
}