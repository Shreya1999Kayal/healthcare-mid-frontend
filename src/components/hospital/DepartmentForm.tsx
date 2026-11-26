import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import HospitalFormField from "./HospitalFormField"
import { hospitalCardClass, hospitalFieldClass } from "../../constants/hospitalConstants/hospitalDashboard.constants"
import { departmentFields, emptyDepartmentForm } from "../../constants/hospitalConstants/hospitalDepartment.constants"
import { toDepartmentForm, validateDepartment } from "../../services/helper/hospitalHelper/hospitalDepartment.helper"
import type { DepartmentFormProps } from "../../types/interface/hospitalInterface/HospitalDepartment.interface"
import type {
  DepartmentField,
  DepartmentFieldName,
  DepartmentFormErrors,
  DepartmentFormValues,
} from "../../types/type/hospitalType/HospitalDepartment.type"

const inputClass = `${hospitalFieldClass} w-full`

const DepartmentForm = ({ department, departments, onSave, onCancel }: DepartmentFormProps) => {
  // Starts from the department being edited, or empty for a new one
  const [form, setForm] = useState<DepartmentFormValues>(() => (department ? toDepartmentForm(department) : emptyDepartmentForm))
  const [errors, setErrors] = useState<DepartmentFormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as DepartmentFieldName
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateDepartment(form, departments, department?.id)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    onSave(form)
  }

  const renderField = (field: DepartmentField) => {
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
          <textarea {...common} rows={3} placeholder="e.g. ECG" />
        ) : (
          <input {...common} type={field.type ?? "text"} placeholder={field.placeholder} />
        )}
        {errors[field.name] && <span className="mt-1 block text-xs font-semibold text-red-600">{errors[field.name]}</span>}
      </HospitalFormField>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${hospitalCardClass} grid gap-4 md:grid-cols-2`}>
      <h2 className="text-lg font-bold text-hospital-navy md:col-span-2">{department ? "Edit department" : "Add a new department"}</h2>

      {departmentFields.map(renderField)}

      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button type="submit" className="rounded-md bg-hospital-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-hospital-primary-dark">
          {department ? "Save changes" : "Add department"}
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

export default DepartmentForm