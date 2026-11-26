export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
export type PatientDetailTab = "visits" | "prescriptions" | "documents"
export type PatientDocumentKind = "Lab report" | "Scan" | "Report"

export type PatientVisit = {
  id: string
  date: string
  chamberId: string
  reason: string
  diagnosis: string
}

export type PatientPrescription = {
  id: string
  date: string
  medicines: string[]
}

export type PatientDocument = {
  id: string
  name: string
  kind: PatientDocumentKind
  date: string
}

// Lists are kept newest first
export type DoctorPatient = {
  id: string
  name: string
  age: number
  gender: "M" | "F"
  bloodGroup: BloodGroup
  phone: string
  visits: PatientVisit[]
  prescriptions: PatientPrescription[]
  documents: PatientDocument[]
}