export type BloodBankPasswordValues = {
  current: string
  next: string
  confirm: string
}

export type BloodBankPasswordField = {
  name: keyof BloodBankPasswordValues
  label: string
}

export type BloodBankNotificationPreferences = {
  newRequest: boolean
  lowStock: boolean
  reviews: boolean
}

export type BloodBankPreferenceOption = {
  key: keyof BloodBankNotificationPreferences
  label: string
  hint: string
}