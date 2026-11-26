import { ALL_CHAMBERS } from "../../../constants/doctorConstants/doctorDashboard.constants"
import { AVG_CONSULT_MINUTES, appointmentToQueueStatus } from "../../../constants/doctorConstants/doctorQueue.constants"
import type { DashboardChamber, DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { QueueItem, QueueStatus } from "../../../types/type/doctorType/DoctorQueue.type"

// Today's appointments -> queue, token numbers start at 1 in each chamber
export const buildQueue = (appointments: DoctorAppointment[]): QueueItem[] => {
  const tokens: Record<string, number> = {}

  return appointments.flatMap((appointment) => {
    const status = appointmentToQueueStatus[appointment.status]
    if (appointment.day !== "today" || !status) return []

    tokens[appointment.chamberId] = (tokens[appointment.chamberId] ?? 0) + 1

    return [
      {
        id: `q-${appointment.id}`,
        token: tokens[appointment.chamberId],
        patient: appointment.patient,
        age: appointment.age,
        gender: appointment.gender,
        reason: appointment.reason,
        time: appointment.time,
        mode: appointment.mode,
        chamberId: appointment.chamberId,
        status,
      },
    ]
  })
}

export const getSelectedChambers = (chambers: DashboardChamber[], chamberId: string) =>
  chamberId === ALL_CHAMBERS ? chambers : chambers.filter((chamber) => chamber.id === chamberId)

export const isInLine = (item: QueueItem) => item.status === "waiting" || item.status === "checked-in"

// Patient inside first, then the line in order, finished patients last
export const sortQueue = (items: QueueItem[]) => [
  ...items.filter((item) => item.status === "in-consultation"),
  ...items.filter(isInLine),
  ...items.filter((item) => item.status === "done"),
]

// Everyone ahead (plus the one inside) x average minutes
export const getWaitMinutes = (items: QueueItem[], id: string) => {
  const position = items.filter(isInLine).findIndex((item) => item.id === id)
  const inside = items.some((item) => item.status === "in-consultation") ? 1 : 0
  return (position + inside) * AVG_CONSULT_MINUTES
}

const setQueueStatus = (queue: QueueItem[], id: string, status: QueueStatus) =>
  queue.map((item): QueueItem => (item.id === id ? { ...item, status } : item))

// Finishes the current patient and calls the next one (checked-in before not arrived)
export const callNext = (queue: QueueItem[], chamberId: string) => {
  const chamberItems = queue.filter((item) => item.chamberId === chamberId)
  const next =
    chamberItems.find((item) => item.status === "checked-in") ??
    chamberItems.find((item) => item.status === "waiting")

  return queue.map((item): QueueItem => {
    if (item.chamberId === chamberId && item.status === "in-consultation") return { ...item, status: "done" }
    if (item.id === next?.id) return { ...item, status: "in-consultation" }
    return item
  })
}

// Sends the patient to the back of the line (token number stays the same)
export const skipPatient = (queue: QueueItem[], id: string) => {
  const skipped = queue.find((item) => item.id === id)
  return skipped ? [...queue.filter((item) => item.id !== id), skipped] : queue
}

export const markDone = (queue: QueueItem[], id: string) => setQueueStatus(queue, id, "done")

export const checkInPatient = (queue: QueueItem[], id: string) => setQueueStatus(queue, id, "checked-in")