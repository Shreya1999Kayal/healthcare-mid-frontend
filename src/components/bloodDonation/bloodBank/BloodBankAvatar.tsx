import { getBloodBankInitials } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import type { BloodBankAvatarProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankDashboard.interface"


const BloodBankAvatar = ({ name, className = "h-9 w-9" }: BloodBankAvatarProps) => {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-blood-bg-soft text-sm font-bold text-blood-primary-dark ${className}`}
    >
      {getBloodBankInitials(name)}
    </span>
  )
}

export default BloodBankAvatar