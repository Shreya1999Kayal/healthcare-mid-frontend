import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { CalendarClock, MapPin, Plus } from "lucide-react"
import PatientBookingForm from "../../components/patient/PatientBookingForm"
import PatientStatusBadge from "../../components/patient/PatientStatusBadge"
import {
  patientCardClass,
  patientDangerButtonClass,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { patientAppointmentStatusStyles, patientAppointmentTabs } from "../../constants/patientConstants/patientCare.constants"
import { formatPatientDate, formatPatientTime } from "../../services/helper/patientHelper/patientDashboard.helper"
import { canChangeAppointment, getAppointmentTab, sortAppointments } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientOutletContext } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientAppointment, PatientAppointmentTab, PatientBookingValues } from "../../types/type/patientType/PatientCare.type"

const Appointments = () => {
  const { appointments, onBookAppointment, onRescheduleAppointment, onCancelAppointment } = useOutletContext<PatientOutletContext>()
  const [tab, setTab] = useState<PatientAppointmentTab>("upcoming")
  const [formMode, setFormMode] = useState("") // "" = closed, "new" = booking, otherwise the id being rescheduled
  const [message, setMessage] = useState("")

  // Upcoming: earliest first; past and cancelled: latest first
  const sorted = sortAppointments(appointments.filter((appointment) => getAppointmentTab(appointment) === tab))
  const shownAppointments = tab === "upcoming" ? sorted : [...sorted].reverse()
  const editing = appointments.find((appointment) => appointment.id === formMode)
  const countTab = (value: PatientAppointmentTab) => appointments.filter((appointment) => getAppointmentTab(appointment) === value).length

  const save = (values: PatientBookingValues) => {
    if (editing) {
      onRescheduleAppointment(editing.id, values)
      setMessage(`Moved to ${formatPatientDate(values.date)} at ${formatPatientTime(values.time)}. Waiting for ${editing.doctor} to confirm.`)
    } else {
      onBookAppointment(values)
      setMessage("Appointment requested. The doctor will confirm it soon.")
    }
    setFormMode("")
    setTab("upcoming")
  }

  const cancel = (appointment: PatientAppointment) => {
    if (!window.confirm(`Cancel your appointment with ${appointment.doctor}?`)) return
    onCancelAppointment(appointment.id)
    setMessage(`Appointment with ${appointment.doctor} cancelled.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Appointments</h1>
          <p className="text-sm text-patient-muted">Book, reschedule or cancel your doctor visits.</p>
        </div>
        {!formMode && (
          <button
            type="button"
            onClick={() => {
              setFormMode("new")
              setMessage("")
            }}
            className={patientPrimaryButtonClass}
          >
            <Plus size={16} /> Book appointment
          </button>
        )}
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      {formMode && (
        <PatientBookingForm
          key={formMode}
          title={editing ? `Reschedule with ${editing.doctor}` : "Book an appointment"}
          appointments={appointments}
          initial={editing ? { doctorId: editing.doctorId, date: editing.date, time: editing.time, reason: editing.reason } : undefined}
          editingId={editing?.id}
          lockDoctor={Boolean(editing)}
          onSave={save}
          onCancel={() => setFormMode("")}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {patientAppointmentTabs.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTab(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === option.value
                ? "bg-patient-primary text-white"
                : "border border-patient-border bg-white text-patient-navy hover:bg-patient-bg"
            }`}
          >
            {option.label} ({countTab(option.value)})
          </button>
        ))}
      </div>

      {shownAppointments.length === 0 ? (
        <p className={`${patientCardClass} text-center text-sm text-patient-muted`}>No appointments here.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {shownAppointments.map((appointment) => (
            <article key={appointment.id} className={`${patientCardClass} flex flex-col gap-3`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-patient-navy">{appointment.doctor}</p>
                  <p className="text-sm text-patient-muted">{appointment.speciality}</p>
                </div>
                <PatientStatusBadge style={patientAppointmentStatusStyles[appointment.status]} />
              </div>

              <p className="flex items-center gap-2 text-sm text-patient-navy">
                <CalendarClock size={16} className="text-patient-primary" />
                {formatPatientDate(appointment.date)} at {formatPatientTime(appointment.time)}
              </p>
              <p className="flex items-center gap-2 text-sm text-patient-navy">
                <MapPin size={16} className="text-patient-primary" />
                {appointment.hospital}, {appointment.location}
              </p>
              <p className="text-sm text-patient-muted">Reason: {appointment.reason}</p>

              {canChangeAppointment(appointment) && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormMode(appointment.id)
                      setMessage("")
                    }}
                    className={patientOutlineButtonClass}
                  >
                    Reschedule
                  </button>
                  <button type="button" onClick={() => cancel(appointment)} className={patientDangerButtonClass}>
                    Cancel
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Appointments
