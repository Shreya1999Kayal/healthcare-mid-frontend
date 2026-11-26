import type { ReactNode } from "react"
import type { BloodBankNotificationPreferences } from "../../../type/blood/bloodBankType/BloodBankSettings.type"

export interface BloodBankSettingsSectionProps {
  title: string
  description: string
  children: ReactNode
}

export interface BloodBankSwitchProps {
  checked: boolean
  label: string
  onChange: () => void
}

export interface BloodBankNotificationPreferencesFormProps {
  preferences: BloodBankNotificationPreferences
  onSave: (preferences: BloodBankNotificationPreferences) => void
}

export interface LowStockLimitFormProps {
  limit: number
  onSave: (limit: number) => void
}