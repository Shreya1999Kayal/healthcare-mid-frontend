import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import HospitalFormField from "./HospitalFormField"
import { hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { hospitalPasswordFields, initialHospitalPasswordForm } from "../../constants/hospitalConstants/hospitalSettings.constants"
import { validateHospitalPassword } from "../../services/helper/hospitalHelper/hospitalSettings.helper"
import type { HospitalPasswordFormValues } from "../../types/type/hospitalType/HospitalSettings.type"

const HospitalPasswordForm = () => {
  const [form, setForm] = useState<HospitalPasswordFormValues>(initialHospitalPasswordForm)
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: no backend yet, so we check the rules and clear the form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const problem = validateHospitalPassword(form)
    setError(problem)
    if (problem) return
    setSaved(true)
    setForm(initialHospitalPasswordForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {hospitalPasswordFields.map((field) => (
        <HospitalFormField key={field.name} label={field.label} required>
          <input
            type={showPasswords ? "text" : "password"}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            autoComplete={field.name === "current" ? "current-password" : "new-password"}
            className={`${hospitalFieldClass} w-full`}
          />
        </HospitalFormField>
      ))}

      <button
        type="button"
        onClick={() => setShowPasswords((prev) => !prev)}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-hospital-primary-dark"
      >
        {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />} {showPasswords ? "Hide passwords" : "Show passwords"}
      </button>

      <p className="text-xs text-hospital-muted">At least 8 characters, with letters and numbers.</p>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {saved && <p className="text-sm font-semibold text-emerald-700">Password changed.</p>}

      <button type="submit" className="w-fit rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
        Change password
      </button>
    </form>
  )
}

export default HospitalPasswordForm