import type { LucideIcon } from "lucide-react"
import type { Hospital, HospitalDoctor, HospitalReview } from "../../type/public/Hospital.type"
import type { HospitalBloodBank } from "../../type/public/Blood.type"



// Card used on the Home page
export interface HospitalCardProps {
  hospital: Hospital
}

// Card used on the Hospitals page (has the "View more" button)
export type HospitalListCardProps = HospitalCardProps

export interface HospitalInfoItemProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string // makes the value clickable (tel: / mailto:)
}

export interface HospitalDoctorsTableProps {
  doctors: HospitalDoctor[]
}

export interface HospitalReviewsProps {
  rating: number
  reviews: HospitalReview[]
}

export interface HospitalBloodStockProps {
  bank: HospitalBloodBank
}