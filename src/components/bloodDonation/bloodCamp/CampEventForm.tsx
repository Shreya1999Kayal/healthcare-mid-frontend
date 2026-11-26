import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import BloodBankFieldInput from "../bloodBank/BloodBankFieldInput"
import type { CampEventFormProps } from "../../../types/interface/blood/campInterface/CampEvent.interface"
import { campToFormValues, validateCampEvent } from "../../../services/helper/blood/campHelper/campEvent.helper"
import { campEventFields, emptyCampEventForm } from "../../../constants/blood/campConstants/campEvent.constants"
import type { CampEventFieldName, CampEventFormErrors, CampEventFormValues } from "../../../types/type/blood/campType/CampEvent.type"
import { bloodBankCardClass, outlineButtonClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"


const CampEventForm = ({ camp, today, onSave, onClose }: CampEventFormProps) => {
  const [form, setForm] = useState<CampEventFormValues>(() => (camp ? campToFormValues(camp) : emptyCampEventForm))
  const [errors, setErrors] = useState<CampEventFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as CampEventFieldName
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateCampEvent(form, today)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="camp-form-title">
      <form onSubmit={handleSubmit} noValidate className={`${bloodBankCardClass} my-8 grid w-full max-w-2xl gap-4 md:grid-cols-2`}>
        <h2 id="camp-form-title" className="text-lg font-bold text-blood-navy md:col-span-2">
          {camp ? "Edit camp" : "New camp"}
        </h2>

        {campEventFields.map((field) => (
          <BloodBankFieldInput key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={handleChange} />
        ))}

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button type="submit" className={primaryButtonClass}>
            {camp ? "Save changes" : "Create camp"}
          </button>
          <button type="button" onClick={onClose} className={outlineButtonClass}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CampEventForm