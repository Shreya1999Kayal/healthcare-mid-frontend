import type { BloodBankRole, BloodBankStatusStyle } from "./BloodBankDashboard.type"

// not-submitted: new blood bank, form not sent yet
export type VerificationStatus = "not-submitted" | "pending" | "approved" | "rejected"

export type VerificationStatusStyle = BloodBankStatusStyle & {
  description: string
}

export type BloodBankDocumentKey = "licence" | "registrationCertificate" | "addressProof" | "nbtcCertificate"

export type BloodBankFile = {
  fileName: string // empty when not uploaded
  uploadedOn: string
}

export type BloodBankDocuments = Record<BloodBankDocumentKey, BloodBankFile>

// Everything is text in the form
export type BloodBankVerificationValues = {
  bankName: string
  licenceNo: string
  bankType: string
  linkedHospital: string
  establishedYear: string
  medicalOfficer: string
  officerRegNo: string
  email: string
  phone: string
  city: string
  pincode: string
  address: string
}

export type BloodBankFieldName = keyof BloodBankVerificationValues

export type BloodBankVerificationErrors = Partial<Record<BloodBankFieldName | BloodBankDocumentKey, string>>

// One form field; T = field names of that form (verification and profile both use it)
export type BloodBankField<T extends string> = {
  name: T
  label: string
  required?: boolean
  type?: "text" | "number" | "tel" | "email" | "textarea" | "date"
  options?: string[] // shows a select
  placeholder?: string
  fullWidth?: boolean
}

export type BloodBankDocumentConfig = {
  key: BloodBankDocumentKey
  title: string
  hint: string
  required: boolean
}

export type BloodBankVerification = {
  status: VerificationStatus
  submittedOn: string
  reviewedOn: string
  adminRemarks: string // reason from the admin, shown when rejected
  details: BloodBankVerificationValues
  documents: BloodBankDocuments
}

// A registered blood bank account (placeholder until login is built)
export type BloodBankAccount = {
  id: string
  name: string
  city: string
  role: BloodBankRole
  organiserId?: string   // camp role
  verification: BloodBankVerification
}