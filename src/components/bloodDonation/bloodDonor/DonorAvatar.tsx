import { getDonorInitials } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import type { DonorAvatarProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"


const DonorAvatar = ({ name, className = "h-9 w-9" }: DonorAvatarProps) => {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-blood-bg-soft text-sm font-bold text-blood-primary-dark ${className}`}>
      {getDonorInitials(name)}
    </span>
  )
}

export default DonorAvatar