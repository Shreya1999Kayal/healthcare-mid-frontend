import type { StatusStyle } from "../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorTabOption } from "../../types/type/doctorType/DoctorAppointments.type"
import type { DoctorFollowUp, FollowUpFilter, FollowUpStatus } from "../../types/type/doctorType/DoctorFollowUps.type"

export const followUpTabs: DoctorTabOption<FollowUpFilter>[] = [
  { id: "today", label: "Due today" },
  { id: "week", label: "This week" },
  { id: "overdue", label: "Overdue" },
  { id: "all", label: "All open" },
  { id: "done", label: "Done" },
]

export const followUpStatusStyles: Record<FollowUpStatus, StatusStyle> = {
  due: { label: "Due", className: "bg-amber-50 text-amber-700" },
  reminded: { label: "Reminder sent", className: "bg-sky-50 text-sky-700" },
  done: { label: "Done", className: "bg-emerald-50 text-emerald-700" },
}

// Placeholder data, due dates match followUpDate in doctorConsultations
export const doctorFollowUps: DoctorFollowUp[] = [
  { id: "f1", patientId: "p3", patient: "Imran Khan", chamberId: "ch1", dueDate: "2026-11-19", reason: "Chest pain review after medicines", lastVisit: "05 Nov 2026", status: "due" },
  { id: "f2", patientId: "p8", patient: "Meera Bose", chamberId: "ch3", dueDate: "2026-11-19", reason: "Fever follow-up", lastVisit: "01 Nov 2026", status: "reminded" },
  { id: "f3", patientId: "p4", patient: "Priya Das", chamberId: "ch1", dueDate: "2026-11-15", reason: "Blood pressure recheck", lastVisit: "29 Oct 2026", status: "due" },
  { id: "f4", patientId: "p7", patient: "Arjun Paul", chamberId: "ch2", dueDate: "2026-11-22", reason: "Sugar report review", lastVisit: "08 Nov 2026", status: "reminded" },
  { id: "f5", patientId: "p1", patient: "Rahul Sen", chamberId: "ch1", dueDate: "2026-11-24", reason: "Flu recovery check", lastVisit: "12 Nov 2026", status: "due" },
  { id: "f6", patientId: "p2", patient: "Ananya Mitra", chamberId: "ch1", dueDate: "2026-11-26", reason: "Allergy review", lastVisit: "19 Nov 2026", status: "due" },
  { id: "f7", patientId: "p4", patient: "Priya Das", chamberId: "ch1", dueDate: "2026-11-05", reason: "Lipid report review", lastVisit: "29 Oct 2026", status: "done" },
]