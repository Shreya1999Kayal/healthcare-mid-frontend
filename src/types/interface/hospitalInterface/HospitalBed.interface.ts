import type { HospitalWard, WardFormValues } from "../../type/hospitalType/HospitalBed.type"

export interface WardCardProps {
  ward: HospitalWard
  onEdit: (ward: HospitalWard) => void
  onDelete: (ward: HospitalWard) => void
  onChangeOccupied: (wardId: string, change: number) => void // +1 admit, -1 discharge
}

export interface WardFormProps {
  ward?: HospitalWard // empty when adding a new ward
  onSave: (values: WardFormValues) => void
  onCancel: () => void
}