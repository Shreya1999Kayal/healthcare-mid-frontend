import { NavLink } from "react-router-dom"
import type { AdminNavItemProps } from "../../types/interface/adminInterface/AdminDashboard.interface"

// One sidebar link; compact = the small menu on mobile
const AdminNavItem = ({ label, to, icon: Icon, badge = 0, compact = false }: AdminNavItemProps) => {
  const sizeClass = compact ? "shrink-0 gap-1.5 rounded-md px-3 py-1.5 text-xs" : "gap-3 rounded-lg px-3 py-2.5 text-sm"

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center font-medium no-underline transition-colors ${sizeClass} ${
          isActive ? "bg-white text-admin-primary-dark shadow-sm" : "text-white/85 hover:bg-white/15 hover:text-white"
        }`
      }
    >
      {!compact && <Icon size={18} />}
      {label}
      {badge > 0 && (
        <span className="ml-auto rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-admin-navy">{badge}</span>
      )}
    </NavLink>
  )
}

export default AdminNavItem
