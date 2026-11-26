import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import BloodBankFieldInput from "./BloodBankFieldInput"
import { bloodBankCardClass, outlineButtonClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { bloodBankProfileFields } from "../../../constants/blood/bloodBankConstants/bloodBankProfile.constants"
import { validateBloodBankProfile } from "../../../services/helper/blood/bloodBankHelper/bloodBankProfile.helper"
import type { BloodBankProfileFormProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankProfile.interface"
import type {
  BloodBankProfileDetails,
  BloodBankProfileErrors,
  BloodBankProfileFieldName,
} from "../../../types/type/blood/bloodBankType/BloodBankProfile.type"

const BloodBankProfileForm = ({ profile, onSave, onCancel }: BloodBankProfileFormProps) => {
  const [form, setForm] = useState<BloodBankProfileDetails>(profile)
  const [errors, setErrors] = useState<BloodBankProfileErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as BloodBankProfileFieldName
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBloodBankProfile(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${bloodBankCardClass} grid gap-4 md:grid-cols-2`}>
      {bloodBankProfileFields.map((field) => (
        <BloodBankFieldInput key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={handleChange} />
      ))}

      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button type="submit" className={primaryButtonClass}>
          Save profile
        </button>
        <button type="button" onClick={onCancel} className={outlineButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BloodBankProfileForm