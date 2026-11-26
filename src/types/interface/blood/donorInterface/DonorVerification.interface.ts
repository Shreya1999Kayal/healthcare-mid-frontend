import type { DonorDocumentConfig, DonorDocumentKey, DonorDocuments, DonorFile, DonorVerification, DonorVerificationValues } from "../../../type/blood/donorType/DonorVerification.type"


export interface DonorStatusBannerProps {
  verification: DonorVerification
}

export interface DonorVerificationFormProps {
  verification: DonorVerification
  onSubmit: (details: DonorVerificationValues, documents: DonorDocuments) => void
  onCancel?: () => void
}

export interface DonorFileFieldProps {
  config: DonorDocumentConfig
  file: DonorFile
  error?: string
  onPick: (key: DonorDocumentKey, file: File) => void
}

export interface DonorVerificationSummaryProps {
  verification: DonorVerification
  onEdit?: () => void
}