import { DONOR_TODAY } from "../../../../constants/blood/donorConstants/donorDashboard.constants"
import { donorProfileFields } from "../../../../constants/blood/donorConstants/donorProfile.constants"
import type { DonorProfileDetails, DonorProfileErrors } from "../../../../types/type/blood/donorType/DonorProfile.type"
import type { DonorAccount } from "../../../../types/type/blood/donorType/DonorVerification.type"
import { getAge, isValidDonorEmail, isValidDonorPhone } from "./donorVerification.helper"


// The profile starts from the details sent for verification
export const buildDonorProfile = (donor: DonorAccount): DonorProfileDetails => {
  const { details } = donor.verification

  return {
    fullName: details.fullName || donor.name,
    bloodGroup: details.bloodGroup || donor.bloodGroup,
    dateOfBirth: details.dateOfBirth,
    phone: details.phone,
    email: details.email,
    city: details.city || donor.city,
  }
}

export const validateDonorProfile = (form: DonorProfileDetails): DonorProfileErrors => {
  const errors: DonorProfileErrors = {}

  for (const field of donorProfileFields) {
    if (field.required && !form[field.name].trim()) errors[field.name] = `${field.label} is required`
  }

  if (form.dateOfBirth) {
    const age = getAge(form.dateOfBirth, DONOR_TODAY)
    if (age < 18 || age > 65) errors.dateOfBirth = "Donors must be 18 to 65 years old"
  }

  if (form.email && !isValidDonorEmail(form.email)) errors.email = "Enter a valid email"
  if (form.phone && !isValidDonorPhone(form.phone)) errors.phone = "Enter a valid phone number"

  return errors
}