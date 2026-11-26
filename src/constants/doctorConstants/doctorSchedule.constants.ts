import { ALL_CHAMBERS } from "./doctorDashboard.constants"
import type { ChamberSchedule, DoctorLeave, LeaveFormValues, SpecialFormValues, SpecialSchedule, WeekDay } from "../../types/type/doctorType/DoctorSchedule.type"

export const weekDays: WeekDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const slotLengths = [10, 15, 20, 30]

export const initialLeaveForm: LeaveFormValues = { chamberId: ALL_CHAMBERS, from: "", to: "", reason: "" }

export const initialSpecialForm: SpecialFormValues = { date: "", start: "", end: "", note: "" }

// Placeholder data, hours match the times in doctorAppointments
export const doctorSchedules: ChamberSchedule[] = [
  { chamberId: "ch1", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start: "09:00", end: "13:00", slotMinutes: 30 },
  { chamberId: "ch2", days: ["Mon", "Wed", "Thu", "Fri"], start: "17:00", end: "20:00", slotMinutes: 30 },
  { chamberId: "ch3", days: ["Tue", "Thu", "Sat"], start: "19:00", end: "21:00", slotMinutes: 30 },
]

export const doctorLeaves: DoctorLeave[] = [
  { id: "l1", chamberId: "ch2", from: "2026-11-27", to: "2026-11-27", reason: "Medical conference" },
  { id: "l2", chamberId: ALL_CHAMBERS, from: "2026-12-24", to: "2026-12-27", reason: "Family holiday" },
]

export const specialSchedules: SpecialSchedule[] = [
  { id: "s1", chamberId: "ch1", date: "2026-11-21", start: "10:00", end: "12:00", note: "Late start after night duty" },
  { id: "s2", chamberId: "ch3", date: "2026-11-28", start: "17:00", end: "20:00", note: "Extra hours for vaccination camp" },
]