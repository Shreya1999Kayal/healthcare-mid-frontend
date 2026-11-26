import type { AppointmentStatus, StatusStyle } from "../../types/type/doctorType/DoctorDashboard.type"
import type { QueueStatus } from "../../types/type/doctorType/DoctorQueue.type"

// Average minutes per patient, used for the wait estimate
export const AVG_CONSULT_MINUTES = 15

export const queueStatusStyles: Record<QueueStatus, StatusStyle> = {
  waiting: { label: "Waiting", className: "bg-amber-50 text-amber-700" },
  "checked-in": { label: "Checked in", className: "bg-sky-50 text-sky-700" },
  "in-consultation": { label: "In consultation", className: "bg-violet-50 text-violet-700" },
  done: { label: "Done", className: "bg-emerald-50 text-emerald-700" },
}

// Which of today's appointments join the queue, and with what status
// (pending, cancelled, rejected and no-show stay out)
export const appointmentToQueueStatus: Partial<Record<AppointmentStatus, QueueStatus>> = {
  confirmed: "waiting",
  rescheduled: "waiting",
  "checked-in": "checked-in",
  "in-consultation": "in-consultation",
  completed: "done",
}