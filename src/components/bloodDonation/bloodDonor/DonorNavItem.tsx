import { Lock } from "lucide-react"
import { NavLink } from "react-router-dom"
import { DONOR_LOCKED_MESSAGE } from "../../../constants/blood/donorConstants/donorVerification.constants"
import type { DonorNavItemProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"


// One sidebar link; compact = the small menu on mobile
const DonorNavItem = ({ label, to, icon: Icon, locked, compact = false }: DonorNavItemProps) => {
  const sizeClass = compact ? "shrink-0 gap-1.5 rounded-md px-3 py-1.5 text-xs" : "gap-3 rounded-lg px-3 py-2.5 text-sm"

  if (locked) {
    return (
      <span
        aria-disabled="true"
        title={DONOR_LOCKED_MESSAGE}
        className={`flex cursor-not-allowed items-center font-medium text-white/45 ${sizeClass}`}
      >
        {!compact && <Icon size={18} />}
        {label}
        <Lock size={compact ? 12 : 14} className="ml-auto" />
      </span>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center font-medium no-underline transition-colors ${sizeClass} ${
          isActive ? "bg-white text-blood-primary-dark shadow-sm" : "text-white/85 hover:bg-white/15 hover:text-white"
        }`
      }
    >
      {!compact && <Icon size={18} />}
      {label}
    </NavLink>
  )
}

export default DonorNavItem