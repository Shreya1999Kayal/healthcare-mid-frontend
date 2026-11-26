import type { DoctorSelf } from "./DoctorDashboard.type"

export type ConsultationType = "in-person" | "online" | "both"

export type DoctorProfileDetails = DoctorSelf & {
  subSpeciality: string
  experience: number // years
  languages: string[]
  bio: string
  inPersonFee: number
  onlineFee: number
  email: string
  phone: string
  qualifications: string[]
  expertise: string[]
  awards: string[]
  certifications: string[]
  consultationType: ConsultationType
}

// Everything is text in the form; lists are one item per line
export type ProfileFormValues = {
  name: string
  speciality: string
  subSpeciality: string
  experience: string
  registrationNo: string
  email: string
  phone: string
  languages: string // comma separated
  bio: string
  inPersonFee: string
  onlineFee: string
  consultationType: ConsultationType
  qualifications: string
  expertise: string
  awards: string
  certifications: string
}