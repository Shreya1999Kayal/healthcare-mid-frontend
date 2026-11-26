import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import VerificationFileField from "./VerificationFileField"
import { HOSPITAL_TODAY, hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { contactFields, hospitalFields, verificationDocuments } from "../../constants/hospitalConstants/hospitalVerification.constants"
import { formatIsoDate } from "../../services/helper/hospitalHelper/hospitalDashboard.helper"
import { validateVerification } from "../../services/helper/hospitalHelper/hospitalVerification.helper"
import type { VerificationFormProps } from "../../types/interface/hospitalInterface/HospitalVerification.interface"
import type {
  VerificationDocumentKey,
  VerificationDocuments,
  VerificationField,
  VerificationFieldName,
  VerificationFormErrors,
  VerificationFormValues,
} from "../../types/type/hospitalType/HospitalVerification.type"

const inputClass = `${hospitalFieldClass} w-full`

const VerificationForm = ({ verification, onSubmit, onCancel }: VerificationFormProps) => {
  // Starts from the saved data, so a rejected hospital sees the old answers
  const [form, setForm] = useState<VerificationFormValues>(verification.details)
  const [documents, setDocuments] = useState<VerificationDocuments>(verification.documents)
  const [errors, setErrors] = useState<VerificationFormErrors>({})

  const hasErrors = Object.values(errors).some(Boolean)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as VerificationFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // UI only: keeps the file name, nothing is uploaded
  const pickFile = (key: VerificationDocumentKey, file: File) => {
    setDocuments((prev) => ({ ...prev, [key]: { fileName: file.name, uploadedOn: formatIsoDate(HOSPITAL_TODAY) } }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateVerification(form, documents)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit(form, documents)
  }

  const renderField = (field: VerificationField) => {
    const error = errors[field.name]
    const common = { name: field.name, value: form[field.name], onChange: handleChange, className: inputClass }

    return (
      <HospitalFormField key={field.name} label={field.label} required={field.required} className={field.fullWidth ? "md:col-span-2" : ""}>
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
      </HospitalFormField>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <section className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-hospital-navy">Hospital details</h2>
          <p className="text-sm text-hospital-muted">Write them as they appear on the registration certificate.</p>
        </div>
        {hospitalFields.map(renderField)}
      </section>

      <section className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-hospital-navy md:col-span-2">Contact and address</h2>
        {contactFields.map(renderField)}
      </section>

      <section className={`${hospitalCardClass} flex flex-col gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-hospital-navy">Documents</h2>
          <p className="text-sm text-hospital-muted">PDF or image. Upload a clear scan of the full page.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {verificationDocuments.map((config) => (
            <VerificationFileField
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
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {verification.status === "rejected" ? "Resubmit for verification" : "Submit for verification"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-hospital-border bg-white px-5 py-2.5 text-sm font-semibold text-hospital-navy hover:bg-hospital-bg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default VerificationForm