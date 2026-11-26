import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import ApplicationFileField from "./ApplicationFileField"
import DoctorFormField from "./DoctorFormField"
import { DOCTOR_TODAY, doctorCardClass, doctorFieldClass } from "../../constants/doctorConstants/doctorDashboard.constants"
import { applicationDocuments, personalFields, professionalFields } from "../../constants/doctorConstants/doctorApplication.constants"
import { formatIsoDate } from "../../services/helper/doctorHelper/doctorDashboard.helper"
import { validateApplication } from "../../services/helper/doctorHelper/doctorApplication.helper"
import type { ApplicationFormProps } from "../../types/interface/doctorInterface/DoctorApplication.interface"
import type {
  ApplicationDocumentKey,
  ApplicationDocuments,
  ApplicationField,
  ApplicationFieldName,
  ApplicationFormErrors,
  ApplicationFormValues,
} from "../../types/type/doctorType/DoctorApplication.type"

const inputClass = `${doctorFieldClass} w-full`

const ApplicationForm = ({ application, onSubmit, onCancel }: ApplicationFormProps) => {
  // Starts from the saved application, so a rejected doctor sees the old answers
  const [form, setForm] = useState<ApplicationFormValues>(application.details)
  const [documents, setDocuments] = useState<ApplicationDocuments>(application.documents)
  const [errors, setErrors] = useState<ApplicationFormErrors>({})

  const hasErrors = Object.values(errors).some(Boolean)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as ApplicationFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // UI only: keeps the file name, nothing is uploaded
  const pickFile = (key: ApplicationDocumentKey, file: File) => {
    setDocuments((prev) => ({ ...prev, [key]: { fileName: file.name, uploadedOn: formatIsoDate(DOCTOR_TODAY) } }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateApplication(form, documents)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit(form, documents)
  }

  const renderField = (field: ApplicationField) => {
    const error = errors[field.name]
    const common = { name: field.name, value: form[field.name], onChange: handleChange, className: inputClass }

    return (
      <DoctorFormField key={field.name} label={field.label} required={field.required} className={field.fullWidth ? "md:col-span-2" : ""}>
        {field.options ? (
          <select {...common}>
            <option value="">Select</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea {...common} rows={3} placeholder={field.placeholder} />
        ) : (
          <input {...common} type={field.type ?? "text"} placeholder={field.placeholder} />
        )}
        {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
      </DoctorFormField>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <section className={`${doctorCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-doctor-navy">Professional details</h2>
          <p className="text-sm text-doctor-muted">Write them as they appear on your certificates.</p>
        </div>
        {professionalFields.map(renderField)}
      </section>

      <section className={`${doctorCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-doctor-navy md:col-span-2">Personal details</h2>
        {personalFields.map(renderField)}
      </section>

      <section className={`${doctorCardClass} flex flex-col gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-doctor-navy">Documents</h2>
          <p className="text-sm text-doctor-muted">PDF or image. Upload a clear scan of the full page.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {applicationDocuments.map((config) => (
            <ApplicationFileField
              key={config.key}
              config={config}
              file={documents[config.key]}
              error={errors[config.key]}
              onPick={pickFile}
            />
          ))}
        </div>
      </section>

      {hasErrors && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert">
          Fix the fields marked in red and submit again.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-md bg-doctor-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-doctor-primary-dark">
          {application.status === "rejected" ? "Resubmit application" : "Submit application"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-doctor-border bg-white px-5 py-2.5 text-sm font-semibold text-doctor-navy hover:bg-doctor-bg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ApplicationForm