import type { Doctor, DoctorChamber } from "../../type/public/Doctor.type"



// Small card used on the Home page
export interface DoctorCardProps {
  doctor: Doctor
}

// Card used on the Doctors page (has the "View more" button)
export type DoctorListCardProps = DoctorCardProps

export interface DoctorChambersProps {
  chambers: DoctorChamber[]
}