import { getAdminInitials } from "../../services/helper/adminHelper/adminDashboard.helper"
import type { AdminAvatarProps } from "../../types/interface/adminInterface/AdminDashboard.interface"

const AdminAvatar = ({ name, className = "h-9 w-9" }: AdminAvatarProps) => {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-admin-bg-soft text-sm font-bold text-admin-primary-dark ${className}`}
    >
      {getAdminInitials(name)}
    </span>
  )
}

export default AdminAvatar
