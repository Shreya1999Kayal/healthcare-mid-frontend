import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Search } from "lucide-react"
import AppointmentsTable from "../../components/doctor/AppointmentsTable"
import DoctorEmptyState from "../../components/doctor/DoctorEmptyState"
import DoctorTabs from "../../components/doctor/DoctorTabs"
import { appointmentStatusStyles, doctorAppointments, doctorChambers, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { ALL_STATUSES, appointmentStatusList, appointmentTabs } from "../../constants/doctorConstants/doctorAppointments.constants"
import { filterByChamber } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { filterAppointments } from "../../services/helper/doctorHelper/doctorAppointments.helper"
import type { DoctorOutletContext } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import type { AppointmentDay, AppointmentStatus, DoctorAppointment } from "../../types/type/doctorType/DoctorDashboard.type"
import type { AppointmentStatusFilter } from "../../types/type/doctorType/DoctorAppointments.type"

const DoctorAppointments = () => {
  const { chamberId } = useOutletContext<DoctorOutletContext>()

  // Local copy so Approve / Reject / Cancel update the table (UI only, nothing is saved)
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(doctorAppointments)
  const [day, setDay] = useState<AppointmentDay>("today")
  const [status, setStatus] = useState<AppointmentStatusFilter>(ALL_STATUSES)
  const [query, setQuery] = useState("")

  const chamberAppointments = filterByChamber(appointments, chamberId)
  const visibleAppointments = filterAppointments(chamberAppointments, day, status, query)
  const tabs = appointmentTabs.map((tab) => ({
    ...tab,
    count: chamberAppointments.filter((appointment) => appointment.day === tab.id).length,
  }))
  const requests = chamberAppointments.filter(
    (appointment) => appointment.status === "pending" || appointment.status === "reschedule-requested",
  ).length

  const changeStatus = (appointmentId: string, next: AppointmentStatus) =>
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === appointmentId ? { ...appointment, status: next } : appointment)),
    )

  const hasFilters = status !== ALL_STATUSES || query !== ""
  const clearFilters = () => {
    setStatus(ALL_STATUSES)
    setQuery("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Appointments</h1>
        <p className="text-sm text-doctor-muted">
          {requests} {requests === 1 ? "request needs" : "requests need"} your answer
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DoctorTabs options={tabs} value={day} onChange={setDay} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-doctor-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patient name"
              aria-label="Search patient name"
              className={`${doctorFieldClass} w-full pl-9 sm:w-64`}
            />
          </label>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as AppointmentStatusFilter)}
            aria-label="Filter by status"
            className={doctorFieldClass}
          >
            <option value={ALL_STATUSES}>All statuses</option>
            {appointmentStatusList.map((item) => (
              <option key={item} value={item}>
                {appointmentStatusStyles[item].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm font-medium text-doctor-muted" aria-live="polite">
        {visibleAppointments.length} {visibleAppointments.length === 1 ? "appointment" : "appointments"}
      </p>

      {visibleAppointments.length > 0 ? (
        <AppointmentsTable appointments={visibleAppointments} chambers={doctorChambers} onStatusChange={changeStatus} />
      ) : (
        <DoctorEmptyState
          title="No appointments found"
          message="Try another tab, status or patient name."
          actionLabel={hasFilters ? "Clear filters" : undefined}
          onAction={clearFilters}
        />
      )}
    </div>
  )
}

export default DoctorAppointments