import { filterByChamber } from "./doctorDashboard.helper"
import { consultableStatuses } from "../../../constants/doctorConstants/doctorConsultations.constants"
import type { DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorConsultation } from "../../../types/type/doctorType/DoctorConsultations.type"

// Today's patients the doctor can open: in consultation, then checked in, then confirmed
export const getConsultableAppointments = (appointments: DoctorAppointment[], chamberId: string) => {
  const today = filterByChamber(appointments, chamberId).filter((appointment) => appointment.day === "today")
  return consultableStatuses.flatMap((status) => today.filter((appointment) => appointment.status === status))
}

// "CBC, ECG" -> ["CBC", "ECG"]
export const splitList = (text: string) =>
  text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

export const getPatientConsultations = (consultations: DoctorConsultation[], patientId: string) =>
  consultations.filter((consultation) => consultation.patientId === patientId)