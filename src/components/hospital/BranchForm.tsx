import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { branchFields, emptyBranchForm } from "../../constants/hospitalConstants/hospitalBranch.constants"
import { toBranchForm, validateBranch } from "../../services/helper/hospitalHelper/hospitalBranch.helper"
import type { BranchFormProps } from "../../types/interface/hospitalInterface/HospitalBranch.interface"
import type { BranchFieldName, BranchFormErrors, BranchFormValues } from "../../types/type/hospitalType/HospitalBranch.type"

const inputClass = `${hospitalFieldClass} w-full`

const BranchForm = ({ branch, onSave, onCancel }: BranchFormProps) => {
  // Starts from the branch being edited, or empty for a new one
  const [form, setForm] = useState<BranchFormValues>(() => (branch ? toBranchForm(branch) : emptyBranchForm))
  const [errors, setErrors] = useState<BranchFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as BranchFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateBranch(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
      <h2 className="text-lg font-bold text-hospital-navy md:col-span-2">{branch ? "Edit branch" : "Add a new branch"}</h2>

      {branchFields.map((field) => (
        <HospitalFormField key={field.name} label={field.label} required className={field.fullWidth ? "md:col-span-2" : ""}>
          <input
            name={field.name}
            type={field.type ?? "text"}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={inputClass}
          />
          {errors[field.name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[field.name]}</span>}
        </HospitalFormField>
      ))}

      <label className="flex items-center gap-2 text-sm font-semibold text-hospital-navy md:col-span-2">
        <input
          type="checkbox"
          checked={form.emergency24x7}
          onChange={(e) => setForm((prev) => ({ ...prev, emergency24x7: e.target.checked }))}
          className="h-4 w-4 accent-hospital-primary"
        />
        Emergency open 24x7
      </label>

      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {branch ? "Save changes" : "Add branch"}
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

export default BranchForm