import type { DoctorVerificationState, VerificationDocument } from "../../type/doctorType/DoctorVerification.type"

export interface VerificationStatusCardProps {
  verification: DoctorVerificationState
  blockingCount: number
  onSubmit: () => void
}

export interface DocumentUploadCardProps {
  document: VerificationDocument
  disabled: boolean
  onUpload: (documentId: string, file: File) => void
}