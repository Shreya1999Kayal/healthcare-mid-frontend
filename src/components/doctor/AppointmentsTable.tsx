import StatusBadge from "./StatusBadge"
import { actionToneClass } from "../../constants/doctorConstants/doctorAppointments.constants"
import { getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { getAppointmentActions } from "../../services/helper/doctorHelper/doctorAppointments.helper"
import type { AppointmentsTableProps } from "../../types/interface/doctorInterface/DoctorAppointments.interface"

const columns = ["Patient", "Chamber", "Date", "Time", "Type", "Status", "Actions"]

const AppointmentsTable = ({ appointments, chambers, onStatusChange }: AppointmentsTableProps) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-doctor-border bg-white shadow-sm shadow-doctor-navy/10">
      <table className="w-full min-w-[56rem] text-left text-sm">
        <thead className="bg-doctor-bg-soft text-doctor-navy">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const actions = getAppointmentActions(appointment)

            return (
              <tr key={appointment.id} className="border-t border-doctor-border">
                <td className="px-4 py-3">
                  <p className="font-semibold text-doctor-navy">{appointment.patient}</p>
                  <p className="text-xs text-doctor-muted">
                    {appointment.age} yrs, {appointment.gender} · {appointment.reason}
                  </p>
                </td>
                <td className="px-4 py-3 text-doctor-muted">{getChamberName(chambers, appointment.chamberId)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">{appointment.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-doctor-muted">{appointment.time}</td>
                <td className="px-4 py-3">
                  <span
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                      appointment.mode === "Online" ? "bg-indigo-50 text-indigo-700" : "bg-doctor-bg text-doctor-navy"
                    }`}
                  >
                    {appointment.mode}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="px-4 py-3">
                  {actions.length === 0 ? (
                    <span className="text-doctor-muted">—</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {actions.map((action) => (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => onStatusChange(appointment.id, action.next)}
                          className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${actionToneClass[action.tone]}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentsTable