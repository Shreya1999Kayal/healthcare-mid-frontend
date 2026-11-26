export type FollowUpStatus = "due" | "reminded" | "done"
export type FollowUpFilter = "today" | "week" | "overdue" | "all" | "done"

export type DoctorFollowUp = {
  id: string
  patientId: string
  patient: string
  chamberId: string
  dueDate: string // yyyy-mm-dd
  reason: string
  lastVisit: string
  status: FollowUpStatus
}