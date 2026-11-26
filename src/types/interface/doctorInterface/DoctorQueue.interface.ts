import type { QueueItem, QueueStatus } from "../../type/doctorType/DoctorQueue.type"

export interface QueueStatusBadgeProps {
  status: QueueStatus
}

export interface QueueBoardProps {
  chamberName: string
  items: QueueItem[]
  onCallNext: () => void
  onSkip: (id: string) => void
  onMarkDone: (id: string) => void
  onCheckIn: (id: string) => void
}