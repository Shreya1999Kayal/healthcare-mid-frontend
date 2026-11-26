import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import DoctorFormField from "./DoctorFormField"
import { doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { consultationTypeOptions } from "../../constants/doctorConstants/doctorProfile.constants"
import { languageOptions } from "../../constants/doctorConstants/doctorSettings.constants"
import type { PracticeSettingsFormProps } from "../../types/interface/doctorInterface/DoctorSettings.interface"
import type { PracticeSettings } from "../../types/type/doctorType/DoctorSettings.type"

const inputClass = `${doctorFieldClass} w-full`

const PracticeSettingsForm = ({ settings, onSave }: PracticeSettingsFormProps) => {
  const [form, setForm] = useState<PracticeSettings>(settings)
  const [saved, setSaved] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(form)
    setSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-4 sm:grid-cols-3">
      <DoctorFormField label="Default fee (₹)" required>
        <input type="number" min={0} name="defaultFee" value={form.defaultFee} onChange={handleChange} required className={inputClass} />
      </DoctorFormField>
      <DoctorFormField label="Consultation type">
        <select name="consultationType" value={form.consultationType} onChange={handleChange} className={inputClass}>
          {consultationTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </DoctorFormField>
      <DoctorFormField label="Language">
        <select name="language" value={form.language} onChange={handleChange} className={inputClass}>
          {languageOptions.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </DoctorFormField>

      <div className="flex items-center gap-3 sm:col-span-3">
        <button type="submit" className="w-fit rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          Save settings
        </button>
        {saved && <p className="text-sm font-semibold text-emerald-700">Saved.</p>}
      </div>
    </form>
  )
}

export default PracticeSettingsForm