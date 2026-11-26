import type { HospitalPasswordFormValues, HospitalPreferences } from "../../../types/type/hospitalType/HospitalSettings.type"

// Returns the first problem, or "" when the form is fine
export const validateHospitalPassword = ({ current, next, confirm }: HospitalPasswordFormValues) => {
  if (!current) return "Enter your current password."
  if (next.length < 8) return "New password must be at least 8 characters."
  if (!/[A-Za-z]/.test(next) || !/[0-9]/.test(next)) return "Use both letters and numbers."
  if (next === current) return "New password must be different from the current one."
  if (next !== confirm) return "The two new passwords do not match."
  return ""
}

export const validateHospitalPreferences = ({ maxAppointmentsPerDay }: HospitalPreferences) => {
  const max = Number(maxAppointmentsPerDay)
  if (!Number.isInteger(max) || max < 1) return "Max appointments per day must be a whole number above 0."
  return ""
}