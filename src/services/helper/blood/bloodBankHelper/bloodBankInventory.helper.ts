import { bloodGroups } from "../../../../constants/public/bloods.constants"
import type { BloodGroup, BloodStock } from "../../../../types/type/public/Blood.type"
import type { InventoryRow, InventoryTotals, StockLevel } from "../../../../types/type/blood/bloodBankType/BloodBankInventory.type"
import type { BloodBankRequest } from "../../../../types/type/blood/bloodBankType/BloodBankRequest.type"

export const getStockLevel = (available: number, limit: number): StockLevel => {
  if (available === 0) return "out"
  if (available <= limit) return "low"
  return "ok"
}

// Accepted but not delivered = reserved for that hospital
export const getReservedUnits = (requests: BloodBankRequest[], group: BloodGroup) =>
  requests
    .filter((request) => request.status === "accepted" && request.group === group)
    .reduce((sum, request) => sum + request.units, 0)

export const buildInventoryRows = (stock: BloodStock, requests: BloodBankRequest[], limit: number): InventoryRow[] =>
  bloodGroups.map((group) => {
    const reserved = getReservedUnits(requests, group)
    const available = Math.max(stock[group] - reserved, 0)
    return { group, total: stock[group], reserved, available, level: getStockLevel(available, limit) }
  })

export const getInventoryTotals = (rows: InventoryRow[]): InventoryTotals =>
  rows.reduce(
    (totals, row) => ({
      total: totals.total + row.total,
      reserved: totals.reserved + row.reserved,
      available: totals.available + row.available,
    }),
    { total: 0, reserved: 0, available: 0 },
  )

// Total units can't go below the units already reserved
export const validateStockUnits = (value: string, reserved: number) => {
  if (!/^\d+$/.test(value)) return "Enter a whole number"
  if (Number(value) < reserved) return `Can't be less than ${reserved} reserved units`
  return ""
}