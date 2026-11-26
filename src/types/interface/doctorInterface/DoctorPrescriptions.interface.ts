import type { DashboardChamber, DoctorAppointment } from "../../type/doctorType/DoctorDashboard.type"
import type { DoctorPatient } from "../../type/doctorType/DoctorPatients.type"
import type { DoctorPrescription, MedicineField, PrescriptionMedicine } from "../../type/doctorType/DoctorPrescriptions.type"

export interface PrescriptionsTableProps {
  prescriptions: DoctorPrescription[]
  chambers: DashboardChamber[]
  onView: (prescriptionId: string) => void
}

export interface MedicineRowProps {
  medicine: PrescriptionMedicine
  index: number
  canRemove: boolean
  onChange: (medicineId: string, field: MedicineField, value: string) => void
  onRemove: (medicineId: string) => void
}

export interface PrescriptionFormProps {
  patients: DoctorPatient[]
  chambers: DashboardChamber[]
  appointments: DoctorAppointment[]
  initialPatientId: string
  onSave: (prescription: DoctorPrescription) => void
  onCancel: () => void
}

export interface PrescriptionViewProps {
  prescription: DoctorPrescription
  chambers: DashboardChamber[]
  onClose: () => void
}