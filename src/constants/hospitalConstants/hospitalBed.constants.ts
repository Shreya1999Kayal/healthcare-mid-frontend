import type { HospitalStatusStyle } from "../../types/type/hospitalType/HospitalDashboard.type"
import type {
  BedCategory,
  HospitalWard,
  WardAvailability,
  WardField,
  WardFilter,
  WardFormValues,
} from "../../types/type/hospitalType/HospitalBed.type"

// A ward with this many free beds or fewer shows "Almost full"
export const LOW_BED_LIMIT = 2

export const bedCategoryLabels: Record<BedCategory, string> = {
  general: "General ward",
  "semi-private": "Semi-private",
  private: "Private room",
  icu: "ICU",
  nicu: "NICU",
  emergency: "Emergency",
}

export const bedCategoryOptions = (Object.keys(bedCategoryLabels) as BedCategory[]).map((value) => ({
  value,
  label: bedCategoryLabels[value],
}))

export const wardFilters: { value: WardFilter; label: string }[] = [{ value: "all", label: "All" }, ...bedCategoryOptions]

export const wardAvailabilityStyles: Record<WardAvailability, HospitalStatusStyle> = {
  available: { label: "Beds free", className: "bg-emerald-50 text-emerald-700" },
  low: { label: "Almost full", className: "bg-amber-50 text-amber-700" },
  full: { label: "Full", className: "bg-red-50 text-red-600" },
}

export const wardFields: WardField[] = [
  { name: "name", label: "Ward name", required: true, placeholder: "e.g. Ward A" },
  { name: "category", label: "Bed type", required: true, options: bedCategoryOptions },
  { name: "floor", label: "Floor / block", required: true, placeholder: "e.g. 2nd floor, Block A" },
  { name: "total", label: "Total beds", required: true, type: "number" },
  { name: "occupied", label: "Occupied beds", required: true, type: "number" },
  { name: "pricePerDay", label: "Price per day (₹)", required: true, type: "number" },
  { name: "ventilators", label: "Ventilators", type: "number", placeholder: "0 if none" },
]

export const emptyWardForm: WardFormValues = {
  name: "", category: "", floor: "", total: "", occupied: "0", pricePerDay: "", ventilators: "0",
}

// Placeholder data, replace with real data from the API later
export const hospitalWards: HospitalWard[] = [
  { id: "w1", name: "Ward A", category: "general", floor: "1st floor, Block A", total: 60, occupied: 42, pricePerDay: 1500, ventilators: 0 },
  { id: "w2", name: "Ward B", category: "general", floor: "1st floor, Block B", total: 60, occupied: 44, pricePerDay: 1500, ventilators: 0 },
  { id: "w3", name: "Semi-private wing", category: "semi-private", floor: "2nd floor", total: 20, occupied: 14, pricePerDay: 3000, ventilators: 0 },
  { id: "w4", name: "Private suites", category: "private", floor: "4th floor", total: 30, occupied: 21, pricePerDay: 6000, ventilators: 0 },
  { id: "w5", name: "Medical ICU", category: "icu", floor: "3rd floor, Block A", total: 12, occupied: 11, pricePerDay: 12000, ventilators: 8 },
  { id: "w6", name: "Cardiac ICU", category: "icu", floor: "3rd floor, Block B", total: 8, occupied: 8, pricePerDay: 15000, ventilators: 6 },
  { id: "w7", name: "NICU", category: "nicu", floor: "1st floor, Block B", total: 10, occupied: 6, pricePerDay: 10000, ventilators: 4 },
  { id: "w8", name: "Emergency bay", category: "emergency", floor: "Ground floor", total: 15, occupied: 9, pricePerDay: 2000, ventilators: 2 },
]