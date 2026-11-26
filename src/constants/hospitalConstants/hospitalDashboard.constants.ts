import {
  Ambulance,
  BadgeCheck,
  BedDouble,
  Bell,
  Building2,
  CalendarCheck,
  Droplet,
  GitBranch,
  Layers,
  LayoutDashboard,
  Settings,
  Siren,
  Star,
  Stethoscope,
  TrendingUp,
  UserCog,
} from "lucide-react"

import type {
  AmbulanceStatus,
  HospitalAmbulance,
  HospitalAppointment,
  HospitalAppointmentStatus,
  HospitalBed,
  HospitalNavLink,
  HospitalNotification,
  HospitalStatusStyle,
} from "../../types/type/hospitalType/HospitalDashboard.type"

// Start of every hospital dashboard URL
export const HOSPITAL_BASE_PATH = "/hospitalDashboard"

// Placeholder "today" that matches the sample data. Replace when data comes from the API.
export const HOSPITAL_TODAY = "2026-11-21"

// Card used on every hospital page
export const hospitalCardClass =
  "rounded-2xl border border-hospital-border bg-white p-5 shadow-sm shadow-hospital-navy/10"

// Input / select used on hospital pages
export const hospitalFieldClass =
  "rounded-md border border-hospital-border bg-white px-3 py-2 text-sm text-hospital-navy outline-none focus:border-hospital-primary"

export const hospitalNavLinks: HospitalNavLink[] = [
  { label: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { label: "Verification", section: "verification", icon: BadgeCheck },
  { label: "Hospital profile", section: "profile", icon: Building2 },
  { label: "Branches", section: "branches", icon: GitBranch },
  { label: "Departments", section: "departments", icon: Layers },
  { label: "Doctors", section: "doctors", icon: Stethoscope },
  { label: "Beds and ICU", section: "beds", icon: BedDouble },
  { label: "Ambulances", section: "ambulances", icon: Ambulance },
  { label: "Appointments", section: "appointments", icon: CalendarCheck },
  { label: "Blood management", section: "blood", icon: Droplet },
  { label: "Emergency", section: "emergency", icon: Siren },
  { label: "Staff and permissions", section: "staff", icon: UserCog },
  { label: "Reports and analytics", section: "reports", icon: TrendingUp },
  { label: "Reviews", section: "reviews", icon: Star },
  { label: "Notifications", section: "notifications", icon: Bell },
  { label: "Settings", section: "settings", icon: Settings },
]

// Placeholder data, replace with real data from the API later
export const hospitalBeds: HospitalBed[] = [
  { id: "b1", type: "General ward", total: 120, occupied: 86 },
  { id: "b2", type: "ICU", total: 20, occupied: 18 },
  { id: "b3", type: "Private room", total: 30, occupied: 21 },
  { id: "b4", type: "Emergency", total: 15, occupied: 9 },
]

export const hospitalAmbulances: HospitalAmbulance[] = [
  { id: "am1", vehicleNo: "WB 02 AB 1234", driver: "Ramesh Yadav", type: "Basic life support", status: "available" },
  { id: "am2", vehicleNo: "WB 06 CD 5678", driver: "Sunil Mondal", type: "Advanced life support", status: "on-duty" },
  { id: "am3", vehicleNo: "WB 04 EF 9012", driver: "Bikash Halder", type: "Basic life support", status: "available" },
  { id: "am4", vehicleNo: "WB 08 GH 3456", driver: "Pintu Saha", type: "Patient transport", status: "maintenance" },
]

export const hospitalTodayAppointments: HospitalAppointment[] = [
  { id: "ha1", patient: "Rahul Sen", doctor: "Dr. Leslie Alexander", department: "General Medicine", time: "9:30 AM", status: "completed" },
  { id: "ha2", patient: "Imran Khan", doctor: "Dr. Amit Roy", department: "Cardiology", time: "10:30 AM", status: "checked-in" },
  { id: "ha3", patient: "Priya Das", doctor: "Dr. Leslie Alexander", department: "General Medicine", time: "11:00 AM", status: "confirmed" },
  { id: "ha4", patient: "Meera Bose", doctor: "Dr. Kavita Shah", department: "Paediatrics", time: "12:00 PM", status: "pending" },
  { id: "ha5", patient: "Rohit Das", doctor: "Dr. Amit Roy", department: "Cardiology", time: "4:00 PM", status: "cancelled" },
]

export const hospitalNotifications: HospitalNotification[] = [
  { id: "hn1", type: "emergency", message: "Emergency case arriving by ambulance WB 06 CD 5678", time: "3 min ago", unread: true, link: "emergency" },
  { id: "hn2", type: "bed", message: "ICU is 90% full: only 2 beds left", time: "20 min ago", unread: true, link: "beds" },
  { id: "hn3", type: "appointment", message: "New appointment for Dr. Kavita Shah at 12:00 PM", time: "1 hour ago", unread: true, link: "appointments" },
  { id: "hn4", type: "blood", message: "O- blood request sent to Lifeline Blood Bank", time: "3 hours ago", unread: false, link: "blood" },
  { id: "hn5", type: "system", message: "Monthly report for October is ready", time: "Yesterday", unread: false, link: "reports" },
]

export const ambulanceStatusStyles: Record<AmbulanceStatus, HospitalStatusStyle> = {
  available: { label: "Available", className: "bg-emerald-50 text-emerald-700" },
  "on-duty": { label: "On duty", className: "bg-amber-50 text-amber-700" },
  maintenance: { label: "Maintenance", className: "bg-slate-100 text-slate-600" },
}

export const hospitalAppointmentStatusStyles: Record<HospitalAppointmentStatus, HospitalStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", className: "bg-hospital-bg-soft text-hospital-primary-dark" },
  "checked-in": { label: "Checked in", className: "bg-sky-50 text-sky-700" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600" },
}