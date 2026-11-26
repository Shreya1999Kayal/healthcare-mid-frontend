import type { StatusStyle } from "./DoctorDashboard.type"

// Same account states as the scope
export type VerificationStatus = "pending" | "verified" | "approved" | "rejected" | "suspended"
export type DocumentStatus = "missing" | "pending" | "approved" | "rejected"
export type DocumentGroup = "professional" | "identity"

export type VerificationStatusStyle = StatusStyle & {
  description: string
}

export type VerificationDocument = {
  id: string
  group: DocumentGroup
  title: string
  hint: string
  required: boolean
  fileName: string // empty when not uploaded
  uploadedOn: string
  status: DocumentStatus
  remark?: string // admin note when rejected
}

export type DoctorVerificationState = {
  status: VerificationStatus
  submittedOn: string
  reviewedOn: string
  adminRemarks: string
  documents: VerificationDocument[]
}