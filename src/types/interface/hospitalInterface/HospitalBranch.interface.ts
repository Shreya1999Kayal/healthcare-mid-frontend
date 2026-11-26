import type { BranchFormValues, HospitalBranch } from "../../type/hospitalType/HospitalBranch.type"

export interface BranchCardProps {
  branch: HospitalBranch
  onEdit: (branch: HospitalBranch) => void
  onDelete: (branch: HospitalBranch) => void
  onToggleStatus: (branchId: string) => void
}

export interface BranchFormProps {
  branch?: HospitalBranch // empty when adding a new branch
  onSave: (values: BranchFormValues) => void
  onCancel: () => void
}