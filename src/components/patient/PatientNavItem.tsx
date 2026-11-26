import { NavLink } from "react-router-dom"
import type { PatientNavItemProps } from "../../types/interface/patientInterface/PatientDashboard.interface"

// One sidebar link; compact = the small menu on mobile
const PatientNavItem = ({ label, to, icon: Icon, compact = false }: PatientNavItemProps) => {
  const sizeClass = compact ? "shrink-0 gap-1.5 rounded-md px-3 py-1.5 text-xs" : "gap-3 rounded-lg px-3 py-2.5 text-sm"

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center font-medium no-underline transition-colors ${sizeClass} ${
          isActive ? "bg-white text-patient-primary-dark shadow-sm" : "text-white/85 hover:bg-white/15 hover:text-white"
        }`
      }
    >
      {!compact && <Icon size={18} />}
      {label}
    </NavLink>
  )
}

export default PatientNavItem
