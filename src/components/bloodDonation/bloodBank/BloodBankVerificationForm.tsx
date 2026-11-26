import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import BloodBankFieldInput from "./BloodBankFieldInput"
import BloodBankFileField from "./BloodBankFileField"
import type { BloodBankVerificationFormProps } from "../../../types/interface/blood/bloodBankInterface/BloodBankVerification.interface"
import type { BloodBankDocumentKey, BloodBankDocuments, BloodBankField, BloodBankFieldName, BloodBankVerificationErrors, BloodBankVerificationValues } from "../../../types/type/blood/bloodBankType/BloodBankVerification.type"
import { formatIsoDate } from "../../../services/helper/blood/bloodBankHelper/bloodBankDashboard.helper"
import { BLOOD_BANK_TODAY, bloodBankCardClass, outlineButtonClass, primaryButtonClass } from "../../../constants/blood/bloodBankConstants/bloodBankDashboard.constants"
import { validateBloodBankVerification } from "../../../services/helper/blood/bloodBankHelper/bloodBankVerification.helper"
import { bankContactFields, bankFields, bloodBankDocuments } from "../../../constants/blood/bloodBankConstants/bloodBankVerification.constants"




const BloodBankVerificationForm = ({ verification, onSubmit, onCancel }: BloodBankVerificationFormProps) => {
  // Starts from the saved data, so a rejected blood bank sees the old answers
  const [form, setForm] = useState<BloodBankVerificationValues>(verification.details)
  const [documents, setDocuments] = useState<BloodBankDocuments>(verification.documents)
  const [errors, setErrors] = useState<BloodBankVerificationErrors>({})

  const hasErrors = Object.values(errors).some(Boolean)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as BloodBankFieldName
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // UI only: keeps the file name, nothing is uploaded
  const pickFile = (key: BloodBankDocumentKey, file: File) => {
    setDocuments((prev) => ({ ...prev, [key]: { fileName: file.name, uploadedOn: formatIsoDate(BLOOD_BANK_TODAY) } }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBloodBankVerification(form, documents)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit(form, documents)
  }

  const renderField = (field: BloodBankField<BloodBankFieldName>) => (
    <BloodBankFieldInput key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={handleChange} />
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <section className={`${bloodBankCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-blood-navy">Blood bank details</h2>
          <p className="text-sm text-blood-muted">Write them as they appear on your blood bank licence.</p>
        </div>
        {bankFields.map(renderField)}
      </section>

      <section className={`${bloodBankCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-blood-navy md:col-span-2">Contact and address</h2>
        {bankContactFields.map(renderField)}
      </section>

      <section className={`${bloodBankCardClass} flex flex-col gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-blood-navy">Documents</h2>
          <p className="text-sm text-blood-muted">PDF or image. Upload a clear scan of the full page.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {bloodBankDocuments.map((config) => (
            <BloodBankFileField key={config.key} config={config} file={documents[config.key]} error={errors[config.key]} onPick={pickFile} />
          ))}
        </div>
      </section>

      {hasErrors && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert">
          Fix the fields marked in red and submit again.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={primaryButtonClass}>
          {verification.status === "rejected" ? "Resubmit for verification" : "Submit for verification"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={outlineButtonClass}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default BloodBankVerificationForm