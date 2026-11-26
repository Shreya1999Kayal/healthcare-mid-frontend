import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  BloodComponent,
  BloodGroup,
  BloodRequestFilter,
  BloodRequestFormValues,
  BloodRequestStatus,
  BloodStockItem,
  HospitalBloodRequest,
  RequestUrgency,
  StockLevel,
} from "../../types/type/hospitalType/HospitalBlood.type"

// A group with this many units or fewer shows "Low"
export const LOW_STOCK_LIMIT = 3

export const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export const bloodComponentLabels: Record<BloodComponent, string> = {
  "whole-blood": "Whole blood",
  prbc: "Packed red cells (PRBC)",
  platelets: "Platelets",
  plasma: "Plasma",
}

export const urgencyStyles: Record<RequestUrgency, HospitalStatusStyle> = {
  normal: { label: "Normal", className: "bg-slate-100 text-slate-600" },
  urgent: { label: "Urgent", className: "bg-amber-50 text-amber-700" },
  emergency: { label: "Emergency", className: "bg-red-50 text-red-600" },
}

export const bloodRequestStatusStyles: Record<BloodRequestStatus, HospitalStatusStyle> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accepted", className: "bg-sky-50 text-sky-700" },
  dispatched: { label: "Dispatched", className: "bg-indigo-50 text-indigo-700" },
  delivered: { label: "Received", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-600" },
}

export const stockLevelStyles: Record<StockLevel, HospitalStatusStyle> = {
  ok: { label: "In stock", className: "border-hospital-border bg-white" },
  low: { label: "Low", className: "border-amber-300 bg-amber-50" },
  out: { label: "Out of stock", className: "border-red-300 bg-red-50" },
}

export const bloodRequestFilters: { value: BloodRequestFilter; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
  { value: "all", label: "All" },
]

// Statuses that still need something to happen
export const activeRequestStatuses: BloodRequestStatus[] = ["pending", "accepted", "dispatched"]

export const partnerBloodBanks = [
  "Lifeline Blood Bank, Park Street",
  "Central Blood Bank, Maniktala",
  "Red Cross Blood Bank, Salt Lake",
  "Seva Community Blood Bank, Howrah",
]

export const emptyBloodRequestForm: BloodRequestFormValues = {
  patient: "", group: "", component: "", units: "1", urgency: "normal", bloodBank: "", requiredBy: "", note: "",
}

// Placeholder data, replace with real data from the API later
export const hospitalBloodStock: BloodStockItem[] = [
  { group: "A+", units: 12 },
  { group: "A-", units: 2 },
  { group: "B+", units: 15 },
  { group: "B-", units: 3 },
  { group: "AB+", units: 6 },
  { group: "AB-", units: 0 },
  { group: "O+", units: 18 },
  { group: "O-", units: 1 },
]

export const hospitalBloodRequests: HospitalBloodRequest[] = [
  {
    id: "br1", patient: "Arjun Paul", group: "O-", component: "prbc", units: 2, urgency: "emergency",
    bloodBank: "Lifeline Blood Bank, Park Street", requiredBy: "2026-11-21", requestedOn: "2026-11-21",
    note: "Road accident, surgery at 2 PM", status: "dispatched",
  },
  {
    id: "br2", patient: "Priya Das", group: "AB-", component: "whole-blood", units: 1, urgency: "urgent",
    bloodBank: "Central Blood Bank, Maniktala", requiredBy: "2026-11-22", requestedOn: "2026-11-21",
    note: "", status: "pending",
  },
  {
    id: "br3", patient: "Meera Bose", group: "B+", component: "platelets", units: 4, urgency: "normal",
    bloodBank: "Red Cross Blood Bank, Salt Lake", requiredBy: "2026-11-24", requestedOn: "2026-11-20",
    note: "Dengue, platelet count low", status: "accepted",
  },
  {
    id: "br4", patient: "Imran Khan", group: "A+", component: "plasma", units: 2, urgency: "normal",
    bloodBank: "Lifeline Blood Bank, Park Street", requiredBy: "2026-11-19", requestedOn: "2026-11-18",
    note: "", status: "delivered",
  },
  {
    id: "br5", patient: "Rohit Das", group: "O+", component: "whole-blood", units: 3, urgency: "urgent",
    bloodBank: "Seva Community Blood Bank, Howrah", requiredBy: "2026-11-20", requestedOn: "2026-11-19",
    note: "", status: "rejected",
  },
]