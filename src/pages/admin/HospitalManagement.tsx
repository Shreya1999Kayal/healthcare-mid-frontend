import { useState } from "react"
import { Hospital, UserCheck, UserX } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminInfoModal from "../../components/admin/AdminInfoModal"
import AdminMessage from "../../components/admin/AdminMessage"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  adminCellClass,
  adminDangerButtonClass,
  adminHospitals,
  adminProviderStatusStyles,
  adminRowClass,
  adminSuccessButtonClass,
  adminViewButtonClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { listOptions, matchesOption, matchesSearch, styleOptions } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminHospital, AdminProviderStatus } from "../../types/type/adminType/AdminManagement.type"

const HospitalManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [hospitals, setHospitals] = useState<AdminHospital[]>(adminHospitals)
  const [search, setSearch] = useState("")
  const [city, setCity] = useState(ADMIN_ALL)
  const [status, setStatus] = useState(ADMIN_ALL)
  const [openId, setOpenId] = useState("")
  const [message, setMessage] = useState("")

  const shownHospitals = hospitals.filter(
    (hospital) =>
      matchesSearch(search, [hospital.name, hospital.id]) && matchesOption(city, hospital.city) && matchesOption(status, hospital.status),
  )
  const openHospital = hospitals.find((hospital) => hospital.id === openId)
  const countStatus = (value: AdminProviderStatus) => hospitals.filter((hospital) => hospital.status === value).length

  const toggleSuspend = (hospital: AdminHospital) => {
    const next: AdminProviderStatus = hospital.status === "active" ? "suspended" : "active"
    if (next === "suspended" && !window.confirm(`Suspend ${hospital.name}? It will be hidden from patients.`)) return

    setHospitals((prev) => prev.map((item) => (item.id === hospital.id ? { ...item, status: next } : item)))
    setMessage(`${hospital.name} is now ${adminProviderStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Hospital management" subtitle="Approved hospitals with their branches, departments and doctors." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Approved hospitals" value={hospitals.length} hint="All statuses" icon={Hospital} />
        <AdminSummaryCard label="Active" value={countStatus("active")} hint="Visible to patients" icon={UserCheck} />
        <AdminSummaryCard label="Suspended" value={countStatus("suspended")} hint="Hidden from patients" icon={UserX} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search hospital or ID"
        filters={[
          { label: "All cities", value: city, options: listOptions(hospitals.map((hospital) => hospital.city)), onChange: setCity },
          { label: "All statuses", value: status, options: styleOptions(adminProviderStatusStyles), onChange: setStatus },
        ]}
      />

      <AdminTable
        headers={["Hospital", "City", "Branches", "Departments", "Doctors", "Beds", "Status", "Actions"]}
        isEmpty={shownHospitals.length === 0}
      >
        {shownHospitals.map((hospital) => (
          <tr key={hospital.id} className={adminRowClass}>
            <td className={adminCellClass}>
              <p className="font-semibold text-admin-navy">{hospital.name}</p>
              <p className="text-xs text-admin-muted">{hospital.hospitalType}</p>
            </td>
            <td className={`${adminCellClass} text-admin-navy`}>{hospital.city}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{hospital.branches.length}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{hospital.departments.length}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{hospital.doctors}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{hospital.totalBeds}</td>
            <td className={adminCellClass}>
              <AdminStatusBadge style={adminProviderStatusStyles[hospital.status]} />
            </td>
            <td className={adminCellClass}>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setOpenId(hospital.id)} className={adminViewButtonClass}>
                  View
                </button>
                <button
                  type="button"
                  onClick={() => toggleSuspend(hospital)}
                  className={hospital.status === "active" ? adminDangerButtonClass : adminSuccessButtonClass}
                >
                  {hospital.status === "active" ? "Suspend" : "Reactivate"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {openHospital && (
        <AdminInfoModal
          title={openHospital.name}
          subtitle={`${openHospital.hospitalType} · ${openHospital.city}`}
          onClose={() => setOpenId("")}
          details={[
            { label: "Hospital ID", value: openHospital.id },
            { label: "Phone", value: openHospital.phone },
            { label: "Branches", value: openHospital.branches.join(", ") || "Main hospital only" },
            { label: "Departments", value: openHospital.departments.join(", ") },
            { label: "Doctors", value: String(openHospital.doctors) },
            { label: "Total beds", value: String(openHospital.totalBeds) },
            { label: "Approved on", value: formatAdminDate(openHospital.approvedOn) },
          ]}
        />
      )}
    </div>
  )
}

export default HospitalManagement
