import { ALL_STATUSES, appointmentActions } from "../../../constants/doctorConstants/doctorAppointments.constants"
import type { AppointmentDay, DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { AppointmentStatusFilter } from "../../../types/type/doctorType/DoctorAppointments.type"

// Tab + status + patient name search
export const filterAppointments = (
  appointments: DoctorAppointment[],
  day: AppointmentDay,
  status: AppointmentStatusFilter,
  query: string,
) => {
  const term = query.trim().toLowerCase()

  return appointments.filter(
    (appointment) =>
      appointment.day === day &&
      (status === ALL_STATUSES || appointment.status === status) &&
      (!term || appointment.patient.toLowerCase().includes(term)),
  )
}

// Buttons for one row; "Mark no-show" only once the visit day has come
export const getAppointmentActions = (appointment: DoctorAppointment) =>
  appointmentActions[appointment.status].filter(
    (action) => action.next !== "no-show" || appointment.day !== "upcoming",
  )