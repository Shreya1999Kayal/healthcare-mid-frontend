import type {
  BloodBankDocumentConfig,
  BloodBankDocumentKey,
  BloodBankDocuments,
  BloodBankFile,
  BloodBankVerification,
  BloodBankVerificationValues,
} from "../../../type/blood/bloodBankType/BloodBankVerification.type"

export interface BloodBankStatusBannerProps {
  verification: BloodBankVerification
}

export interface BloodBankVerificationFormProps {
  verification: BloodBankVerification
  onSubmit: (details: BloodBankVerificationValues, documents: BloodBankDocuments) => void
  onCancel?: () => void
}

export interface BloodBankFileFieldProps {
  config: BloodBankDocumentConfig
  file: BloodBankFile
  error?: string
  onPick: (key: BloodBankDocumentKey, file: File) => void
}

export interface BloodBankVerificationSummaryProps {
  verification: BloodBankVerification
  onEdit?: () => void
}