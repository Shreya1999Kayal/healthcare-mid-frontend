import { Link, useOutletContext } from "react-router-dom"
import { Bell, CalendarCheck, Droplet, Hospital, Stethoscope } from "lucide-react"
import PatientStatusBadge from "../../components/patient/PatientStatusBadge"
import PatientSummaryCard from "../../components/patient/PatientSummaryCard"
import { patientCardClass, patientOutlineButtonClass } from "../../constants/patientConstants/patientDashboard.constants"
import {
  patientAppointmentStatusStyles,
  patientBloodRequestStatusStyles,
} from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate, formatPatientTime, patientPath } from "../../services/helper/patientHelper/patientDashboard.helper"
import { getAppointmentTab, getNextAppointment, isActiveBloodRequest } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"

const PatientDashboard = () => {
  const { patient, appointments, bloodRequests, notifications } = useOutletContext<PatientOutletContext>()

  const nextAppointment = getNextAppointment(appointments)
  const activeRequests = bloodRequests.filter(isActiveBloodRequest)
  const upcomingCount = appointments.filter((appointment) => getAppointmentTab(appointment) === "upcoming").length
  const unread = notifications.filter((notification) => notification.unread).length

  const quickLinks = [
    { label: "Book a doctor", to: patientPath("appointments", patient.id), icon: Stethoscope },
    { label: "Request blood", to: patientPath("bloodRequests", patient.id), icon: Droplet },
    { label: "Find a hospital", to: "/hospitals", icon: Hospital },
  ]

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-linear-to-r from-patient-primary to-patient-primary-dark p-6 text-white">
        <p className="text-sm text-white/80">Welcome back</p>
        <h1 className="text-2xl font-extrabold md:text-3xl">{patient.profile.name}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-white/30"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <PatientSummaryCard label="Upcoming appointments" value={upcomingCount} hint="Pending or confirmed" icon={CalendarCheck} />
        <PatientSummaryCard label="Active blood requests" value={activeRequests.length} hint="Pending or accepted" icon={Droplet} />
        <PatientSummaryCard label="Unread notifications" value={unread} hint="New updates" icon={Bell} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={`${patientCardClass} flex flex-col gap-3`}>
          <h2 className="text-lg font-bold text-patient-navy">Next appointment</h2>
          {nextAppointment ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-patient-navy">{nextAppointment.doctor}</p>
                  <p className="text-sm text-patient-muted">
                    {nextAppointment.speciality} · {nextAppointment.hospital}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-patient-primary-dark">
                    {formatPatientDate(nextAppointment.date)} at {formatPatientTime(nextAppointment.time)}
                  </p>
                </div>
                <PatientStatusBadge style={patientAppointmentStatusStyles[nextAppointment.status]} />
              </div>
              <Link to={patientPath("appointments", patient.id)} className={`${patientOutlineButtonClass} self-start`}>
                All appointments
              </Link>
            </>
          ) : (
            <p className="text-sm text-patient-muted">No upcoming appointment.</p>
          )}
        </section>

        <section className={`${patientCardClass} flex flex-col gap-3`}>
          <h2 className="text-lg font-bold text-patient-navy">Active blood requests</h2>
          {activeRequests.length === 0 ? (
            <p className="text-sm text-patient-muted">No active blood request.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {activeRequests.map((request) => (
                <li key={request.id} className="flex items-center justify-between gap-3 rounded-lg bg-patient-bg px-3 py-2 text-sm">
                  <span className="text-patient-navy">
                    <span className="font-extrabold text-red-600">{request.bloodGroup}</span> · {request.units} units for{" "}
                    {formatPatientDate(request.neededBy)}
                  </span>
                  <PatientStatusBadge style={patientBloodRequestStatusStyles[request.status]} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className={`${patientCardClass} flex flex-col gap-3`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-patient-navy">Recent notifications</h2>
          <Link to={patientPath("notifications", patient.id)} className="text-sm font-semibold text-patient-primary-dark">
            See all
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          {notifications.slice(0, 3).map((notification) => (
            <li key={notification.id} className="flex items-start gap-3 text-sm">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.unread ? "bg-patient-primary" : "bg-slate-300"}`} />
              <span className="text-patient-navy">
                {notification.message} <span className="text-xs text-patient-muted">· {notification.time}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PatientDashboard
