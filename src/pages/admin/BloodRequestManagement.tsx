import { useState } from "react"
import { Clock, Droplet, PackageCheck, Siren } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  adminBloodGroups,
  adminBloodRequestStatusStyles,
  adminBloodRequests,
  adminCellClass,
  adminDangerButtonClass,
  adminOutlineButtonClass,
  adminRequestTypeOptions,
  adminRowClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { listOptions, matchesOption, matchesSearch, styleOptions } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminBloodRequest } from "../../types/type/adminType/AdminManagement.type"

const BloodRequestManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [requests, setRequests] = useState<AdminBloodRequest[]>(adminBloodRequests)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(ADMIN_ALL)
  const [bloodGroup, setBloodGroup] = useState(ADMIN_ALL)
  const [type, setType] = useState(ADMIN_ALL)
  const [message, setMessage] = useState("")

  const shownRequests = requests.filter(
    (request) =>
      matchesSearch(search, [request.patient, request.hospital, request.bloodBank, request.id]) &&
      matchesOption(status, request.status) &&
      matchesOption(bloodGroup, request.bloodGroup) &&
      matchesOption(type, request.emergency ? "emergency" : "normal"),
  )

  const countStatus = (value: string) => requests.filter((request) => request.status === value).length
  const emergencyCount = requests.filter((request) => request.emergency).length

  const toggleFlag = (request: AdminBloodRequest) => {
    setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, emergency: !item.emergency } : item)))
    setMessage(`Request for ${request.patient} ${request.emergency ? "is no longer an emergency" : "is flagged as an emergency"}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Blood request management" subtitle="Every blood request between hospitals and blood banks." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminSummaryCard label="Total requests" value={requests.length} hint="All statuses" icon={Droplet} />
        <AdminSummaryCard label="Pending" value={countStatus("pending")} hint="Bank has not replied" icon={Clock} />
        <AdminSummaryCard label="Delivered" value={countStatus("delivered")} hint="Blood received" icon={PackageCheck} />
        <AdminSummaryCard label="Emergency" value={emergencyCount} hint="Flagged requests" icon={Siren} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search patient, hospital, bank or ID"
        filters={[
          { label: "All statuses", value: status, options: styleOptions(adminBloodRequestStatusStyles), onChange: setStatus },
          { label: "All blood groups", value: bloodGroup, options: listOptions(adminBloodGroups), onChange: setBloodGroup },
          { label: "All requests", value: type, options: adminRequestTypeOptions, onChange: setType },
        ]}
      />

      <AdminTable
        headers={["Patient", "Blood", "Hospital", "Blood bank", "Requested", "Status", "Action"]}
        isEmpty={shownRequests.length === 0}
      >
        {shownRequests.map((request) => {
          // Only open requests can be flagged
          const canFlag = request.status === "pending" || request.status === "accepted"

          return (
            <tr key={request.id} className={`${adminRowClass} ${request.emergency ? "bg-red-50/60" : ""}`}>
              <td className={adminCellClass}>
                <p className="font-semibold text-admin-navy">{request.patient}</p>
                {request.emergency && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                    <Siren size={12} /> Emergency
                  </span>
                )}
              </td>
              <td className={adminCellClass}>
                <p className="font-extrabold text-red-600">{request.bloodGroup}</p>
                <p className="text-xs text-admin-muted">{request.units} units</p>
              </td>
              <td className={`${adminCellClass} text-admin-navy`}>{request.hospital}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{request.bloodBank}</td>
              <td className={`${adminCellClass} text-admin-navy`}>{formatAdminDate(request.requestedOn)}</td>
              <td className={adminCellClass}>
                <AdminStatusBadge style={adminBloodRequestStatusStyles[request.status]} />
              </td>
              <td className={adminCellClass}>
                {canFlag ? (
                  <button
                    type="button"
                    onClick={() => toggleFlag(request)}
                    className={request.emergency ? adminOutlineButtonClass : adminDangerButtonClass}
                  >
                    {request.emergency ? "Remove flag" : "Flag emergency"}
                  </button>
                ) : (
                  <span className="text-xs text-admin-muted">—</span>
                )}
              </td>
            </tr>
          )
        })}
      </AdminTable>
    </div>
  )
}

export default BloodRequestManagement
