import type { LucideIcon } from "lucide-react"
import type { HospitalProfileDetails } from "../../type/hospitalType/HospitalProfile.type"

export interface HospitalListCardProps {
  title: string
  items: string[]
  icon: LucideIcon
}

export interface HospitalProfileViewProps {
  profile: HospitalProfileDetails
  onEdit: () => void
}

export interface HospitalProfileFormProps {
  profile: HospitalProfileDetails
  onSave: (profile: HospitalProfileDetails) => void
  onCancel: () => void
}

