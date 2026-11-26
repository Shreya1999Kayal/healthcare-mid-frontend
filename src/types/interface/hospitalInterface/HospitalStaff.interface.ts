import type { HospitalStaff, StaffFormValues } from "../../type/hospitalType/HospitalStaff.type"

export interface StaffTableProps {
  staff: HospitalStaff[]
  onEdit: (member: HospitalStaff) => void
  onToggleStatus: (member: HospitalStaff) => void
  onResendInvite: (member: HospitalStaff) => void
  onRemove: (member: HospitalStaff) => void
}

export interface StaffFormProps {
  member?: HospitalStaff // empty when inviting a new person
  staff: HospitalStaff[] // used to stop duplicate emails
  onSave: (values: StaffFormValues) => void
  onCancel: () => void
}