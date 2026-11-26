import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import BloodBankFormField from "./BloodBankFormField"
import { bloodBankFieldClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bloodBankPasswordFields, initialBloodBankPasswordForm } from "../../../constants/blood/bloodBankConstants/bloodBankSettings.constants"
import { validateBloodBankPassword } from "../../../services/helper/blood/bloodBankHelper/bloodBankSettings.helper"
import type { BloodBankPasswordValues } from "../../../types/type/blood/bloodBankType/BloodBankSettings.type"

const BloodBankPasswordForm = () => {
  const [form, setForm] = useState<BloodBankPasswordValues>(initialBloodBankPasswordForm)
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
    const problem = validateBloodBankPassword(form)
    setError(problem)
    if (problem) return
    setSaved(true)
    setForm(initialBloodBankPasswordForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {bloodBankPasswordFields.map((field) => (
        <BloodBankFormField key={field.name} label={field.label} required>
          <input
            type={showPasswords ? "text" : "password"}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            autoComplete={field.name === "current" ? "current-password" : "new-password"}
            className={`${bloodBankFieldClass} w-full`}
          />
        </BloodBankFormField>
      ))}

      <button
        type="button"
        onClick={() => setShowPasswords((prev) => !prev)}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-blood-primary-dark"
      >
        {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />} {showPasswords ? "Hide passwords" : "Show passwords"}
      </button>

      <p className="text-xs text-blood-muted">At least 8 characters, with letters and numbers.</p>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {saved && <p className="text-sm font-semibold text-emerald-700">Password changed.</p>}

      <button type="submit" className={`${primaryButtonClass} w-fit`}>
        Change password
      </button>
    </form>
  )
}

export default BloodBankPasswordForm