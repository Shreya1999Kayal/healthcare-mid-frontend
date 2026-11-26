import type { BloodGroup } from "../public/Blood.type"

// ---------- Appointments ----------
export type PatientAppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled"

export type PatientAppointmentTab = "upcoming" | "past" | "cancelled"

export type PatientAppointment = {
  id: string
  doctorId: string // id in doctorsList
  doctor: string
  speciality: string
  hospital: string // chamber
  location: string
  date: string // yyyy-mm-dd
  time: string // 24-hour "14:30"
  reason: string
  status: PatientAppointmentStatus
}

export type PatientBookingValues = {
  doctorId: string
  date: string
  time: string
  reason: string
}

export type PatientBookingErrors = Partial<Record<keyof PatientBookingValues, string>>

// ---------- Medical records ----------
export type PatientRecordType = "lab" | "scan" | "discharge" | "other"

export type PatientRecord = {
  id: string
  title: string
  recordType: PatientRecordType
  date: string
  fileName: string
  addedBy: "patient" | "doctor" // doctor records are read only
  doctor: string // "" when the patient uploaded it
}

export type PatientRecordValues = {
  title: string
  recordType: string
  date: string
  fileName: string
}

export type PatientRecordErrors = Partial<Record<keyof PatientRecordValues, string>>

// ---------- Prescriptions ----------
export type PatientMedicine = {
  name: string
  dose: string
  timing: string
  days: number
}

export type PatientPrescription = {
  id: string
  appointmentId: string
  doctor: string
  speciality: string
  hospital: string
  date: string
  diagnosis: string
  medicines: PatientMedicine[]
  advice: string
}

// ---------- Blood requests ----------
export type PatientBloodRequestStatus = "pending" | "accepted" | "delivered" | "rejected" | "cancelled"

export type PatientBloodRequest = {
  id: string
  bloodGroup: BloodGroup
  units: number
  neededBy: string
  hospital: string
  bloodBank: string // "" until a bank accepts
  emergency: boolean
  note: string
  requestedOn: string
  status: PatientBloodRequestStatus
}

export type PatientBloodRequestValues = {
  bloodGroup: string
  units: string
  neededBy: string
  hospital: string
  emergency: boolean
  note: string
}

export type PatientBloodRequestErrors = Partial<Record<"bloodGroup" | "units" | "neededBy" | "hospital", string>>

// ---------- Favourites ----------
export type PatientFavoriteType = "doctor" | "hospital" | "bloodBank"

export type PatientFavorite = {
  id: string
  favoriteType: PatientFavoriteType
  itemId: string // id on the public page
  name: string
  detail: string
  phone: string
}

// ---------- Reviews ----------
export type PatientReviewTarget = "doctor" | "hospital" | "bloodBank" | "camp"

// pending = waiting for the admin; approved = published
export type PatientReviewStatus = "pending" | "approved" | "rejected"

export type PatientReview = {
  id: string
  target: PatientReviewTarget
  targetName: string
  sourceId: string // appointment / blood request / camp visit the review is about
  rating: number
  comment: string
  postedOn: string
  status: PatientReviewStatus
}

// Something the patient is allowed to review (built from completed visits)
export type PatientReviewOption = {
  key: string // "doctor-pa3"
  target: PatientReviewTarget
  targetName: string
  sourceId: string
  label: string
}

export type PatientReviewValues = {
  optionKey: string
  rating: number
  comment: string
}

export type PatientReviewErrors = Partial<Record<keyof PatientReviewValues, string>>

// A camp where the patient donated blood
export type PatientCampVisit = {
  id: string
  campName: string
  date: string
}
