import { useState } from "react"
import NotificationPreferencesForm from "../../components/doctor/NotificationPreferencesForm"
import PasswordForm from "../../components/doctor/PasswordForm"
import PracticeSettingsForm from "../../components/doctor/PracticeSettingsForm"
import SettingsSection from "../../components/doctor/SettingsSection"
import { initialNotificationPreferences, initialPracticeSettings } from "../../constants/doctorConstants/doctorSettings.constants"
import type { NotificationPreferences, PracticeSettings } from "../../types/type/doctorType/DoctorSettings.type"

const DoctorSettings = () => {
  // Local copies (UI only, nothing is saved)
  const [preferences, setPreferences] = useState<NotificationPreferences>(initialNotificationPreferences)
  const [practice, setPractice] = useState<PracticeSettings>(initialPracticeSettings)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-doctor-navy md:text-3xl">Settings</h1>
        <p className="text-sm text-doctor-muted">Account, alerts and practice defaults.</p>
      </div>

      <SettingsSection title="Change password" description="Use a strong password you don't use anywhere else.">
        <PasswordForm />
      </SettingsSection>

      <SettingsSection title="Notifications" description="Pick which alerts you get and where they are sent.">
        <NotificationPreferencesForm preferences={preferences} onSave={setPreferences} />
      </SettingsSection>

      <SettingsSection title="Practice defaults" description="Used for new chambers and online visits.">
        <PracticeSettingsForm settings={practice} onSave={setPractice} />
      </SettingsSection>
    </div>
  )
}

export default DoctorSettings