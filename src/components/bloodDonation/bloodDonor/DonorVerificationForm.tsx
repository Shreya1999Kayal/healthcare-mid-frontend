import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import DonorFieldInput from "./DonorFieldInput"
import DonorFileField from "./DonorFileField"
import type { DonorVerificationFormProps } from "../../../types/interface/blood/donorInterface/DonorVerification.interface"
import type { DonorDocumentKey, DonorDocuments, DonorField, DonorFieldName, DonorVerificationErrors, DonorVerificationValues } from "../../../types/type/blood/donorType/DonorVerification.type"
import { DONOR_TODAY, donorCardClass, donorOutlineButtonClass, donorPrimaryButtonClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"
import { formatDonorDate } from "../../../services/helper/blood/donorHelper/donorDashboard.helper"
import { validateDonorVerification } from "../../../services/helper/blood/donorHelper/donorVerification.helper"
import { donorContactFields, donorDocuments, donorPersonalFields } from "../../../constants/blood/donorConstants/donorVerification.constants"


const DonorVerificationForm = ({ verification, onSubmit, onCancel }: DonorVerificationFormProps) => {
  // Starts from the saved data, so a rejected donor sees the old answers
  const [form, setForm] = useState<DonorVerificationValues>(verification.details)
  const [documents, setDocuments] = useState<DonorDocuments>(verification.documents)
  const [errors, setErrors] = useState<DonorVerificationErrors>({})

  const hasErrors = Object.values(errors).some(Boolean)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as DonorFieldName
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // UI only: keeps the file name, nothing is uploaded
  const pickFile = (key: DonorDocumentKey, file: File) => {
    setDocuments((prev) => ({ ...prev, [key]: { fileName: file.name, uploadedOn: formatDonorDate(DONOR_TODAY) } }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateDonorVerification(form, documents)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSubmit(form, documents)
  }

  const renderField = (field: DonorField<DonorFieldName>) => (
    <DonorFieldInput key={field.name} field={field} value={form[field.name]} error={errors[field.name]} onChange={handleChange} />
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <section className={`${donorCardClass} grid gap-4 md:grid-cols-2`}>
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-blood-navy">Personal details</h2>
          <p className="text-sm text-blood-muted">Donors must be 18 to 65 years old and weigh at least 45 kg.</p>
        </div>
        {donorPersonalFields.map(renderField)}
      </section>

      <section className={`${donorCardClass} grid gap-4 md:grid-cols-2`}>
        <h2 className="text-lg font-bold text-blood-navy md:col-span-2">Contact and address</h2>
        {donorContactFields.map(renderField)}
      </section>

      <section className={`${donorCardClass} flex flex-col gap-4`}>
        <div>
          <h2 className="text-lg font-bold text-blood-navy">Documents</h2>
          <p className="text-sm text-blood-muted">PDF or image. Upload a clear copy.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {donorDocuments.map((config) => (
            <DonorFileField key={config.key} config={config} file={documents[config.key]} error={errors[config.key]} onPick={pickFile} />
          ))}
        </div>
      </section>

      {hasErrors && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert">
          Fix the fields marked in red and submit again.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={donorPrimaryButtonClass}>
          {verification.status === "rejected" ? "Resubmit for verification" : "Submit for verification"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={donorOutlineButtonClass}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default DonorVerificationForm