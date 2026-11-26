export type ConsultationFormValues = {
  symptoms: string
  observations: string
  notes: string
  diagnosis: string
  testsAdvised: string // comma separated in the form
  followUpDate: string // yyyy-mm-dd, empty = no follow-up
}

export type DoctorConsultation = {
  id: string
  patientId: string
  patient: string
  chamberId: string
  date: string
  symptoms: string
  observations: string
  notes: string
  diagnosis: string
  testsAdvised: string[]
  followUpDate: string // yyyy-mm-dd, empty = no follow-up
}