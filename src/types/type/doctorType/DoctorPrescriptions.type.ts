export type MedicineFrequency =
  | "Once a day"
  | "Twice a day"
  | "Three times a day"
  | "Four times a day"
  | "When needed"

export type PrescriptionMedicine = {
  id: string
  name: string
  dosage: string
  frequency: MedicineFrequency
  duration: string
  instructions: string
}

// Fields of a medicine row the doctor can type in
export type MedicineField = Exclude<keyof PrescriptionMedicine, "id">

export type DoctorPrescription = {
  id: string
  patientId: string
  patient: string
  age: number
  gender: "M" | "F"
  chamberId: string
  date: string
  diagnosis: string
  medicines: PrescriptionMedicine[]
  advice: string
}

export type PrescriptionFormValues = {
  patientId: string
  chamberId: string
  diagnosis: string
  advice: string
}