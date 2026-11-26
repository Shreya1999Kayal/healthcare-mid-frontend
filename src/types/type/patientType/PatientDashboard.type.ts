import type { LucideIcon } from "lucide-react"

export type PatientNavLink = {
  label: string
  section: string // URL part: /patientDashboard/<section>/:id
  icon: LucideIcon
}

export type PatientStatusStyle = {
  label: string
  className: string
}

// Everything is text in the form
export type PatientProfileValues = {
  name: string
  email: string
  phone: string // exactly 10 digits
  age: string
  gender: string
  bloodGroup: string
  address: string
  emergencyName: string
  emergencyPhone: string // exactly 10 digits
}

export type PatientProfileErrors = Partial<Record<keyof PatientProfileValues, string>>

// A registered patient (placeholder until login is built); no admin approval needed
export type PatientAccount = {
  id: string
  profile: PatientProfileValues
}

export type PatientNotificationType = "appointment" | "blood" | "prescription" | "review" | "system"

export type PatientNotification = {
  id: string
  type: PatientNotificationType
  message: string
  time: string
  unread: boolean
  link: string // section that opens when clicked, e.g. "appointments"
}

export type PatientNotificationSettings = {
  appointments: boolean
  bloodRequests: boolean
  prescriptions: boolean
  reviews: boolean
  sms: boolean
}

export type PatientPasswordValues = {
  current: string
  next: string
  confirm: string
}

export type PatientPasswordErrors = Partial<Record<keyof PatientPasswordValues, string>>
