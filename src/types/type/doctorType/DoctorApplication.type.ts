import type { DoctorSelf, StatusStyle } from "./DoctorDashboard.type"

// not-submitted: new doctor, form not sent yet
export type ApplicationStatus = "not-submitted" | "pending" | "approved" | "rejected"

export type ApplicationDocumentKey = "registrationCertificate" | "identityProof" | "experienceCertificate"

export type ApplicationStatusStyle = StatusStyle & {
  description: string
}

export type ApplicationFile = {
  fileName: string // empty when not uploaded
  uploadedOn: string
}

export type ApplicationDocuments = Record<ApplicationDocumentKey, ApplicationFile>

// Everything is text in the form (same idea as ProfileFormValues)
export type ApplicationFormValues = {
  doctorCode: string // the "Doctor ID" field
  registrationNo: string
  medicalCouncil: string
  specialisation: string
  qualification: string
  medicalCollege: string
  passoutYear: string
  experience: string
  currentHospital: string
  phone: string
  gender: string
  dateOfBirth: string // yyyy-mm-dd from the date input
  bloodGroup: string
  idProofType: string
  address: string
}

export type ApplicationFieldName = keyof ApplicationFormValues

export type ApplicationFormErrors = Partial<Record<ApplicationFieldName | ApplicationDocumentKey, string>>

export type ApplicationField = {
  name: ApplicationFieldName
  label: string
  required?: boolean
  type?: "text" | "number" | "tel" | "date" | "textarea"
  options?: string[] // shows a select
  placeholder?: string
  fullWidth?: boolean
}

export type ApplicationDocumentConfig = {
  key: ApplicationDocumentKey
  title: string
  hint: string
  required: boolean
}

export type DoctorApplication = {
  status: ApplicationStatus
  submittedOn: string
  reviewedOn: string
  adminRemarks: string // reason from the admin, shown when rejected
  details: ApplicationFormValues
  documents: ApplicationDocuments
}

// A registered doctor account (placeholder until login is built)
export type DoctorAccount = DoctorSelf & {
  id: string
  application: DoctorApplication
}