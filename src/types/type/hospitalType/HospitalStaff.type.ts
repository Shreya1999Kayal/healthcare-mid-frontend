export type StaffRole = "admin" | "receptionist" | "nurse" | "bed-manager" | "ambulance-coordinator" | "blood-officer"

export type StaffStatus = "active" | "invited" | "suspended"

export type HospitalStaff = {
  id: string
  name: string
  email: string
  phone: string
  role: StaffRole
  permissions: string[] // sidebar sections this person can open, e.g. "beds"
  status: StaffStatus
  lastActive: string
  isOwner: boolean // main account: can't be edited or removed
}

export type StaffFormValues = {
  name: string
  email: string
  phone: string
  role: string
  permissions: string[] // from the checkboxes
}

// Text fields only (permissions are checkboxes)
export type StaffFieldName = Exclude<keyof StaffFormValues, "permissions">

export type StaffFormErrors = Partial<Record<StaffFieldName | "permissions", string>>

export type StaffPermissionOption = {
  value: string // section, e.g. "beds"
  label: string // e.g. "Beds and ICU"
}