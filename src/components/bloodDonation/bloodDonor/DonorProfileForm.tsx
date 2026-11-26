import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import DonorFieldInput from "./DonorFieldInput"
import type { DonorProfileFormProps } from "../../../types/interface/blood/donorInterface/DonorProfile.interface"
import type { DonorProfileDetails, DonorProfileErrors, DonorProfileFieldName } from "../../../types/type/blood/donorType/DonorProfile.type"
import { validateDonorProfile } from "../../../services/helper/blood/donorHelper/donorProfile.helper"
import { donorCardClass, donorOutlineButtonClass, donorPrimaryButtonClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { donorProfileFields } from "../../../constants/blood/donorConstants/donorProfile.constants"


const DonorProfileForm = ({ profile, onSave, onCancel }: DonorProfileFormProps) => {
  const [form, setForm] = useState<DonorProfileDetails>(profile)
  const [errors, setErrors] = useState<DonorProfileErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as DonorProfileFieldName
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateDonorProfile(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${donorCardClass} grid gap-4 md:grid-cols-2`}>
      {donorProfileFields.map((field) => (
        <DonorFieldInput key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={handleChange} />
      ))}

      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button type="submit" className={donorPrimaryButtonClass}>
          Save profile
        </button>
        <button type="button" onClick={onCancel} className={donorOutlineButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default DonorProfileForm