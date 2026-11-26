import { getPatientInitials } from "../../services/helper/patientHelper/patientDashboard.helper"
import type { PatientAvatarProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

const PatientAvatar = ({ name, className = "h-9 w-9" }: PatientAvatarProps) => {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-patient-bg-soft text-sm font-bold text-patient-primary-dark ${className}`}
    >
      {getPatientInitials(name)}
    </span>
  )
}

export default PatientAvatar
