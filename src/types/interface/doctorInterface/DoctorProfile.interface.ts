import type { LucideIcon } from "lucide-react"
import type { DoctorProfileDetails } from "../../type/doctorType/DoctorProfile.type"

export interface ProfileListSectionProps {
  title: string
  items: string[]
  icon: LucideIcon
}

export interface ProfileViewProps {
  profile: DoctorProfileDetails
  onEdit: () => void
}

export interface ProfileFormProps {
  profile: DoctorProfileDetails
  onSave: (profile: DoctorProfileDetails) => void
  onCancel: () => void
}