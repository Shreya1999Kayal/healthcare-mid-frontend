export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"

export type BloodComponent = "whole-blood" | "prbc" | "platelets" | "plasma"

export type RequestUrgency = "normal" | "urgent" | "emergency"

export type BloodRequestStatus = "pending" | "accepted" | "dispatched" | "delivered" | "rejected" | "cancelled"

// active = still waiting for blood, closed = finished one way or another
export type BloodRequestFilter = "active" | "closed" | "all"

export type StockLevel = "ok" | "low" | "out"

export type BloodStockItem = {
  group: BloodGroup
  units: number
}

export type HospitalBloodRequest = {
  id: string
  patient: string
  group: BloodGroup
  component: BloodComponent
  units: number
  urgency: RequestUrgency
  bloodBank: string
  requiredBy: string // yyyy-mm-dd
  requestedOn: string // yyyy-mm-dd
  note: string
  status: BloodRequestStatus
}

// Everything is text in the form
export type BloodRequestFormValues = {
  patient: string
  group: string
  component: string
  units: string
  urgency: string
  bloodBank: string
  requiredBy: string
  note: string
}

export type BloodRequestFieldName = keyof BloodRequestFormValues

export type BloodRequestFormErrors = Partial<Record<BloodRequestFieldName, string>>