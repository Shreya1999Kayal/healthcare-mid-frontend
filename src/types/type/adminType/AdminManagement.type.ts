import type { AdminApplicantRole } from "./AdminVerification.type"

export type AdminFilterOption = {
  value: string
  label: string
}

// ---------- Users ----------
export type AdminUserRole = AdminApplicantRole | "patient"

export type AdminUserStatus = "active" | "blocked"

export type AdminUser = {
  id: string
  name: string
  email: string
  phone: string
  role: AdminUserRole
  city: string
  joinedOn: string // yyyy-mm-dd
  status: AdminUserStatus
}

// ---------- Approved accounts ----------
export type AdminProviderStatus = "active" | "suspended"

export type AdminDoctor = {
  id: string
  name: string
  specialisation: string
  qualification: string
  hospital: string
  city: string
  phone: string
  experience: number // years
  appointments: number
  rating: number // out of 5
  reviews: number
  approvedOn: string
  status: AdminProviderStatus
}

export type AdminHospital = {
  id: string
  name: string
  city: string
  phone: string
  hospitalType: string
  branches: string[]
  departments: string[]
  doctors: number
  totalBeds: number
  approvedOn: string
  status: AdminProviderStatus
}

export type AdminBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"

export type AdminBloodStock = Record<AdminBloodGroup, number> // units

export type AdminBloodBank = {
  id: string
  name: string
  city: string
  phone: string
  linkedHospital: string
  stock: AdminBloodStock
  status: AdminProviderStatus
}

export type AdminBloodBankTab = "banks" | "camps"

export type AdminCampStatus = "upcoming" | "completed" | "cancelled"

export type AdminCamp = {
  id: string
  title: string
  organiser: string
  bloodBank: string
  city: string
  date: string
  registered: number
  collected: number // units, only after the camp
  status: AdminCampStatus
}

export type AdminDonor = {
  id: string
  name: string
  bloodGroup: AdminBloodGroup
  city: string
  phone: string
  lastDonation: string // "" = never donated
  donations: number
  status: AdminProviderStatus
}

export type AdminDonorEligibility = {
  eligible: boolean
  nextDate: string // first day they can donate again ("" = never donated)
}

// ---------- Activity ----------
export type AdminAppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled"

export type AdminAppointment = {
  id: string
  patient: string
  doctor: string
  hospital: string
  date: string
  time: string // "10:30 AM"
  status: AdminAppointmentStatus
}

export type AdminBloodRequestStatus = "pending" | "accepted" | "delivered" | "rejected"

export type AdminBloodRequest = {
  id: string
  patient: string
  hospital: string
  bloodBank: string
  bloodGroup: AdminBloodGroup
  units: number
  requestedOn: string
  status: AdminBloodRequestStatus
  emergency: boolean
}

export type AdminEmergencyStatus = "incoming" | "in-treatment" | "stable" | "closed"

export type AdminEmergencyCase = {
  id: string
  patient: string
  age: number
  condition: string
  hospital: string
  city: string
  ambulance: string // "" = came on their own
  reportedAt: string // "12:40 AM"
  status: AdminEmergencyStatus
}

export type AdminHospitalCapacity = {
  id: string
  hospital: string
  city: string
  generalTotal: number
  generalFree: number
  icuTotal: number
  icuFree: number
}

export type AdminAmbulanceStatus = "available" | "on-duty" | "maintenance"

export type AdminAmbulance = {
  id: string
  vehicleNo: string
  hospital: string
  driver: string
  ambulanceType: string
  status: AdminAmbulanceStatus
}

// ---------- Feedback ----------
// New reviews wait for the admin; only approved ones are published
export type AdminReviewTarget = "doctor" | "hospital" | "bloodBank" | "camp"

export type AdminFeedbackStatus = "pending" | "approved" | "rejected"

export type AdminFeedback = {
  id: string
  author: string
  target: AdminReviewTarget
  targetId: string // id of the doctor / hospital / bank / camp account
  targetName: string
  rating: number
  comment: string
  postedOn: string
  status: AdminFeedbackStatus
  reviewedOn: string // empty until reviewed
  adminRemarks: string // reason for rejecting, seen only by the admin
}
