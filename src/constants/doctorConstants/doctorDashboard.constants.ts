import {
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck,
  CalendarClock,
  Clock,
  LayoutDashboard,
  ListOrdered,
  Pill,
  Settings,
  Star,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react"

import type { AppointmentStatus, DashboardChamber, DoctorAppointment, DoctorNavLink, DoctorNotification, DoctorSelf, StatusStyle, WeeklyPoint } from "../../types/type/doctorType/DoctorDashboard.type"

// Start of every doctor dashboard URL
export const DOCTOR_BASE_PATH = "/doctorDashboard"

// Value of the chamber filter that shows every chamber
export const ALL_CHAMBERS = "all"

// Placeholder "today" that matches the sample data (19 Nov 2026).
// Replace with the real date when data comes from the API.
export const DOCTOR_TODAY = "2026-11-19"

// Card used on every doctor page (deeper shade than the public pages)
export const doctorCardClass =
  "rounded-2xl border border-doctor-border bg-white p-5 shadow-sm shadow-doctor-navy/10"

// Input / select used on doctor pages
export const doctorFieldClass =
  "rounded-md border border-doctor-border bg-white px-3 py-2 text-sm text-doctor-navy outline-none focus:border-doctor-primary"

// Placeholder data, replace with real data from the API later
export const doctorProfile: DoctorSelf = {
  name: "Dr. Leslie Alexander",
  speciality: "General Physician",
  image: "/doctors/leslie-alexander.jpg",
  registrationNo: "WBMC-2012-48217",
  rating: 4.8,
  reviewsCount: 126,
}

export const doctorNavLinks: DoctorNavLink[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { label: "Application", section: "application", icon: BadgeCheck },
  { label: "Appointments", section: "appointments", icon: CalendarCheck },
  { label: "Queue", section: "queue", icon: ListOrdered },
  { label: "Consultations", section: "consultations", icon: Stethoscope },
  { label: "Patients", section: "patients", icon: Users },
  { label: "Prescriptions", section: "prescriptions", icon: Pill },
  { label: "Follow-ups", section: "follow-ups", icon: CalendarClock },
  { label: "Chambers", section: "chambers", icon: Building2 },
  { label: "Schedule and slots", section: "schedule", icon: Clock },
  { label: "Reviews", section: "reviews", icon: Star },
  { label: "Notifications", section: "notifications", icon: Bell },
  { label: "Profile", section: "profile", icon: UserRound },
  { label: "Settings", section: "settings", icon: Settings },
]

export const doctorChambers: DashboardChamber[] = [
  { id: "ch1", hospital: "Seva City Hospital", patients: 120 },
  { id: "ch2", hospital: "Green Cross Medical Centre", patients: 85 },
  { id: "ch3", hospital: "Little Steps Children's Hospital", patients: 60 },
]

export const doctorAppointments: DoctorAppointment[] = [
  // today
  { id: "a1", patientId: "p1", patient: "Rahul Sen", age: 34, gender: "M", chamberId: "ch1", day: "today", date: "19 Nov 2026", time: "9:30 AM", mode: "In-person", status: "completed", reason: "Fever and cough" },
  { id: "a2", patientId: "p2", patient: "Ananya Mitra", age: 28, gender: "F", chamberId: "ch1", day: "today", date: "19 Nov 2026", time: "10:00 AM", mode: "In-person", status: "completed", reason: "Skin allergy" },
  { id: "a3", patientId: "p3", patient: "Imran Khan", age: 45, gender: "M", chamberId: "ch1", day: "today", date: "19 Nov 2026", time: "10:30 AM", mode: "In-person", status: "in-consultation", reason: "Chest pain follow-up" },
  { id: "a4", patientId: "p4", patient: "Priya Das", age: 52, gender: "F", chamberId: "ch1", day: "today", date: "19 Nov 2026", time: "11:00 AM", mode: "In-person", status: "checked-in", reason: "Blood pressure check" },
  { id: "a5", patientId: "p5", patient: "Sourav Ghosh", age: 39, gender: "M", chamberId: "ch1", day: "today", date: "19 Nov 2026", time: "11:30 AM", mode: "Online", status: "confirmed", reason: "Report review" },
  { id: "a6", patientId: "p6", patient: "Neha Roy", age: 31, gender: "F", chamberId: "ch2", day: "today", date: "19 Nov 2026", time: "5:00 PM", mode: "In-person", status: "confirmed", reason: "Headache" },
  { id: "a7", patientId: "p7", patient: "Arjun Paul", age: 60, gender: "M", chamberId: "ch2", day: "today", date: "19 Nov 2026", time: "5:30 PM", mode: "In-person", status: "pending", reason: "Diabetes review" },
  { id: "a8", patientId: "p8", patient: "Meera Bose", age: 7, gender: "F", chamberId: "ch3", day: "today", date: "19 Nov 2026", time: "7:00 PM", mode: "In-person", status: "confirmed", reason: "Child vaccination" },
  { id: "a9", patientId: "p9", patient: "Rohit Das", age: 36, gender: "M", chamberId: "ch3", day: "today", date: "19 Nov 2026", time: "7:30 PM", mode: "In-person", status: "cancelled", reason: "General check-up" },
  // upcoming
  { id: "a10", patientId: "p10", patient: "Kabir Sinha", age: 41, gender: "M", chamberId: "ch2", day: "upcoming", date: "22 Nov 2026", time: "10:00 AM", mode: "In-person", status: "reschedule-requested", reason: "Back pain" },
  { id: "a11", patientId: "p11", patient: "Tania Dey", age: 26, gender: "F", chamberId: "ch1", day: "upcoming", date: "24 Nov 2026", time: "12:00 PM", mode: "Online", status: "pending", reason: "Thyroid report" },
  { id: "a12", patientId: "p2", patient: "Ananya Mitra", age: 28, gender: "F", chamberId: "ch1", day: "upcoming", date: "26 Nov 2026", time: "10:30 AM", mode: "In-person", status: "rescheduled", reason: "Allergy follow-up" },
  // past
  { id: "a13", patientId: "p1", patient: "Rahul Sen", age: 34, gender: "M", chamberId: "ch1", day: "past", date: "12 Nov 2026", time: "9:30 AM", mode: "In-person", status: "completed", reason: "Seasonal flu" },
  { id: "a14", patientId: "p3", patient: "Imran Khan", age: 45, gender: "M", chamberId: "ch1", day: "past", date: "05 Nov 2026", time: "11:00 AM", mode: "In-person", status: "completed", reason: "Chest pain" },
  { id: "a15", patientId: "p4", patient: "Priya Das", age: 52, gender: "F", chamberId: "ch1", day: "past", date: "29 Oct 2026", time: "11:30 AM", mode: "In-person", status: "completed", reason: "Blood pressure check" },
  { id: "a16", patientId: "p6", patient: "Neha Roy", age: 31, gender: "F", chamberId: "ch2", day: "past", date: "14 Nov 2026", time: "5:00 PM", mode: "In-person", status: "no-show", reason: "Migraine" },
  { id: "a17", patientId: "p7", patient: "Arjun Paul", age: 60, gender: "M", chamberId: "ch2", day: "past", date: "08 Nov 2026", time: "6:00 PM", mode: "In-person", status: "completed", reason: "Diabetes review" },
  { id: "a18", patientId: "p8", patient: "Meera Bose", age: 7, gender: "F", chamberId: "ch3", day: "past", date: "01 Nov 2026", time: "7:00 PM", mode: "In-person", status: "completed", reason: "Fever" },
  { id: "a19", patientId: "p10", patient: "Kabir Sinha", age: 41, gender: "M", chamberId: "ch2", day: "past", date: "15 Nov 2026", time: "10:00 AM", mode: "In-person", status: "rejected", reason: "Back pain" },
]

export const weeklyAppointments: WeeklyPoint[] = [
  { day: "Mon", appointments: 14 },
  { day: "Tue", appointments: 18 },
  { day: "Wed", appointments: 12 },
  { day: "Thu", appointments: 20 },
  { day: "Fri", appointments: 16 },
  { day: "Sat", appointments: 9 },
  { day: "Sun", appointments: 4 },
]

export const doctorNotifications: DoctorNotification[] = [
  { id: "n1", type: "appointment", message: "New appointment request from Arjun Paul", time: "5 min ago", unread: true, link: "appointments" },
  { id: "n2", type: "check-in", message: "Priya Das has checked in at Seva City Hospital", time: "12 min ago", unread: true, link: "queue" },
  { id: "n3", type: "cancellation", message: "Rohit Das cancelled the 7:30 PM visit", time: "1 hour ago", unread: true, link: "appointments" },
  { id: "n4", type: "reschedule", message: "Kabir Sinha asked to reschedule the 22 Nov visit", time: "3 hours ago", unread: true, link: "appointments" },
  { id: "n5", type: "reminder", message: "Follow-up due today: Imran Khan", time: "Yesterday", unread: false, link: "follow-ups" },
  { id: "n6", type: "appointment", message: "Tania Dey booked an online visit for 24 Nov", time: "2 days ago", unread: false, link: "appointments" },
]

// Badge text and colours for the 10 appointment statuses
export const appointmentStatusStyles: Record<AppointmentStatus, StatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", className: "bg-doctor-bg-soft text-doctor-primary-dark" },
  "reschedule-requested": { label: "Reschedule requested", className: "bg-orange-50 text-orange-700" },
  rescheduled: { label: "Rescheduled", className: "bg-indigo-50 text-indigo-700" },
  "checked-in": { label: "Checked in", className: "bg-sky-50 text-sky-700" },
  "in-consultation": { label: "In consultation", className: "bg-violet-50 text-violet-700" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600" },
  rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700" },
  "no-show": { label: "No-show", className: "bg-slate-100 text-slate-600" },
}