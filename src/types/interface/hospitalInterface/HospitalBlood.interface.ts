import type { BloodGroup, BloodRequestFormValues, BloodStockItem, HospitalBloodRequest } from "../../type/hospitalType/HospitalBlood.type"

export interface BloodStockGridProps {
  stock: BloodStockItem[]
  onChangeUnits: (group: BloodGroup, change: number) => void // +1 or -1
}

export interface BloodRequestFormProps {
  onSave: (values: BloodRequestFormValues) => void
  onCancel: () => void
}

export interface BloodRequestsTableProps {
  requests: HospitalBloodRequest[]
  onCancelRequest: (request: HospitalBloodRequest) => void
  onMarkReceived: (request: HospitalBloodRequest) => void
}