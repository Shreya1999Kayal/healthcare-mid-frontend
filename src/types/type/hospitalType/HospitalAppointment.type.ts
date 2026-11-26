import type { HospitalAppointmentStatus } from "./HospitalDashboard.type"

export type AppointmentDayTab = "today" | "upcoming" | "past"

export type BookedVia = "online" | "walk-in"

export type HospitalBooking = {
  id: string
  patient: string
  phone: string
  age: number
  gender: string
  doctorId: string // must match an id in hospitalDoctors
  doctor: string
  department: string
  date: string // yyyy-mm-dd
  time: string // 24-hour "14:30"
  reason: string
  bookedVia: BookedVia
  status: HospitalAppointmentStatus
}

// One button in the Actions column
export type BookingAction = {
  label: string
  next: HospitalAppointmentStatus
}

// Everything is text in the form
export type BookingFormValues = {
  patient: string
  phone: string
  age: string
  gender: string
  doctorId: string
  date: string
  time: string
  reason: string
}

export type BookingFieldName = keyof BookingFormValues

export type BookingFormErrors = Partial<Record<BookingFieldName, string>>