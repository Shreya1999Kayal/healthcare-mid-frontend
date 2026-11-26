import type { AdminStatusBadgeProps } from "../../types/interface/adminInterface/AdminManagement.interface"

const AdminStatusBadge = ({ style }: AdminStatusBadgeProps) => {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  )
}

export default AdminStatusBadge
