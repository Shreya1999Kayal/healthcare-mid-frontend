import type { BloodGroup } from "../../../../types/type/public/Blood.type"
import type { InventoryRow } from "../../../../types/type/blood/bloodBankType/BloodBankInventory.type"
import type { BloodBankRequest, BloodBankRequestFilter } from "../../../../types/type/blood/bloodBankType/BloodBankRequest.type"

export const filterBloodBankRequests = (requests: BloodBankRequest[], filter: BloodBankRequestFilter) =>
  filter === "all" ? requests : requests.filter((request) => request.status === filter)

export const countBloodBankRequests = (requests: BloodBankRequest[], filter: BloodBankRequestFilter) =>
  filterBloodBankRequests(requests, filter).length

export const getAvailableUnits = (rows: InventoryRow[], group: BloodGroup) => rows.find((row) => row.group === group)?.available ?? 0

// A request can be accepted only if enough units are available
export const canAcceptRequest = (request: BloodBankRequest, rows: InventoryRow[]) =>
  getAvailableUnits(rows, request.group) >= request.units

// 1 -> "1 unit", 3 -> "3 units"
export const unitsLabel = (units: number) => `${units} ${units === 1 ? "unit" : "units"}`