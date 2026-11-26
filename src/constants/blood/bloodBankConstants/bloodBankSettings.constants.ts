import type {
  BloodBankNotificationPreferences,
  BloodBankPasswordField,
  BloodBankPasswordValues,
  BloodBankPreferenceOption,
} from "../../../types/type/blood/bloodBankType/BloodBankSettings.type"

export const bloodBankPasswordFields: BloodBankPasswordField[] = [
  { name: "current", label: "Current password" },
  { name: "next", label: "New password" },
  { name: "confirm", label: "Confirm new password" },
]

export const initialBloodBankPasswordForm: BloodBankPasswordValues = { current: "", next: "", confirm: "" }

export const bloodBankPreferenceOptions: BloodBankPreferenceOption[] = [
  { key: "newRequest", label: "New blood requests", hint: "When a hospital sends a request" },
  { key: "lowStock", label: "Low stock alerts", hint: "When a blood group goes low or out of stock" },
  { key: "reviews", label: "New reviews", hint: "When a patient rates your blood bank" },
]

export const initialBloodBankPreferences: BloodBankNotificationPreferences = {
  newRequest: true,
  lowStock: true,
  reviews: false,
}