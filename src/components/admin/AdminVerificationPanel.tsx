import { useState } from "react"
import { CircleCheck, CircleX, Clock, Search } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import AdminApplicationsTable from "./AdminApplicationsTable"
import AdminReviewModal from "./AdminReviewModal"
import AdminSummaryCard from "./AdminSummaryCard"
import { adminCardClass, adminFieldClass } from "../../constants/adminConstants/adminDashboard.constants"
import { ADMIN_ALL_ROLES, adminRoleLabels, adminVerificationTabs } from "../../constants/adminConstants/adminVerification.constants"
import {
  countApplications,
  filterApplications,
  sortApplications,
} from "../../services/helper/adminHelper/adminVerification.helper"
import type { AdminOutletContext } from "../../types/interface/adminInterface/AdminDashboard.interface"
import type { AdminVerificationPanelProps } from "../../types/interface/adminInterface/AdminVerification.interface"
import type { AdminReviewDecision, AdminVerificationStatus } from "../../types/type/adminType/AdminVerification.type"

const AdminVerificationPanel = ({ title, subtitle, roles }: AdminVerificationPanelProps) => {
  const { applications, onReview } = useOutletContext<AdminOutletContext>()

  const [tab, setTab] = useState<AdminVerificationStatus>("pending")
  const [search, setSearch] = useState("")
  const [role, setRole] = useState(ADMIN_ALL_ROLES)
  const [openId, setOpenId] = useState("")
  const [message, setMessage] = useState("")

  const showRole = roles.length > 1
  const shownApplications = sortApplications(filterApplications(applications, roles, tab, search, role))
  const openApplication = applications.find((application) => application.id === openId)

  const review = (decision: AdminReviewDecision, remarks: string) => {
    if (!openApplication) return
    onReview(openApplication.id, decision, remarks)
    setOpenId("")
    setMessage(`${openApplication.name} was ${decision}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-admin-navy md:text-3xl">{title}</h1>
        <p className="text-sm text-admin-muted">{subtitle}</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Pending" value={countApplications(applications, roles, "pending")} hint="Waiting for review" icon={Clock} />
        <AdminSummaryCard label="Approved" value={countApplications(applications, roles, "approved")} hint="Dashboard unlocked" icon={CircleCheck} />
        <AdminSummaryCard label="Rejected" value={countApplications(applications, roles, "rejected")} hint="Sent back with a reason" icon={CircleX} />
      </div>

      <div className="flex flex-wrap gap-2">
        {adminVerificationTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === option.value
                ? "bg-admin-primary text-white"
                : "border border-admin-border bg-white text-admin-navy hover:bg-admin-bg"
            }`}
          >
            {option.label} ({countApplications(applications, roles, option.value)})
          </button>
        ))}
      </div>

      <div className={`${adminCardClass} flex flex-wrap items-center gap-3`}>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, city or ID"
            aria-label="Search applications"
            className={`${adminFieldClass} w-full pl-9`}
          />
        </div>
        {showRole && (
          <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role" className={adminFieldClass}>
            <option value={ADMIN_ALL_ROLES}>All roles</option>
            {roles.map((item) => (
              <option key={item} value={item}>
                {adminRoleLabels[item]}
              </option>
            ))}
          </select>
        )}
      </div>

      {shownApplications.length === 0 ? (
        <p className={`${adminCardClass} text-center text-sm text-admin-muted`}>No applications here.</p>
      ) : (
        <AdminApplicationsTable
          applications={shownApplications}
          showRole={showRole}
          onOpen={(applicationId) => {
            setOpenId(applicationId)
            setMessage("")
          }}
        />
      )}

      {openApplication && <AdminReviewModal application={openApplication} onReview={review} onClose={() => setOpenId("")} />}
    </div>
  )
}

export default AdminVerificationPanel
