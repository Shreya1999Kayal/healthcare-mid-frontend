import { ALL_OPTION } from "../../../constants/hospitalConstants/hospitalDoctor.constants"
import type {
  HospitalDoctor,
  HospitalDoctorFormErrors,
  HospitalDoctorFormValues,
} from "../../../types/type/hospitalType/HospitalDoctor.type"

// "Dr. Amit Roy" -> "AR"
export const getDoctorInitials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

// currentId = doctor being edited (so the ID doesn't count as a duplicate of itself)
export const validateHospitalDoctor = (
  form: HospitalDoctorFormValues,
  doctors: HospitalDoctor[],
  currentId?: string,
): HospitalDoctorFormErrors => {
  const errors: HospitalDoctorFormErrors = {}

  if (!form.name.trim()) errors.name = "Doctor name is required"

  const code = form.doctorCode.trim().toUpperCase()
  if (!code) errors.doctorCode = "Doctor ID is required"
  else if (doctors.some((doctor) => doctor.doctorCode === code && doctor.id !== currentId)) {
    errors.doctorCode = "This doctor is already added"
  }

  if (!form.department) errors.department = "Pick a department"
  if (!form.speciality.trim()) errors.speciality = "Speciality is required"
  if (!form.qualification.trim()) errors.qualification = "Qualification is required"
  if (form.experience === "" || Number(form.experience) < 0) errors.experience = "Enter years of experience"
  if (form.fee === "" || Number(form.fee) < 0) errors.fee = "Enter the consultation fee"
  if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number"
  if (!form.timings.trim()) errors.timings = "Timings are required"

  return errors
}

export const toHospitalDoctorForm = (doctor: HospitalDoctor): HospitalDoctorFormValues => ({
  name: doctor.name,
  doctorCode: doctor.doctorCode,
  speciality: doctor.speciality,
  department: doctor.department,
  qualification: doctor.qualification,
  experience: String(doctor.experience),
  phone: doctor.phone,
  fee: String(doctor.fee),
  timings: doctor.timings,
  availability: doctor.availability,
})

// current = doctor being edited; empty when adding a new one
export const fromHospitalDoctorForm = (form: HospitalDoctorFormValues, current?: HospitalDoctor): HospitalDoctor => ({
  id: current?.id ?? `hd${Date.now()}`,
  name: form.name.trim(),
  doctorCode: form.doctorCode.trim().toUpperCase(),
  speciality: form.speciality.trim(),
  department: form.department,
  qualification: form.qualification.trim(),
  experience: Number(form.experience),
  phone: form.phone.trim(),
  fee: Number(form.fee),
  timings: form.timings.trim(),
  availability: form.availability,
})

// Search (name or doctor ID) + department + availability
export const filterHospitalDoctors = (doctors: HospitalDoctor[], search: string, department: string, availability: string) => {
  const text = search.trim().toLowerCase()

  return doctors.filter((doctor) => {
    const matchesSearch =
      !text || doctor.name.toLowerCase().includes(text) || doctor.doctorCode.toLowerCase().includes(text)
    const matchesDepartment = department === ALL_OPTION || doctor.department === department
    const matchesAvailability = availability === ALL_OPTION || doctor.availability === availability

    return matchesSearch && matchesDepartment && matchesAvailability
  })
}