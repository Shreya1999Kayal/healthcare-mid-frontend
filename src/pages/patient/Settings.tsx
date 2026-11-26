import { useState, type FormEvent } from "react"
import { LogOut } from "lucide-react"
import PatientFormField from "../../components/patient/PatientFormField"
import {
  defaultNotificationSettings,
  emptyPasswordValues,
  patientCardClass,
  patientDangerButtonClass,
  patientFieldClass,
  patientNotificationSettingLabels,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { hasErrors, validatePassword } from "../../services/helper/patientHelper/patientDashboard.helper"
import type {
  PatientNotificationSettings,
  PatientPasswordErrors,
  PatientPasswordValues,
} from "../../types/type/patientType/PatientDashboard.type"
import { useLogout } from "../../hooks/useLogout"

const Settings = () => {
  const logout = useLogout()
  // UI only, nothing is saved
  const [password, setPassword] = useState<PatientPasswordValues>(emptyPasswordValues)
  const [errors, setErrors] = useState<PatientPasswordErrors>({})
  const [settings, setSettings] = useState<PatientNotificationSettings>(defaultNotificationSettings)
  const [message, setMessage] = useState("")

  const change = (name: keyof PatientPasswordValues, value: string) => {
    setPassword((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const savePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validatePassword(password)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    setPassword(emptyPasswordValues)
    setMessage("Password changed.")
  }

  const toggle = (key: keyof PatientNotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    setMessage("Notification settings saved.")
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-patient-navy md:text-3xl">Settings</h1>
        <p className="text-sm text-patient-muted">Password, notifications and log out.</p>
      </div>

      {message && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700" role="status">
          {message}
        </p>
      )}

      <form onSubmit={savePassword} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
        <h2 className="text-lg font-bold text-patient-navy">Change password</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <PatientFormField label="Current password" required error={errors.current}>
            <input type="password" value={password.current} onChange={(e) => change("current", e.target.value)} className={patientFieldClass} />
          </PatientFormField>
          <PatientFormField label="New password" required error={errors.next}>
            <input type="password" value={password.next} onChange={(e) => change("next", e.target.value)} className={patientFieldClass} />
          </PatientFormField>
          <PatientFormField label="Confirm new password" required error={errors.confirm}>
            <input type="password" value={password.confirm} onChange={(e) => change("confirm", e.target.value)} className={patientFieldClass} />
          </PatientFormField>
        </div>
        <button type="submit" className={`${patientPrimaryButtonClass} self-end`}>
          Update password
        </button>
      </form>

      <section className={`${patientCardClass} flex flex-col gap-3`}>
        <h2 className="text-lg font-bold text-patient-navy">Notifications</h2>
        {patientNotificationSettingLabels.map(({ key, label }) => (
          <label key={key} className="flex items-center justify-between gap-3 rounded-lg bg-patient-bg px-3 py-2 text-sm text-patient-navy">
            {label}
            <input type="checkbox" checked={settings[key]} onChange={() => toggle(key)} className="h-4 w-4 accent-patient-primary" />
          </label>
        ))}
      </section>

      <section className={`${patientCardClass} flex flex-wrap items-center justify-between gap-3`}>
        <div>
          <h2 className="text-lg font-bold text-patient-navy">Log out</h2>
          <p className="text-sm text-patient-muted">You will need to log in again to see contacts and book.</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className={patientDangerButtonClass}
        >
          <LogOut size={16} /> Log out
        </button>
      </section>
    </div>
  )
}

export default Settings
