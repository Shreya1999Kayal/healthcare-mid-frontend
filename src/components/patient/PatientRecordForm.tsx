import { useState, type FormEvent } from "react"
import PatientFormField from "./PatientFormField"
import {
  PATIENT_TODAY,
  patientCardClass,
  patientFieldClass,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { emptyRecordValues, patientRecordTypeLabels } from "../../constants/patientConstants/patientCare.constants"
import { hasErrors } from "../../services/helper/patientHelper/patientDashboard.helper"
import { validateRecord } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientRecordFormProps } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientRecordErrors, PatientRecordValues } from "../../types/type/patientType/PatientCare.type"

// UI only: keeps the file name; the backend will store the file later
const PatientRecordForm = ({ onSave, onCancel }: PatientRecordFormProps) => {
  const [form, setForm] = useState<PatientRecordValues>(emptyRecordValues)
  const [errors, setErrors] = useState<PatientRecordErrors>({})

  const change = (name: keyof PatientRecordValues, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateRecord(form)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
      <h2 className="text-lg font-bold text-patient-navy">Upload a report</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <PatientFormField label="Title" required error={errors.title}>
          <input
            value={form.title}
            onChange={(e) => change("title", e.target.value)}
            placeholder="Example: Blood sugar test"
            className={patientFieldClass}
          />
        </PatientFormField>

        <PatientFormField label="Type" required error={errors.recordType}>
          <select value={form.recordType} onChange={(e) => change("recordType", e.target.value)} className={patientFieldClass}>
            <option value="">Choose a type</option>
            {Object.entries(patientRecordTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </PatientFormField>

        <PatientFormField label="Report date" required error={errors.date}>
          <input
            type="date"
            max={PATIENT_TODAY}
            value={form.date}
            onChange={(e) => change("date", e.target.value)}
            className={patientFieldClass}
          />
        </PatientFormField>

        <PatientFormField label="File (PDF or image)" required error={errors.fileName}>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => change("fileName", e.target.files?.[0]?.name ?? "")}
            className={`${patientFieldClass} file:mr-3 file:rounded file:border-0 file:bg-patient-bg-soft file:px-3 file:py-1 file:text-patient-primary-dark`}
          />
        </PatientFormField>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={patientOutlineButtonClass}>
          Cancel
        </button>
        <button type="submit" className={patientPrimaryButtonClass}>
          Upload
        </button>
      </div>
    </form>
  )
}

export default PatientRecordForm
