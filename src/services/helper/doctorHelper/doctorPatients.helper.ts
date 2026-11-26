import { filterByChamber } from "./doctorDashboard.helper"
import type { DashboardChamber, DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorPatient } from "../../../types/type/doctorType/DoctorPatients.type"

// Access rule: a patient is listed only if they have an appointment with this doctor
// (in the chosen chamber), then filtered by name
export const getVisiblePatients = (
  patients: DoctorPatient[],
  appointments: DoctorAppointment[],
  chamberId: string,
  query: string,
) => {
  const allowed = filterByChamber(appointments, chamberId)
  const term = query.trim().toLowerCase()

  return patients.filter(
    (patient) =>
      allowed.some((appointment) => appointment.patientId === patient.id) &&
      (!term || patient.name.toLowerCase().includes(term)),
  )
}

export const getPatientAppointments = (patientId: string, appointments: DoctorAppointment[]) =>
  appointments.filter((appointment) => appointment.patientId === patientId)

export const getPatientChamberNames = (
  patientId: string,
  appointments: DoctorAppointment[],
  chambers: DashboardChamber[],
) => {
  const ids = new Set(getPatientAppointments(patientId, appointments).map((appointment) => appointment.chamberId))
  return chambers.filter((chamber) => ids.has(chamber.id)).map((chamber) => chamber.hospital)
}

// visits are newest first
export const getLastVisit = (patient: DoctorPatient) => patient.visits[0]?.date ?? "No visit yet"