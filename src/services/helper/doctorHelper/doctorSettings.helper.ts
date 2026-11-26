import type { PasswordFormValues } from "../../../types/type/doctorType/DoctorSettings.type"

// Returns the first problem, or "" when the form is fine
export const validatePassword = ({ current, next, confirm }: PasswordFormValues) => {
  if (!current) return "Enter your current password."
  if (next.length < 8) return "New password must be at least 8 characters."
  if (!/[A-Za-z]/.test(next) || !/[0-9]/.test(next)) return "Use both letters and numbers."
  if (next === current) return "New password must be different from the current one."
  if (next !== confirm) return "The two new passwords do not match."
  return ""
}