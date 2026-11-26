import { useState, type FormEvent } from "react"
import { Star } from "lucide-react"
import PatientFormField from "./PatientFormField"
import {
  patientCardClass,
  patientFieldClass,
  patientOutlineButtonClass,
  patientPrimaryButtonClass,
} from "../../constants/patientConstants/patientDashboard.constants"
import { emptyReviewValues, patientReviewTargetLabels } from "../../constants/patientConstants/patientCare.constants"
import { hasErrors } from "../../services/helper/patientHelper/patientDashboard.helper"
import { validateReview } from "../../services/helper/patientHelper/patientCare.helper"
import type { PatientReviewFormProps } from "../../types/interface/patientInterface/PatientDashboard.interface"
import type { PatientReviewErrors, PatientReviewValues } from "../../types/type/patientType/PatientCare.type"

const PatientReviewForm = ({ options, onSave, onCancel }: PatientReviewFormProps) => {
  const [form, setForm] = useState<PatientReviewValues>(emptyReviewValues)
  const [errors, setErrors] = useState<PatientReviewErrors>({})

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateReview(form)
    if (hasErrors(found)) {
      setErrors(found)
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={submit} className={`${patientCardClass} flex flex-col gap-4`} noValidate>
      <div>
        <h2 className="text-lg font-bold text-patient-navy">Write a review</h2>
        <p className="text-sm text-patient-muted">The admin checks every review before it is published. You can't edit or delete it later.</p>
      </div>

      <PatientFormField label="What are you reviewing?" required error={errors.optionKey}>
        <select
          value={form.optionKey}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, optionKey: e.target.value }))
            setErrors((prev) => ({ ...prev, optionKey: "" }))
          }}
          className={patientFieldClass}
        >
          <option value="">Choose one</option>
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {patientReviewTargetLabels[option.target]}: {option.label}
            </option>
          ))}
        </select>
      </PatientFormField>

      <div className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-patient-navy">
          Rating <span className="text-red-600">*</span>
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`${star} star`}
              onClick={() => {
                setForm((prev) => ({ ...prev, rating: star }))
                setErrors((prev) => ({ ...prev, rating: "" }))
              }}
            >
              <Star size={28} className={star <= form.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
            </button>
          ))}
        </div>
        {errors.rating && <span className="text-xs font-semibold text-red-600">{errors.rating}</span>}
      </div>

      <PatientFormField label="Your review" required error={errors.comment}>
        <textarea
          rows={4}
          value={form.comment}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, comment: e.target.value }))
            setErrors((prev) => ({ ...prev, comment: "" }))
          }}
          placeholder="Tell others about your experience"
          className={patientFieldClass}
        />
      </PatientFormField>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={patientOutlineButtonClass}>
          Cancel
        </button>
        <button type="submit" className={patientPrimaryButtonClass}>
          Submit for approval
        </button>
      </div>
    </form>
  )
}

export default PatientReviewForm
