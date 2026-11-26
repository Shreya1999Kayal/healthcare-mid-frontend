import { formatIsoDate } from "./doctorDashboard.helper"
import { ALL_CHAMBERS } from "../../../constants/doctorConstants/doctorDashboard.constants"
import type { AppointmentStatus, DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { ChamberSchedule, DoctorLeave, SlotPreviewResult, SpecialSchedule, WeekDay } from "../../../types/type/doctorType/DoctorSchedule.type"

const dayNames: WeekDay[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const freeStatuses: AppointmentStatus[] = ["cancelled", "rejected"] // these do not hold a slot

// "09:30" -> 570
export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

// 570 -> "9:30 AM" (same format as appointment times)
export const formatMinutes = (total: number) => {
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  const hour = hours % 12 || 12
  return `${hour}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`
}

export const formatTimeRange = (start: string, end: string) =>
  `${formatMinutes(toMinutes(start))} - ${formatMinutes(toMinutes(end))}`

export const formatDateRange = (from: string, to: string) =>
  from === to ? formatIsoDate(from) : `${formatIsoDate(from)} to ${formatIsoDate(to)}`

export const getWeekDay = (iso: string) => dayNames[new Date(`${iso}T00:00:00`).getDay()]

// Start time of every slot that fully fits before the end time
export const buildSlots = (start: string, end: string, slotMinutes: number) => {
  const slots: string[] = []
  for (let time = toMinutes(start); time + slotMinutes <= toMinutes(end); time += slotMinutes) {
    slots.push(formatMinutes(time))
  }
  return slots
}

export const findLeave = (leaves: DoctorLeave[], chamberId: string, date: string) =>
  leaves.find(
    (leave) => (leave.chamberId === ALL_CHAMBERS || leave.chamberId === chamberId) && date >= leave.from && date <= leave.to,
  )

// Leave first, then a special schedule, then the normal weekly days
export const getSlotPreview = (
  schedule: ChamberSchedule,
  leaves: DoctorLeave[],
  specials: SpecialSchedule[],
  appointments: DoctorAppointment[],
  date: string,
): SlotPreviewResult => {
  const leave = findLeave(leaves, schedule.chamberId, date)
  if (leave) return { status: "leave", label: `On leave: ${leave.reason}`, hours: "", slots: [] }

  const special = specials.find((item) => item.chamberId === schedule.chamberId && item.date === date)
  const hours = special ?? (schedule.days.includes(getWeekDay(date)) ? schedule : undefined)
  if (!hours) return { status: "closed", label: "No chamber on this day", hours: "", slots: [] }

  const booked = new Set(
    appointments
      .filter(
        (appointment) =>
          appointment.chamberId === schedule.chamberId &&
          appointment.date === formatIsoDate(date) &&
          !freeStatuses.includes(appointment.status),
      )
      .map((appointment) => appointment.time),
  )

  return {
    status: "open",
    label: special ? `Special hours: ${special.note}` : "Regular hours",
    hours: formatTimeRange(hours.start, hours.end),
    slots: buildSlots(hours.start, hours.end, schedule.slotMinutes).map((time) => ({ time, booked: booked.has(time) })),
  }
}