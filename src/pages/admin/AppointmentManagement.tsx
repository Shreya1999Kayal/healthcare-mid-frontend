import { useState } from "react"
import { CalendarCheck, CircleCheck, CircleX, Clock } from "lucide-react"
import AdminFilterBar from "../../components/admin/AdminFilterBar"
import AdminPageHeader from "../../components/admin/AdminPageHeader"
import AdminStatusBadge from "../../components/admin/AdminStatusBadge"
import AdminSummaryCard from "../../components/admin/AdminSummaryCard"
import AdminTable from "../../components/admin/AdminTable"
import {
  ADMIN_ALL,
  adminAppointmentStatusStyles,
  adminAppointments,
  adminCellClass,
  adminRowClass,
} from "../../constants/adminConstants/adminManagement.constants"
import { formatAdminDate } from "../../services/helper/adminHelper/adminDashboard.helper"
import { listOptions, matchesOption, matchesSearch, styleOptions } from "../../services/helper/adminHelper/adminManagement.helper"
import type { AdminAppointmentStatus } from "../../types/type/adminType/AdminManagement.type"

// View only: hospitals and doctors manage their own appointments
const AppointmentManagement = () => {
  const [search, setSearch] = useState("")
  const [doctor, setDoctor] = useState(ADMIN_ALL)
  const [hospital, setHospital] = useState(ADMIN_ALL)
  const [status, setStatus] = useState(ADMIN_ALL)

  // Latest date first
  const shownAppointments = adminAppointments
    .filter(
      (appointment) =>
        matchesSearch(search, [appointment.patient, appointment.id]) &&
        matchesOption(doctor, appointment.doctor) &&
        matchesOption(hospital, appointment.hospital) &&
        matchesOption(status, appointment.status),
    )
    .sort((a, b) => b.date.localeCompare(a.date))

  const countStatus = (value: AdminAppointmentStatus) =>
    adminAppointments.filter((appointment) => appointment.status === value).length

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader title="Appointment management" subtitle="Every appointment across doctors and hospitals." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminSummaryCard label="Pending" value={countStatus("pending")} hint="Waiting for the doctor" icon={Clock} />
        <AdminSummaryCard label="Confirmed" value={countStatus("confirmed")} hint="Booked" icon={CalendarCheck} />
        <AdminSummaryCard label="Completed" value={countStatus("completed")} hint="Visit done" icon={CircleCheck} />
        <AdminSummaryCard label="Cancelled" value={countStatus("cancelled")} hint="By patient or doctor" icon={CircleX} />
      </div>

      <AdminFilterBar
        search={search}
        onSearch={setSearch}
        placeholder="Search patient or ID"
        filters={[
          { label: "All doctors", value: doctor, options: listOptions(adminAppointments.map((item) => item.doctor)), onChange: setDoctor },
          { label: "All hospitals", value: hospital, options: listOptions(adminAppointments.map((item) => item.hospital)), onChange: setHospital },
          { label: "All statuses", value: status, options: styleOptions(adminAppointmentStatusStyles), onChange: setStatus },
        ]}
      />

      <AdminTable headers={["Patient", "Doctor", "Hospital", "Date", "Time", "Status"]} isEmpty={shownAppointments.length === 0}>
        {shownAppointments.map((appointment) => (
          <tr key={appointment.id} className={adminRowClass}>
            <td className={adminCellClass}>
              <p className="font-semibold text-admin-navy">{appointment.patient}</p>
              <p className="text-xs text-admin-muted">ID: {appointment.id}</p>
            </td>
            <td className={`${adminCellClass} text-admin-navy`}>{appointment.doctor}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{appointment.hospital}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{formatAdminDate(appointment.date)}</td>
            <td className={`${adminCellClass} text-admin-navy`}>{appointment.time}</td>
            <td className={adminCellClass}>
              <AdminStatusBadge style={adminAppointmentStatusStyles[appointment.status]} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}

export default AppointmentManagement
