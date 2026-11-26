import { useState } from "react"
import { Star, Stethoscope, UserCheck, UserX } from "lucide-react"
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
  adminDoctors,
  adminProviderStatusStyles,
  adminRowClass,
  adminSuccessButtonClass,
  adminViewButtonClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import {
  formatRating,
  listOptions,
  matchesOption,
  matchesSearch,
  styleOptions,
} from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminDoctor, AdminProviderStatus } from "../../types/type/adminType/AdminManagement.type"

const DoctorManagement = () => {
  // Local copy (UI only, nothing is saved)
  const [doctors, setDoctors] = useState<AdminDoctor[]>(adminDoctors)
  const [search, setSearch] = useState("")
  const [specialisation, setSpecialisation] = useState(ADMIN_ALL)
  const [status, setStatus] = useState(ADMIN_ALL)
  const [openId, setOpenId] = useState("")
  const [message, setMessage] = useState("")

  const shownDoctors = doctors.filter(
    (doctor) =>
      matchesSearch(search, [doctor.name, doctor.hospital, doctor.id]) &&
      matchesOption(specialisation, doctor.specialisation) &&
      matchesOption(status, doctor.status),
  )
  const openDoctor = doctors.find((doctor) => doctor.id === openId)
  const countStatus = (value: AdminProviderStatus) => doctors.filter((doctor) => doctor.status === value).length

  const toggleSuspend = (doctor: AdminDoctor) => {
    const next: AdminProviderStatus = doctor.status === "active" ? "suspended" : "active"
    if (next === "suspended" && !window.confirm(`Suspend ${doctor.name}? Patients will not be able to book them.`)) return

    setDoctors((prev) => prev.map((item) => (item.id === doctor.id ? { ...item, status: next } : item)))
    setMessage(`${doctor.name} is now ${adminProviderStatusStyles[next].label.toLowerCase()}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Doctor management" subtitle="Approved doctors, their work and ratings." />
      <AdminMessage message={message} />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminSummaryCard label="Approved doctors" value={doctors.length} hint="All statuses" icon={Stethoscope} />
        <AdminSummaryCard label="Active" value={countStatus("active")} hint="Taking appointments" icon={UserCheck} />
        <AdminSummaryCard label="Suspended" value={countStatus("suspended")} hint="Hidden from patients" icon={UserX} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search doctor, hospital or ID"
        filters={[
          {
            label: "All specialisations",
            value: specialisation,
            options: listOptions(doctors.map((doctor) => doctor.specialisation)),
            onChange: setSpecialisation,
          },
          { label: "All statuses", value: status, options: styleOptions(adminProviderStatusStyles), onChange: setStatus },
        ]}
      />

      <AdminTable
        headers={["Doctor", "Specialisation", "Hospital", "Appointments", "Rating", "Status", "Actions"]}
        isEmpty={shownDoctors.length === 0}
      >
        {shownDoctors.map((doctor) => (
          <tr key={doctor.id} className={adminRowClass}>
            <td className={adminCellClass}>
              <p className="font-semibold text-admin-navy">{doctor.name}</p>
              <p className="text-xs text-admin-muted">{doctor.qualification}</p>
            </td>
            <td className={`${adminCellClass} text-admin-navy`}>{doctor.specialisation}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{doctor.hospital}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{doctor.appointments}</td>
            <td className={adminCellClass}>
              <span className="flex items-center gap-1 font-semibold text-admin-navy">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {formatRating(doctor.rating)}
                <span className="text-xs font-normal text-admin-muted">({doctor.reviews})</span>
              </span>
            </td>
            <td className={adminCellClass}>
              <AdminStatusBadge style={adminProviderStatusStyles[doctor.status]} />
            </td>
            <td className={adminCellClass}>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setOpenId(doctor.id)} className={adminViewButtonClass}>
                  View
                </button>
                <button
                  type="button"
                  onClick={() => toggleSuspend(doctor)}
                  className={doctor.status === "active" ? adminDangerButtonClass : adminSuccessButtonClass}
                >
                  {doctor.status === "active" ? "Suspend" : "Reactivate"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {openDoctor && (
        <AdminInfoModal
          title={openDoctor.name}
          subtitle={`${openDoctor.specialisation} · ${openDoctor.hospital}`}
          onClose={() => setOpenId("")}
          details={[
            { label: "Doctor ID", value: openDoctor.id },
            { label: "Qualification", value: openDoctor.qualification },
            { label: "City", value: openDoctor.city },
            { label: "Phone", value: openDoctor.phone },
            { label: "Experience", value: `${openDoctor.experience} years` },
            { label: "Appointments", value: String(openDoctor.appointments) },
            { label: "Rating", value: `${formatRating(openDoctor.rating)} / 5 (${openDoctor.reviews} reviews)` },
            { label: "Approved on", value: formatAdminDate(openDoctor.approvedOn) },
          ]}
        />
      )}
    </div>
  )
}

export default DoctorManagement
