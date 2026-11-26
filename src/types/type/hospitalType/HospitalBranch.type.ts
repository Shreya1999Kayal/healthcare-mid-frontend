export type BranchStatus = "active" | "inactive"

export type BranchFilter = "all" | BranchStatus

export type HospitalBranch = {
  id: string
  name: string
  city: string
  address: string
  pincode: string
  phone: string
  manager: string
  beds: number
  emergency24x7: boolean
  isMain: boolean // main branch can't be deleted or turned off
  status: BranchStatus
}

// Everything is text in the form, except the checkbox
export type BranchFormValues = {
  name: string
  city: string
  address: string
  pincode: string
  phone: string
  manager: string
  beds: string
  emergency24x7: boolean
}

// Text fields only (the checkbox is handled on its own)
export type BranchFieldName = Exclude<keyof BranchFormValues, "emergency24x7">

export type BranchFormErrors = Partial<Record<BranchFieldName, string>>

export type BranchField = {
  name: BranchFieldName
  label: string
  type?: "text" | "tel" | "number"
  placeholder?: string
  fullWidth?: boolean
}