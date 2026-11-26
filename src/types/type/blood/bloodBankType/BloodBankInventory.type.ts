import type { BloodGroup } from "../../public/Blood.type"

export type StockLevel = "ok" | "low" | "out"

// One row of the inventory table
export type InventoryRow = {
  group: BloodGroup
  total: number // units in the bank
  reserved: number // accepted requests not delivered yet
  available: number // total - reserved
  level: StockLevel
}

export type InventoryTotals = {
  total: number
  reserved: number
  available: number
}