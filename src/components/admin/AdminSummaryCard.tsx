import { adminCardClass } from "../../constants/adminConstants/adminDashboard.constants"
import type { AdminSummaryCardProps } from "../../types/interface/adminInterface/AdminDashboard.interface"

const AdminSummaryCard = ({ label, value, hint, icon: Icon }: AdminSummaryCardProps) => {
  return (
    <article className={`${adminCardClass} flex items-center gap-4`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-admin-primary to-admin-primary-dark text-white">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-2xl font-extrabold leading-none text-admin-navy">{value}</p>
        <p className="mt-1 text-sm font-semibold text-admin-navy">{label}</p>
        <p className="text-xs text-admin-muted">{hint}</p>
      </div>
    </article>
  )
}

export default AdminSummaryCard
