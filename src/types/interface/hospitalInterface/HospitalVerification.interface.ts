import type {
  HospitalVerification,
  VerificationDocumentConfig,
  VerificationDocumentKey,
  VerificationDocuments,
  VerificationFile,
  VerificationFormValues,
  VerificationStatus,
} from "../../type/hospitalType/HospitalVerification.type"

export interface VerificationStatusBannerProps {
  verification: HospitalVerification
}

export interface VerificationFormProps {
  verification: HospitalVerification
  onSubmit: (details: VerificationFormValues, documents: VerificationDocuments) => void
  onCancel?: () => void
}

export interface VerificationFileFieldProps {
  config: VerificationDocumentConfig
  file: VerificationFile
  error?: string
  onPick: (key: VerificationDocumentKey, file: File) => void
}

export interface VerificationSummaryProps {
  verification: HospitalVerification
  onEdit?: () => void
}

export interface HospitalLockedSectionProps {
  hospitalId: string
  status: VerificationStatus
}