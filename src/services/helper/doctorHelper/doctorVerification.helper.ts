import type { VerificationDocument } from "../../../types/type/doctorType/DoctorVerification.type"

// Required documents that still stop a resubmission
export const getBlockingDocuments = (documents: VerificationDocument[]) =>
  documents.filter((document) => document.required && (document.status === "missing" || document.status === "rejected"))

// Upload is locked while the team is reviewing, or when the account is suspended
export const isUploadLocked = (status: string) => status === "pending" || status === "suspended"