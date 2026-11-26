import type { InventoryRow } from "../../../type/blood/bloodBankType/BloodBankInventory.type"
import type { BloodBankRequest } from "../../../type/blood/bloodBankType/BloodBankRequest.type"

export interface BloodRequestsTableProps {
  requests: BloodBankRequest[]
  rows: InventoryRow[]
  onAccept: (request: BloodBankRequest) => void
  onReject: (request: BloodBankRequest) => void
  onDeliver: (request: BloodBankRequest) => void
}

export interface RejectRequestModalProps {
  request: BloodBankRequest
  onConfirm: (reason: string) => void
  onClose: () => void
}

export interface LatestRequestsProps {
  requests: BloodBankRequest[]
  bankId: string
}