import { HOSPITAL_BANK_TYPE } from "../../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"

import { isValidEmail, isValidPhone } from "./bloodBankVerification.helper"
import type { BloodBankAccount } from "../../../../types/type/blood/bloodBankType/BloodBankVerification.type"
import type { BloodBankProfileDetails, BloodBankProfileErrors } from "../../../../types/type/blood/bloodBankType/BloodBankProfile.type"
import { bloodBankProfileFields } from "../../../../constants/blood/bloodBankConstants/bloodBankProfile.constants"

// The profile starts from the details sent for verification
export const buildBloodBankProfile = (bank: BloodBankAccount): BloodBankProfileDetails => {
  const { details } = bank.verification

  return {
    bankName: details.bankName || bank.name,
    bankType: details.bankType,
    linkedHospital: details.linkedHospital,
    phone: details.phone,
    email: details.email,
    timings: "Open 24 hours",
    city: details.city || bank.city,
    address: details.address,
    about: "",
  }
}

export const validateBloodBankProfile = (form: BloodBankProfileDetails): BloodBankProfileErrors => {
  const errors: BloodBankProfileErrors = {}

  for (const field of bloodBankProfileFields) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  if (form.bankType === HOSPITAL_BANK_TYPE && !form.linkedHospital) {
    errors.linkedHospital = "Choose the hospital this blood bank belongs to"
  }

  if (form.email && !isValidEmail(form.email)) errors.email = "Enter a valid email"
  if (form.phone && !isValidPhone(form.phone)) errors.phone = "Enter a valid phone number"

  return errors
}