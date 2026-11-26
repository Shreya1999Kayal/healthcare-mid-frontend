import { useState, type FormEvent } from "react"
import PatientFormField from "./PatientFormField"
import {
  PATIENT_TODAY,
  patientCardClass,
  patientFieldClass,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { PATIENT_MAX_BLOOD_UNITS, emptyBloodRequestValues } from "../../constants/patientConstants/patientCare.constants"
import { bloodGroups } from "../../constants/public/bloods.constants"
import { hospitalsList } from "../../constants/public/hospital.constants"
import { hasErrors } from "../../services/helper/patientHelper/patientDashboard.helper"
import { validateBloodRequest } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientBloodRequestFormProps } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientBloodRequestErrors, PatientBloodRequestValues } from "../../types/type/patientType/PatientCare.type"

const PatientBloodRequestForm = ({ onSave, onCancel }: PatientBloodRequestFormProps) => {
  const [form, setForm] = useState<PatientBloodRequestValues>(emptyBloodRequestValues)
  const [errors, setErrors] = useState<PatientBloodRequestErrors>({})

  const change = (name: keyof PatientBloodRequestErrors | "note", value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBloodRequest(form)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
      <h2 className="text-lg font-bold text-patient-navy">Request blood</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <PatientFormField label="Blood group" required error={errors.bloodGroup}>
          <select value={form.bloodGroup} onChange={(e) => change("bloodGroup", e.target.value)} className={patientFieldClass}>
            <option value="">Choose a group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </PatientFormField>

        <PatientFormField label="Units" required error={errors.units}>
          <input
            type="number"
            min={1}
            max={PATIENT_MAX_BLOOD_UNITS}
            value={form.units}
            onChange={(e) => change("units", e.target.value)}
            className={patientFieldClass}
          />
        </PatientFormField>

        <PatientFormField label="Needed by" required error={errors.neededBy}>
          <input
            type="date"
            min={PATIENT_TODAY}
            value={form.neededBy}
            onChange={(e) => change("neededBy", e.target.value)}
            className={patientFieldClass}
          />
        </PatientFormField>

        <PatientFormField label="Hospital" required error={errors.hospital}>
          <select value={form.hospital} onChange={(e) => change("hospital", e.target.value)} className={patientFieldClass}>
            <option value="">Choose a hospital</option>
            {hospitalsList.map((hospital) => (
              <option key={hospital.id} value={hospital.name}>
                {hospital.name}
              </option>
            ))}
          </select>
        </PatientFormField>

        <PatientFormField label="Note for the blood bank" className="md:col-span-2">
          <textarea
            rows={2}
            value={form.note}
            onChange={(e) => change("note", e.target.value)}
            placeholder="Example: surgery on Friday morning"
            className={patientFieldClass}
          />
        </PatientFormField>

        <label className="flex items-center gap-2 text-sm font-semibold text-red-600 md:col-span-2">
          <input
            type="checkbox"
            checked={form.emergency}
            onChange={(e) => setForm((prev) => ({ ...prev, emergency: e.target.checked }))}
            className="h-4 w-4 accent-red-600"
          />
          This is an emergency
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={patientOutlineButtonClass}>
          Cancel
        </button>
        <button type="submit" className={patientPrimaryButtonClass}>
          Send request
        </button>
      </div>
    </form>
  )
}

export default PatientBloodRequestForm
