import {
  Bell,
  CalendarCheck,
  Droplet,
  FileText,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Pill,
  Settings,
  UserRound,
} from "lucide-react"
import type {
  PatientAccount,
  PatientNavLink,
  PatientNotification,
  PatientNotificationSettings,
  PatientPasswordValues,
} from "../../types/type/patientType/PatientDashboard.type"

// Start of every patient dashboard URL
export const PATIENT_BASE_PATH = "/patientDashboard"

// Placeholder "today" that matches the sample data. Replace when data comes from the API.
export const PATIENT_TODAY = "2026-11-26"

export const PATIENT_PASSWORD_MIN = 8

// Card, input and buttons used on every patient page
export const patientCardClass = "rounded-2xl border border-patient-border bg-white p-5 shadow-sm shadow-patient-navy/10"

export const patientFieldClass =
  "rounded-md border border-patient-border bg-white px-3 py-2 text-sm text-patient-navy outline-none focus:border-patient-primary"

export const patientPrimaryButtonClass =
  "flex items-center justify-center gap-2 rounded-md bg-patient-primary px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-patient-primary-dark disabled:cursor-not-allowed disabled:opacity-50"

export const patientOutlineButtonClass =
  "flex items-center justify-center gap-2 rounded-md border border-patient-border bg-white px-4 py-2 text-sm font-semibold text-patient-navy no-underline hover:bg-patient-bg"

export const patientDangerButtonClass =
  "flex items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"

export const patientNavLinks: PatientNavLink[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { label: "Profile", section: "profile", icon: UserRound },
  { label: "Appointments", section: "appointments", icon: CalendarCheck },
  { label: "Medical records", section: "records", icon: FileText },
  { label: "Prescriptions", section: "prescriptions", icon: Pill },
  { label: "Blood requests", section: "bloodRequests", icon: Droplet },
  { label: "Saved", section: "favorites", icon: Heart },
  { label: "Feedback and reviews", section: "reviews", icon: MessageSquare },
  { label: "Notifications", section: "notifications", icon: Bell },
  { label: "Settings", section: "settings", icon: Settings },
]

export const patientGenderOptions = ["Male", "Female", "Other"]

// Placeholder until login is built
export const patientAccounts: PatientAccount[] = [
  {
    id: "p1",
    profile: {
      name: "Rahul Sen",
      email: "rahul.sen@mail.com",
      phone: "9830011004",
      age: "34",
      gender: "Male",
      bloodGroup: "O-",
      address: "12 Lake Road, Salt Lake, Kolkata",
      emergencyName: "Mita Sen",
      emergencyPhone: "9830099001",
    },
  },
  {
    id: "p2",
    profile: {
      name: "Ananya Mitra",
      email: "ananya@mail.com",
      phone: "9830016001",
      age: "29",
      gender: "Female",
      bloodGroup: "A+",
      address: "5 Park Lane, Howrah",
      emergencyName: "Sujoy Mitra",
      emergencyPhone: "9830099002",
    },
  },
]

export const patientNotifications: PatientNotification[] = [
  { id: "pn1", type: "appointment", message: "Dr. Kathryn Murphy confirmed your appointment on 28 Nov at 10:30 AM", time: "10 min ago", unread: true, link: "appointments" },
  { id: "pn2", type: "blood", message: "Red Drop Blood Bank accepted your A+ blood request", time: "1 hour ago", unread: true, link: "bloodRequests" },
  { id: "pn3", type: "prescription", message: "Dr. Robert Fox added a prescription for your visit", time: "Yesterday", unread: false, link: "prescriptions" },
  { id: "pn4", type: "review", message: "Your review of Dr. Leslie Alexander is now published", time: "3 days ago", unread: false, link: "reviews" },
]

export const defaultNotificationSettings: PatientNotificationSettings = {
  appointments: true,
  bloodRequests: true,
  prescriptions: true,
  reviews: true,
  sms: false,
}

export const patientNotificationSettingLabels: { key: keyof PatientNotificationSettings; label: string }[] = [
  { key: "appointments", label: "Appointment updates" },
  { key: "bloodRequests", label: "Blood request updates" },
  { key: "prescriptions", label: "New prescriptions" },
  { key: "reviews", label: "Review published or rejected" },
  { key: "sms", label: "Also send SMS" },
]

export const emptyPasswordValues: PatientPasswordValues = { current: "", next: "", confirm: "" }
