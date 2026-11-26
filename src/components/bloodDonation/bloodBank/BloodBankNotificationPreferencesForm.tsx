import { useState } from "react"
import BloodBankSwitch from "./BloodBankSwitch"
import { primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bloodBankPreferenceOptions } from "../../../constants/blood/bloodBankConstants/bloodBankSettings.constants"
import type { BloodBankNotificationPreferencesFormProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankSettings.interface"
import type { BloodBankNotificationPreferences } from "../../../types/type/blood/bloodBankType/BloodBankSettings.type"

const BloodBankNotificationPreferencesForm = ({ preferences, onSave }: BloodBankNotificationPreferencesFormProps) => {
  const [form, setForm] = useState<BloodBankNotificationPreferences>(preferences)
  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof BloodBankNotificationPreferences) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const save = () => {
    onSave(form)
    setSaved(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col divide-y divide-blood-border">
        {bloodBankPreferenceOptions.map((option) => (
          <li key={option.key} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-semibold text-blood-navy">{option.label}</p>
              <p className="text-xs text-blood-muted">{option.hint}</p>
            </div>
            <BloodBankSwitch checked={form[option.key]} label={option.label} onChange={() => toggle(option.key)} />
          </li>
        ))}
      </ul>
      {saved && <p className="text-sm font-semibold text-emerald-700">Preferences saved.</p>}
      <button type="button" onClick={save} className={`${primaryButtonClass} w-fit`}>
        Save preferences
      </button>
    </div>
  )
}

export default BloodBankNotificationPreferencesForm