import { getHospitalInitials } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import type { HospitalAvatarProps } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"

const HospitalAvatar = ({ name, className = "h-9 w-9" }: HospitalAvatarProps) => {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-hospital-bg-soft text-sm font-bold text-hospital-primary-dark ${className}`}
    >
      {getHospitalInitials(name)}
    </span>
  )
}

export default HospitalAvatar