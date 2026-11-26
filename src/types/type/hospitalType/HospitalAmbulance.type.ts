import type { AmbulanceStatus } from "./HospitalDashboard.type"

export type AmbulanceFilter = "all" | AmbulanceStatus

export type AmbulanceType = "bls" | "als" | "patient-transport" | "neonatal"

// Filled only while the ambulance is on duty
export type AmbulanceTrip = {
  patient: string
  pickup: string
  startedAt: string // e.g. "10:45 pm"
}

export type AmbulanceVehicle = {
  id: string
  vehicleNo: string
  type: AmbulanceType
  driver: string
  driverPhone: string
  equipment: string[]
  lastServiced: string // yyyy-mm-dd
  status: AmbulanceStatus
  trip?: AmbulanceTrip
}

export type AmbulanceFormValues = {
  vehicleNo: string
  type: string
  driver: string
  driverPhone: string
  lastServiced: string // yyyy-mm-dd from the date input
  equipment: string[] // from the checkboxes
}

// Text fields only (equipment is handled with checkboxes)
export type AmbulanceFieldName = Exclude<keyof AmbulanceFormValues, "equipment">

export type AmbulanceFormErrors = Partial<Record<AmbulanceFieldName, string>>

export type AmbulanceField = {
  name: AmbulanceFieldName
  label: string
  type?: "text" | "tel" | "date"
  options?: { value: string; label: string }[] // shows a select
  placeholder?: string
}

export type TripFormErrors = Partial<Record<"patient" | "pickup", string>>