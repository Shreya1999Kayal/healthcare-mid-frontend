import { LogOut, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import AdminAvatar from "../../components/admin/AdminAvatar"
import AdminNavItem from "../../components/admin/AdminNavItem"
import { adminNavLinks } from "../../constants/adminConstants/adminDashboard.constants"
import { adminPath } from "../../services/helper/adminHelper/adminDashboard.helper"
import { countPendingForLink } from "../../services/helper/adminHelper/adminVerification.helper"
import type { AdminSidebarProps } from "../../types/interface/adminInterface/AdminDashboard.interface"
import { useLogout } from "../../hooks/useLogout"

const AdminSidebar = ({ admin, applications }: AdminSidebarProps) => {
  const logout = useLogout()
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-linear-to-b from-admin-primary to-admin-primary-dark text-white lg:flex">
      <Link to="/" className="flex items-center gap-2 px-6 py-5 text-white no-underline">
        <ShieldCheck size={26} className="text-admin-bg-soft" />
        <span className="text-xl font-extrabold">Seva</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">Admin</span>
      </Link>

      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-white/15 p-3">
        <AdminAvatar name={admin.name} className="h-11 w-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{admin.name}</p>
          <p className="truncate text-xs text-white/75">{admin.email}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {adminNavLinks.map(({ label, section, icon, roles }) => (
          <AdminNavItem
            key={section}
            label={label}
            icon={icon}
            to={adminPath(section)}
            badge={countPendingForLink(applications, roles)}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/20 p-3">
        <Link to="/" className="rounded-lg px-3 py-2.5 text-sm text-white/85 no-underline hover:bg-white/15 hover:text-white">
          Back to website
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/15 hover:text-white text-left"
        >
          <LogOut size={18} /> Log out
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
