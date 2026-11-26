import type { BloodGroup } from "../../../type/public/Blood.type"
import type { InventoryRow } from "../../../type/blood/bloodBankType/BloodBankInventory.type"

export interface BloodInventoryTableProps {
  rows: InventoryRow[]
  onUpdateStock: (group: BloodGroup, units: number) => void
}

export interface StockOverviewProps {
  rows: InventoryRow[]
  bankId: string
}