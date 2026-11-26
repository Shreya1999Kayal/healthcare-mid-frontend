import type { BloodBankStatusStyle } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"
import type {
  BloodBankRequest,
  BloodBankRequestFilter,
  BloodBankRequestStatus,
  RequestUrgency,
} from "../../../types/type/blood/bloodBankType/BloodBankRequest.type"

export const requestStatusStyles: Record<BloodBankRequestStatus, BloodBankStatusStyle> = {
  requested: { label: "Requested", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accepted", className: "bg-sky-50 text-sky-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
  delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700" },
}

export const urgencyStyles: Record<RequestUrgency, BloodBankStatusStyle> = {
  normal: { label: "Normal", className: "bg-slate-100 text-slate-600" },
  urgent: { label: "Urgent", className: "bg-amber-50 text-amber-700" },
  emergency: { label: "Emergency", className: "bg-red-50 text-red-600" },
}

export const requestFilters: { value: BloodBankRequestFilter; label: string }[] = [
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "delivered", label: "Delivered" },
  { value: "all", label: "All" },
]

// Placeholder data. hospitalId must match an id in hospitalsList.
export const bloodBankRequests: BloodBankRequest[] = [
  {
    id: "r1", hospitalId: "2", patient: "Arjun Paul", group: "O-", units: 2, urgency: "emergency",
    requiredBy: "2026-11-23", requestedOn: "2026-11-23", note: "Road accident, surgery at 2 PM", status: "requested", rejectReason: "",
  },
  {
    id: "r2", hospitalId: "1", patient: "Priya Das", group: "AB+", units: 1, urgency: "urgent",
    requiredBy: "2026-11-24", requestedOn: "2026-11-23", note: "", status: "requested", rejectReason: "",
  },
  {
    id: "r3", hospitalId: "5", patient: "Rohit Das", group: "A+", units: 3, urgency: "normal",
    requiredBy: "2026-11-26", requestedOn: "2026-11-22", note: "Bypass surgery", status: "requested", rejectReason: "",
  },
  {
    id: "r4", hospitalId: "6", patient: "Meera Bose", group: "B+", units: 2, urgency: "urgent",
    requiredBy: "2026-11-23", requestedOn: "2026-11-22", note: "", status: "accepted", rejectReason: "",
  },
  {
    id: "r5", hospitalId: "1", patient: "Imran Khan", group: "O+", units: 4, urgency: "normal",
    requiredBy: "2026-11-25", requestedOn: "2026-11-21", note: "Planned surgery", status: "accepted", rejectReason: "",
  },
  {
    id: "r6", hospitalId: "3", patient: "Baby of Rina Sen", group: "O-", units: 1, urgency: "emergency",
    requiredBy: "2026-11-21", requestedOn: "2026-11-21", note: "", status: "delivered", rejectReason: "",
  },
  {
    id: "r7", hospitalId: "4", patient: "Sanjay Roy", group: "A-", units: 2, urgency: "normal",
    requiredBy: "2026-11-20", requestedOn: "2026-11-19", note: "", status: "rejected",
    rejectReason: "A- stock is too low to supply 2 units right now.",
  },
]