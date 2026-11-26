import type { DashboardChamber } from "../../type/doctorType/DoctorDashboard.type"
import type { ChamberCounts, DoctorChamberDetail } from "../../type/doctorType/DoctorChambers.type"
import type { ChamberSchedule } from "../../type/doctorType/DoctorSchedule.type"
import type { Hospital } from "../../type/public/Hospital.type"

export interface AvailabilitySwitchProps {
  checked: boolean
  label: string
  onChange: () => void
}

export interface ChamberCardProps {
  chamber: DashboardChamber
  detail: DoctorChamberDetail
  hospital?: Hospital
  schedule?: ChamberSchedule
  counts: ChamberCounts
  onToggle: () => void
}