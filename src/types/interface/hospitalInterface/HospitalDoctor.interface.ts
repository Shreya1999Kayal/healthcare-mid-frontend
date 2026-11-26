import type { DoctorAvailability, HospitalDoctor, HospitalDoctorFormValues } from "../../type/hospitalType/HospitalDoctor.type"

export interface HospitalDoctorsTableProps {
  doctors: HospitalDoctor[]
  onEdit: (doctor: HospitalDoctor) => void
  onRemove: (doctor: HospitalDoctor) => void
  onAvailabilityChange: (doctorId: string, availability: DoctorAvailability) => void
}

export interface HospitalDoctorFormProps {
  doctor?: HospitalDoctor // empty when adding a new doctor
  doctors: HospitalDoctor[] // used to stop duplicate doctor IDs
  onSave: (values: HospitalDoctorFormValues) => void
  onCancel: () => void
}