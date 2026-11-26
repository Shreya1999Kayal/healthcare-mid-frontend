import type { DashboardChamber, DoctorAppointment } from "../../type/doctorType/DoctorDashboard.type"
import type { ChamberSchedule, DoctorLeave, LeaveFormValues, SpecialFormValues, SpecialSchedule } from "../../type/doctorType/DoctorSchedule.type"

export interface WeeklyScheduleFormProps {
  schedule: ChamberSchedule
  onSave: (schedule: ChamberSchedule) => void
}

export interface SlotPreviewProps {
  schedule: ChamberSchedule
  leaves: DoctorLeave[]
  specials: SpecialSchedule[]
  appointments: DoctorAppointment[]
}

export interface LeaveManagerProps {
  leaves: DoctorLeave[]
  chambers: DashboardChamber[]
  defaultChamberId: string
  onAdd: (leave: LeaveFormValues) => void
  onRemove: (leaveId: string) => void
}

export interface SpecialScheduleManagerProps {
  specials: SpecialSchedule[]
  onAdd: (special: SpecialFormValues) => void
  onRemove: (specialId: string) => void
}