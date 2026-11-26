import type { ChangeEvent, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import type { DonorAccount, DonorDocuments, DonorField, DonorVerificationStatus, DonorVerificationValues } from "../../../type/blood/donorType/DonorVerification.type"
import type { DonationRecord } from "../../../type/blood/donorType/DonorRecord.type"



export interface DonorOutletContext {
  donor: DonorAccount // current donor (from :id) with the live verification
  records: DonationRecord[] // this donor's donations
  onSubmitVerification: (details: DonorVerificationValues, documents: DonorDocuments) => void
}

export interface DonorAvatarProps {
  name: string
  className?: string
}

export interface DonorSidebarProps {
  donor: DonorAccount
}

export interface DonorTopbarProps {
  donor: DonorAccount
}

export interface DonorNavItemProps {
  label: string
  to: string
  icon: LucideIcon
  locked: boolean
  compact?: boolean
}

export interface DonorSummaryCardProps {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
}

export interface DonorFormFieldProps {
  label: string
  required?: boolean
  className?: string
  children: ReactNode
}

export interface DonorFieldInputProps<T extends string> {
  field: DonorField<T>
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export interface DonorLockedSectionProps {
  donorId: string
  status: DonorVerificationStatus
}