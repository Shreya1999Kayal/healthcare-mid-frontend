import type {
  ApplicationDocumentConfig,
  ApplicationDocumentKey,
  ApplicationDocuments,
  ApplicationFile,
  ApplicationFormValues,
  ApplicationStatus,
  DoctorApplication,
} from "../../type/doctorType/DoctorApplication.type"

export interface ApplicationStatusBannerProps {
  application: DoctorApplication
}

export interface ApplicationFormProps {
  application: DoctorApplication
  onSubmit: (details: ApplicationFormValues, documents: ApplicationDocuments) => void
  onCancel?: () => void
}

export interface ApplicationFileFieldProps {
  config: ApplicationDocumentConfig
  file: ApplicationFile
  error?: string
  onPick: (key: ApplicationDocumentKey, file: File) => void
}

export interface ApplicationSummaryProps {
  application: DoctorApplication
  onEdit?: () => void
}

export interface LockedSectionProps {
  doctorId: string
  status: ApplicationStatus
}