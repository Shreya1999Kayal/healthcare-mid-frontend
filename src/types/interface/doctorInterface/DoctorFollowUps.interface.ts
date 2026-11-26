import type { DoctorFollowUp } from "../../type/doctorType/DoctorFollowUps.type"

export interface FollowUpCardProps {
  followUp: DoctorFollowUp
  chamberName: string
  onRemind: (followUpId: string) => void
  onReschedule: (followUpId: string, dueDate: string) => void
  onDone: (followUpId: string) => void
}