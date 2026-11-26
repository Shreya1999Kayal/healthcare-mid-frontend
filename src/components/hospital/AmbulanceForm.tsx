import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { HOSPITAL_TODAY, hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { ambulanceEquipmentOptions, ambulanceFields, emptyAmbulanceForm } from "../../constants/hospitalConstants/hospitalAmbulance.constants"
import { toAmbulanceForm, validateAmbulance } from "../../services/helper/hospitalHelper/hospitalAmbulance.helper"
import type { AmbulanceFormProps } from "../../types/interface/hospitalInterface/HospitalAmbulance.interface"
import type {
  AmbulanceField,
  AmbulanceFieldName,
  AmbulanceFormErrors,
  AmbulanceFormValues,
} from "../../types/type/hospitalType/HospitalAmbulance.type"

const inputClass = `${hospitalFieldClass} w-full`

const AmbulanceForm = ({ ambulance, ambulances, onSave, onCancel }: AmbulanceFormProps) => {
  // Starts from the ambulance being edited, or empty for a new one
  const [form, setForm] = useState<AmbulanceFormValues>(() => (ambulance ? toAmbulanceForm(ambulance) : emptyAmbulanceForm))
  const [errors, setErrors] = useState<AmbulanceFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as AmbulanceFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Ticks or unticks one equipment item
  const toggleEquipment = (item: string) => {
    setForm((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item) ? prev.equipment.filter((name) => name !== item) : [...prev.equipment, item],
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateAmbulance(form, ambulances, ambulance?.id)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const renderField = (field: AmbulanceField) => {
    const common = { name: field.name, value: form[field.name], onChange: handleChange, className: inputClass }

    return (
      <HospitalFormField key={field.name} label={field.label} required>
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
          <input
            {...common}
            type={field.type ?? "text"}
            max={field.type === "date" ? HOSPITAL_TODAY : undefined}
            placeholder={field.placeholder}
          />
        )}
        {errors[field.name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[field.name]}</span>}
      </HospitalFormField>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
      <h2 className="text-lg font-bold text-hospital-navy md:col-span-2 xl:col-span-3">{ambulance ? "Edit ambulance" : "Add an ambulance"}</h2>

      {ambulanceFields.map(renderField)}

      <fieldset className="md:col-span-2 xl:col-span-3">
        <legend className="mb-2 text-sm font-semibold text-hospital-navy">Equipment on board</legend>
        <div className="flex flex-wrap gap-2">
          {ambulanceEquipmentOptions.map((item) => {
            const checked = form.equipment.includes(item)

            return (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${
                  checked
                    ? "border-hospital-primary bg-hospital-bg-soft font-semibold text-hospital-primary-dark"
                    : "border-hospital-border text-hospital-navy"
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleEquipment(item)} className="accent-hospital-primary" />
                {item}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-3">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {ambulance ? "Save changes" : "Add ambulance"}
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

export default AmbulanceForm