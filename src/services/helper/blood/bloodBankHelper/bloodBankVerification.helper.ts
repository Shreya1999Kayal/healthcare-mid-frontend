import { BLOOD_BANK_TODAY } from "../../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import {
  HOSPITAL_BANK_TYPE,
  VERIFICATION_SECTION,
  bankContactFields,
  bankFields,
  bloodBankDocuments,
} from "../../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"
import type {
  BloodBankDocuments,
  BloodBankVerificationErrors,
  BloodBankVerificationValues,
  VerificationStatus,
} from "../../../../types/type/blood/bloodBankType/BloodBankVerification.type"

const currentYear = Number(BLOOD_BANK_TODAY.slice(0, 4))

export const isBloodBankApproved = (status: VerificationStatus) => status === "approved"

// Before approval every section except Verification is locked
export const isBloodBankSectionLocked = (section: string, status: VerificationStatus) =>
  !isBloodBankApproved(status) && section !== VERIFICATION_SECTION

// The form can be filled before sending it, or again after a rejection
export const canEditBloodBankVerification = (status: VerificationStatus) => status === "not-submitted" || status === "rejected"

export const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim())
export const isValidPhone = (value: string) => /^\d{10}$/.test(value.replace(/\s/g, ""))
export const validateBloodBankVerification = (
  form: BloodBankVerificationValues,
  documents: BloodBankDocuments,
): BloodBankVerificationErrors => {
  const errors: BloodBankVerificationErrors = {}

  for (const field of [...bankFields, ...bankContactFields]) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  // A hospital blood bank must say which hospital it belongs to
  if (form.bankType === HOSPITAL_BANK_TYPE && !form.linkedHospital) {
    errors.linkedHospital = "Choose the hospital this blood bank belongs to"
  }

  for (const document of bloodBankDocuments) {
    if (document.required && !documents[document.key].fileName) errors[document.key] = `Upload the ${document.title.toLowerCase()}`
  }

  const year = Number(form.establishedYear)
  if (form.establishedYear && (Number.isNaN(year) || year < 1900 || year > currentYear)) {
    errors.establishedYear = `Enter a year between 1900 and ${currentYear}`
  }

  if (form.email && !isValidEmail(form.email)) errors.email = "Enter a valid email"
  if (form.phone && !isValidPhone(form.phone)) errors.phone = "Enter a 10-digit phone number"
  if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit pincode"

  return errors
}