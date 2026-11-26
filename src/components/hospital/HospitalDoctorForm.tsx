import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  doctorAvailabilityOptions,
  doctorAvailabilityStyles,
  emptyHospitalDoctorForm,
  hospitalDoctorFields,
} from "../../constants/hospitalConstants/hospitalDoctor.constants"
import { toHospitalDoctorForm, validateHospitalDoctor } from "../../services/helper/hospitalHelper/hospitalDoctor.helper"
import type { HospitalDoctorFormProps } from "../../types/interface/hospitalInterface/HospitalDoctor.interface"
import type {
  HospitalDoctorField,
  HospitalDoctorFieldName,
  HospitalDoctorFormErrors,
  HospitalDoctorFormValues,
} from "../../types/type/hospitalType/HospitalDoctor.type"

const inputClass = `${hospitalFieldClass} w-full`

const HospitalDoctorForm = ({ doctor, doctors, onSave, onCancel }: HospitalDoctorFormProps) => {
  // Starts from the doctor being edited, or empty for a new one
  const [form, setForm] = useState<HospitalDoctorFormValues>(() => (doctor ? toHospitalDoctorForm(doctor) : emptyHospitalDoctorForm))
  const [errors, setErrors] = useState<HospitalDoctorFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as HospitalDoctorFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateHospitalDoctor(form, doctors, doctor?.id)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const renderField = (field: HospitalDoctorField) => {
    const common = { name: field.name, value: form[field.name], onChange: handleChange, className: inputClass }

    return (
      <HospitalFormField key={field.name} label={field.label} required={field.required}>
        {field.options ? (
          <select {...common}>
            <option value="">Select</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
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
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
      <h2 className="text-lg font-bold text-hospital-navy md:col-span-2 xl:col-span-3">{doctor ? "Edit doctor" : "Add a doctor"}</h2>

      {hospitalDoctorFields.map(renderField)}

      <HospitalFormField label="Availability" required>
        <select name="availability" value={form.availability} onChange={handleChange} className={inputClass}>
          {doctorAvailabilityOptions.map((option) => (
            <option key={option} value={option}>
              {doctorAvailabilityStyles[option].label}
            </option>
          ))}
        </select>
      </HospitalFormField>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-3">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {doctor ? "Save changes" : "Add doctor"}
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

export default HospitalDoctorForm