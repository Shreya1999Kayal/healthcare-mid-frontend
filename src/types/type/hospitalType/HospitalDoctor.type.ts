export type DoctorAvailability = "available" | "on-leave" | "off-duty"

export type HospitalDoctor = {
  id: string
  name: string
  doctorCode: string // Seva doctor ID, e.g. SEVA-DOC-1001
  speciality: string
  department: string // must match a department name
  qualification: string
  experience: number // years
  phone: string
  fee: number // consultation fee in ₹
  timings: string
  availability: DoctorAvailability
}

// Everything is text in the form
export type HospitalDoctorFormValues = {
  name: string
  doctorCode: string
  speciality: string
  department: string
  qualification: string
  experience: string
  phone: string
  fee: string
  timings: string
  availability: DoctorAvailability
}

export type HospitalDoctorFieldName = keyof HospitalDoctorFormValues

export type HospitalDoctorFormErrors = Partial<Record<HospitalDoctorFieldName, string>>

export type HospitalDoctorField = {
  name: HospitalDoctorFieldName
  label: string
  required?: boolean
  type?: "text" | "number" | "tel"
  options?: string[] // shows a select
  placeholder?: string
}