import type { ReactNode } from "react"
import type { NotificationPreferences, PracticeSettings } from "../../type/doctorType/DoctorSettings.type"

export interface SettingsSectionProps {
  title: string
  description: string
  children: ReactNode
}

export interface NotificationPreferencesFormProps {
  preferences: NotificationPreferences
  onSave: (preferences: NotificationPreferences) => void
}

export interface PracticeSettingsFormProps {
  settings: PracticeSettings
  onSave: (settings: PracticeSettings) => void
}