import DonorFormField from "./DonorFormField"

import type { DonorFieldInputProps } from "../../../types/interface/blood/donorInterface/DonorDashboard.interface"
import { DONOR_TODAY, donorFieldClass } from "../../../constants/blood/donorConstants/donorDashboard.constants"

// Shows a select, textarea or input from the field config
const DonorFieldInput = <T extends string>({ field, value, error, onChange }: DonorFieldInputProps<T>) => {
  const common = { name: field.name, value, onChange, className: `${donorFieldClass} w-full` }

  return (
    <DonorFormField label={field.label} required={field.required} className={field.fullWidth ? "md:col-span-2" : ""}>
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
        <input
          {...common}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          max={field.type === "date" ? DONOR_TODAY : undefined}
        />
      )}
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </DonorFormField>
  )
}

export default DonorFieldInput