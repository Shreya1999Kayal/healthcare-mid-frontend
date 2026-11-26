import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import HospitalSwitch from "./HospitalSwitch"
import { hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  hospitalLanguageOptions,
  hospitalPreferenceToggles,
  hospitalSlotOptions,
} from "../../constants/hospitalConstants/hospitalSettings.constants"
import { validateHospitalPreferences } from "../../services/helper/hospitalHelper/hospitalSettings.helper"
import type { HospitalPreferencesFormProps } from "../../types/interface/hospitalInterface/HospitalSettings.interface"
import type { HospitalPreferences, HospitalPreferenceToggle } from "../../types/type/hospitalType/HospitalSettings.type"

const inputClass = `${hospitalFieldClass} w-full`

const HospitalPreferencesForm = ({ preferences, onSave }: HospitalPreferencesFormProps) => {
  const [form, setForm] = useState<HospitalPreferences>(preferences)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggle = (name: HospitalPreferenceToggle) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const problem = validateHospitalPreferences(form)
    setError(problem)
    if (problem) return
    onSave(form)
    setSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <HospitalFormField label="Slot length">
          <select name="slotMinutes" value={form.slotMinutes} onChange={handleChange} className={inputClass}>
            {hospitalSlotOptions.map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </HospitalFormField>
        <HospitalFormField label="Max appointments / day" required>
          <input type="number" min={1} name="maxAppointmentsPerDay" value={form.maxAppointmentsPerDay} onChange={handleChange} className={inputClass} />
        </HospitalFormField>
        <HospitalFormField label="Language">
          <select name="language" value={form.language} onChange={handleChange} className={inputClass}>
            {hospitalLanguageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </HospitalFormField>
      </div>

      <ul className="divide-y divide-hospital-border rounded-xl border border-hospital-border">
        {hospitalPreferenceToggles.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-hospital-navy">{item.label}</p>
              <p className="text-xs text-hospital-muted">{item.hint}</p>
            </div>
            <HospitalSwitch checked={form[item.name]} label={item.label} onChange={() => toggle(item.name)} />
          </li>
        ))}
      </ul>

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" className="w-fit rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          Save settings
        </button>
        {saved && <p className="text-sm font-semibold text-emerald-700">Saved.</p>}
      </div>
    </form>
  )
}

export default HospitalPreferencesForm