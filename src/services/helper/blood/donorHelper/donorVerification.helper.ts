import { DONOR_TODAY } from "../../../../constants/blood/donorConstants/donorDashboard.constants"
import { DONOR_VERIFICATION_SECTION, donorContactFields, donorDocuments, donorPersonalFields } from "../../../../constants/blood/donorConstants/donorVerification.constants"
import type { DonorDocuments, DonorVerificationErrors, DonorVerificationStatus, DonorVerificationValues } from "../../../../types/type/blood/donorType/DonorVerification.type"


export const isDonorApproved = (status: DonorVerificationStatus) => status === "approved"

// Before approval every section except Verification is locked
export const isDonorSectionLocked = (section: string, status: DonorVerificationStatus) =>
  !isDonorApproved(status) && section !== DONOR_VERIFICATION_SECTION

// The form can be filled before sending it, or again after a rejection
export const canEditDonorVerification = (status: DonorVerificationStatus) => status === "not-submitted" || status === "rejected"

// ("1994-06-18", "2026-11-24") -> 32
export const getAge = (dateOfBirth: string, todayIso: string) => {
  const [year, month, day] = dateOfBirth.split("-").map(Number)
  const [todayYear, todayMonth, todayDay] = todayIso.split("-").map(Number)
  let age = todayYear - year
  if (todayMonth < month || (todayMonth === month && todayDay < day)) age -= 1
  return age
}

export const isValidDonorEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim())
export const isValidDonorPhone = (value: string) => /^\+?[\d\s-]{10,15}$/.test(value.trim())

export const validateDonorVerification = (form: DonorVerificationValues, documents: DonorDocuments): DonorVerificationErrors => {
  const errors: DonorVerificationErrors = {}

  for (const field of [...donorPersonalFields, ...donorContactFields]) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  for (const document of donorDocuments) {
    if (document.required && !documents[document.key].fileName) errors[document.key] = `Upload the ${document.title.toLowerCase()}`
  }

  if (form.dateOfBirth) {
    const age = getAge(form.dateOfBirth, DONOR_TODAY)
    if (age < 18 || age > 65) errors.dateOfBirth = "Donors must be 18 to 65 years old"
  }

  if (form.weight && Number(form.weight) < 45) errors.weight = "Donors must weigh at least 45 kg"
  if (form.email && !isValidDonorEmail(form.email)) errors.email = "Enter a valid email"
  if (form.phone && !isValidDonorPhone(form.phone)) errors.phone = "Enter a valid phone number"
  if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit pincode"

  return errors
}