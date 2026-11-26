import { HOSPITAL_TODAY } from "../../../constants/hospitalConstants/hospitalDashboard.constants"
import { VERIFICATION_SECTION, contactFields, hospitalFields, verificationDocuments } from "../../../constants/hospitalConstants/hospitalVerification.constants"
import type {
  VerificationDocuments,
  VerificationFormErrors,
  VerificationFormValues,
  VerificationStatus,
} from "../../../types/type/hospitalType/HospitalVerification.type"

const currentYear = Number(HOSPITAL_TODAY.slice(0, 4))

export const isHospitalApproved = (status: VerificationStatus) => status === "approved"

// Before approval every section except Verification is locked
export const isHospitalSectionLocked = (section: string, status: VerificationStatus) =>
  !isHospitalApproved(status) && section !== VERIFICATION_SECTION

// The form can be filled before sending it, or again after a rejection
export const canEditVerification = (status: VerificationStatus) => status === "not-submitted" || status === "rejected"

export const validateVerification = (form: VerificationFormValues, documents: VerificationDocuments): VerificationFormErrors => {
  const errors: VerificationFormErrors = {}

  for (const field of [...hospitalFields, ...contactFields]) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  for (const document of verificationDocuments) {
    if (document.required && !documents[document.key].fileName) errors[document.key] = `Upload the ${document.title.toLowerCase()}`
  }

  const year = Number(form.establishedYear)
  if (form.establishedYear && (year < 1800 || year > currentYear)) {
    errors.establishedYear = `Enter a year between 1800 and ${currentYear}`
  }

  if (form.totalBeds && !(Number(form.totalBeds) > 0)) errors.totalBeds = "Total beds must be more than 0"

  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Enter a valid email"

for (const name of ["phone", "emergencyPhone"] as const) {
  if (form[name] && !/^\d{10}$/.test(form[name].replace(/\s/g, ""))) errors[name] = "Enter a 10-digit phone number"
}

  if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit pincode"

  return errors
}