export type EmergencyPriority = "critical" | "serious" | "stable"

export type EmergencyCaseType = "accident" | "cardiac" | "stroke" | "burns" | "breathing" | "other"

export type ArrivalMode = "ambulance" | "walk-in" | "referral"

export type EmergencyStatus = "incoming" | "arrived" | "in-treatment" | "admitted" | "discharged" | "transferred"

// active = still in the ER, closed = left the ER
export type EmergencyFilter = "active" | "closed" | "all"

export type EmergencyCase = {
  id: string
  patient: string // "Unknown" when the name is not known
  age?: number
  gender: string
  caseType: EmergencyCaseType
  priority: EmergencyPriority
  complaint: string
  arrivalMode: ArrivalMode
  ambulanceNo: string // only for ambulance cases
  reportedAt: string // e.g. "10:45 pm"
  assignedDoctor: string // empty until a doctor is assigned
  status: EmergencyStatus
}

// One button on the case card
export type EmergencyAction = {
  label: string
  next: EmergencyStatus
}

// Everything is text in the form
export type EmergencyCaseFormValues = {
  patient: string
  age: string
  gender: string
  caseType: string
  priority: string
  complaint: string
  arrivalMode: string
  ambulanceNo: string
}

export type EmergencyFieldName = keyof EmergencyCaseFormValues

export type EmergencyFormErrors = Partial<Record<EmergencyFieldName, string>>