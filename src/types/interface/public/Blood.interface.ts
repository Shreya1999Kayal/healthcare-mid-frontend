import type { ReactNode } from "react"
import type { BloodBankItem, BloodCamp, BloodService, CampOrganiser, SwitchOption } from "../../type/public/Blood.type"

export interface BloodCardProps {
  service: BloodService
}

export interface SwitchTabsProps<T extends string> {
  options: SwitchOption<T>[]
  value: T
  onChange: (id: T) => void
}

export interface CampCardProps {
  camp: BloodCamp
  organiser?: CampOrganiser
  onViewDetails: (camp: BloodCamp) => void
}

export interface CampDetailsModalProps {
  camp: BloodCamp
  organiser: CampOrganiser
  onClose: () => void
}

export interface BloodBankCardProps {
  bank: BloodBankItem
}

export interface BloodSectionProps {
  id: string
  title: string
  text: string
  children: ReactNode
}