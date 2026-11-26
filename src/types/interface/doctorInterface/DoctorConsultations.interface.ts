import type { DashboardChamber, DoctorAppointment } from "../../type/doctorType/DoctorDashboard.type"
import type { DoctorPatient } from "../../type/doctorType/DoctorPatients.type"
import type { ConsultationFormValues, DoctorConsultation } from "../../type/doctorType/DoctorConsultations.type"

export interface ConsultationPatientListProps {
  appointments: DoctorAppointment[]
  chambers: DashboardChamber[]
  selectedId?: string
  onSelect: (appointmentId: string) => void
}

export interface PatientSummaryProps {
  patient: DoctorPatient
  appointment: DoctorAppointment
  chambers: DashboardChamber[]
  consultations: DoctorConsultation[]
}

export interface ConsultationFormProps {
  patientId: string
  onComplete: (values: ConsultationFormValues) => void
}

export interface PastConsultationsProps {
  consultations: DoctorConsultation[]
  chambers: DashboardChamber[]
}