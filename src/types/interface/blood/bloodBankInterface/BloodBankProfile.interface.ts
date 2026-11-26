import type { BloodBankProfileDetails } from "../../../type/blood/bloodBankType/BloodBankProfile.type"

export interface BloodBankProfileViewProps {
  profile: BloodBankProfileDetails
  onEdit: () => void
}

export interface BloodBankProfileFormProps {
  profile: BloodBankProfileDetails
  onSave: (profile: BloodBankProfileDetails) => void
  onCancel: () => void
}