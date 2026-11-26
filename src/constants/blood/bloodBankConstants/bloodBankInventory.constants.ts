import type { BloodStock } from "../../../types/type/public/Blood.type"
import type { BloodBankStatusStyle } from "../../../types/type/blood/bloodBankType/BloodBankDashboard.type"
import type { StockLevel } from "../../../types/type/blood/bloodBankType/BloodBankInventory.type"

// Default "Low stock" limit; the blood bank can change it in Settings
export const DEFAULT_LOW_STOCK_LIMIT = 5

export const stockLevelStyles: Record<StockLevel, BloodBankStatusStyle> = {
  ok: { label: "In stock", className: "bg-emerald-50 text-emerald-700" },
  low: { label: "Low stock", className: "bg-amber-50 text-amber-700" },
  out: { label: "Out of stock", className: "bg-red-50 text-red-600" },
}

// Placeholder data: total units in the bank (reserved units included). Replace with the API later.
export const bloodBankStock: BloodStock = {
  "A+": 42, "A-": 2, "B+": 35, "B-": 0, "O+": 58, "O-": 3, "AB+": 16, "AB-": 4,
}