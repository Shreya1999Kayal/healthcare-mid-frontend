export type DepartmentStatus = "open" | "closed"

export type DepartmentFilter = "all" | DepartmentStatus

export type HospitalDepartment = {
  id: string
  name: string
  head: string // head doctor
  doctors: number
  floor: string
  phone: string
  opdTimings: string
  services: string[]
  status: DepartmentStatus
}

// Everything is text in the form; services are one per line
export type DepartmentFormValues = {
  name: string
  head: string
  doctors: string
  floor: string
  phone: string
  opdTimings: string
  services: string
}

export type DepartmentFieldName = keyof DepartmentFormValues

export type DepartmentFormErrors = Partial<Record<DepartmentFieldName, string>>

export type DepartmentField = {
  name: DepartmentFieldName
  label: string
  required?: boolean
  type?: "text" | "number" | "tel" | "textarea"
  options?: string[] // shows a select
  placeholder?: string
  fullWidth?: boolean
}