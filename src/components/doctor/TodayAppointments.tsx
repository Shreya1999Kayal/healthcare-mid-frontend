import { Link, useParams } from "react-router-dom"

import StatusBadge from "./StatusBadge"
import type { TodayAppointmentsProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { doctorCardClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { doctorPath, getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"

const TodayAppointments = ({ appointments, chambers }: TodayAppointmentsProps) => {
  const { id = "" } = useParams()
  return (
    <section className={doctorCardClass}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-doctor-navy">Today's appointments</h2>
        <Link to={doctorPath("appointments", id)} className="text-sm font-semibold text-doctor-primary-dark no-underline hover:underline">
          View all
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-doctor-muted">No appointments today.</p>
      ) : (
        <ul className="divide-y divide-doctor-border">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-sm font-semibold text-doctor-navy">{appointment.time}</span>
                <div>
                  <p className="font-semibold text-doctor-navy">
                    {appointment.patient}
                    <span className="font-normal text-doctor-muted">
                      {" "}
                      · {appointment.age} yrs, {appointment.gender}
                    </span>
                  </p>
                  <p className="text-xs text-doctor-muted">
                    {appointment.reason} · {getChamberName(chambers, appointment.chamberId)} · {appointment.mode}
                  </p>
                </div>
              </div>
              <StatusBadge status={appointment.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TodayAppointments