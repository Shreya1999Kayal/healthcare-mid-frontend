import { getTimeNow } from "./hospitalAmbulance.helper"
import { activeEmergencyStatuses, emergencyActions, priorityRank } from "../../../constants/hospitalConstants/hospitalEmergency.constants"
import type {
  ArrivalMode,
  EmergencyCase,
  EmergencyCaseFormValues,
  EmergencyCaseType,
  EmergencyFilter,
  EmergencyFormErrors,
  EmergencyPriority,
  EmergencyStatus,
} from "../../../types/type/hospitalType/HospitalEmergency.type"

export const isActiveEmergency = (status: EmergencyStatus) => activeEmergencyStatuses.includes(status)

export const getEmergencyActions = (status: EmergencyStatus) => emergencyActions[status]

// Critical first; same priority keeps the list order
export const sortEmergencyCases = (cases: EmergencyCase[]) =>
  [...cases].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])

export const validateEmergencyCase = (form: EmergencyCaseFormValues): EmergencyFormErrors => {
  const errors: EmergencyFormErrors = {}
  const age = Number(form.age)

  // Name and age can be empty for an unknown patient
  if (form.age && (age < 0 || age > 120)) errors.age = "Enter an age between 0 and 120"
  if (!form.caseType) errors.caseType = "Pick the case type"
  if (!form.priority) errors.priority = "Pick the priority"
  if (!form.complaint.trim()) errors.complaint = "Write what happened"
  if (!form.arrivalMode) errors.arrivalMode = "Pick how the patient is coming"
  if (form.arrivalMode === "ambulance" && !form.ambulanceNo.trim()) errors.ambulanceNo = "Ambulance number is required"

  return errors
}

// Ambulance cases are still on the way; others are already here
export const fromEmergencyForm = (form: EmergencyCaseFormValues): EmergencyCase => ({
  id: `em${Date.now()}`,
  patient: form.patient.trim() || "Unknown",
  age: form.age ? Number(form.age) : undefined,
  gender: form.gender,
  caseType: form.caseType as EmergencyCaseType,
  priority: form.priority as EmergencyPriority,
  complaint: form.complaint.trim(),
  arrivalMode: form.arrivalMode as ArrivalMode,
  ambulanceNo: form.arrivalMode === "ambulance" ? form.ambulanceNo.trim().toUpperCase() : "",
  reportedAt: getTimeNow(),
  assignedDoctor: "",
  status: form.arrivalMode === "ambulance" ? "incoming" : "arrived",
})

// Active / closed tab + search (patient or complaint)
export const filterEmergencyCases = (cases: EmergencyCase[], filter: EmergencyFilter, search: string) => {
  const text = search.trim().toLowerCase()

  return cases.filter((item) => {
    const matchesFilter =
      filter === "all" || (filter === "active" ? isActiveEmergency(item.status) : !isActiveEmergency(item.status))
    const matchesSearch = !text || item.patient.toLowerCase().includes(text) || item.complaint.toLowerCase().includes(text)

    return matchesFilter && matchesSearch
  })
}