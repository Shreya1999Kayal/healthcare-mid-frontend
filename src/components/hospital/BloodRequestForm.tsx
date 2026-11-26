import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { HOSPITAL_TODAY, hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  bloodComponentLabels,
  bloodGroups,
  emptyBloodRequestForm,
  partnerBloodBanks,
  urgencyStyles,
} from "../../constants/hospitalConstants/hospitalBlood.constants"
import { validateBloodRequest } from "../../services/helper/hospitalHelper/hospitalBlood.helper"
import type { BloodRequestFormProps } from "../../types/interface/hospitalInterface/HospitalBlood.interface"
import type {
  BloodComponent,
  BloodRequestFieldName,
  BloodRequestFormErrors,
  BloodRequestFormValues,
  RequestUrgency,
} from "../../types/type/hospitalType/HospitalBlood.type"

const inputClass = `${hospitalFieldClass} w-full`

const componentOptions = Object.keys(bloodComponentLabels) as BloodComponent[]
const urgencyOptions = Object.keys(urgencyStyles) as RequestUrgency[]

const BloodRequestForm = ({ onSave, onCancel }: BloodRequestFormProps) => {
  const [form, setForm] = useState<BloodRequestFormValues>(emptyBloodRequestForm)
  const [errors, setErrors] = useState<BloodRequestFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as BloodRequestFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBloodRequest(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const error = (name: BloodRequestFieldName) =>
    errors[name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[name]}</span>

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      <div className="md:col-span-2 xl:col-span-4">
        <h2 className="text-lg font-bold text-hospital-navy">Request blood from a blood bank</h2>
        <p className="text-sm text-hospital-muted">The blood bank will accept or reject the request.</p>
      </div>

      <HospitalFormField label="Patient name" required className="md:col-span-2">
        <input name="patient" value={form.patient} onChange={handleChange} className={inputClass} />
        {error("patient")}
      </HospitalFormField>
      <HospitalFormField label="Blood group" required>
        <select name="group" value={form.group} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {error("group")}
      </HospitalFormField>
      <HospitalFormField label="Units" required>
        <input type="number" min={1} max={10} name="units" value={form.units} onChange={handleChange} className={inputClass} />
        {error("units")}
      </HospitalFormField>

      <HospitalFormField label="Component" required>
        <select name="component" value={form.component} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {componentOptions.map((option) => (
            <option key={option} value={option}>
              {bloodComponentLabels[option]}
            </option>
          ))}
        </select>
        {error("component")}
      </HospitalFormField>
      <HospitalFormField label="Urgency" required>
        <select name="urgency" value={form.urgency} onChange={handleChange} className={inputClass}>
          {urgencyOptions.map((option) => (
            <option key={option} value={option}>
              {urgencyStyles[option].label}
            </option>
          ))}
        </select>
      </HospitalFormField>
      <HospitalFormField label="Blood bank" required>
        <select name="bloodBank" value={form.bloodBank} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {partnerBloodBanks.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        {error("bloodBank")}
      </HospitalFormField>
      <HospitalFormField label="Needed by" required>
        <input type="date" min={HOSPITAL_TODAY} name="requiredBy" value={form.requiredBy} onChange={handleChange} className={inputClass} />
        {error("requiredBy")}
      </HospitalFormField>

      <HospitalFormField label="Note for the blood bank" className="md:col-span-2 xl:col-span-4">
        <textarea name="note" value={form.note} onChange={handleChange} rows={2} placeholder="e.g. Surgery at 2 PM" className={inputClass} />
      </HospitalFormField>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-4">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          Send request
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

export default BloodRequestForm