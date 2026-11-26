import type { HospitalStatusStyle } from "./HospitalDashboard.type"

// not-submitted: new hospital, form not sent yet
export type VerificationStatus = "not-submitted" | "pending" | "approved" | "rejected"

export type VerificationStatusStyle = HospitalStatusStyle & {
  description: string
}

export type VerificationDocumentKey = "registrationCertificate" | "nabhCertificate" | "fireSafetyCertificate"

export type VerificationFile = {
  fileName: string // empty when not uploaded
  uploadedOn: string
}

export type VerificationDocuments = Record<VerificationDocumentKey, VerificationFile>

// Everything is text in the form
export type VerificationFormValues = {
  hospitalName: string
  registrationNo: string
  hospitalType: string
  ownership: string
  establishedYear: string
  totalBeds: string
  contactPerson: string
  email: string
  phone: string
  emergencyPhone: string
  city: string
  pincode: string
  address: string
}

export type VerificationFieldName = keyof VerificationFormValues

export type VerificationFormErrors = Partial<Record<VerificationFieldName | VerificationDocumentKey, string>>

export type VerificationField = {
  name: VerificationFieldName
  label: string
  required?: boolean
  type?: "text" | "number" | "tel" | "email" | "textarea"
  options?: string[] // shows a select
  placeholder?: string
  fullWidth?: boolean
}

export type VerificationDocumentConfig = {
  key: VerificationDocumentKey
  title: string
  hint: string
  required: boolean
}

export type HospitalVerification = {
  status: VerificationStatus
  submittedOn: string
  reviewedOn: string
  adminRemarks: string // reason from the admin, shown when rejected
  details: VerificationFormValues
  documents: VerificationDocuments
}

// A registered hospital account (placeholder until login is built)
export type HospitalAccount = {
  id: string
  name: string
  city: string
  verification: HospitalVerification
}