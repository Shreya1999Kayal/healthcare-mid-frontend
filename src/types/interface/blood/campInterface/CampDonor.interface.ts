import type { CampDonorRow } from "../../../type/blood/campType/CampDonor.type"

export interface CampDonorTableProps {
  rows: CampDonorRow[]
  onAddDonation: (row: CampDonorRow) => void
}

export interface CampDonationModalProps {
  donor: CampDonorRow
  today: string
  onSave: (date: string) => void
  onClose: () => void
}