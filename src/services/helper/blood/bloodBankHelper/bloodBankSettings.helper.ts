import type { BloodBankPasswordValues } from "../../../../types/type/blood/bloodBankType/BloodBankSettings.type"

export const validateBloodBankPassword = ({ current, next, confirm }: BloodBankPasswordValues) => {
  if (!current || !next || !confirm) return "Fill in all three fields"
  if (next.length < 8 || !/[a-zA-Z]/.test(next) || !/\d/.test(next)) return "New password needs at least 8 characters, with letters and numbers"
  if (next === current) return "New password must be different from the current one"
  if (next !== confirm) return "New passwords don't match"
  return ""
}

export const validateLowStockLimit = (value: string) =>
  /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 50 ? "" : "Enter a whole number from 1 to 50"