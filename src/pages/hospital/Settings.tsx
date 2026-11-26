import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import HospitalNotificationPreferencesForm from "../../components/hospital/HospitalNotificationPreferencesForm"
import HospitalPasswordForm from "../../components/hospital/HospitalPasswordForm"
import HospitalPreferencesForm from "../../components/hospital/HospitalPreferencesForm"
import HospitalSettingsSection from "../../components/hospital/HospitalSettingsSection"
import {
  initialHospitalNotificationPreferences,
  initialHospitalPreferences,
} from "../../constants/hospitalConstants/hospitalSettings.constants"
import type { HospitalOutletContext } from "../../types/interface/hospitalInterface/HospitalDashboard.interface"
import type { HospitalNotificationPreferences, HospitalPreferences } from "../../types/type/hospitalType/HospitalSettings.type"

const Settings = () => {
  const { hospital } = useOutletContext<HospitalOutletContext>()

  // Local copies (UI only, nothing is saved)
  const [notificationPrefs, setNotificationPrefs] = useState<HospitalNotificationPreferences>(initialHospitalNotificationPreferences)
  const [preferences, setPreferences] = useState<HospitalPreferences>(initialHospitalPreferences)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-hospital-navy md:text-3xl">Settings</h1>
        <p className="text-sm text-hospital-muted">Account, alerts and booking defaults for {hospital.name}.</p>
      </div>

      <HospitalSettingsSection title="Change password" description="Use a strong password you don't use anywhere else.">
        <HospitalPasswordForm />
      </HospitalSettingsSection>

      <HospitalSettingsSection title="Notifications" description="Pick which alerts you get and where they are sent.">
        <HospitalNotificationPreferencesForm preferences={notificationPrefs} onSave={setNotificationPrefs} />
      </HospitalSettingsSection>

      <HospitalSettingsSection title="Hospital preferences" description="Used for new appointments and online booking.">
        <HospitalPreferencesForm preferences={preferences} onSave={setPreferences} />
      </HospitalSettingsSection>
    </div>
  )
}

export default Settings