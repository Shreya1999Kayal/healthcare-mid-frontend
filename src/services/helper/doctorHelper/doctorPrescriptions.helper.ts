import type { DoctorAppointment } from "../../../types/type/doctorType/DoctorDashboard.type"
import type { DoctorPrescription, PrescriptionMedicine } from "../../../types/type/doctorType/DoctorPrescriptions.type"

let medicineCount = 0

// Blank medicine row with its own id
export const createEmptyMedicine = (): PrescriptionMedicine => {
  medicineCount += 1
  return { id: `m-new-${medicineCount}`, name: "", dosage: "", frequency: "Once a day", duration: "", instructions: "" }
}

export const searchPrescriptions = (prescriptions: DoctorPrescription[], query: string) => {
  const term = query.trim().toLowerCase()
  return term ? prescriptions.filter((prescription) => prescription.patient.toLowerCase().includes(term)) : prescriptions
}

// Chamber of the patient's first appointment, used to pre-fill the form
export const getDefaultChamber = (patientId: string, appointments: DoctorAppointment[]) =>
  appointments.find((appointment) => appointment.patientId === patientId)?.chamberId ?? ""