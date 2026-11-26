
import type { BloodGroup } from "../../public/Blood.type"
import type { DonorStatusStyle } from "./DonorDashboard.type"

// not-submitted: new donor, form not sent yet
export type DonorVerificationStatus = "not-submitted" | "pending" | "approved" | "rejected"

export type DonorVerificationStatusStyle = DonorStatusStyle & {
  description: string
}

export type DonorDocumentKey = "identityProof" | "bloodGroupReport"

export type DonorFile = {
  fileName: string // empty when not uploaded
  uploadedOn: string
}

export type DonorDocuments = Record<DonorDocumentKey, DonorFile>

// Everything is text in the form
export type DonorVerificationValues = {
  fullName: string
  dateOfBirth: string // yyyy-mm-dd
  gender: string
  bloodGroup: string
  weight: string // kg
  phone: string
  email: string
  city: string
  pincode: string
  address: string
}

export type DonorFieldName = keyof DonorVerificationValues

export type DonorVerificationErrors = Partial<Record<DonorFieldName | DonorDocumentKey, string>>

// One form field; T = field names of that form (verification and profile both use it)
export type DonorField<T extends string> = {
  name: T
  label: string
  required?: boolean
  type?: "text" | "number" | "tel" | "email" | "date" | "textarea"
  options?: string[] // shows a select
  placeholder?: string
  fullWidth?: boolean
}

export type DonorDocumentConfig = {
  key: DonorDocumentKey
  title: string
  hint: string
  required: boolean
}

export type DonorVerification = {
  status: DonorVerificationStatus
  submittedOn: string
  reviewedOn: string
  adminRemarks: string // reason from the admin, shown when rejected
  details: DonorVerificationValues
  documents: DonorDocuments
}

// A registered donor account (placeholder until login is built)
export type DonorAccount = {
  id: string // matches an id in donorsList
  name: string
  city: string
  bloodGroup: BloodGroup
  verification: DonorVerification
}

