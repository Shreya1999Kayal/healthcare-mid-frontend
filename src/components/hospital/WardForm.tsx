import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"

import { toWardForm, validateWard } from "../../services/helper/hospitalHelper/hospitalBed.helper"
import type { WardFormProps } from "../../types/interface/hospitalInterface/HospitalBed.interface"
import type { WardField, WardFieldName, WardFormErrors, WardFormValues } from "../../types/type/hospitalType/HospitalBed.type"
import { emptyWardForm, wardFields } from "../../constants/hospitalConstants/hospitalBed.constants"

const inputClass = `${hospitalFieldClass} w-full`

const WardForm = ({ ward, onSave, onCancel }: WardFormProps) => {
  // Starts from the ward being edited, or empty for a new one
  const [form, setForm] = useState<WardFormValues>(() => (ward ? toWardForm(ward) : emptyWardForm))
  const [errors, setErrors] = useState<WardFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as WardFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateWard(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const renderField = (field: WardField) => {
    const common = { name: field.name, value: form[field.name], onChange: handleChange, className: inputClass }

    return (
      <HospitalFormField key={field.name} label={field.label} required={field.required}>
        {field.options ? (
          <select {...common}>
            <option value="">Select</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input {...common} type={field.type ?? "text"} min={field.type === "number" ? 0 : undefined} placeholder={field.placeholder} />
        )}
        {errors[field.name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[field.name]}</span>}
      </HospitalFormField>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      <h2 className="text-lg font-bold text-hospital-navy md:col-span-2 xl:col-span-4">{ward ? "Edit ward" : "Add a new ward"}</h2>

      {wardFields.map(renderField)}

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-4">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {ward ? "Save changes" : "Add ward"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-hospital-border bg-white px-5 py-2.5 text-sm font-semibold text-hospital-navy hover:bg-hospital-bg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default WardForm