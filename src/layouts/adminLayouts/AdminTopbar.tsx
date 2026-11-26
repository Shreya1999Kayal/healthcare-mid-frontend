import { ClipboardCheck } from "lucide-react"
import AdminAvatar from "../../components/admin/AdminAvatar"
import type { AdminTopbarProps } from "../../types/interface/adminInterface/AdminDashboard.interface"

const AdminTopbar = ({ admin, pendingCount }: AdminTopbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-admin-border bg-white px-4 py-3 md:px-8">
      <div>
        <p className="text-sm font-bold text-admin-navy">Admin dashboard</p>
        <p className="text-xs text-admin-muted">Seva control panel</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 rounded-full border border-admin-border px-3 py-1.5 text-xs font-semibold text-admin-navy">
          <ClipboardCheck size={16} className="text-admin-primary" />
          {pendingCount} pending
        </span>

        <div className="flex items-center gap-3">
          <AdminAvatar name={admin.name} />
          <p className="hidden text-sm font-semibold text-admin-navy sm:block">{admin.name}</p>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar
