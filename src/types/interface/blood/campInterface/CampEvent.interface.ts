import type { CampEvent, CampEventFormValues } from "../../../type/blood/campType/CampEvent.type"
import type { CampOrganiser } from "../../../type/public/Blood.type"



export interface CampOrganiserInfoProps {
  organiser: CampOrganiser
}

export interface CampEventCardProps {
  camp: CampEvent
  today: string
  onEdit: (camp: CampEvent) => void
}

export interface CampEventFormProps {
  camp: CampEvent | null // null = new camp
  today: string
  onSave: (values: CampEventFormValues) => void
  onClose: () => void
}