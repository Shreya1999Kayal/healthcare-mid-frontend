import type { ConsultationMode } from "./DoctorDashboard.type"

export type QueueStatus = "waiting" | "checked-in" | "in-consultation" | "done"

export type QueueItem = {
  id: string
  token: number // per chamber, in booking order
  patient: string
  age: number
  gender: "M" | "F"
  reason: string
  time: string
  mode: ConsultationMode
  chamberId: string
  status: QueueStatus
}