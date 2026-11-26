import type { DashboardChamber, DoctorAppointment } from "../../type/doctorType/DoctorDashboard.type"
import type { DoctorPatient } from "../../type/doctorType/DoctorPatients.type"

export interface PatientsTableProps {
  patients: DoctorPatient[]
  appointments: DoctorAppointment[]
  chambers: DashboardChamber[]
  onView: (patientId: string) => void
}

export interface PatientDetailsModalProps {
  patient: DoctorPatient
  appointments: DoctorAppointment[]
  chambers: DashboardChamber[]
  onClose: () => void
}