import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

import AdminSidebar from "./AdminSidebar"
import AdminTopbar from "./AdminTopbar"
import AdminNavItem from "../../components/admin/AdminNavItem"
import { ADMIN_TODAY, adminAccount, adminNavLinks } from "../../constants/adminConstants/adminDashboard.constants"
import { adminApplications } from "../../constants/adminConstants/adminVerification.constants"
import { adminPath } from "../../services/helper/adminHelper/adminDashboard.helper"
import { countPendingForLink } from "../../services/helper/adminHelper/adminVerification.helper"
import type { AdminOutletContext } from "../../types/interface/adminInterface/AdminDashboard.interface"
import type { AdminApplication, AdminReviewDecision } from "../../types/type/adminType/AdminVerification.type"

const AdminLayout = () => {
  const { pathname } = useLocation()

  // Kept here so sidebar badges and every page stay in sync after a review (UI only)
  const [applications, setApplications] = useState<AdminApplication[]>(adminApplications)

  // every page opens from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  const reviewApplication = (applicationId: string, decision: AdminReviewDecision, remarks: string) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status: decision,
              reviewedOn: ADMIN_TODAY,
              adminRemarks: decision === "rejected" ? remarks.trim() : "",
            }
          : application,
      ),
    )
  }

  const pendingCount = applications.filter((application) => application.status === "pending").length

  const outletContext: AdminOutletContext = {
    admin: adminAccount,
    applications,
    onReview: reviewApplication,
  }

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <AdminSidebar admin={adminAccount} applications={applications} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar admin={adminAccount} pendingCount={pendingCount} />

        {/* Menu for small screens (the sidebar shows on large screens) */}
        <nav className="flex gap-2 overflow-x-auto bg-admin-primary p-2 lg:hidden">
          {adminNavLinks.map(({ label, section, icon, roles }) => (
            <AdminNavItem
              key={section}
              label={label}
              icon={icon}
              to={adminPath(section)}
              badge={countPendingForLink(applications, roles)}
              compact
            />
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
