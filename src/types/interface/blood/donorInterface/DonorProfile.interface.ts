import type { DonorProfileDetails } from "../../../type/blood/donorType/DonorProfile.type"


export interface DonorProfileViewProps {
  profile: DonorProfileDetails
  onEdit: () => void
}

export interface DonorProfileFormProps {
  profile: DonorProfileDetails
  onSave: (profile: DonorProfileDetails) => void
  onCancel: () => void
}