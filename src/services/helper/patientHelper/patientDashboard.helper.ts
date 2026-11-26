import { PATIENT_BASE_PATH, PATIENT_PASSWORD_MIN } from "../../../constants/patientConstants/patientDashboard.constants"
import type {
  PatientPasswordErrors,
  PatientPasswordValues,
  PatientProfileErrors,
  PatientProfileValues,
} from "../../../types/type/patientType/PatientDashboard.type"

// ("appointments", "p1") -> "/patientDashboard/appointments/p1"
export const patientPath = (section: string, patientId: string) => `${PATIENT_BASE_PATH}/${section}/${patientId}`

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// "2026-11-21" -> "21 Nov 2026", "" -> "—"
export const formatPatientDate = (iso: string) => {
  if (!iso) return "—"
  const [year, month, day] = iso.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}

// "14:30" -> "2:30 PM"
export const formatPatientTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number)
  const suffix = hour >= 12 ? "PM" : "AM"
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`
}

// "Rahul Sen" -> "RS"
export const getPatientInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()

// true when at least one field has a message
export const hasErrors = (errors: Record<string, string | undefined>) => Object.values(errors).some(Boolean)

const PHONE_PATTERN = /^\d{10}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateProfile = (form: PatientProfileValues): PatientProfileErrors => {
  const errors: PatientProfileErrors = {}
  const age = Number(form.age)

  if (!form.name.trim()) errors.name = "Name is required"
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email"
  if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = "Phone must be exactly 10 digits"
  if (form.age === "" || age < 1 || age > 120) errors.age = "Enter an age between 1 and 120"
  if (!form.gender) errors.gender = "Pick a gender"
  if (!form.bloodGroup) errors.bloodGroup = "Pick a blood group"
  if (!form.address.trim()) errors.address = "Address is required"
  if (!form.emergencyName.trim()) errors.emergencyName = "Emergency contact name is required"
  if (!PHONE_PATTERN.test(form.emergencyPhone.trim())) errors.emergencyPhone = "Phone must be exactly 10 digits"

  return errors
}

export const validatePassword = (form: PatientPasswordValues): PatientPasswordErrors => {
  const errors: PatientPasswordErrors = {}

  if (!form.current) errors.current = "Enter your current password"
  if (form.next.length < PATIENT_PASSWORD_MIN) errors.next = `Use at least ${PATIENT_PASSWORD_MIN} characters`
  else if (form.next === form.current) errors.next = "New password must be different"
  if (form.confirm !== form.next) errors.confirm = "Passwords do not match"

  return errors
}
