import { useState } from "react"
import { UserCheck, Users, UserX } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  adminCellClass,
  adminDangerButtonClass,
  adminRowClass,
  adminSuccessButtonClass,
  adminUserRoleLabels,
  adminUserStatusStyles,
  adminUsers,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { labelOptions, matchesOption, matchesSearch, styleOptions } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminUser, AdminUserStatus } from "../../types/type/adminType/AdminManagement.type"

const UserManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [users, setUsers] = useState<AdminUser[]>(adminUsers)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState(ADMIN_ALL)
  const [status, setStatus] = useState(ADMIN_ALL)
  const [message, setMessage] = useState("")

  const shownUsers = users.filter(
    (user) =>
      matchesSearch(search, [user.name, user.email, user.phone, user.id]) &&
      matchesOption(role, user.role) &&
      matchesOption(status, user.status),
  )

  const countStatus = (value: AdminUserStatus) => users.filter((user) => user.status === value).length

  const toggleBlock = (user: AdminUser) => {
    const next: AdminUserStatus = user.status === "active" ? "blocked" : "active"
    if (next === "blocked" && !window.confirm(`Block ${user.name}? They will not be able to log in.`)) return

    setUsers((prev) => prev.map((item) => (item.id === user.id ? { ...item, status: next } : item)))
    setMessage(`${user.name} is now ${adminUserStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="User management" subtitle="Every registered account and its role." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Total users" value={users.length} hint="All roles" icon={Users} />
        <AdminSummaryCard label="Active" value={countStatus("active")} hint="Can log in" icon={UserCheck} />
        <AdminSummaryCard label="Blocked" value={countStatus("blocked")} hint="Login stopped" icon={UserX} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search name, email, phone or ID"
        filters={[
          { label: "All roles", value: role, options: labelOptions(adminUserRoleLabels), onChange: setRole },
          { label: "All statuses", value: status, options: styleOptions(adminUserStatusStyles), onChange: setStatus },
        ]}
      />

      <AdminTable headers={["User", "Role", "Phone", "City", "Joined", "Status", "Action"]} isEmpty={shownUsers.length === 0}>
        {shownUsers.map((user) => (
          <tr key={user.id} className={adminRowClass}>
            <td className={adminCellClass}>
              <p className="font-semibold text-admin-navy">{user.name}</p>
              <p className="text-xs text-admin-muted">{user.email}</p>
            </td>
            <td className={`${adminCellClass} text-admin-navy`}>{adminUserRoleLabels[user.role]}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{user.phone}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{user.city}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{formatAdminDate(user.joinedOn)}</td>
            <td className={adminCellClass}>
              <AdminStatusBadge style={adminUserStatusStyles[user.status]} />
            </td>
            <td className={adminCellClass}>
              <button
                type="button"
                onClick={() => toggleBlock(user)}
                className={user.status === "active" ? adminDangerButtonClass : adminSuccessButtonClass}
              >
                {user.status === "active" ? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}

export default UserManagement
