import { Crown, Mail, Pencil, Power, UserMinus } from "lucide-react"
import { hospitalCardClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { staffRoleLabels, staffStatusStyles } from "../../constants/hospitalConstants/hospitalStaff.constants"
import { getPermissionLabel, getStaffInitials } from "../../services/helper/hospitalHelper/hospitalStaff.helper"
import type { StaffTableProps } from "../../types/interface/hospitalInterface/HospitalStaff.interface"

// How many section chips to show before "+ n more"
const VISIBLE_PERMISSIONS = 3

const StaffTable = ({ staff, onEdit, onToggleStatus, onResendInvite, onRemove }: StaffTableProps) => {
  return (
    <section className={hospitalCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left text-sm">
          <thead>
            <tr className="border-b border-hospital-border text-xs uppercase tracking-wide text-hospital-muted">
              <th className="py-2 font-medium">Staff</th>
              <th className="py-2 font-medium">Role</th>
              <th className="py-2 font-medium">Access</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Last active</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => {
              const status = staffStatusStyles[member.status]
              const extra = member.permissions.length - VISIBLE_PERMISSIONS

              return (
                <tr key={member.id} className="border-b border-hospital-border/60 align-top last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hospital-bg-soft text-sm font-bold text-hospital-primary-dark">
                        {getStaffInitials(member.name)}
                      </span>
                      <div>
                        <p className="flex items-center gap-1.5 font-semibold text-hospital-navy">
                          {member.name}
                          {member.isOwner && <Crown size={14} className="text-amber-500" aria-label="Owner" />}
                        </p>
                        <p className="text-xs text-hospital-muted">{member.email}</p>
                        <p className="text-xs text-hospital-muted">{member.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-semibold text-hospital-navy">{staffRoleLabels[member.role]}</td>
                  <td className="py-3">
                    {member.role === "admin" ? (
                      <span className="rounded-full bg-hospital-primary px-3 py-1 text-xs font-semibold text-white">All sections</span>
                    ) : (
                      <div className="flex max-w-xs flex-wrap gap-1.5">
                        {member.permissions.slice(0, VISIBLE_PERMISSIONS).map((section) => (
                          <span key={section} className="rounded-full bg-hospital-bg-soft px-2.5 py-0.5 text-xs font-semibold text-hospital-primary-dark">
                            {getPermissionLabel(section)}
                          </span>
                        ))}
                        {extra > 0 && <span className="px-1 text-xs font-semibold text-hospital-muted">+ {extra} more</span>}
                      </div>
                    )}
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                  </td>
                  <td className="py-3 text-xs text-hospital-muted">{member.lastActive}</td>
                  <td className="py-3">
                    {member.isOwner ? (
                      <span className="text-xs text-hospital-muted">Owner</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(member)}
                          aria-label={`Edit ${member.name}`}
                          title="Edit"
                          className="rounded-md border border-hospital-primary p-1.5 text-hospital-primary-dark hover:bg-hospital-bg-soft"
                        >
                          <Pencil size={14} />
                        </button>
                        {member.status === "invited" ? (
                          <button
                            type="button"
                            onClick={() => onResendInvite(member)}
                            aria-label={`Resend invite to ${member.name}`}
                            title="Resend invite"
                            className="rounded-md border border-hospital-border p-1.5 text-hospital-navy hover:bg-hospital-bg"
                          >
                            <Mail size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onToggleStatus(member)}
                            aria-label={member.status === "active" ? `Suspend ${member.name}` : `Activate ${member.name}`}
                            title={member.status === "active" ? "Suspend" : "Activate"}
                            className="rounded-md border border-hospital-border p-1.5 text-hospital-navy hover:bg-hospital-bg"
                          >
                            <Power size={14} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onRemove(member)}
                          aria-label={`Remove ${member.name}`}
                          title="Remove"
                          className="rounded-md border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                        >
                          <UserMinus size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StaffTable