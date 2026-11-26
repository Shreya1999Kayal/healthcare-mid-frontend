import { Link, useParams } from "react-router-dom"
import type { NextAppointmentProps } from "../../types/interface/doctorInterface/DoctorDashboard.interface"
import { doctorPath, getChamberName } from "../../services/helper/doctorHelper/doctorDashboard.helper"


const NextAppointment = ({ appointment, chambers }: NextAppointmentProps) => {
  const { id = "" } = useParams()
  return (
    <section className="rounded-2xl bg-linear-to-br from-doctor-navy to-doctor-primary-dark p-5 text-white shadow-md shadow-doctor-navy/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Next appointment</p>

      {appointment ? (
        <>
          <h2 className="mt-2 text-xl font-bold">{appointment.patient}</h2>
          <p className="text-sm text-white/80">
            {appointment.age} yrs, {appointment.gender} · {appointment.reason}
          </p>
          <p className="mt-3 text-sm text-white/80">
            {appointment.time} · {appointment.mode}
          </p>
          <p className="text-sm text-white/80">{getChamberName(chambers, appointment.chamberId)}</p>
          <Link
            to={`${doctorPath("consultations", id)}?appointment=${appointment.id}`}
            className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-doctor-navy no-underline hover:bg-doctor-bg"
          >
            Start consultation
          </Link>
        </>
      ) : (
        <p className="mt-2 text-sm text-white/80">No patients waiting right now.</p>
      )}
    </section>
  )
}

export default NextAppointment