import type { ReactNode } from "react"
import type { HospitalNotificationPreferences, HospitalPreferences } from "../../type/hospitalType/HospitalSettings.type"

export interface HospitalSettingsSectionProps {
  title: string
  description: string
  children: ReactNode
}

export interface HospitalSwitchProps {
  checked: boolean
  label: string
  onChange: () => void
}

export interface HospitalNotificationPreferencesFormProps {
  preferences: HospitalNotificationPreferences
  onSave: (preferences: HospitalNotificationPreferences) => void
}

export interface HospitalPreferencesFormProps {
  preferences: HospitalPreferences
  onSave: (preferences: HospitalPreferences) => void
}