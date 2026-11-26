import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import {
  arrivalModeLabels,
  caseTypeLabels,
  emergencyGenderOptions,
  emptyEmergencyForm,
  priorityStyles,
} from "../../constants/hospitalConstants/hospitalEmergency.constants"
import { validateEmergencyCase } from "../../services/helper/hospitalHelper/hospitalEmergency.helper"
import type { EmergencyCaseFormProps } from "../../types/interface/hospitalInterface/HospitalEmergency.interface"
import type {
  ArrivalMode,
  EmergencyCaseFormValues,
  EmergencyCaseType,
  EmergencyFieldName,
  EmergencyFormErrors,
  EmergencyPriority,
} from "../../types/type/hospitalType/HospitalEmergency.type"

const inputClass = `${hospitalFieldClass} w-full`

const caseTypeOptions = Object.keys(caseTypeLabels) as EmergencyCaseType[]
const priorityOptions = Object.keys(priorityStyles) as EmergencyPriority[]
const arrivalOptions = Object.keys(arrivalModeLabels) as ArrivalMode[]

const EmergencyCaseForm = ({ onSave, onCancel }: EmergencyCaseFormProps) => {
  const [form, setForm] = useState<EmergencyCaseFormValues>(emptyEmergencyForm)
  const [errors, setErrors] = useState<EmergencyFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as EmergencyFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateEmergencyCase(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const error = (name: EmergencyFieldName) =>
    errors[name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[name]}</span>

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
      <div className="md:col-span-2 xl:col-span-4">
        <h2 className="text-lg font-bold text-hospital-navy">Register an emergency case</h2>
        <p className="text-sm text-hospital-muted">Leave name and age empty if the patient is not known yet.</p>
      </div>

      <HospitalFormField label="Patient name">
        <input name="patient" value={form.patient} onChange={handleChange} placeholder="Unknown" className={inputClass} />
      </HospitalFormField>
      <HospitalFormField label="Age">
        <input type="number" min={0} name="age" value={form.age} onChange={handleChange} className={inputClass} />
        {error("age")}
      </HospitalFormField>
      <HospitalFormField label="Gender">
        <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
          {emergencyGenderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </HospitalFormField>
      <HospitalFormField label="Priority" required>
        <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {priorityStyles[option].label}
            </option>
          ))}
        </select>
        {error("priority")}
      </HospitalFormField>

      <HospitalFormField label="Case type" required>
        <select name="caseType" value={form.caseType} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {caseTypeOptions.map((option) => (
            <option key={option} value={option}>
              {caseTypeLabels[option]}
            </option>
          ))}
        </select>
        {error("caseType")}
      </HospitalFormField>
      <HospitalFormField label="Coming by" required>
        <select name="arrivalMode" value={form.arrivalMode} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          {arrivalOptions.map((option) => (
            <option key={option} value={option}>
              {arrivalModeLabels[option]}
            </option>
          ))}
        </select>
        {error("arrivalMode")}
      </HospitalFormField>
      {form.arrivalMode === "ambulance" && (
        <HospitalFormField label="Ambulance number" required className="xl:col-span-2">
          <input name="ambulanceNo" value={form.ambulanceNo} onChange={handleChange} placeholder="e.g. WB 02 AB 1234" className={inputClass} />
          {error("ambulanceNo")}
        </HospitalFormField>
      )}

      <HospitalFormField label="What happened" required className="md:col-span-2 xl:col-span-4">
        <input name="complaint" value={form.complaint} onChange={handleChange} placeholder="e.g. Road accident, bleeding from the head" className={inputClass} />
        {error("complaint")}
      </HospitalFormField>

      <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-4">
        <button type="submit" className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
          Register case
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

export default EmergencyCaseForm