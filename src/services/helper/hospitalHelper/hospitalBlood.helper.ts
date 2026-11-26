import { HOSPITAL_TODAY } from "../../../constants/hospitalConstants/hospitalDashboard.constants"
import { LOW_STOCK_LIMIT, activeRequestStatuses } from "../../../constants/hospitalConstants/hospitalBlood.constants"
import type {
  BloodComponent,
  BloodGroup,
  BloodRequestFilter,
  BloodRequestFormErrors,
  BloodRequestFormValues,
  BloodRequestStatus,
  HospitalBloodRequest,
  RequestUrgency,
  StockLevel,
} from "../../../types/type/hospitalType/HospitalBlood.type"

export const getStockLevel = (units: number): StockLevel => {
  if (units === 0) return "out"
  if (units <= LOW_STOCK_LIMIT) return "low"
  return "ok"
}

export const isActiveRequest = (status: BloodRequestStatus) => activeRequestStatuses.includes(status)

// Can be cancelled until the blood bank sends it
export const canCancelRequest = (status: BloodRequestStatus) => status === "pending" || status === "accepted"

export const validateBloodRequest = (form: BloodRequestFormValues): BloodRequestFormErrors => {
  const errors: BloodRequestFormErrors = {}
  const units = Number(form.units)

  if (!form.patient.trim()) errors.patient = "Patient name is required"
  if (!form.group) errors.group = "Pick a blood group"
  if (!form.component) errors.component = "Pick a component"
  if (!form.units || units < 1 || units > 10) errors.units = "Enter 1 to 10 units"
  if (!form.bloodBank) errors.bloodBank = "Pick a blood bank"

  // "yyyy-mm-dd" strings can be compared directly
  if (!form.requiredBy) errors.requiredBy = "Pick the date it is needed by"
  else if (form.requiredBy < HOSPITAL_TODAY) errors.requiredBy = "Date can't be in the past"

  return errors
}

export const fromBloodRequestForm = (form: BloodRequestFormValues): HospitalBloodRequest => ({
  id: `br${Date.now()}`,
  patient: form.patient.trim(),
  group: form.group as BloodGroup,
  component: form.component as BloodComponent,
  units: Number(form.units),
  urgency: form.urgency as RequestUrgency,
  bloodBank: form.bloodBank,
  requiredBy: form.requiredBy,
  requestedOn: HOSPITAL_TODAY,
  note: form.note.trim(),
  status: "pending",
})

// Active / closed tab + search (patient or blood bank) + blood group
export const filterBloodRequests = (requests: HospitalBloodRequest[], filter: BloodRequestFilter, search: string, group: string) => {
  const text = search.trim().toLowerCase()

  return requests.filter((request) => {
    const matchesFilter =
      filter === "all" || (filter === "active" ? isActiveRequest(request.status) : !isActiveRequest(request.status))
    const matchesSearch =
      !text || request.patient.toLowerCase().includes(text) || request.bloodBank.toLowerCase().includes(text)
    const matchesGroup = group === "all" || request.group === group

    return matchesFilter && matchesSearch && matchesGroup
  })
}