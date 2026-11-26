import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import DoctorFormField from "./DoctorFormField"
import { doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { initialPasswordForm } from "../../constants/doctorConstants/doctorSettings.constants"
import { validatePassword } from "../../services/helper/doctorHelper/doctorSettings.helper"
import type { PasswordFormValues } from "../../types/type/doctorType/DoctorSettings.type"

const fields: { name: keyof PasswordFormValues; label: string }[] = [
  { name: "current", label: "Current password" },
  { name: "next", label: "New password" },
  { name: "confirm", label: "Confirm new password" },
]

const PasswordForm = () => {
  const [form, setForm] = useState<PasswordFormValues>(initialPasswordForm)
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // UI only: no backend yet, so we just check the rules and clear the form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const problem = validatePassword(form)
    setError(problem)
    if (problem) return
    setSaved(true)
    setForm(initialPasswordForm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {fields.map((field) => (
        <DoctorFormField key={field.name} label={field.label} required>
          <input
            type={showPasswords ? "text" : "password"}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            autoComplete={field.name === "current" ? "current-password" : "new-password"}
            className={`${doctorFieldClass} w-full`}
          />
        </DoctorFormField>
      ))}

      <button
        type="button"
        onClick={() => setShowPasswords((prev) => !prev)}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-doctor-primary-dark"
      >
        {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />} {showPasswords ? "Hide passwords" : "Show passwords"}
      </button>

      <p className="text-xs text-doctor-muted">At least 8 characters, with letters and numbers.</p>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {saved && <p className="text-sm font-semibold text-emerald-700">Password changed.</p>}

      <button type="submit" className="w-fit rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
        Change password
      </button>
    </form>
  )
}

export default PasswordForm