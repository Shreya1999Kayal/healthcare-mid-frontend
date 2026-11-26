import type { DepartmentFormValues, HospitalDepartment } from "../../type/hospitalType/HospitalDepartment.type"

export interface DepartmentCardProps {
  department: HospitalDepartment
  onEdit: (department: HospitalDepartment) => void
  onDelete: (department: HospitalDepartment) => void
  onToggleStatus: (departmentId: string) => void
}

export interface DepartmentFormProps {
  department?: HospitalDepartment // empty when adding a new department
  departments: HospitalDepartment[] // used to stop duplicate names
  onSave: (values: DepartmentFormValues) => void
  onCancel: () => void
}