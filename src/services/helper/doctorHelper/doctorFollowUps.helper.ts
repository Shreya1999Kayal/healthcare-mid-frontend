import { DOCTOR_TODAY } from "../../../constants/doctorConstants/doctorDashboard.constants"
import type { DoctorFollowUp, FollowUpFilter } from "../../../types/type/doctorType/DoctorFollowUps.type"

const DAY_MS = 24 * 60 * 60 * 1000

// Days from today to the due date (negative = overdue)
export const getDaysLeft = (dueDate: string) =>
  Math.round((new Date(`${dueDate}T00:00:00`).getTime() - new Date(`${DOCTOR_TODAY}T00:00:00`).getTime()) / DAY_MS)

export const matchesFollowUpFilter = (followUp: DoctorFollowUp, filter: FollowUpFilter) => {
  if (filter === "done") return followUp.status === "done"
  if (followUp.status === "done") return false

  const days = getDaysLeft(followUp.dueDate)
  if (filter === "today") return days === 0
  if (filter === "week") return days >= 0 && days <= 6
  if (filter === "overdue") return days < 0
  return true // "all": every open follow-up
}

export const getDueLabel = (dueDate: string) => {
  const days = getDaysLeft(dueDate)
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  if (days > 1) return `In ${days} days`
  const late = Math.abs(days)
  return `${late} ${late === 1 ? "day" : "days"} overdue`
}

export const sortByDueDate = (followUps: DoctorFollowUp[]) =>
  [...followUps].sort((a, b) => a.dueDate.localeCompare(b.dueDate))