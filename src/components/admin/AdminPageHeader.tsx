import type { AdminPageHeaderProps } from "../../types/interface/adminInterface/AdminManagement.interface"

const AdminPageHeader = ({ title, subtitle }: AdminPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-admin-navy md:text-3xl">{title}</h1>
      <p className="text-sm text-admin-muted">{subtitle}</p>
    </div>
  )
}

export default AdminPageHeader
