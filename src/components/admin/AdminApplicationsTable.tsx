import { Eye } from "lucide-react"
import { adminCardClass } from "../../constants/adminConstants/adminDashboard.constants"
import { adminRoleLabels, adminVerificationStatusStyles } from "../../constants/adminConstants/adminVerification.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import type { AdminApplicationsTableProps } from "../../types/interface/adminInterface/AdminVerification.interface"

const AdminApplicationsTable = ({ applications, showRole, onOpen }: AdminApplicationsTableProps) => {
  return (
    <section className={adminCardClass}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left text-sm">
          <thead>
            <tr className="border-b border-admin-border text-xs uppercase tracking-wide text-admin-muted">
              <th className="py-2 font-medium">Applicant</th>
              {showRole && <th className="py-2 font-medium">Role</th>}
              <th className="py-2 font-medium">City</th>
              <th className="py-2 font-medium">Submitted</th>
              <th className="py-2 font-medium">Reviewed</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              const status = adminVerificationStatusStyles[application.status]

              return (
                <tr key={application.id} className="border-b border-admin-border/60 align-top last:border-0">
                  <td className="py-3">
                    <p className="font-semibold text-admin-navy">{application.name}</p>
                    <p className="text-xs text-admin-muted">ID: {application.applicantId}</p>
                  </td>
                  {showRole && <td className="py-3 text-admin-navy">{adminRoleLabels[application.role]}</td>}
                  <td className="py-3 text-admin-navy">{application.city}</td>
                  <td className="py-3 text-admin-navy">{formatAdminDate(application.submittedOn)}</td>
                  <td className="py-3 text-admin-navy">{formatAdminDate(application.reviewedOn)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => onOpen(application.id)}
                      className="flex items-center gap-1.5 rounded-md bg-admin-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-admin-primary-dark"
                    >
                      <Eye size={14} /> {application.status === "pending" ? "Review" : "View"}
                    </button>
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

export default AdminApplicationsTable
