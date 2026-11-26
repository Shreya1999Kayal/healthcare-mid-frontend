import { useState } from "react"
import { CircleCheck, Heart, UserX } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  adminBloodGroups,
  adminCellClass,
  adminDangerButtonClass,
  adminDonors,
  adminEligibilityOptions,
  adminProviderStatusStyles,
  adminRowClass,
  adminSuccessButtonClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import {
  getDonorEligibility,
  listOptions,
  matchesOption,
  matchesSearch,
  styleOptions,
} from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminDonor, AdminProviderStatus } from "../../types/type/adminType/AdminManagement.type"

const DonorManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [donors, setDonors] = useState<AdminDonor[]>(adminDonors)
  const [search, setSearch] = useState("")
  const [bloodGroup, setBloodGroup] = useState(ADMIN_ALL)
  const [eligibility, setEligibility] = useState(ADMIN_ALL)
  const [status, setStatus] = useState(ADMIN_ALL)
  const [message, setMessage] = useState("")

  const shownDonors = donors.filter((donor) => {
    const eligibilityValue = getDonorEligibility(donor.lastDonation).eligible ? "eligible" : "waiting"

    return (
      matchesSearch(search, [donor.name, donor.city, donor.phone, donor.id]) &&
      matchesOption(bloodGroup, donor.bloodGroup) &&
      matchesOption(eligibility, eligibilityValue) &&
      matchesOption(status, donor.status)
    )
  })

  const eligibleCount = donors.filter((donor) => getDonorEligibility(donor.lastDonation).eligible).length
  const suspendedCount = donors.filter((donor) => donor.status === "suspended").length

  const toggleSuspend = (donor: AdminDonor) => {
    const next: AdminProviderStatus = donor.status === "active" ? "suspended" : "active"
    if (next === "suspended" && !window.confirm(`Suspend ${donor.name}? They will not get donation requests.`)) return

    setDonors((prev) => prev.map((item) => (item.id === donor.id ? { ...item, status: next } : item)))
    setMessage(`${donor.name} is now ${adminProviderStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Donor management" subtitle="Blood group, last donation and who can donate now." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Donors" value={donors.length} hint="All statuses" icon={Heart} />
        <AdminSummaryCard label="Eligible now" value={eligibleCount} hint="90 days since last donation" icon={CircleCheck} />
        <AdminSummaryCard label="Suspended" value={suspendedCount} hint="No requests sent" icon={UserX} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search name, city, phone or ID"
        filters={[
          { label: "All blood groups", value: bloodGroup, options: listOptions(adminBloodGroups), onChange: setBloodGroup },
          { label: "Any eligibility", value: eligibility, options: adminEligibilityOptions, onChange: setEligibility },
          { label: "All statuses", value: status, options: styleOptions(adminProviderStatusStyles), onChange: setStatus },
        ]}
      />

      <AdminTable
        headers={["Donor", "Blood group", "City", "Last donation", "Donations", "Eligibility", "Status", "Action"]}
        isEmpty={shownDonors.length === 0}
      >
        {shownDonors.map((donor) => {
          const { eligible, nextDate } = getDonorEligibility(donor.lastDonation)

          return (
            <tr key={donor.id} className={adminRowClass}>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">{donor.name}</p>
                <p className="text-xs text-admin-muted">{donor.phone}</p>
              </td>
              <td className={`${adminCellClass} font-extrabold text-red-600`}>{donor.bloodGroup}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{donor.city}</td>
              <td className={`${adminCellClass} text-admin-navy`}>
                {donor.lastDonation ? formatAdminDate(donor.lastDonation) : "Never"}
              </td>
              <td className={`${adminCellClass} text-admin-navy`}>{donor.donations}</td>
              <td className={adminCellClass}>
                {eligible ? (
                  <AdminStatusBadge style={{ label: "Eligible", className: "bg-emerald-50 text-emerald-700" }} />
                ) : (
                  <AdminStatusBadge style={{ label: `From ${formatAdminDate(nextDate)}`, className: "bg-amber-50 text-amber-700" }} />
                )}
              </td>
              <td className={adminCellClass}>
                <AdminStatusBadge style={adminProviderStatusStyles[donor.status]} />
              </td>
              <td className={adminCellClass}>
                <button
                  type="button"
                  onClick={() => toggleSuspend(donor)}
                  className={donor.status === "active" ? adminDangerButtonClass : adminSuccessButtonClass}
                >
                  {donor.status === "active" ? "Suspend" : "Reactivate"}
                </button>
              </td>
            </tr>
          )
        })}
      </AdminTable>
    </div>
  )
}

export default DonorManagement
